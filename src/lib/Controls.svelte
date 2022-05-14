<script lang="ts">
  import * as SC from "svelte-cubed";
  import * as CANNON from "cannon-es";
  import { rdb } from "$lib/db";
  import { ref, update } from "@firebase/database";
  import { me } from "$lib/me";

  let currentKeys = {}
  let previousTime = 0
  export let velocity = CANNON.Vec3.ZERO;
  export let angle = 0
  export let position
  export let rotation
  let speed = 1
  let maxSpeed = 4
  $: canJump = velocity.y < .3 && velocity.y > -.3
  let jump = 0

  const move = () => {
    if(speed < maxSpeed) speed += .05
    const x = Math.sin(angle) * speed;
    const z = -Math.cos(angle) * speed;
    velocity = new CANNON.Vec3(x, velocity.y, z);
    const d = new Date();
    let time = d.getTime();
    if(time - previousTime > 15){
      previousTime = time
      update(ref($rdb), {
        [`/3d/balls/${$me?.id}`]: {
          'p': {
            x: position.x,
            y: position.y,
            z: position.z
          },
          'r': {
            x: $rotation.x,
            y: $rotation.y,
            z: $rotation.z
          },
          'v': {
            x: velocity.x,
            y: velocity.y,
            z: velocity.z
          },
          'a': angle
        }
      })
    }
  }

  const rotate = (direction, deg) => {
    angle += direction * deg
    if(Math.abs(angle) > 2 * Math.PI) angle = Math.asin(Math.sin(angle))
  }

  const prepareJump = force => {
    if(jump > 25) return
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
    if(currentKeys.ArrowUp) move()
    if(currentKeys.ArrowDown && canJump) prepareJump(.2)
    if(currentKeys.ArrowLeft) rotate(-1, .01)
    if(currentKeys.ArrowRight) rotate(1, .01)

    const d = new Date();
    let time = d.getTime();
    if(time - previousTime > 750){
      previousTime = time
      update(ref($rdb), {
        [`/3d/balls/${$me?.id}`]: {
          'p': {
            x: position.x,
            y: position.y,
            z: position.z
          },
          'r': {
            x: $rotation.x,
            y: $rotation.y,
            z: $rotation.z
          },
          'v': {
            x: velocity.x,
            y: velocity.y,
            z: velocity.z
          },
          'a': angle
        }
      })
    }
  });

  const doJump = yes => {
    if(yes){
      const ms = speed * jump < maxSpeed * 4 ? speed * jump : maxSpeed * 4
      const vx = Math.sin(angle) * ms;
      const vz = -Math.cos(angle) * ms;
      const vy = .3 +jump / ((Math.abs(velocity.x) + 1) * (Math.abs(velocity.z) + 1))
      velocity = new CANNON.Vec3(vx, vy, vz);
      jump = 0
      update(ref($rdb), {
        [`/3d/balls/${$me?.id}`]: {
          'p': {
            x: position.x,
            y: position.y,
            z: position.z
          },
          'r': {
            x: $rotation.x,
            y: $rotation.y,
            z: $rotation.z
          },
          'v': {
            x: velocity.x,
            y: velocity.y,
            z: velocity.z
          },
          'a': angle
        }
      })
    }
  }
  $: doJump(!currentKeys.ArrowDown && jump > 0 && canJump)
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup} />