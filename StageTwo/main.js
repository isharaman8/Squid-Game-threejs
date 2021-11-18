const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xb7c3f3, 1);

const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);

function createCube(size, positionX, rotY = 0, color = 0xfbc851) {
	const geometry = new THREE.BoxGeometry(size.w, size.h, size.d);
	const material = new THREE.MeshBasicMaterial({ color: color });
	const cube = new THREE.Mesh(geometry, material);
	cube.position.x = positionX;
	cube.rotation.y = rotY;
	scene.add(cube);
	return cube;
}

var loader = new THREE.GLTFLoader();
loader.load("/models/Squid-HoneyComb/scene.gltf", (gltf) => {
	scene.add(gltf.scene);
	gltf.scene.scale.set(0.15, 0.05, 0.4);
	gltf.scene.position.set(0, -1, 0);
});

// loader.load("/models/Squid-Soldier/scene.gltf", (gltf) => {
// 	scene.add(gltf.scene);
// 	gltf.scene.scale.set(0.15, 0.05, 0.4);
// 	gltf.scene.position.set(0, -0.5, 0);
// });

function animate() {
	// if (gameStat == "over" || gameStat == "won") return;
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
	// player.update();
}
animate();

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
