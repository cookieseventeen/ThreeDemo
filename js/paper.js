const PARAMS = {
  rotationXSpeed: 0.01,
  rotationYSpeed: 0.01,
  cameraX: 0,
  cameraY: 0,
  cameraZ: 5,
  camera: { x: 0, y: 0, z: 5 },
  Ambient: '#666666'
};
const pane = new Tweakpane.Pane();



// 1.建立場景 Scene
let scene = new THREE.Scene();


// 2.建立相機 Camera 
//透視相機
let camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
//正交相機



// 3.建立渲染器 Renderer
let renderer = window.WebGLRenderingContext ?
  new THREE.WebGLRenderer() : new THREE.CanvasRenderer();

// 4.設定渲染器渲染範圍
renderer.setSize(window.innerWidth, window.innerHeight);

// 5.將渲染元素加入 body
document.body.appendChild(renderer.domElement);

// 6.建立矩形 Geometry
let geometry = new THREE.BoxGeometry(1, 1, 1);

// 7-1.建立紋理
let texture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/crate.gif');

// 7.建立材質 Material
let material = new THREE.MeshPhongMaterial({ map: texture });



// 8.使用以上矩形與材質, 將其實例化成一個方塊
let cube = new THREE.Mesh(geometry, material);

// 9.將方塊加入場景
scene.add(cube);

/**********/

const geometryMesh = new THREE.PlaneGeometry(3, 4.248);
const textureMesh = new THREE.TextureLoader().load('https://i.imgur.com/pPtUIqs.jpg');
const materialMesh = new THREE.MeshBasicMaterial({ color: 0xffffff, map: textureMesh, side: THREE.DoubleSide });
const mesh = new THREE.Mesh(geometryMesh, materialMesh);
scene.add(mesh);


/**********/
//9-2 設定光源

//每個平面平均接受的光源
let ambientLight = new THREE.AmbientLight('#666666');

scene.add(ambientLight);

//聚光燈光源範例
let spoltLight = new THREE.SpotLight(0xFFFFFF);

spoltLight.position.set(3, 3, 3);

spoltLight.target = cube;

scene.add(spoltLight);

//點光源
let pointLight = new THREE.PointLight({
  color: '#FFFFFF',
  distance: 100  // 光線照亮距離
});
pointLight.intensity = 5;

pointLight.position.set(-6, -6, -6);

scene.add(pointLight);


// 10.設定相機位置
camera.position.x = PARAMS.cameraX;
camera.position.y = PARAMS.cameraY;
camera.position.z = PARAMS.cameraZ;

console.log(camera);

//helper
//軸心
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
//相機
const helperCamera = new THREE.CameraHelper(camera);
scene.add(helperCamera);

const spotLightHelper = new THREE.SpotLightHelper(spoltLight);
scene.add(spotLightHelper);

//
const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
scene.add(pointLightHelper);


// 10.raf使用渲染器渲染場景
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += PARAMS.rotationXSpeed;
  cube.rotation.y += PARAMS.rotationYSpeed;
  renderer.render(scene, camera);
}

animate();


//儀表板控制
pane.addInput(PARAMS, 'camera').on(
  "change",
  (value) => {
    camera.position.x = value.value.x;
    camera.position.y = value.value.y;
    camera.position.z = value.value.z;
  }
);

pane.addInput(PARAMS, 'cameraX', {
  min: -30,
  speed: 0.1,
  max: 30,
}).on(
  "change",
  (value) => {

    camera.position.x = value.value;
  }
);

pane.addInput(PARAMS, 'cameraY', {
  min: -30,
  speed: 0.1,
  max: 30,
}).on(
  "change",
  (value) => {

    camera.position.y = value.value;
  }
);

pane.addInput(PARAMS, 'cameraZ', {
  min: -30,
  speed: 0.1,
  max: 30,
}).on(
  "change",
  (value) => {

    camera.position.z = value.value;
  }
);

pane.addInput(PARAMS, 'rotationXSpeed', {
  min: 0,
  speed: 0.1,
  max: 1,
}).on(
  "change",
  (value) => {

    PARAMS.rotationXSpeed = value.value;
  }
);

pane.addInput(PARAMS, 'rotationYSpeed', {
  min: 0,
  speed: 0.1,
  max: 1,
}).on(
  "change",
  (value) => {
    PARAMS.rotationXSpeed = value.value;
  }
);
