<script lang="ts">
  import * as CANNON from "cannon-es";
  import * as PE from "svelte-cannon";
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

  export let position = new CANNON.Vec3(0.55, 3, 0);
  export let velocity = CANNON.Vec3.ZERO;
  export let rotation = PE.writableVec3();
  export let color = 0x990000;
  export let radius = .2;
  export let friction = 100;
  export let restitution = 1;
  export let mass = 10;

  let visible = false

  const alphaMap = new THREE.TextureLoader().load( 'https://cdn.jsdelivr.net/gh/wavesforthemasses/sveltejs-kit-template-default-rz8fye@master/static/dMYV4cf.png', () => {
    visible = true
  } ) 
  alphaMap.needsUpdate = true;

  const geometry = new THREE.SphereBufferGeometry(radius)
</script>

{#if visible}
  <!-- Ball -->
  <PE.Body {mass} bind:position={position} bind:rotation={$rotation} bind:velocity={velocity} linearDamping={.5} on:collide={e => dispatch('collide', e.detail)}>
    <PE.Sphere {radius} />
    <PE.Material {friction} {restitution} />
  </PE.Body>
  <SC.Mesh
    position={position.toArray()}
    rotation={$rotation.toArray()}
    geometry={geometry}
    material={new THREE.MeshToonMaterial({ color, alphaMap, transparent: true })}
    castShadow
  />
{/if}