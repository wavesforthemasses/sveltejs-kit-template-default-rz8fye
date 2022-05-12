<script lang="ts">
  import * as PE from "svelte-cannon";
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
</script>

<!-- Ground -->
<PE.Body rotation={[-Math.PI / 2, 0, 0]}>
  <PE.Plane />
  <PE.Material friction={10} restitution={.9} />
</PE.Body>
<SC.Mesh
  rotation={[-Math.PI / 2, 0, 0]}
  geometry={new THREE.PlaneBufferGeometry(100, 100, 1, 1)}
  material={new THREE.MeshToonMaterial({ color: 0x90b5fb })}
  receiveShadow
/>