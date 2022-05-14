<script lang="ts">
  import * as CANNON from "cannon-es";
  import Wall from "$lib/Wall.svelte";
  import Ball from "$lib/Ball.svelte";
  import Me from "$lib/Me.svelte";
  import Lights from "$lib/Lights.svelte";
  import Ground from "$lib/Ground.svelte";
  import World from "$lib/World.svelte";
</script>

<World>
  <Ground />
  <Wall />1
  <Me  />
  {#each [...Array(10).keys()] as i}
    <Ball mass={1 + Math.random() * 99} radius={.1 + Math.random() / 5} position={new CANNON.Vec3(.5 + Math.random(), 2.5 + Math.random(), -0.5  + Math.random() )} color={0xa0a0a0} />
  {/each}
  <Lights />
</World>