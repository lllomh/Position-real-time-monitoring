<template>
  <div class="globe-overlay">
    <div class="globe-toolbar">
      <div class="globe-info">
        <span class="globe-dot"></span>
        <span class="globe-label">3D Globe · {{ t.trendTitle }}</span>
        <span class="globe-hint">{{ hint }}</span>
      </div>
      <button class="globe-back-btn" @click="$emit('close')">{{ backLabel }}</button>
    </div>
    <div class="globe-canvas" ref="globeCanvas">
      <transition name="fade">
        <div class="globe-loading" v-if="textureLoading">
          <div class="globe-spinner"></div>
          <p>Loading satellite imagery…</p>
        </div>
      </transition>
    </div>
    <div class="globe-legend">
      <span class="globe-legend-react">■ React</span>
      <span class="globe-legend-vue">■ Vue</span>
      <span class="globe-legend-arc">— Network</span>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const GR = 5.5      // globe radius
const MAX_H = 2.0   // max spike height

const TEX = {
  night: '/textures/earth-night.jpg',
  topo:  '/textures/earth-topology.png',
}

export default {
  name: 'Globe3D',
  props: {
    cityData: { type: Array, default: () => [] },
    t:        { type: Object, default: () => ({}) },
  },
  data() {
    return {
      textureLoading: true,
      animFrameId:     null,
      scene:           null,
      camera:          null,
      renderer:        null,
      controls:        null,
      globeGroup:      null,
      moonPivot:       null,
      moonMesh:        null,
      twinkleMat:      null,
      userInteracting: false,
      spikePairs:     [],
      time:           0,
    }
  },
  computed: {
    hint()      { return this.t.hint3d  || 'Drag to rotate · Scroll to zoom' },
    backLabel() { return this.t.back2d  || '← 2D View' },
  },
  mounted() {
    this.$nextTick(() => {
      this.initScene()
      this.animLoop()
    })
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId)
    window.removeEventListener('resize', this.onResize)
    this.disposeScene()
  },
  methods: {

    /* ─────────────────── coordinate helper ─────────────────── */
    ll2v(lat, lon, r) {
      const phi   = (90 - lat) * Math.PI / 180
      const theta = lon       * Math.PI / 180
      return new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta),
      )
    },

    /* ─────────────────── texture helper ─────────────────── */
    // Three.js SphereGeometry UV runs opposite in azimuth to our ll2v.
    // Applying repeat.x = -1 + offset.x = 1 flips U so the texture
    // aligns with geographic coordinates without any mesh rotation.
    loadTex(url, onLoad) {
      const loader = new THREE.TextureLoader()
      loader.crossOrigin = 'anonymous'
      const tex = loader.load(url, onLoad, undefined, () => {
        console.warn('[Globe3D] texture failed:', url)
      })
      tex.wrapS    = THREE.RepeatWrapping
      tex.wrapT    = THREE.RepeatWrapping
      tex.offset.x = 1
      tex.repeat.x = -1
      return tex
    },

    /* ─────────────────── scene bootstrap ─────────────────── */
    initScene() {
      const el = this.$refs.globeCanvas
      const W  = el.clientWidth  || 800
      const H  = el.clientHeight || 600

      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0x01020a)
      this.scene.fog = new THREE.FogExp2(0x01020a, 0.005)

      this.camera = new THREE.PerspectiveCamera(48, W / H, 0.1, 600)
      this.camera.position.set(0, 5, 17)
      this.camera.lookAt(0, 0, 0)

      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(W, H)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      el.appendChild(this.renderer.domElement)

      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableDamping  = true
      this.controls.dampingFactor  = 0.05
      this.controls.minDistance    = 8
      this.controls.maxDistance    = 35
      this.controls.addEventListener('start', () => { this.userInteracting = true })
      this.controls.addEventListener('end',   () => {
        setTimeout(() => { this.userInteracting = false }, 2000)
      })

      this.buildLights()
      this.buildStars()
      this.buildGlobeGroup()
      this.buildAtmosphere()
      this.buildMoon()
    },

    /* ─────────────────── lighting ─────────────────── */
    buildLights() {
      this.scene.add(new THREE.AmbientLight(0x223355, 1.0))
      const sun = new THREE.DirectionalLight(0x7799cc, 0.6)
      sun.position.set(-12, 18, 8)
      this.scene.add(sun)
      // warm glow from the China side of the globe
      const hl = new THREE.PointLight(0x00bbff, 1.6, 24)
      hl.position.set(1, 1, 9)
      this.scene.add(hl)
    },

    /* ─────────────────── star field (twinkling) ─────────────────── */
    buildStars() {
      const n      = 3500
      const pos    = new Float32Array(n * 3)
      const phases = new Float32Array(n)
      for (let i = 0; i < n; i++) {
        const r     = 100 + Math.random() * 180
        const theta = Math.random() * 2 * Math.PI
        const phi   = Math.acos(2 * Math.random() - 1)
        pos[i*3]   = r * Math.sin(phi) * Math.cos(theta)
        pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
        pos[i*3+2] = r * Math.cos(phi)
        phases[i]  = Math.random() * Math.PI * 2
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('phase',    new THREE.BufferAttribute(phases, 1))
      this.twinkleMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          attribute float phase;
          uniform float uTime;
          varying float vAlpha;
          void main() {
            float t = sin(uTime * 1.8 + phase);
            vAlpha = 0.28 + 0.72 * (t * 0.5 + 0.5);
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = 1.3 + 1.3 * (sin(uTime * 2.4 + phase + 1.1) * 0.5 + 0.5);
            gl_Position  = projectionMatrix * mvPos;
          }
        `,
        fragmentShader: `
          varying float vAlpha;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float b = 1.0 - smoothstep(0.0, 0.5, d);
            gl_FragColor = vec4(0.88, 0.94, 1.0, vAlpha * b);
          }
        `,
        transparent: true,
        depthWrite:  false,
        blending:    THREE.AdditiveBlending,
      })
      this.scene.add(new THREE.Points(geo, this.twinkleMat))
    },

    /* ─────────────────── moon ─────────────────── */
    buildMoon() {
      // Pivot group controls orbital tilt and revolution
      this.moonPivot = new THREE.Group()
      this.moonPivot.rotation.z = 0.42   // ~24° tilt, like the real lunar inclination
      this.scene.add(this.moonPivot)

      // Faint orbital path ring
      const orbitPts = []
      for (let i = 0; i <= 128; i++) {
        const a = (i / 128) * Math.PI * 2
        orbitPts.push(new THREE.Vector3(13.5 * Math.cos(a), 0, 13.5 * Math.sin(a)))
      }
      this.moonPivot.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(orbitPts),
        new THREE.LineBasicMaterial({
          color: 0x3355aa, transparent: true, opacity: 0.12,
          blending: THREE.AdditiveBlending, depthWrite: false,
        }),
      ))

      // Moon sphere
      const moonGeo = new THREE.SphereGeometry(0.88, 32, 32)
      const moonMat = new THREE.MeshPhongMaterial({ color: 0x999999, shininess: 3 })
      this.moonMesh = new THREE.Mesh(moonGeo, moonMat)
      this.moonMesh.position.set(13.5, 0, 0)
      this.moonPivot.add(this.moonMesh)

      const loader = new THREE.TextureLoader()
      loader.load('/textures/moon_1024.jpg', tex => {
        moonMat.map       = tex
        moonMat.bumpMap   = tex
        moonMat.bumpScale = 0.05
        moonMat.color     = new THREE.Color(0xffffff)
        moonMat.needsUpdate = true
      })

      // Soft blue-grey glow halo
      this.moonMesh.add(new THREE.Mesh(
        new THREE.SphereGeometry(1.14, 16, 16),
        new THREE.MeshBasicMaterial({
          color: 0x2244aa, transparent: true, opacity: 0.07,
          side: THREE.BackSide, depthWrite: false, blending: THREE.AdditiveBlending,
        }),
      ))
    },

    /* ─────────────────── globe group ─────────────────── */
    buildGlobeGroup() {
      this.globeGroup = new THREE.Group()
      // Rotate so China (lon ≈ 115°E) faces the camera.
      // ll2v places lon=90° at +Z; camera is along +Z ⟹ offset = PI/2 − 115*PI/180 ≈ −0.44 rad
      this.globeGroup.rotation.y = -0.44
      this.scene.add(this.globeGroup)

      this.buildEarth()
      this.buildGridOverlay()
      this.buildSpikes()
      this.buildArcs()
    },

    /* ─────────────────── satellite Earth ─────────────────── */
    buildEarth() {
      const geo = new THREE.SphereGeometry(GR, 64, 64)

      // placeholder material — visible immediately before texture arrives
      const mat = new THREE.MeshPhongMaterial({
        color:     0x020d25,
        emissive:  0x040f2a,
        emissiveIntensity: 0.6,
        shininess: 8,
      })
      const earth = new THREE.Mesh(geo, mat)
      this.globeGroup.add(earth)

      // ── Night / city-lights texture (NASA Black Marble) ──────────────
      const nightTex = this.loadTex(TEX.night, () => {
        mat.map               = nightTex
        mat.color             = new THREE.Color(0xffffff)
        mat.emissive          = new THREE.Color(0x000000)
        mat.emissiveIntensity = 0
        mat.shininess         = 6
        mat.needsUpdate       = true
        this.textureLoading   = false
      })
      // subtle bump (topology) loads silently
      const topoTex = this.loadTex(TEX.topo, () => {
        mat.bumpMap     = topoTex
        mat.bumpScale   = 0.03
        mat.needsUpdate = true
      })
    },

    /* ─────────────────── holographic grid overlay ─────────────────── */
    buildGridOverlay() {
      const R = GR + 0.018
      const dim    = () => new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.07 })
      const bright = () => new THREE.LineBasicMaterial({ color: 0x00fff2, transparent: true, opacity: 0.18 })

      // latitude circles every 30°
      for (let lat = -60; lat <= 60; lat += 30) {
        const pts = []
        for (let lon = 0; lon <= 362; lon += 4) pts.push(this.ll2v(lat, lon, R))
        this.globeGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lat === 0 ? bright() : dim()))
      }
      // longitude lines every 30°
      for (let lon = 0; lon < 360; lon += 30) {
        const pts = []
        for (let lat = -88; lat <= 88; lat += 4) pts.push(this.ll2v(lat, lon, R))
        this.globeGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), dim()))
      }
    },

    /* ─────────────────── atmosphere glow ─────────────────── */
    buildAtmosphere() {
      // Fresnel-style rim glow using a custom ShaderMaterial (camera-independent)
      const rimGeo = new THREE.SphereGeometry(GR * 1.12, 48, 48)
      const rimMat = new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vViewDir;
          void main() {
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            vNormal  = normalize(normalMatrix * normal);
            vViewDir = normalize(-mvPos.xyz);
            gl_Position = projectionMatrix * mvPos;
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vViewDir;
          void main() {
            float rim = 1.0 - max(dot(vNormal, vViewDir), 0.0);
            float intensity = pow(rim, 3.5) * 0.9;
            gl_FragColor = vec4(0.05, 0.55, 1.0, intensity);
          }
        `,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      })
      this.scene.add(new THREE.Mesh(rimGeo, rimMat))

      // soft outer haze layers
      const hazeLayers = [
        { r: GR * 1.05, c: 0x001133, o: 0.55 },
        { r: GR * 1.22, c: 0x0044aa, o: 0.02 },
        { r: GR * 1.40, c: 0x002266, o: 0.01 },
      ]
      hazeLayers.forEach(({ r, c, o }) => {
        const g = new THREE.SphereGeometry(r, 32, 32)
        const m = new THREE.MeshBasicMaterial({
          color: c, transparent: true, opacity: o,
          side: THREE.BackSide, depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
        this.scene.add(new THREE.Mesh(g, m))
      })
    },

    /* ─────────────────── city spikes ─────────────────── */
    buildSpikes() {
      const data = this.cityData.filter(c => c.lat != null && c.lon != null)
      if (!data.length) return
      const maxVal = Math.max(...data.map(d => Math.max(d.react || 0, d.vue || 0)), 1)
      this.spikePairs = []

      data.forEach(city => {
        const rH = Math.max(((city.react || 0) / maxVal) * MAX_H, 0.06)
        const vH = Math.max(((city.vue   || 0) / maxVal) * MAX_H, 0.06)
        const dir = this.ll2v(city.lat, city.lon, 1).normalize()
        const up  = new THREE.Vector3(0, 1, 0)
        const tan = new THREE.Vector3().crossVectors(dir, up).normalize()

        const { spike: rs, tip: rt } = this.makeSpike(dir, tan, -0.14, rH, 0xff4757, 0xff1133)
        const { spike: vs, tip: vt } = this.makeSpike(dir, tan,  0.14, vH, 0xffd32a, 0xffbb00)
        this.spikePairs.push({ spike: rs, tip: rt, dir: rs.userData.dir, fullH: rH })
        this.spikePairs.push({ spike: vs, tip: vt, dir: vs.userData.dir, fullH: vH })

        this.addCityDot(city.lat, city.lon)
        this.addCityLabel(dir, Math.max(rH, vH), city.name)
      })

      // start flat — animate upward in animLoop
      this.spikePairs.forEach(p => {
        p.spike.scale.y = 0.001
        p.spike.position.copy(p.dir.clone().multiplyScalar(GR))
        p.tip.position.copy(p.dir.clone().multiplyScalar(GR))
      })
    },

    makeSpike(dir, tan, lateralOffset, height, color, emissive) {
      const sDir = dir.clone().addScaledVector(tan, lateralOffset).normalize()
      const geo  = new THREE.CylinderGeometry(0.035, 0.075, height, 6)
      const mat  = new THREE.MeshPhongMaterial({
        color, emissive, emissiveIntensity: 0.6,
        transparent: true, opacity: 0.9, shininess: 90,
      })
      const spike = new THREE.Mesh(geo, mat)
      spike.userData.dir   = sDir.clone()
      spike.position.copy(sDir.clone().multiplyScalar(GR + height / 2))
      spike.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), sDir)
      this.globeGroup.add(spike)

      const tipGeo = new THREE.SphereGeometry(0.085, 8, 8)
      const tipMat = new THREE.MeshBasicMaterial({
        color: emissive, transparent: true, opacity: 0.95,
        blending: THREE.AdditiveBlending, depthWrite: false,
      })
      const tip = new THREE.Mesh(tipGeo, tipMat)
      tip.userData.dir  = sDir.clone()
      tip.position.copy(sDir.clone().multiplyScalar(GR + height))
      this.globeGroup.add(tip)

      return { spike, tip }
    },

    addCityDot(lat, lon) {
      const pos = this.ll2v(lat, lon, GR + 0.06)

      // glowing dot
      const dotGeo = new THREE.SphereGeometry(0.055, 8, 8)
      const dotMat = new THREE.MeshBasicMaterial({
        color: 0x00fff2, transparent: true, opacity: 0.85,
        blending: THREE.AdditiveBlending, depthWrite: false,
      })
      const dot = new THREE.Mesh(dotGeo, dotMat)
      dot.position.copy(pos)
      this.globeGroup.add(dot)

      // pulsing ring lying on the sphere surface
      const ringGeo = new THREE.RingGeometry(0.12, 0.17, 14)
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00fff2, transparent: true, opacity: 0.3,
        side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false,
      })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.position.copy(pos)
      ring.lookAt(new THREE.Vector3(0, 0, 0))
      ring.userData.isPulse = true
      ring.userData.phase   = Math.random() * Math.PI * 2
      this.globeGroup.add(ring)
    },

    addCityLabel(dir, maxH, name) {
      const canvas = document.createElement('canvas')
      canvas.width  = 320
      canvas.height = 72
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, 320, 72)
      ctx.font         = 'bold 28px Arial'
      ctx.textAlign    = 'center'
      ctx.textBaseline = 'middle'
      ctx.shadowColor  = '#00fff2'
      ctx.shadowBlur   = 14
      ctx.fillStyle    = 'rgba(200,245,255,0.92)'
      ctx.fillText(name, 160, 36)
      const tex = new THREE.CanvasTexture(canvas)
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false })
      const sprite = new THREE.Sprite(mat)
      sprite.scale.set(3.1, 0.695, 1)
      sprite.position.copy(dir.clone().multiplyScalar(GR + maxH + 0.6))
      this.globeGroup.add(sprite)
    },

    /* ─────────────────── arc network ─────────────────── */
    buildArcs() {
      const data  = this.cityData.filter(c => c.lat != null && c.lon != null)
      if (data.length < 2) return
      const drawn = new Set()

      data.forEach((city, i) => {
        data.map((other, j) => ({
          j, d: Math.hypot(city.lat - other.lat, city.lon - other.lon),
        }))
        .filter(x => x.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2)
        .forEach(({ j }) => {
          const key = `${Math.min(i,j)}-${Math.max(i,j)}`
          if (drawn.has(key)) return
          drawn.add(key)
          this.drawArc(city, data[j])
        })
      })
    },

    drawArc(a, b) {
      const pA   = this.ll2v(a.lat, a.lon, GR)
      const pB   = this.ll2v(b.lat, b.lon, GR)
      const lift = 0.3 + pA.distanceTo(pB) * 0.11
      const pts  = []
      for (let i = 0; i <= 50; i++) {
        const t = i / 50
        const p = pA.clone().lerp(pB, t)
        p.normalize().multiplyScalar(GR + Math.sin(Math.PI * t) * lift)
        pts.push(p)
      }
      const mat = new THREE.LineBasicMaterial({
        color: 0x00ccff, transparent: true, opacity: 0.2,
        blending: THREE.AdditiveBlending, depthWrite: false,
      })
      this.globeGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat))
    },

    /* ─────────────────── animation loop ─────────────────── */
    animLoop() {
      this.animFrameId = requestAnimationFrame(this.animLoop)
      this.time += 0.016

      // grow spikes upward
      this.spikePairs.forEach(p => {
        const s    = p.spike.scale.y
        const next = s < 0.998 ? s + (1 - s) * 0.052 : 1
        p.spike.scale.y = next
        p.spike.position.copy(p.dir.clone().multiplyScalar(GR + p.fullH * next / 2))
        p.tip.position.copy(p.dir.clone().multiplyScalar(GR + p.fullH * next))
      })

      // pulse rings
      if (this.globeGroup) {
        this.globeGroup.traverse(obj => {
          if (!obj.userData.isPulse) return
          const phase  = obj.userData.phase + this.time * 1.8
          const pulse  = 0.5 + 0.5 * Math.sin(phase)
          obj.material.opacity = pulse * 0.38
          const sc = 1 + pulse * 0.45
          obj.scale.set(sc, sc, sc)
        })
      }

      // auto-rotate globe
      if (!this.userInteracting && this.globeGroup) {
        this.globeGroup.rotation.y += 0.0022
      }

      // moon orbits at a clearly different rate from Earth's self-rotation (0.0022)
      if (this.moonPivot) this.moonPivot.rotation.y += 0.001
      // moon visibly spins on its own axis, independent of the orbit
      if (this.moonMesh)  this.moonMesh.rotation.y  += 0.004

      // twinkling stars
      if (this.twinkleMat) this.twinkleMat.uniforms.uTime.value = this.time

      this.controls.update()
      this.renderer.render(this.scene, this.camera)
    },

    /* ─────────────────── resize & cleanup ─────────────────── */
    onResize() {
      const el = this.$refs.globeCanvas
      if (!el || !this.renderer) return
      const W = el.clientWidth, H = el.clientHeight
      this.camera.aspect = W / H
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(W, H)
    },

    disposeScene() {
      if (this.scene) {
        this.scene.traverse(obj => {
          if (obj.geometry) obj.geometry.dispose()
          if (obj.material) {
            ;['map','alphaMap','bumpMap'].forEach(k => obj.material[k] && obj.material[k].dispose())
            obj.material.dispose()
          }
        })
      }
      if (this.renderer) {
        this.renderer.dispose()
        this.renderer.domElement.parentNode &&
          this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)
      }
    },
  },
}
</script>

