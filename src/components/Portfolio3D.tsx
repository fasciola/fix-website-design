import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  tagline: string;
  url: string;
  image: string;
  category: string;
}

const projects: Project[] = [
  {
    title: "AURUM BLISS",
    category: "Luxury Beauty",
    tagline: "Cosmetic Sourcing & Mastery",
    url: "https://four-pillars-cosmetics.netlify.app/",
    image: "/project-four-pillars.jpg"
  },
  {
    title: "LUMIÈRE NOIRE",
    category: "Retail / Lifestyle",
    tagline: "Scented Rituals & Elegance",
    url: "https://boisterous-sable-18bb0c.netlify.app/",
    image: "/project-olivara.jpg"
  },
  {
    title: "NOIR ATLAS",
    category: "Brand Concept",
    tagline: "Cinematic Digital Depth",
    url: "https://moonlit-maamoul-cfcdd5.netlify.app/",
    image: "/project-noir-atlas.jpg"
  },
  {
    title: "AURUM AUTOMOTIVE",
    category: "Automotive",
    tagline: "Premier Showroom Experience",
    url: "https://car-care-hub.netlify.app/",
    image: "/project-carcare.jpg"
  },
  {
    title: "THE VERTICAL",
    category: "Industrial / Luxury",
    tagline: "Premium Elevator Systems",
    url: "https://wonderful-nasturtium-105135.netlify.app/",
    image: "/project-elevators.jpg"
  },
  {
    title: "ELITE ESTATES",
    category: "Real Estate",
    tagline: "High-End Dubai Penthouses",
    url: "https://deft-sundae-510258.netlify.app/",
    image: "/project-elite-estates.jpg"
  },
  {
    title: "AURUM GEMS",
    category: "Retail / Luxury",
    tagline: "Timeless Fine Jewelry",
    url: "https://papaya-vacherin-fee6b2.netlify.app/",
    image: "/project-eclat.jpg"
  },
  {
    title: "AURUM ENERGY",
    category: "Tech / Infrastructure",
    tagline: "Intelligent Power Analytics",
    url: "https://admirable-custard-0ec2e2.netlify.app/",
    image: "/project-energylink.jpg"
  }
];

