<template>
  <div class="v3d-overlay">
    <div class="v3d-toolbar">
      <div class="v3d-info">
        <span class="v3d-dot"></span>
        <span class="v3d-label">3D {{ t.trendTitle }}</span>
        <span class="v3d-hint">{{ hint }}</span>
      </div>
      <button class="v3d-back-btn" @click="$emit('close')">
        ← {{ backLabel }}
      </button>
    </div>
    <div class="v3d-canvas" ref="canvas3d"></div>
    <div class="v3d-legend">
      <span class="v3d-legend-react">■ React</span>
      <span class="v3d-legend-vue">■ Vue</span>
    </div>
    <div class="v3d-loading" v-if="!ready">
      <div class="v3d-spinner"></div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
  name: 'Chart3D',
  props: {
    cityData: { type: Array, default: () => [] },
    t: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      ready: false,
      animFrameId: null,
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      barMeshes: [],
    }
  },
  computed: {
    hint() {
      const h = this.t.hint3d
      return h || 'Drag to rotate · Scroll to zoom'
    },
    backLabel() {
      return this.t.back2d || '← 2D View'
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initScene()
      this.animLoop()
      this.ready = true
    })
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId)
    window.removeEventListener('resize', this.onResize)
    this.disposeScene()
  },
  methods: {
    initScene() {
      const container = this.$refs.canvas3d
      const W = container.clientWidth || 800
      const H = container.clientHeight || 600

      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0x070c1f)
      this.scene.fog = new THREE.FogExp2(0x070c1f, 0.012)

      this.camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 600)
      const camZ = Math.max(30, this.cityData.length * 1.2)
      this.camera.position.set(0, camZ * 0.55, camZ)
      this.camera.lookAt(0, 4, 0)

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
      this.renderer.setSize(W, H)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      this.renderer.shadowMap.enabled = false
      container.appendChild(this.renderer.domElement)

      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableDamping = true
      this.controls.dampingFactor = 0.06
      this.controls.minDistance = 8
      this.controls.maxDistance = 120
      this.controls.maxPolarAngle = Math.PI / 2 + 0.05
      this.controls.target.set(0, 3, 0)
      this.controls.update()

      this.buildLighting()
      this.buildFloor()
      this.buildBars()
      this.buildAxes()
    },

    buildLighting() {
      this.scene.add(new THREE.AmbientLight(0x223355, 1.2))
      const dir = new THREE.DirectionalLight(0xffffff, 0.7)
      dir.position.set(15, 30, 15)
      this.scene.add(dir)
      const cyan = new THREE.PointLight(0x00fff2, 1.8, 60)
      cyan.position.set(-10, 20, 10)
      this.scene.add(cyan)
      const orange = new THREE.PointLight(0xff6600, 0.6, 50)
      orange.position.set(10, 10, -10)
      this.scene.add(orange)
    },

    buildFloor() {
      const size = 80
      const step = 2
      const pts = []
      for (let i = -size; i <= size; i += step) {
        pts.push(new THREE.Vector3(-size, 0, i), new THREE.Vector3(size, 0, i))
        pts.push(new THREE.Vector3(i, 0, -size), new THREE.Vector3(i, 0, size))
      }
      const gridGeo = new THREE.BufferGeometry().setFromPoints(pts)
      const gridMat = new THREE.LineBasicMaterial({ color: 0x00fff2, transparent: true, opacity: 0.06 })
      this.scene.add(new THREE.LineSegments(gridGeo, gridMat))

      const floorGeo = new THREE.PlaneGeometry(160, 160)
      const floorMat = new THREE.MeshBasicMaterial({ color: 0x04071a, transparent: true, opacity: 0.85, side: THREE.DoubleSide })
      const floor = new THREE.Mesh(floorGeo, floorMat)
      floor.rotation.x = -Math.PI / 2
      floor.position.y = -0.02
      this.scene.add(floor)
    },

    buildBars() {
      const data = this.cityData
      if (!data || !data.length) return

      const maxVal = Math.max(...data.map(d => Math.max(d.react || 0, d.vue || 0)), 1)
      const MAX_H = 12
      const spacing = 2.2
      const startX = -((data.length - 1) * spacing) / 2

      this.barMeshes = []

      data.forEach((city, i) => {
        const x = startX + i * spacing
        const rH = ((city.react || 0) / maxVal) * MAX_H || 0.05
        const vH = ((city.vue || 0) / maxVal) * MAX_H || 0.05

        const rMesh = this.makeBar(x - 0.28, rH, 0, 0xff4757, '#ff4757')
        const vMesh = this.makeBar(x + 0.28, vH, 0, 0xffd32a, '#ffd32a')
        this.scene.add(rMesh)
        this.scene.add(vMesh)
        this.barMeshes.push({ mesh: rMesh, targetH: rH })
        this.barMeshes.push({ mesh: vMesh, targetH: vH })

        this.addLabel(x, city.name)
        this.addValueLabel(x - 0.28, rH, city.react || 0, '#ff6b7a')
        this.addValueLabel(x + 0.28, vH, city.vue || 0, '#ffe060')
      })

      // Start bars flat
      this.barMeshes.forEach(b => {
        b.mesh.scale.y = 0.001
        b.mesh.position.y = 0
      })
    },

    makeBar(x, h, z, color) {
      const geo = new THREE.BoxGeometry(0.48, h, 0.48)
      const mat = new THREE.MeshPhongMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.35,
        transparent: true,
        opacity: 0.92,
        shininess: 80,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(x, h / 2, z)
      mesh.userData.fullH = h
      return mesh
    },

    makeSprite(text, color, fontSize, canvasW, canvasH) {
      const canvas = document.createElement('canvas')
      canvas.width = canvasW
      canvas.height = canvasH
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvasW, canvasH)
      ctx.font = `bold ${fontSize}px Arial`
      ctx.fillStyle = color
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.shadowColor = color
      ctx.shadowBlur = 8
      ctx.fillText(text, canvasW / 2, canvasH / 2)
      const tex = new THREE.CanvasTexture(canvas)
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false })
      return new THREE.Sprite(mat)
    },

    addLabel(x, name) {
      const sprite = this.makeSprite(name, '#00fff2', 30, 256, 72)
      sprite.position.set(x, -1.3, 0)
      sprite.scale.set(3.2, 0.9, 1)
      this.scene.add(sprite)
    },

    addValueLabel(x, barH, value, color) {
      if (!value) return
      const text = value >= 1000 ? (value / 1000).toFixed(1) + 'k' : String(value)
      const sprite = this.makeSprite(text, color, 28, 192, 60)
      sprite.position.set(x, barH + 0.8, 0)
      sprite.scale.set(2.2, 0.7, 1)
      sprite.userData.barH = barH
      this.scene.add(sprite)
    },

    buildAxes() {
      const mat = new THREE.LineBasicMaterial({ color: 0x00fff2, transparent: true, opacity: 0.3 })
      const xPts = [new THREE.Vector3(-50, 0, 0), new THREE.Vector3(50, 0, 0)]
      const yPts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 16, 0)]
      this.scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(xPts), mat))
      this.scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(yPts), mat.clone()))
    },

    animLoop() {
      this.animFrameId = requestAnimationFrame(this.animLoop)

      // Animate bars growing
      this.barMeshes.forEach(b => {
        const s = b.mesh.scale.y
        if (s < 0.999) {
          const next = s + (1 - s) * 0.055
          b.mesh.scale.y = next
          b.mesh.position.y = (b.mesh.userData.fullH * next) / 2
        } else if (s !== 1) {
          b.mesh.scale.y = 1
          b.mesh.position.y = b.mesh.userData.fullH / 2
        }
      })

      this.controls.update()
      this.renderer.render(this.scene, this.camera)
    },

    onResize() {
      const container = this.$refs.canvas3d
      if (!container || !this.renderer) return
      const W = container.clientWidth
      const H = container.clientHeight
      this.camera.aspect = W / H
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(W, H)
    },

    disposeScene() {
      if (!this.scene) return
      this.scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (obj.material.map) obj.material.map.dispose()
          obj.material.dispose()
        }
      })
      if (this.renderer) {
        this.renderer.dispose()
        if (this.renderer.domElement && this.renderer.domElement.parentNode) {
          this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)
        }
      }
    },
  },
}
</script>

