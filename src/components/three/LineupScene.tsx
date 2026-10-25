import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sparkles, useCursor } from '@react-three/drei'
import { AdditiveBlending, MathUtils, type Group, type MeshBasicMaterial, type MeshStandardMaterial } from 'three'
import { gsap } from '../../utils/gsap'
import { flavors, type Flavor } from '../../data/flavors'
import CanModel from './CanModel'
import { ShadowFloor, StudioEnvironment, StudioLights } from './Studio'
import { getGlowTexture } from './labelTexture'

type V3 = [number, number, number]

const FOV = 38
const TAN = Math.tan(MathUtils.degToRad(FOV / 2))

interface Layout {
  positions: V3[]
  dist: number
  floorY: number
  narrow: boolean
}

/** Staggered grid: 4×2 on landscape screens, 2×4 on portrait/mobile. */
function computeLayout(aspect: number): Layout {
  const narrow = aspect < 0.9
  const cols = narrow ? 2 : 4
  const rows = narrow ? 4 : 2
  const sx = narrow ? 2.5 : 2.45
  const sy = narrow ? 3.0 : 3.0
  const positions = flavors.map((_, i) => {
    const r = Math.floor(i / cols)
    const c = i % cols
    const stagger = (r % 2 ? 1 : -1) * sx * (narrow ? 0.1 : 0.14)
    const x = (c - (cols - 1) / 2) * sx + stagger
    const y = ((rows - 1) / 2 - r) * sy
    const z = Math.sin(i * 1.7) * 0.6
    return [x, y, z] as V3
  })
  const needH = rows * sy + 1.7
  const needW = cols * sx + 1.0
  const dist = Math.max(needH / (2 * TAN), needW / (2 * TAN * aspect))
  const floorY = -((rows - 1) * sy) / 2 - 1.55
  return { positions, dist, floorY, narrow }
}

interface CanProps {
  flavor: Flavor
  index: number
  position: V3
  active: boolean
  focused: boolean
  onSelect: (i: number) => void
}

function LineupCan({ flavor, index, position, active, focused, onSelect }: CanProps) {
  const outer = useRef<Group>(null)
  const inner = useRef<Group>(null)
  const mat = useRef<MeshStandardMaterial>(null)
  const halo = useRef<MeshBasicMaterial>(null)
  const [hovered, setHovered] = useState(false)
  const st = useRef({ hv: 0, sc: 1, rot: index * 0.9, spin: 0 })
  const isFocus = focused && active
  useCursor(hovered)

  const spin = () => {
    gsap.to(st.current, { spin: st.current.spin + Math.PI * 2, duration: 1.8, ease: 'power3.out' })
  }

  // spin whenever this can becomes the focused one (click OR slider)
  useEffect(() => {
    if (isFocus) spin()
  }, [isFocus])

  useFrame(({ clock }, dt) => {
    const o = outer.current
    const i = inner.current
    if (!o || !i) return
    const s = st.current
    const t = clock.elapsedTime
    s.hv = MathUtils.damp(s.hv, hovered ? 1 : 0, 7, dt)
    s.sc = MathUtils.damp(s.sc, 1 + s.hv * 0.18 + (isFocus ? 0.1 : 0), 6, dt)
    s.rot += dt * (0.28 + s.hv * 1.7)

    o.position.y = position[1] + Math.sin(t * 0.9 + index * 1.3) * 0.14 + s.hv * 0.45
    o.scale.setScalar(s.sc)
    i.rotation.y = s.rot + s.spin
    i.rotation.z = Math.sin(t * 0.6 + index) * 0.06

    if (mat.current) mat.current.emissiveIntensity = 0.05 + s.hv * 0.5 + (isFocus ? 0.15 : 0)
    if (halo.current) halo.current.opacity = 0.2 + s.hv * 0.55 + (isFocus ? 0.25 : 0)
  })

  return (
    <group
      ref={outer}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation()
        if (isFocus) spin()
        onSelect(index)
      }}
    >
      <mesh position={[0, 0, -1]} scale={4.4} raycast={() => null}>
        <planeGeometry />
        <meshBasicMaterial
          ref={halo}
          map={getGlowTexture()}
          color={flavor.accent}
          transparent
          opacity={0.2}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
      <group ref={inner}>
        <CanModel flavor={flavor} matRef={mat} />
      </group>
    </group>
  )
}

interface SceneProps {
  index: number
  focused: boolean
  onSelect: (i: number) => void
}

function Scene({ index, focused, onSelect }: SceneProps) {
  const size = useThree((s) => s.size)
  const aspect = Math.round((size.width / size.height) * 100) / 100
  const layout = useMemo(() => computeLayout(aspect), [aspect])
  const rig = useRef({ px: 0, py: 0, pz: layout.dist, lx: 0, ly: 0, lz: 0 })
  const par = useRef({ x: 0, y: 0 })

  // Camera dolly: overview ↔ zoom on the selected can (GSAP)
  useEffect(() => {
    const [cx, cy, cz] = layout.positions[index]
    // desktop: can sits left, info panel right. mobile: can sits top, panel bottom.
    const offX = layout.narrow ? 0 : 1.55
    const offY = layout.narrow ? -1.2 : 0
    const target = focused
      ? {
          px: cx + offX,
          py: cy + offY + 0.15,
          pz: cz + (layout.narrow ? 7.2 : 5.4),
          lx: cx + offX,
          ly: cy + offY,
          lz: cz,
        }
      : { px: 0, py: 0, pz: layout.dist, lx: 0, ly: 0, lz: 0 }
    gsap.to(rig.current, { ...target, duration: 1.5, ease: 'power3.inOut', overwrite: true })
  }, [focused, index, layout])

  useFrame(({ camera, pointer }, dt) => {
    const r = rig.current
    par.current.x = MathUtils.damp(par.current.x, pointer.x * 0.55, 3, dt)
    par.current.y = MathUtils.damp(par.current.y, pointer.y * 0.35, 3, dt)
    camera.position.set(r.px + par.current.x, r.py + par.current.y, r.pz)
    camera.lookAt(r.lx, r.ly, r.lz)
  })

  const flavor = flavors[index]
  return (
    <>
      <StudioEnvironment />
      <StudioLights accent={flavor.accent} accent2={flavor.accent2} />
      {flavors.map((f, i) => (
        <LineupCan
          key={f.id}
          flavor={f}
          index={i}
          position={layout.positions[i]}
          active={i === index}
          focused={focused}
          onSelect={onSelect}
        />
      ))}
      <ShadowFloor y={layout.floorY} />
      <Sparkles count={90} scale={[16, 12, 8]} size={3} speed={0.3} opacity={0.7} color={flavor.accent2} />
    </>
  )
}

interface Props extends SceneProps {
  /** pause rendering when off-screen */
  running: boolean
}

export default function LineupScene({ running, ...scene }: Props) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ fov: FOV, position: [0, 0, 14], near: 0.1, far: 120 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      frameloop={running ? 'always' : 'never'}
      style={{ touchAction: 'pan-y' }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <Scene {...scene} />
      </Suspense>
    </Canvas>
  )
}
