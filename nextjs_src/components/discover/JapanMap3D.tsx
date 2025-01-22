import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface JapanMap3DProps {
  onRegionSelect: (region: string) => void;
}

export function JapanMap3D({ onRegionSelect }: JapanMap3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    // Create a simple map representation (placeholder)
    const regions = [
      { name: "北海道・東北", position: new THREE.Vector3(2, 2, 0) },
      { name: "関東", position: new THREE.Vector3(1, 1, 0) },
      { name: "中部", position: new THREE.Vector3(0, 0, 0) },
      { name: "近畿", position: new THREE.Vector3(-1, -1, 0) },
      { name: "中国・四国", position: new THREE.Vector3(-2, -2, 0) },
      { name: "九州・沖縄", position: new THREE.Vector3(-3, -3, 0) },
    ];

    regions.forEach(region => {
      const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.1);
      const material = new THREE.MeshPhongMaterial({ 
        color: 0x6366f1,
        transparent: true,
        opacity: 0.8
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(region.position);
      mesh.userData.name = region.name;
      scene.add(mesh);
    });

    camera.position.z = 8;

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseMove(event: MouseEvent) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      scene.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.material.opacity = 0.8;
        }
      });

      if (intersects.length > 0) {
        const mesh = intersects[0].object as THREE.Mesh;
        mesh.material.opacity = 1;
      }
    }

    function onClick(event: MouseEvent) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        const mesh = intersects[0].object as THREE.Mesh;
        onRegionSelect(mesh.userData.name);
      }
    }

    containerRef.current.addEventListener('mousemove', onMouseMove);
    containerRef.current.addEventListener('click', onClick);

    // Animation
    function animate() {
      requestAnimationFrame(animate);
      scene.rotation.y += 0.001;
      renderer.render(scene, camera);
    }
    animate();

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', onMouseMove);
        containerRef.current.removeEventListener('click', onClick);
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [onRegionSelect]);

  return <div ref={containerRef} className="w-full h-[400px]" />;
}