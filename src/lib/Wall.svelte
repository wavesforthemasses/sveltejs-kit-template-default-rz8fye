<script lang="ts">
  import * as CANNON from "cannon-es";
  import * as PE from "svelte-cannon";
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import { settings } from "$lib/me";

  export let position = [0, 0, 0];
  export let size = [1, 1, 1];
  export let color = 0xffffff
  export let currentColor = color
  let sto

  $: adjustedPosition = position.map((p, i) => p + size[i] / 2)
</script>

<!-- Wall -->
<PE.Body position={new CANNON.Vec3(...adjustedPosition)} on:collide={e => {
  if(e.detail.target.id == $settings.id){
    currentColor = $settings.color
  }
}} on:sleep={() => currentColor = color}>
  <PE.Box size={size.map(s => s/2)} />
  <PE.Material friction={100} restitution={.9} />
</PE.Body>
<SC.Mesh
  position={adjustedPosition}
  geometry={new THREE.BoxGeometry(...size)}
  material={new THREE.MeshToonMaterial({ color: currentColor })}
  receiveShadow
/> 