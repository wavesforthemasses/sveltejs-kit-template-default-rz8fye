<script lang="ts">
  import * as CANNON from "cannon-es";
  import * as PE from "svelte-cannon";
  import * as THREE from "three";
  import * as SC from "svelte-cubed";

  const generateVertices = (coords, gx, gz) => {
    let vertices = []
    for (let i = 0; i < coords.length; i += 3) {
      const [xx, yy, zz] = coords.slice(i, i + 3)
      vertices.push(new CANNON.Vec3(xx, yy, zz))
    }
    let faces = []
    for (let x = 0; x <= gx; x++) {
      for (let z = 0; z <= gz; z++) {
        if(x < gx && z < gz){
          const a = (z + 1) * (gx + 1) + x
          const b = z * (gx + 1) + x
          const c = z * (gx + 1) + x + 1
          const d = (z + 1) * (gx + 1) + x + 1
          faces = [
            ...faces,
            [c, b, a],
            [a, d, c]
          ]
        }
      }
    }
    return {vertices, faces}
  }
  const geometry = new THREE.PlaneGeometry(100, 100, 20, 20)
  geometry.attributes.position.array = geometry.attributes.position.array.map((v, i) => i % 3 == 2 ? (Math.cos(i) + 1) / 2 : v)

  const toShape = g => {
    const {vertices, faces} = generateVertices(g.attributes.position.array, 20, 20)
    return new CANNON.ConvexPolyhedron( { vertices, faces } );
  }
  const shape = toShape(geometry) 
</script>

{#if shape}
  <!-- Ground -->
  <PE.Body rotation={[-Math.PI / 2, 0, 0]}>
    <PE.Shape {shape} />
    <PE.Material friction={100} restitution={.5} />
  </PE.Body>
  <SC.Mesh
    rotation={[-Math.PI / 2, 0, 0]}
    geometry={geometry}
    material={new THREE.MeshToonMaterial({ color: 0x90b5fb })}
    receiveShadow
  /> 
{/if}