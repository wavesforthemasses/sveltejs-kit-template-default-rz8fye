<script lang="ts">
  import * as PE from "svelte-cannon";
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
</script>

<PE.World gravity={[0, -9.81, 0]} allowSleep>
  <SC.Canvas
    background={new THREE.Color(0x34756)}
    fog={new THREE.FogExp2(0x34756, 0.05)}
    shadows={THREE.PCFSoftShadowMap}
    outputEncoding={THREE.sRGBEncoding}
    antialias
  >
    <slot />
  </SC.Canvas>
</PE.World>