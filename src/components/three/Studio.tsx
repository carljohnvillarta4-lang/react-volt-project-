import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { Color, type PointLight } from 'three'

/** Procedural studio reflections: no network / HDR downloads needed. */
export function StudioEnvironment() {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer form="rect" intensity={3.2} position={[0, 6, -4]} scale={[16, 3, 1]} />
      <Lightformer form="rect" intensity={2.4} position={[-7, 1, 3]} rotation-y={Math.PI / 2} scale={[9, 6, 1]} />
      <Lightformer form="rect" intensity={2.4} position={[7, 1, 3]} rotation-y={-Math.PI / 2} scale={[9, 6, 1]} />
      <Lightformer form="rect" intensity={1.4} position={[0, 0, 8]} scale={[10, 6, 1]} />
      <Lightformer form="ring" color="#ffb070" intensity={3} position={[0, 0, -7]} scale={7} />
    </Environment>
  )
}

interface LightsProps {
  accent: string
  accent2: string
}

/** Key + rim lights. Colored lights smoothly lerp to the active flavor's accent. */
export function StudioLights({ accent, accent2 }: LightsProps) {
  const a = useRef<PointLight>(null)
  const b = useRef<PointLight>(null)
  const ta = useRef(new Color(accent))
  const tb = useRef(new Color(accent2))

  useFrame(() => {
    ta.current.set(accent)
    tb.current.set(accent2)
    a.current?.color.lerp(ta.current, 0.06)
    b.current?.color.lerp(tb.current, 0.06)
  })

  return (
    <>
      <ambientLight intensity={0.35} />
      <hemisphereLight args={['#ffffff', '#1a0f08', 0.5]} />
      <directionalLight
        castShadow
        position={[4, 12, 7]}
        intensity={2.4}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
        shadow-camera-near={1}
        shadow-camera-far={40}
        shadow-bias={-0.0004}
        shadow-radius={5}
      />
      <pointLight ref={a} position={[-5, 2, 4]} intensity={90} distance={30} decay={2} color={accent} />
      <pointLight ref={b} position={[6, -1, 3]} intensity={70} distance={30} decay={2} color={accent2} />
    </>
  )
}

/** Invisible floor that only draws the cans' shadows. */
export function ShadowFloor({ y, opacity = 0.45 }: { y: number; opacity?: number }) {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, y, 0]} receiveShadow>
      <planeGeometry args={[80, 80]} />
      <shadowMaterial opacity={opacity} />
    </mesh>
  )
}
