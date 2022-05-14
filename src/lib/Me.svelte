<script lang="ts">
  import * as CANNON from "cannon-es";
  import Ball from "$lib/Ball.svelte";
  import Controls from "$lib/Controls.svelte";
  import Camera from "$lib/Camera.svelte";
  import { settings } from "$lib/me";

  let velocity = CANNON.Vec3.ZERO;
  let angle = 0;
  let position = new CANNON.Vec3(0.55, 3, 0)
  let rotation
</script>

<Ball mass={100} bind:position={position} bind:rotation={rotation} color={$settings?.color} bind:velocity={velocity} on:collide={e =>  $settings.id = e.detail.body.id}  />
<Camera target={position.toArray()} />

<Controls bind:velocity={velocity} bind:rotation={rotation} bind:position={position} bind:angle={angle} />