<script lang="ts">
  import * as CANNON from "cannon-es";
  import * as PE from "svelte-cannon";
  import Wall from "$lib/Wall.svelte";
  import Ball from "$lib/Ball.svelte";
  import Me from "$lib/Me.svelte";
  import Lights from "$lib/Lights.svelte";
  import Ground from "$lib/Ground.svelte";
  import World from "$lib/World.svelte";
  import { rdb } from "$lib/db";
  import { me } from "$lib/me";
  import { ref, onChildAdded, onChildChanged, onChildRemoved } from "@firebase/database";
  import { onMount, onDestroy } from 'svelte'
  let conn
  let balls

  onMount(() => {
    conn = ref($rdb, "3d/balls")
    balls = {}
    onChildAdded(conn, (data) => {
      if(data.key == $me?.id) return
      balls = {
          ...balls,
          [data.key]: data.val()
      }
    });

    onChildChanged(conn, (data) => {
      if(data.key == $me?.id) return
      balls = {
          ...balls,
          [data.key]: data.val()
      }
    });

    onChildRemoved(conn, (data) => {
      if(data.key == $me?.id) return
      delete balls[data.key]
      balls = balls
    });
  })

  onDestroy(() => {
    if(conn?.off) conn.off()
  })

  $: elencoBalls = Object.keys(balls || {}).filter(id => id != $me?.id).map(id => ({...balls[id], id}))
</script>

<World>
  <Ground />
  <Wall />
  <Me  />
  {#each elencoBalls as ball (ball.id)}
    <Ball id={ball.id} position={new CANNON.Vec3(ball?.p?.x, ball?.p?.y, ball?.p?.z)} velocity={new CANNON.Vec3(ball?.v?.x, ball?.v?.y, ball?.v?.z)} rotation={PE.writableVec3(ball?.r?.x, ball?.r?.y, ball?.r?.z)} angle={ball?.angle} color={0xa0a0a0} />
  {/each}
  <Lights />
</World>