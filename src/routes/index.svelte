<script lang="ts">
  import * as CANNON from "cannon-es";
  import * as PE from "svelte-cannon";
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import Ball from "$lib/Ball.svelte";
  import Controls from "$lib/Controls.svelte";
  import Camera from "$lib/Camera.svelte";
  import Lights from "$lib/Lights.svelte";
  import Ground from "$lib/Ground.svelte";
  import World from "$lib/World.svelte";

  let ballVelocity = CANNON.Vec3.ZERO;
  let ballAngle = 0;
  let ballSpin = 0;
  let ballPosition = new CANNON.Vec3(0.55, 3, 0)
</script>

<World>
  <Ground />

  <Ball mass={10} bind:position={ballPosition} color={0x990000} velocity={ballVelocity} angle={ballAngle} spin={ballSpin} />
  {#each [1, 2, 3] as i}
    <Ball mass={10} position={new CANNON.Vec3(.5 + Math.random(), 2.5 + Math.random(), -0.5  + Math.random() )} color={0xa0a0a0} />
  {/each}

  <Camera target={ballPosition.toArray()} />
  <Lights />
</World>

<Controls bind:velocity={ballVelocity} bind:angle={ballAngle} bind:spin={ballSpin} />