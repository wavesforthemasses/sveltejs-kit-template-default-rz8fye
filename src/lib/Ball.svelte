<script lang="ts">
  import * as CANNON from "cannon-es";
  import * as PE from "svelte-cannon";
  import * as THREE from "three";
  import * as SC from "svelte-cubed";

  export let position = new CANNON.Vec3(0.55, 3, 0);
  export let velocity = CANNON.Vec3.ZERO;
  export let angle = 0;
  export let spin = 0;
  export let color = 0x990000;
  export let radius = .2;
  export let friction = 0;
  export let restitution = .9;
  export let mass = 10;

  let canvas
  let alphaMap

  const setUpTexture = c => {
    if(!c) return
    const ctx = c.getContext('2d');

    // Create gradient
    const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, 50);
    grd.addColorStop(0, "#999");
    grd.addColorStop(1, "white");

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 50, 50);
    alphaMap = new THREE.CanvasTexture(canvas)
  }
  $: setUpTexture(canvas)

</script>

<!-- Ball -->
<PE.Body {mass} bind:position={position} velocity={velocity} linearDamping={.5}>
  <PE.Sphere {radius} />
  <PE.Material {friction} {restitution} />
</PE.Body>
<SC.Mesh
  position={position.toArray()}
  rotation={[0, angle, spin]}
  geometry={new THREE.SphereBufferGeometry(radius, 32, 16)}
  material={new THREE.MeshLambertMaterial({ color, alphaMap, transparent: true })}
  castShadow
/>

<canvas width="50" height="50" id="alphaMap" bind:this={canvas}></canvas>