<style scoped>
.globe-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  background: #01020a;
}

/* ── toolbar ── */
.globe-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: rgba(1, 2, 10, 0.95);
  border-bottom: 1px solid rgba(0, 180, 255, 0.2);
  flex-shrink: 0;
}
.globe-info { display: flex; align-items: center; gap: 14px; }
.globe-dot {
  width: 10px; height: 10px; border-radius: 50%;
  background: #00d4ff;
  box-shadow: 0 0 14px #00d4ff, 0 0 30px rgba(0,212,255,0.4);
  animation: gPulse 2s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes gPulse {
  0%,100% { opacity:1; box-shadow: 0 0 14px #00d4ff, 0 0 30px rgba(0,212,255,0.4); }
  50%     { opacity:.45; box-shadow: 0 0 5px #00d4ff; }
}
.globe-label { font-size: 16px; font-weight: 700; color: #fff; letter-spacing: 2px; }
.globe-hint  { font-size: 12px; color: rgba(0,212,255,0.5); letter-spacing: 1px; }
.globe-back-btn {
  padding: 8px 22px; font-size: 13px; font-weight: 600;
  color: #00d4ff; background: transparent;
  border: 1px solid rgba(0,212,255,0.4); border-radius: 6px;
  cursor: pointer; letter-spacing: 1px; font-family: inherit;
  transition: all .25s ease;
}
.globe-back-btn:hover {
  background: rgba(0,212,255,0.1); border-color: #00d4ff;
  box-shadow: 0 0 18px rgba(0,212,255,0.25);
}

/* ── canvas ── */
.globe-canvas {
  flex: 1; overflow: hidden; position: relative;
}
.globe-canvas canvas { display: block; width: 100% !important; height: 100% !important; }

/* ── satellite loading overlay ── */
.globe-loading {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  background: rgba(1, 2, 10, 0.75);
  pointer-events: none; z-index: 5;
}
.globe-loading p {
  color: rgba(0,212,255,0.6); font-size: 13px;
  letter-spacing: 2px; margin-top: 14px;
}
.globe-spinner {
  width: 44px; height: 44px;
  border: 3px solid rgba(0,212,255,0.15);
  border-top-color: #00d4ff;
  border-radius: 50%;
  animation: gSpin .85s linear infinite;
}
@keyframes gSpin { to { transform: rotate(360deg); } }
.fade-enter-active, .fade-leave-active { transition: opacity 0.6s ease; }
.fade-enter, .fade-leave-to { opacity: 0; }

/* ── legend ── */
.globe-legend {
  display: flex; justify-content: center; gap: 36px;
  padding: 10px;
  background: rgba(1,2,10,0.95);
  border-top: 1px solid rgba(0,212,255,0.1);
  flex-shrink: 0;
}
.globe-legend-react { font-size:13px; font-weight:700; color:#ff4757; letter-spacing:2px; text-shadow:0 0 10px rgba(255,71,87,.6); }
.globe-legend-vue   { font-size:13px; font-weight:700; color:#ffd32a; letter-spacing:2px; text-shadow:0 0 10px rgba(255,211,42,.6); }
.globe-legend-arc   { font-size:13px; font-weight:700; color:rgba(0,212,255,.55); letter-spacing:2px; }
</style>
