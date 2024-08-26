import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three-stdlib";
import { GLTFLoader } from "three-stdlib";
import { EventEmitter } from "events";

const FILES = {
  forestFile: "/3d-models/world.glb",
  noiseFile: "https://assets.codepen.io/264161/noise_1.jpg",
};

const ASSETS: any = {};

type ForestLakeProps = {
  level: number;
};

const ForestLake: React.FC<ForestLakeProps> = ({ level = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !parentDivRef.current && level == 0) return;

    const canvas = canvasRef.current;
    const parentDiv = parentDivRef.current;

    class App {
      winWidth: number;
      winHeight: number;
      raycaster: THREE.Raycaster;
      mouse: THREE.Vector2;
      clock: THREE.Clock;
      time: number;
      deltaTime: number;
      isInTransition: boolean;
      renderer!: THREE.WebGLRenderer;
      controls!: OrbitControls;
      currentWorld!: World;
      forestWorld!: World;
      level: number;

      private manager: THREE.LoadingManager;
      private loadingBar: HTMLElement | null;
      private onLoadComplete: () => void;
      loadingText: HTMLElement | null;

      constructor(level: number, onLoadComplete: () => void) {
        this.level = level;
        this.winWidth = parentDiv?.clientWidth || 0;
        this.winHeight = parentDiv?.clientHeight || 0;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.clock = new THREE.Clock();
        this.time = 0;
        this.deltaTime = 0;
        this.isInTransition = false;

        this.onLoadComplete = onLoadComplete;
        this.manager = new THREE.LoadingManager();

        this.loadingBar = document.getElementById("loading-progress");
        this.loadingText = document.getElementById("loading-text");

        this.manager.onLoad = () => {
          console.log("All resources loaded.");
          this.hideLoadingScreen();
          this.initApp();
        };

        this.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
          const percentage = Math.round((itemsLoaded / itemsTotal) * 100);

          if (this.loadingBar) {
            this.loadingBar.style.width = `${percentage}%`;
          }
          if (this.loadingText) {
            this.loadingText.textContent = `Loading: ${percentage}% (${itemsLoaded} of ${itemsTotal} files loaded).`;
          }
        };

        this.loadAssets();
      }

      async loadAssets() {
        ASSETS.forestScene = await this.loadModel(FILES.forestFile);
        ASSETS.noiseMap = await this.loadTexture(FILES.noiseFile);
      }

      loadModel(file: string) {
        return new Promise<THREE.Group>((resolve, reject) => {
          const loaderModel = new GLTFLoader(this.manager);
          loaderModel.load(
            file,
            (gltf) => {
              resolve(gltf.scene);
            },
            undefined,
            (error) => {
              reject(error);
            }
          );
        });
      }

      loadTexture(file: string) {
        return new Promise<THREE.Texture>((resolve, reject) => {
          const textureLoader = new THREE.TextureLoader(this.manager);
          textureLoader.load(
            file,
            (texture) => {
              texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
              resolve(texture);
            },
            undefined,
            (error) => {
              reject(error);
            }
          );
        });
      }

      hideLoadingScreen() {
        const loadingWrapper = document.getElementById("loading-wrapper");
        if (loadingWrapper) {
          loadingWrapper.classList.add("hidden");
          setTimeout(() => {
            if (loadingWrapper) {
              loadingWrapper.remove();
            }
          }, 500);
        }
      }

      initApp() {
        this.createWorlds();
        this.createRenderer();
        this.createControls();
        this.onWindowResize(); // Initial resize
        this.createListeners();
        this.loop();
      }

      createWorlds() {
        this.forestWorld = new World(ASSETS.forestScene, "forest", this.level);
        this.currentWorld = this.forestWorld;
        this.currentWorld.reset();
      }

      createRenderer() {
        if (!canvasRef.current) return;

        this.renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true,
        });

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.winWidth, this.winHeight);
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.localClippingEnabled = true;
      }

      createControls() {
        this.controls = new OrbitControls(
          this.currentWorld.camera,
          this.renderer.domElement
        );
        this.controls.minDistance = 0;
        this.controls.maxDistance = 50;
        this.controls.maxPolarAngle = Math.PI / 2 + 0.1;
        this.controls.enabled = true;
      }

      createListeners() {
        window.addEventListener("resize", this.onWindowResize.bind(this));
        const observer = new ResizeObserver(this.onWindowResize.bind(this));
        observer.observe(parentDiv!); // Observe the parent div for resizing
      }

      loop() {
        this.deltaTime = this.clock.getDelta();
        this.time += this.deltaTime;

        this.render();

        if (this.controls && this.controls.enabled) this.controls.update();

        requestAnimationFrame(this.loop.bind(this));
      }

      render() {
        const currentRenderTarget = this.renderer.getRenderTarget();
        this.renderer.setRenderTarget(currentRenderTarget);

        this.renderer.render(this.currentWorld.scene, this.currentWorld.camera);
      }

      raycast() {
        this.raycaster.setFromCamera(this.mouse, this.currentWorld.camera);
      }

      onWindowResize() {
        // Update the canvas size
        if (parentDiv) {
          this.winWidth = parentDiv.clientWidth;
          this.winHeight = parentDiv.clientHeight;
        }

        // Resize renderer and update camera aspect ratio
        this.renderer.setSize(this.winWidth, this.winHeight);
        this.currentWorld.camera.aspect = this.winWidth / this.winHeight;
        this.currentWorld.camera.updateProjectionMatrix();
      }

      onTouchMove(event: TouchEvent) {
        if (event.touches.length === 1) {
          event.preventDefault();
          const x = (event.touches[0].pageX / this.winWidth) * 2 - 1;
          const y = -((event.touches[0].pageY / this.winHeight) * 2 - 1);
          this.updateMouse(x, y);
          this.raycast();
        }
      }

      updateMouse(x: number, y: number) {
        this.mouse.x = x;
        this.mouse.y = y;
      }
    }

    class World extends EventEmitter {
      scene: THREE.Scene;
      name: string;
      level: number;
      camera: THREE.PerspectiveCamera;
      transitionDuration: number;
      holder!: THREE.Object3D;
      portalPlane!: THREE.Object3D;
      cameraTarget!: THREE.Object3D;

      constructor(scene: THREE.Scene, name: string, level: number) {
        super();
        this.scene = scene;
        this.name = name;
        this.level = level;
        this.camera = new THREE.PerspectiveCamera(
          60,
          parentDiv?.clientWidth ?? 0 / (parentDiv?.clientHeight ?? 0),
          0.1,
          150
        );
        this.camera.position.set(0, 0, 30);
        this.scene.add(this.camera);

        this.transitionDuration = 1.5;
        this.processModel();
      }

      processModel() {
        this.holder = this.scene.getObjectByName("holder")!;
        this.portalPlane = this.scene.getObjectByName("portal")!;

        const treeGroups: Record<string, THREE.Object3D[]> = {};

        this.scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh && child.name.includes("tree")) {
            const treeId = child.name.split("_")[1];
            if (!treeGroups[treeId]) {
              treeGroups[treeId] = [];
            }
            treeGroups[treeId].push(child);
          }
        });

        const treeGroupsArray = Object.values(treeGroups);

        treeGroupsArray.sort(() => Math.random() - 0.5);

        let percentage = 10;
        if (this.level > percentage) {
          percentage = this.level;
        }

        if (this.level > 100) {
          percentage = 100;
        }
        const visibleCount = Math.floor(
          (percentage / 100) * treeGroupsArray.length
        );

        treeGroupsArray.forEach((group, index) => {
          group.forEach((mesh) => {
            mesh.visible = index < visibleCount;
          });
        });

        this.cameraTarget = new THREE.Object3D();
      }

      reset() {
        this.holder.position.set(0, 0, 0);
        this.holder.scale.set(1, 1, 1);
        this.holder.quaternion.identity();
      }
    }

    new App(level, () => {});
  }, [level]);

  return (
    <div ref={parentDivRef} style={{ width: "100%", height: "100%" }}>
      <div id="loading-wrapper">
        <div id="loading-bar">
          <div id="loading-progress"></div>
        </div>
        <div id="loading-text">Loading: 0%</div>
      </div>
      <canvas
        ref={canvasRef}
        className="webgl"
        style={{ width: "100%", height: "100%" }}
      ></canvas>
    </div>
  );
};

export default ForestLake;
