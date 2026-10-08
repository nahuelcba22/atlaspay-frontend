import { useMemo, useRef } from 'react';
import type { RefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Html, Lightformer, Line, MeshDistortMaterial } from '@react-three/drei';
import type { Group, Mesh } from 'three';
import './HeroScene.css';

interface Orbit {
  radiusX: number;
  radiusZ: number;
  tilt: [number, number, number];
}

interface Coin {
  code: string;
  color: string;
  orbit: number;
  speed: number;
  offset: number;
}

// Órbitas: los "caminos" por los que se mueve el dinero entre monedas.
const ORBITS: Orbit[] = [
  { radiusX: 2.7, radiusZ: 2.1, tilt: [1.25, 0, 0.35] },
  { radiusX: 2.4, radiusZ: 2.4, tilt: [1.1, 0, -0.5] },
];

const COINS: Coin[] = [
  { code: 'USD', color: '#3b82f6', orbit: 0, speed: 0.16, offset: 0 },
  { code: 'PEN', color: '#e2e8f0', orbit: 0, speed: 0.16, offset: Math.PI },
  { code: 'EUR', color: '#22d3ee', orbit: 1, speed: -0.12, offset: Math.PI / 2 },
  { code: 'ARS', color: '#64748b', orbit: 1, speed: -0.12, offset: Math.PI * 1.5 },
];

// Escultura central: metal que se pliega lentamente, como tela.
function Sculpture() {
  return (
    <mesh>
      <sphereGeometry args={[1.45, 160, 160]} />
      <MeshDistortMaterial
        color="#9fb2cf"
        metalness={1}
        roughness={0.22}
        clearcoat={0.6}
        distort={0.25}
        speed={1.2}
      />
    </mesh>
  );
}

// Una moneda que recorre su órbita.
function CoinOnOrbit({
  coin,
  labelsRoot,
}: {
  coin: Coin;
  labelsRoot: RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef<Mesh>(null);
  const orbit = ORBITS[coin.orbit];

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const angle = coin.offset + clock.getElapsedTime() * coin.speed;
    ref.current.position.set(Math.cos(angle) * orbit.radiusX, 0, Math.sin(angle) * orbit.radiusZ);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.3, 64, 64]} />
      <meshPhysicalMaterial color={coin.color} metalness={0.9} roughness={0.18} clearcoat={1} />
      <Html
        center
        position={[0, -0.55, 0]}
        className="hero-scene__label"
        portal={labelsRoot as RefObject<HTMLElement>}
      >
        {coin.code}
      </Html>
    </mesh>
  );
}

function OrbitRing({
  orbit,
  index,
  labelsRoot,
}: {
  orbit: Orbit;
  index: number;
  labelsRoot: RefObject<HTMLDivElement | null>;
}) {
  const points = useMemo(
    () =>
      Array.from({ length: 201 }, (_, i) => {
        const angle = (i / 200) * Math.PI * 2;
        return [Math.cos(angle) * orbit.radiusX, 0, Math.sin(angle) * orbit.radiusZ] as [
          number,
          number,
          number,
        ];
      }),
    [orbit],
  );

  return (
    <group rotation={orbit.tilt}>
      <Line points={points} color="#3b82f6" transparent opacity={0.28} lineWidth={1} />
      {COINS.filter((coin) => coin.orbit === index).map((coin) => (
        <CoinOnOrbit key={coin.code} coin={coin} labelsRoot={labelsRoot} />
      ))}
    </group>
  );
}

// Gira suavemente toda la escena siguiendo el mouse.
function Scene({ labelsRoot }: { labelsRoot: RefObject<HTMLDivElement | null> }) {
  const group = useRef<Group>(null);

  useFrame(({ pointer }) => {
    if (!group.current) return;
    group.current.rotation.y += (pointer.x * 0.35 - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (-pointer.y * 0.2 - group.current.rotation.x) * 0.04;
  });

  return (
    <group ref={group}>
      <Sculpture />
      {ORBITS.map((orbit, index) => (
        <OrbitRing key={index} orbit={orbit} index={index} labelsRoot={labelsRoot} />
      ))}
    </group>
  );
}

function HeroScene() {
  // Las etiquetas de las monedas se dibujan dentro de este contenedor, no en toda la página.
  const labelsRoot = useRef<HTMLDivElement>(null);

  return (
    <div className="hero-scene-wrap" ref={labelsRoot}>
      <Canvas
        className="hero-scene"
        camera={{ position: [0, 0.2, 7.2], fov: 40 }}
        dpr={[1, 2]}
        eventSource={document.getElementById('root') ?? undefined}
        eventPrefix="client"
      >
        <ambientLight intensity={0.15} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />

        {/* Reflejos del metal: paneles de luz con los colores de la app. */}
        <Environment resolution={256}>
          <Lightformer
            form="rect"
            intensity={2.2}
            color="#f8fafc"
            position={[0, 5, -3]}
            scale={[6, 1.2, 1]}
          />
          <Lightformer
            form="rect"
            intensity={2}
            color="#3b82f6"
            position={[-6, 0, 0]}
            rotation-y={Math.PI / 2}
            scale={[3, 8, 1]}
          />
          <Lightformer
            form="rect"
            intensity={1.6}
            color="#22d3ee"
            position={[6, 1, -1]}
            rotation-y={-Math.PI / 2}
            scale={[2, 6, 1]}
          />
        </Environment>

        <Scene labelsRoot={labelsRoot} />
      </Canvas>
    </div>
  );
}

export default HeroScene;
