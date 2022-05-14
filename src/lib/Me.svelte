<script lang="ts">
  import * as CANNON from "cannon-es";
  import Ball from "$lib/Ball.svelte";
  import Controls from "$lib/Controls.svelte";
  import Camera from "$lib/Camera.svelte";
  import { settings } from "$lib/me";

  let ballVelocity = CANNON.Vec3.ZERO;
  let ballAngle = 0;
  let ballPosition = new CANNON.Vec3(0.55, 3, 0)
</script>

<Ball mass={100} bind:position={ballPosition} color={$settings?.color} bind:velocity={ballVelocity} on:collide={e =>  $settings.id = e.detail.body.id}  />
<Camera target={ballPosition.toArray()} />

<Controls bind:velocity={ballVelocity} bind:position={ballPosition} bind:angle={ballAngle} />