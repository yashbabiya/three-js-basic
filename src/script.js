import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//texture
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('./textures/NormalMap.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
// Objects
const geometry = new THREE.SphereBufferGeometry(.5,30,11);

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness=0.7;
material.roughness=0.2;
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0x00ffff, 0.1)
pointLight.position.x = 1.6
pointLight.position.y = -3
pointLight.position.z = 1.1
pointLight.intensity =2.8

scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.x = 5
pointLight2.position.y = -3
pointLight2.position.z = -3
pointLight2.intensity =10
scene.add(pointLight2)

// gui.add(pointLight2.position,'y').min().max()
// const point = new  THREE.PointLightHelper(pointLight2);
// scene.add(point)
/**
 * Sizes
 */
let mX = 0;
let mY=0;
let tX=0;
let tY=0;
document.addEventListener("mousemove",(event)=>{
    mX=(event.clientX - window.innerWidth/2)
    mY=(event.clientY - window.innerHeight/2)
   
})
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha :true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()
    tX=mX * .001;
    tY = mY* .001;
    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    sphere.rotation.y+= .5*(tY - sphere.rotation.y)
    sphere.rotation.x+= .5*(tX - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()