<style scoped>
.v3d-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  background: #070c1f;
}

.v3d-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: rgba(7, 12, 31, 0.9);
  border-bottom: 1px solid rgba(0, 255, 242, 0.15);
  flex-shrink: 0;
  z-index: 10;
}

.v3d-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.v3d-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #00fff2;
  box-shadow: 0 0 12px #00fff2;
  animation: v3dPulse 2s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes v3dPulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 12px #00fff2; }
  50% { opacity: 0.45; box-shadow: 0 0 4px #00fff2; }
}

.v3d-label {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 2px;
}

.v3d-hint {
  font-size: 12px;
  color: rgba(0, 255, 242, 0.5);
  letter-spacing: 1px;
}

.v3d-back-btn {
  padding: 8px 22px;
  font-size: 13px;
  font-weight: 600;
  color: #00fff2;
  background: transparent;
  border: 1px solid rgba(0, 255, 242, 0.4);
  border-radius: 6px;
  cursor: pointer;
  letter-spacing: 1px;
  font-family: inherit;
  transition: all 0.25s ease;
}

.v3d-back-btn:hover {
  background: rgba(0, 255, 242, 0.1);
  border-color: #00fff2;
  box-shadow: 0 0 18px rgba(0, 255, 242, 0.2);
}

.v3d-canvas {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.v3d-canvas canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}

.v3d-legend {
  display: flex;
  justify-content: center;
  gap: 32px;
  padding: 10px;
  background: rgba(7, 12, 31, 0.9);
  border-top: 1px solid rgba(0, 255, 242, 0.1);
  flex-shrink: 0;
}

.v3d-legend-react {
  font-size: 13px;
  font-weight: 600;
  color: #ff4757;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(255, 71, 87, 0.5);
}

.v3d-legend-vue {
  font-size: 13px;
  font-weight: 600;
  color: #ffd32a;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(255, 211, 42, 0.5);
}

.v3d-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(7, 12, 31, 0.8);
  z-index: 5;
}

.v3d-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 255, 242, 0.15);
  border-top-color: #00fff2;
  border-radius: 50%;
  animation: v3dSpin 0.8s linear infinite;
}

@keyframes v3dSpin {
  to { transform: rotate(360deg); }
}
</style>
