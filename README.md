# 🚀 Position Real-Time Monitoring

English | / [中文](./README.zh-CN.md) 

A lightweight **real-time position monitoring platform** for tracking
and visualizing device locations on an interactive dashboard.

![license](https://img.shields.io/badge/license-MIT-blue.svg)
![node](https://img.shields.io/badge/node-%3E%3D18-green)
![docker](https://img.shields.io/badge/docker-supported-blue)
![status](https://img.shields.io/badge/status-active-success)

------------------------------------------------------------------------

# 📖 Overview

**Position Real-Time Monitoring** is a system designed to **collect,
process, and visualize job market data related to popular frontend
frameworks across different cities**.

The system periodically crawls job listings and records statistics every
day at **23:59**, accumulating historical data over time. The data is
then visualized through charts such as line graphs to help observe
**technology demand trends** in the job market.

This project is mainly intended for **technology trend analysis and
learning purposes**.

> ⚠️ Note: This project is for personal research and technical
> exploration only and is not related to recruitment activities.

------------------------------------------------------------------------

# ✨ Features

### 📊 Job Trend Statistics

Analyze the demand for popular frontend frameworks across multiple
cities.

### 📈 Historical Trend Visualization

Daily statistics are stored and visualized using charts to clearly show
technology trends.

### 🌍 Multi‑City Comparison

Compare technology demand between different cities.

### ⚡ Real-Time Data Collection

Automatically crawls and processes job market data.

### 🧩 Modular Frontend Architecture

Built with modern frontend frameworks and modular project structure.

------------------------------------------------------------------------

# 🛠 Tech Stack

### Frontend

-   Vue 3
-   Vue Router
-   Axios
-   Webpack
-   ES6 / ES7
-   SVG Data Visualization

------------------------------------------------------------------------

# 📂 Project Structure

    Position-real-time-monitoring

    src/
    components/
    router/
    assets/

    static/

    dist/

    package.json
    README.md

------------------------------------------------------------------------

# 🚀 Getting Started

## Environment Requirements

Because the project uses **ES6 / ES7 features**, please ensure your
Node.js version meets the following requirement:

-   Node.js **\>= 6.0**

⚠️ It is recommended to use a stable Node.js version.

------------------------------------------------------------------------

## Clone the Repository

``` bash
git clone https://github.com/lllomh/Position-real-time-monitoring.git
cd Position-real-time-monitoring
npm install
```

------------------------------------------------------------------------

# 💻 Run the Project

## Development Mode

``` bash
npm run dev
```

Open your browser and visit:

    http://localhost:8080

------------------------------------------------------------------------

## Production Build

``` bash
npm run build
```

After building, a **dist** folder will be generated.\
Deploy the contents of this folder to a web server to run the project.

------------------------------------------------------------------------

# 📊 Data Description

1.  All data displayed in the project is **collected from real job
    listings**.
2.  Data is recorded daily and stored as historical statistics.
3.  Trend charts are generated from accumulated data.

------------------------------------------------------------------------

# 🖥 Demo

Online demo:

http://react.lllomh.com/

Preview:

![demo](https://img-blog.csdnimg.cn/20200525134921155.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xsbG9taA==,size_16,color_FFFFFF,t_70)

------------------------------------------------------------------------

# 🤝 Contributing

Contributions are welcome!

If you have better ideas or improvements, feel free to:

-   Submit a **Pull Request**
-   Open an **Issue**
-   Improve UI or add new features

------------------------------------------------------------------------

# 📈 Project Notes

This project started as a personal interest project.\
Although development progress may sometimes be slow, it continues to
evolve.

Possible improvements include:

-   Supporting more cities
-   Tracking more programming languages
-   Improving data visualization
-   Optimizing UI design

------------------------------------------------------------------------

# 🎯 Future Plans

-   📱 Mobile version support
-   🎨 Better UI / UX design
-   📊 More advanced data analytics
-   🌍 More technology ecosystem statistics

Stay tuned for future updates.
