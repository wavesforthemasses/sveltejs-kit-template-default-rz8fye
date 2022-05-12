<script lang="ts">
  import * as CANNON from "cannon-es";
  import * as PE from "svelte-cannon";
  import * as THREE from "three";
  import * as SC from "svelte-cubed";

  export let position = new CANNON.Vec3(0.55, 3, 0);
  export let velocity = CANNON.Vec3.ZERO;
  export let rotation = PE.writableVec3();
  export let color = 0x990000;
  export let radius = .2;
  export let friction = 10;
  export let restitution = .9;
  export let mass = 10;

  const alphaMap = new THREE.TextureLoader().load( 'dMYV4cf.png' ); 

  const geometry = new THREE.SphereBufferGeometry(radius)
</script>

<!-- Ball -->
<PE.Body {mass} bind:position={position} bind:rotation={$rotation} velocity={velocity} linearDamping={.5}>
  <PE.Sphere {radius} />
  <PE.Material {friction} {restitution} />
</PE.Body>
<SC.Mesh
  position={position.toArray()}
  rotation={$rotation.toArray()}
  geometry={geometry}
  material={new THREE.MeshLambertMaterial({ color, alphaMap, transparent: true })}
  castShadow
/>