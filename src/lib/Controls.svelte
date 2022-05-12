<script lang="ts">
  import * as SC from "svelte-cubed";
  import * as CANNON from "cannon-es";

  let currentKeys = {}
  export let velocity = CANNON.Vec3.ZERO;
  export let angle = 0
  export let position
  let speed = 1
  let maxSpeed = 4
  $: canJump = velocity.y < .1 && velocity.y > -.1
  let jump = 0

  const move = direction => {
    if(!canJump) return
    if(speed < maxSpeed) speed += .01
    const x = direction * Math.sin(angle) * speed;
    const z = direction * -Math.cos(angle) * speed;
    velocity = new CANNON.Vec3(x, 0, z);
  }

  const rotate = (direction, deg) => {
    angle += direction * deg
  }

  const prepareJump = force => {
    if(jump > 6) return
    jump += force
  }

  const handleKeydown = e => {
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)){
      currentKeys[e.key] = true
      currentKeys = currentKeys
    }
  }
  const handleKeyup = e => {
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)){
      delete currentKeys[e.key]
      currentKeys = currentKeys
      if(e.key == 'ArrowUp') speed = 1
    }
  }
  
  SC.onFrame(() => {
    if(currentKeys.ArrowUp) move(1)
    if(currentKeys.ArrowDown && canJump) prepareJump(.1)
    if(currentKeys.ArrowLeft) rotate(-1, .075)
    if(currentKeys.ArrowRight) rotate(1, .075)
  });

  const doJump = yes => {
    if(yes){
      velocity = new CANNON.Vec3(velocity.x, jump, velocity.z);
      console.log(velocity)
      jump = 0
    }
  }
  $: doJump(!currentKeys.ArrowDown && jump > 0 && canJump)
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup} />