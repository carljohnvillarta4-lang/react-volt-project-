import { Suspense, useEffect, useRef, type MutableRefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { AdditiveBlending, MathUtils, type Group, type MeshStandardMaterial } from 'three'
import { gsap } from '../../utils/gsap'
import type { Flavor } from '../../data/flavors'
import CanModel from './CanModel'
import { ShadowFloor, StudioEnvironment, StudioLights } from './Studio'
import { getGlowTexture } from './labelTexture'

interface Props {
  flavor: Flavor
  /** 0 → 1 scroll progress through the hero (written by ScrollTrigger) */
  progress: MutableRefObject<number>
  ready: boolean
  /** pause rendering while the hero is off-screen */
  running?: boolean
}

function HeroCan({ flavor, progress, ready }: Props) {
  const outer = useRef<Group>(null)
  const inner = useRef<Group>(null)
  const mat = useRef<MeshStandardMaterial>(null)
  const intro = useRef({ v: 0, spin: Math.PI * 3 })
  const viewport = useThree((s) => s.viewport)
  const wide = viewport.aspect > 1.1
  // portrait: can lives in the upper third so the headline stays readable below it
  const baseScale = wide ? 1.55 : Math.min(1.05, viewport.height * 0.165)
  const baseX = wide ? 2.3 : 0
  const baseY = wide ? -0.1 : viewport.height * 0.2

  useEffect(() => {
    if (!ready) return
    gsap.to(intro.current, { v: 1, spin: 0, duration: 2.4, ease: 'expo.out' })
  }, [ready])

  useFrame(({ clock, pointer }, dt) => {
    const o = outer.current
    const i = inner.current
    if (!o || !i) return
    const t = clock.elapsedTime
    const p = progress.current
    const k = intro.current

    o.position.x = MathUtils.damp(o.position.x, baseX - p * 1.2, 4, dt)
    o.position.y = baseY + Math.sin(t * 0.85) * 0.16 + p * 2.4 - (1 - k.v) * 1.5
    o.scale.setScalar(baseScale * (0.55 + 0.45 * k.v) * (1 - p * 0.25))

    i.rotation.y += dt * 0.5
    i.rotation.x = MathUtils.damp(i.rotation.x, -pointer.y * 0.28 + p * 0.9, 4, dt)
    i.rotation.z = MathUtils.damp(i.rotation.z, 0.2 - pointer.x * 0.22 + p * 0.5, 4, dt)
    i.rotation.y += (k.spin - (i.userData.lastSpin ?? 0)) * 1
    i.userData.lastSpin = k.spin

    if (mat.current) mat.current.emissiveIntensity = 0.07 + Math.sin(t * 1.4) * 0.025
  })

  return (
    <group ref={outer}>
      {/* glow halo */}
      <mesh position={[0, 0, -1.2]} scale={5.6} raycast={() => null}>
        <planeGeometry />
        <meshBasicMaterial
          map={getGlowTexture()}
          color={flavor.accent}
          transparent
          opacity={0.55}
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

function Scene(props: Props) {
  const viewport = useThree((s) => s.viewport)
  const wide = viewport.aspect > 1.1
  const sc = wide ? 1.55 : Math.min(1.05, viewport.height * 0.165)
  const floorY = (wide ? -0.1 : viewport.height * 0.2) - sc - 0.85
  return (
    <>
      <StudioEnvironment />
      <StudioLights accent={props.flavor.accent} accent2={props.flavor.accent2} />
      <HeroCan {...props} />
      <ShadowFloor y={floorY} opacity={0.5} />
      <Sparkles
        count={wide ? 70 : 40}
        scale={[11, 7, 5]}
        size={3.2}
        speed={0.35}
        opacity={0.8}
        color={props.flavor.accent2}
      />
    </>
  )
}

export default function HeroScene(props: Props) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ fov: 35, position: [0, 0, 8], near: 0.1, far: 60 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      frameloop={props.running === false ? 'never' : 'always'}
      style={{ touchAction: 'pan-y' }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <Scene {...props} />
      </Suspense>
    </Canvas>
  )
}
