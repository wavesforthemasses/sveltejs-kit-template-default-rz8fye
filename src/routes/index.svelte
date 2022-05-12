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
  let ballPosition = new CANNON.Vec3(0.55, 3, 0)
</script>

<World>
  <Ground />

  <Ball mass={100} bind:position={ballPosition} color={0x990000} bind:velocity={ballVelocity} />
  {#each [1, 2, 3, 4, 5, 6, 7, 8 ,9 ] as i}
    <Ball mass={1 + Math.random() * 99} radius={.1 + Math.random() / 5} position={new CANNON.Vec3(.5 + Math.random(), 2.5 + Math.random(), -0.5  + Math.random() )} color={0xa0a0a0} />
  {/each}

  <Camera target={ballPosition.toArray()} />
  <Lights />
</World>

<Controls bind:velocity={ballVelocity} bind:position={ballPosition} bind:angle={ballAngle} />