import * as THREE from "three"
import React from "react"
import JSONData from "../../content/map.json"

class Scene extends React.Component {
  constructor(props) {
    super(props)

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
  }

  componentDidMount() {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })    
    
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 })
    const line_material = new THREE.LineBasicMaterial({
        color: 0xffffff
    });
    let points;
    let line_geometry;
    let line;
    JSONData.features.forEach(feature => {
        points = [];
        feature.geometry.coordinates.forEach(coords => {
            points.push( new THREE.Vector3( coords[0], coords[1], 0 ) );
        })
        line_geometry = new THREE.BufferGeometry().setFromPoints( points );
        line = new THREE.Line( line_geometry, line_material )
        scene.add( line );
    })
    
    camera.position.set( 0, 0, 200 );
    camera.lookAt( 0, 0, 0 );

    renderer.setClearColor("#000000")
    renderer.setSize(width, height)

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material

    this.mount.appendChild(this.renderer.domElement)
    this.start()
  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId)
  }

  animate() {
    // this.cube.rotation.x += 0.01
    // this.cube.rotation.y += 0.01

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div
        style={{ width: "100%", height: "400px" }}
        ref={mount => {
          this.mount = mount
        }}
      />
    )
  }
}

export default Scene
