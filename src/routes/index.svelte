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
  import { vec3hashing } from "$lib/math";
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
    <Ball id={ball.id} position={new CANNON.Vec3(...Object.values(vec3hashing.decode({encodedString: ball?.p})))} velocity={new CANNON.Vec3(...Object.values(vec3hashing.decode({encodedString: ball?.v})))} rotation={PE.writableVec3(...Object.values(vec3hashing.decode({encodedString: ball?.r})))} angle={ball?.angle} color={0xa0a0a0} />
  {/each}
  <Lights />
</World>