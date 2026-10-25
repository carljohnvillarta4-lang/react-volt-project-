import { useMemo, type Ref } from 'react'
import { DoubleSide, LatheGeometry, Vector2, type MeshStandardMaterial } from 'three'
import type { Flavor } from '../../data/flavors'
import { getLabelTexture } from './labelTexture'

/** Aluminium can silhouette (radius, y) revolved around Y. Total height = 2, radius = 0.5. */
const PROFILE: [number, number][] = [
  [0.0, -0.96],
  [0.3, -0.96],
  [0.36, -0.99],
  [0.4, -1.0],
  [0.43, -0.95],
  [0.46, -0.88],
  [0.5, -0.8],
  [0.5, 0.8],
  [0.47, 0.86],
  [0.43, 0.91],
  [0.41, 0.95],
  [0.42, 0.98],
  [0.435, 1.0],
  [0.4, 0.99],
  [0.36, 0.96],
  [0.0, 0.96],
]

let bodyGeo: LatheGeometry | null = null
const getBodyGeo = () => {
  if (!bodyGeo) bodyGeo = new LatheGeometry(PROFILE.map(([x, y]) => new Vector2(x, y)), 96)
  return bodyGeo
}

interface Props {
  flavor: Flavor
  /** ref to the printed label material so callers can animate the emissive glow */
  matRef?: Ref<MeshStandardMaterial>
}

/** A fully shadow-enabled, physically shaded energy-drink can. */
export default function CanModel({ flavor, matRef }: Props) {
  const tex = useMemo(() => getLabelTexture(flavor), [flavor])
  return (
    <group>
      {/* aluminium shell: top, bottom, rim */}
      <mesh geometry={getBodyGeo()} castShadow receiveShadow>
        <meshStandardMaterial color="#dfe3ea" metalness={1} roughness={0.2} envMapIntensity={1.3} side={DoubleSide} />
      </mesh>

      {/* printed label */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.503, 0.503, 1.6, 96, 1, true]} />
        <meshStandardMaterial
          ref={matRef}
          map={tex}
          emissive="#ffffff"
          emissiveMap={tex}
          emissiveIntensity={0.06}
          metalness={0.55}
          roughness={0.3}
          envMapIntensity={1.1}
        />
      </mesh>

      {/* pull tab */}
      <mesh position={[0.05, 1.005, 0]} rotation={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.3, 0.018, 0.17]} />
        <meshStandardMaterial color="#c9ced6" metalness={1} roughness={0.25} />
      </mesh>
      <mesh position={[-0.12, 1.004, 0]} castShadow>
        <cylinderGeometry args={[0.022, 0.022, 0.016, 16]} />
        <meshStandardMaterial color="#9aa0a8" metalness={1} roughness={0.3} />
      </mesh>
    </group>
  )
}
