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
  import { ref, onChildAdded, onChildChanged, onChildRemoved, orderByKey, startAfter, endBefore } from "@firebase/database";
  import { onMount, onDestroy } from 'svelte'
  let connBefore
  let connAfter
  let balls

  onMount(() => {
    connBefore = ref($rdb, "3d/balls", orderByKey(), endBefore($me?.id))
    connAfter = ref($rdb, "3d/balls", orderByKey(), startAfter($me?.id))
    balls = {}
    onChildAdded(connBefore, (data) => {
      balls = {
          ...balls,
          [data.key]: data.val()
      }
    });

    onChildChanged(connBefore, (data) => {
      balls = {
          ...balls,
          [data.key]: data.val()
      }
    });

    onChildRemoved(connBefore, (data) => {
      delete balls[data.key]
      balls = balls
    });

    onChildAdded(connAfter, (data) => {
      balls = {
          ...balls,
          [data.key]: data.val()
      }
    });

    onChildChanged(connAfter, (data) => {
      balls = {
          ...balls,
          [data.key]: data.val()
      }
    });

    onChildRemoved(connAfter, (data) => {
      delete balls[data.key]
      balls = balls
    });
  })

  onDestroy(() => {
    if(connBefore?.off) connBefore.off()
    if(connAfter?.off) connAfter.off()
  })

  $: elencoBalls = Object.keys(balls || {}).filter(id => id != $me?.id).map(id => ({...balls[id], id}))
</script>

<World>
  <Ground />
  <Wall />
  <Me  />
  {#each elencoBalls as ball (ball.id)}
    <Ball id={ball.id} position={new CANNON.Vec3(...Object.values(vec3hashing.decode({encodedString: ball?.p})))} velocity={new CANNON.Vec3(...Object.values(vec3hashing.decode({encodedString: ball?.v, min: -25, max: 25})))} color={0xa0a0a0} />
  {/each}
  <Lights />
</World>