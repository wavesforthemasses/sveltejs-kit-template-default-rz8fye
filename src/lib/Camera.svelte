<script lang="ts">
  import * as CANNON from "cannon-es";
  import * as SC from "svelte-cubed";

  export let target = [0, 0, 0]
</script>

<SC.PerspectiveCamera
  position={[target[0] + 2, 2, target[2] + 10]}
  fov={20}
  near={0.5}
  far={25}
  target={[target[0], 0, target[2]]}
/>