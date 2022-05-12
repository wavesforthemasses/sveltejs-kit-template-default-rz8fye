<script lang="ts">
  import * as SC from "svelte-cubed";
  import * as CANNON from "cannon-es";

  let currentKeys = {}
  export let velocity = CANNON.Vec3.ZERO;
  export let angle = 0;
  export let spin = 0

  const move = (direction, distance) => {
    const x = direction * Math.sin(angle) * distance;
    const z = direction * -Math.cos(angle) * distance;
    velocity = new CANNON.Vec3(x, 0, z);
    spin -= direction * .075
  }

  const rotate = (direction, deg) => {
    angle += direction * deg
  }

  const handleKeydown = e => {
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)){
      currentKeys[e.key] = true
    }
  }
  const handleKeyup = e => {
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)){
      delete currentKeys[e.key]
    }
  }
  
  SC.onFrame(() => {
    if(currentKeys.ArrowUp) move(1, 2)
    if(currentKeys.ArrowDown) move(-1, 2)
    if(currentKeys.ArrowLeft) rotate(-1, .075)
    if(currentKeys.ArrowRight) rotate(1, .075)
  });
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup} />