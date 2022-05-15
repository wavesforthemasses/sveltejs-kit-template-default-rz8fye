<script lang="ts">
  import * as CANNON from "cannon-es";
  import Ball from "$lib/Ball.svelte";
  import Controls from "$lib/Controls.svelte";
  import Camera from "$lib/Camera.svelte";
  import { settings, me } from "$lib/me";
  import { vec3hashing } from "$lib/math";
  import { onDestroy } from 'svelte'
  import { rdb } from "$lib/db";
  import { ref, set, update } from "@firebase/database";

  let velocity = CANNON.Vec3.ZERO;
  let angle = 0;
  let position = new CANNON.Vec3(0.55, 3, 0)
  let rotation

  const deleteMe = () => {
    if($me?.id) set(ref($rdb, `3d/balls/${$me?.id}`), null)
  }

  onDestroy(() => {
    deleteMe()
  })
</script>

<Ball bind:position={position} bind:rotation={rotation} color={$settings?.color} bind:velocity={velocity} on:collide={e =>  {
  $settings.id = e.detail.body.id
  update(ref($rdb), {
    [`/3d/balls/${$me?.id}`]: {
      'p': vec3hashing.encode({
        x: position?.x,
        y: position?.y,
        z: position?.z,
        p: 10
      }),
      'v': vec3hashing.encode({
        x: velocity?.x,
        y: velocity?.y,
        z: velocity?.z, 
        min: -25, max: 25, p: 9
      })
    }
  })
}}  />
<Camera target={position.toArray()} />

<svelte:window on:beforeunload={deleteMe}/>

<Controls bind:velocity={velocity} bind:rotation={rotation} bind:position={position} bind:angle={angle} />