const Portfolio3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 700;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0b0b);
    scene.fog = new THREE.FogExp2(0x0b0b0b, 0.01);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2, 12);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1.2;

    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0.1;
    bloomPass.strength = 1.2;
    bloomPass.radius = 0.8;

    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0xffffff, 2.5, 50);
    keyLight.position.set(2, 3, 6);
    scene.add(keyLight);

    const coreLight = new THREE.PointLight(0x3dbbff, 2.2, 20);
    coreLight.position.set(0, 0.5, 0);
    scene.add(coreLight);

    const textureLoader = new THREE.TextureLoader();

    const createSparkleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();

      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.4, 'rgba(80,190,255,0.95)');
      gradient.addColorStop(1, 'rgba(0,120,255,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const radius = 5.5;
    const carouselGroup = new THREE.Group();
    const materialList: THREE.Material[] = [];
    const geometryList: THREE.BufferGeometry[] = [];
    const textureList: THREE.Texture[] = [];

    projects.forEach((project, i) => {
      const geometry = new THREE.PlaneGeometry(2.4, 3.4);
      geometryList.push(geometry);

      const texture = textureLoader.load(project.image);
      texture.colorSpace = THREE.SRGBColorSpace;
      textureList.push(texture);

      const material = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide,
      roughness: 0.35,
      metalness: 0.08,
      emissive: new THREE.Color(0x2a2218),
      emissiveIntensity: 0.06,
      transparent: true,
      opacity: 0.98
      });
      materialList.push(material);

      const card = new THREE.Mesh(geometry, material);
      const angle = (i / projects.length) * Math.PI * 2;
      card.position.x = Math.sin(angle) * radius;
      card.position.z = Math.cos(angle) * radius;
      card.rotation.y = angle + Math.PI;

      const frameGeo = new THREE.EdgesGeometry(geometry);
      geometryList.push(frameGeo);

      const frameMat = new THREE.LineBasicMaterial({
        color: 0xd4af37,
        transparent: true,
        opacity: 0.5
      });
      materialList.push(frameMat);

      const frame = new THREE.LineSegments(frameGeo, frameMat);
      card.add(frame);

      carouselGroup.add(card);
    });

    scene.add(carouselGroup);

    const coreGroup = new THREE.Group();

    const mainRingGeo = new THREE.TorusGeometry(1.35, 0.045, 64, 128);
    geometryList.push(mainRingGeo);

    const mainRingMat = new THREE.MeshStandardMaterial({
    color: 0x3dbbff,
    emissive: new THREE.Color(0x0066ff),
    emissiveIntensity: 3.5,
    transparent: true,
    opacity: 0.9
  });
    materialList.push(mainRingMat);

    const mainRing = new THREE.Mesh(mainRingGeo, mainRingMat);
    mainRing.rotation.x = Math.PI / 2;
    coreGroup.add(mainRing);

    const innerRingGeo = new THREE.TorusGeometry(1.1, 0.02, 48, 96);
    geometryList.push(innerRingGeo);

    const innerRingMat = new THREE.MeshStandardMaterial({
  color: 0x7fdcff,
  emissive: new THREE.Color(0x1e90ff),
  emissiveIntensity: 3.0,
  transparent: true,
  opacity: 0.8
});
    materialList.push(innerRingMat);

    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = Math.PI / 2;
    coreGroup.add(innerRing);

    const particleCount = 150;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const a = (i / particleCount) * Math.PI * 2;
      const r = 1.6 + Math.sin(i * 0.7) * 0.1;
      pPos[i * 3] = Math.cos(a) * r;
      pPos[i * 3 + 1] = Math.sin(a * 4) * 0.1;
      pPos[i * 3 + 2] = Math.sin(a) * r;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    geometryList.push(pGeo);

    const sparkleTexture = createSparkleTexture();
    textureList.push(sparkleTexture);

    const pMat = new THREE.PointsMaterial({
      size: 0.15,
      map: sparkleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    materialList.push(pMat);

    const sparkleRing = new THREE.Points(pGeo, pMat);
    coreGroup.add(sparkleRing);

    const energyCoreGeo = new THREE.SphereGeometry(0.3, 32, 16);
    geometryList.push(energyCoreGeo);

    const energyCoreMat = new THREE.MeshStandardMaterial({
  color: 0x6fe8ff,
  emissive: new THREE.Color(0x0088ff),
  emissiveIntensity: 4.5
});
    materialList.push(energyCoreMat);

    const energyCore = new THREE.Mesh(energyCoreGeo, energyCoreMat);
    coreGroup.add(energyCore);

    const orbGroup = new THREE.Group();

    for (let i = 0; i < 8; i++) {
      const orbGeo = new THREE.SphereGeometry(0.04, 8, 8);
      geometryList.push(orbGeo);

      const orbMat = new THREE.MeshStandardMaterial({
  color: 0x7fdcff,
  emissive: new THREE.Color(0x0077ff),
  emissiveIntensity: 3.2
});
      materialList.push(orbMat);

      const orb = new THREE.Mesh(orbGeo, orbMat);
      const a = (i / 8) * Math.PI * 2;
      orb.position.set(Math.cos(a) * 2, 0, Math.sin(a) * 2);
      orbGroup.add(orb);
    }

    coreGroup.add(orbGroup);
    scene.add(coreGroup);

    const dustCount = 300;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 25;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    geometryList.push(dustGeo);

    const dustMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.02,
      transparent: true,
      opacity: 0.3
    });
    materialList.push(dustMat);

    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    const floorGeo = new THREE.CircleGeometry(10, 64);
    geometryList.push(floorGeo);

    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.5,
      metalness: 0.5,
      transparent: true,
      opacity: 0.1
    });
    materialList.push(floorMat);

    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    scene.add(floor);

    let frameId = 0;
    let targetRotation = 0;
    let currentRotation = 0;

    const animate = () => {
      const elapsedTime = performance.now() * 0.001;

      currentRotation += (targetRotation - currentRotation) * 0.05;
      carouselGroup.rotation.y = currentRotation;

      const velocity = targetRotation - currentRotation;
      carouselGroup.rotation.x = velocity * 0.2;
      carouselGroup.rotation.z = Math.sin(elapsedTime * 0.2) * 0.03;

      coreGroup.rotation.y = elapsedTime * 0.2;
      coreGroup.rotation.z = elapsedTime * 0.1;

      const pulse = 1 + Math.sin(elapsedTime * 4) * 0.05;
      coreGroup.scale.set(pulse, pulse, pulse);

      orbGroup.rotation.y += 0.02;
      sparkleRing.rotation.y -= 0.01;
      pMat.opacity = 0.6 + Math.sin(elapsedTime * 3) * 0.4;
      dust.rotation.y += 0.0005;

      composer.render();
      frameId = requestAnimationFrame(animate);
    };

    animate();

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      targetRotation = progress * Math.PI * 2 * 1.5;
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
      composer.setSize(w, height);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);

      geometryList.forEach((g) => g.dispose());
      materialList.forEach((m) => m.dispose());
      textureList.forEach((t) => t.dispose());

      composer.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section id="gallery" className="py-24 md:py-48 bg-luxury-black relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12 mb-12 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 text-center"
        >
          <span className="text-luxury-gold font-mono text-[10px] uppercase tracking-[0.5em] block">The Immersion</span>
          <h2 className="text-6xl md:text-9xl font-serif text-white uppercase italic tracking-tighter">
            Selected <span className="not-italic text-luxury-gold">Works.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-luxury-beige/40 text-sm font-light leading-relaxed uppercase tracking-[0.2em]">
            Dubai's Finest Digital Artifacts · Scroll to Navigate
          </p>
        </motion.div>
      </div>

      <div className="relative w-full h-[700px] z-10">
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-luxury-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-luxury-black to-transparent z-10 pointer-events-none" />

        <div className="mx-auto max-w-[1400px] h-full relative rounded-[32px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-luxury-gold/10">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-luxury-gold/40 z-20">
          Drag · Scroll · Experience
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 mt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((p, i) => (
            <motion.a
              key={i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="group relative h-[450px] bg-luxury-dark overflow-hidden border border-luxury-gold/10 rounded-sm"
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover brightness-90 contrast-110 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 flex flex-col justify-end p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-luxury-gold text-[9px] uppercase tracking-[0.5em] font-bold block mb-4">{p.category}</span>
                <h4 className="text-3xl font-serif text-white mb-2">{p.title}</h4>
                <p className="text-[10px] text-luxury-beige/40 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-700">{p.tagline}</p>
                <div className="mt-6 flex items-center gap-3 text-white text-[9px] uppercase tracking-[0.3em] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore</span>
                  <ExternalLink size={12} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio3D;
