import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';
import { OBJLoader2 } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/loaders/OBJLoader2.js';
import { MTLLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/loaders/MTLLoader.js';

function init() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 4;
  const aspect = 0.1;  // the canvas default
  const near = .1;
  const far = 100;
  
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 60);


  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  const scene = new THREE.Scene();
  const bgTexture = new THREE.TextureLoader().load("assets/bg.jpg");
  scene.background = bgTexture;

  { // LIGHT 1
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  { // Light 2
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(5, 10, 2);
    scene.add(light);
    scene.add(light.target);
  }

  const mtlLoader = new MTLLoader();

  mtlLoader.load('assets/Karas.mtl', function (materials) {
    materials.preload();
    ///  
    const load = () => {
      const loadingScreen = document.getElementById('loading-screen');
      loadingScreen.classList.add('fade-out');
      // loadingScreen.addEventListener('transitionend', onTransitionEnd);
    }
    const manager = new THREE.LoadingManager(load);

    const objLoader = new OBJLoader2(manager)
    objLoader.addMaterials(materials);
    objLoader.load('https://www.dropbox.com/home/obj?preview=Karas-Ster.OBJ', function (object) {      
      const texture = new THREE.TextureLoader().load('assets/Karas.jpg');
      object.traverse(function (child) {   // aka setTexture
        if (child instanceof THREE.Mesh) {
          child.material.map = texture;
        }
      });
      // const btns = document.querySelectorAll('.btns');
      
      // const changeTexture = (e) => {
      //   console.log('zmiana textury');
      //   const textureSrc = e.target.getAttribute('src');
      //   const texture = new THREE.TextureLoader().load(textureSrc);
      //   object.traverse(function (child) {   // aka setTexture
      //     if (child instanceof THREE.Mesh) {
      //       child.material.map = texture;
      //     }
      //   });
      // };
      // 
      // btns.forEach(elem => elem.addEventListener('click', changeTexture)) ;
      
      scene.add(object);
    });
  });

  // mtlLoader.load('assets/Karas-Ster2.mtl', function (materials) {
  //   materials.preload();
  //   ///  
    
    const manager = new THREE.LoadingManager();

    const objLoader = new OBJLoader2(manager)
    // objLoader.addMaterials(materials);
    objLoader.load('assets/Karas-Ster.obj', function (object) {      
      const texture = new THREE.TextureLoader().load('assets/Karas-Ster.jpg');
      object.traverse(function (child) {   // aka setTexture
        if (child instanceof THREE.Mesh) {
          child.material.map = texture;
          child.material.transparent = true;
          child.material.opacity = 0.3;
          // child.material.metalness = 0.3;
          // child.material.color = 0xffffff;
          // child.material.emisive = 0x0;
          // child.material.specular = 0xffffff;
          // child.material.shininess = 100;
          // child.material.needsUpdate = true;
        }
      });   
      scene.add(object);
    });
  // });

  mtlLoader.load('assets/Karas-Druty.mtl', function (materials) {
    materials.preload();
    ///  
    const objLoader = new OBJLoader2(manager)
    objLoader.addMaterials(materials);
    objLoader.load('assets/Karas-Druty.obj', function (object) {      
      const texture = new THREE.TextureLoader().load('assets/Karas-Druty.jpg');
      object.traverse(function (child) {   // aka setTexture
        if (child instanceof THREE.Mesh) {
          child.material.map = texture;
        }
      });   
      scene.add(object);
    });
  })
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);


}

init();
