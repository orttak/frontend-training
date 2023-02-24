<template>
  <div class="text-center">
    <h1>MAIN PAGE</h1>

    <a target="_blank" :href="href"> {{ websiteName }}</a>
    <br>
    <button @click="changeUrl('Clicked',$event)" class="btn btn-primary">Change website</button>
    <br>
    <br>
    <button
    @mousemove="getPosition($event)"
    class="btn btn-primary button buttonClass"
    > Postion</button>
    <br>
    {{  pos.x }} - {{ pos.y }}
  </div>
</template>

<script lang="ts" setup>
// ref bir proxy. proxy degismeye duyarli bir obje. degisiklik oldugunda otomatik olarak yeniden render edilir.
import { ref } from 'vue';

const href = ref('https://google.com');
const websiteName = ref('Google');
//void mean no return None 
const changeUrl = (str:string,event: MouseEvent):void => {
  href.value = 'https://github.com';
  websiteName.value = 'Github';
  console.log(str);
  console.log(event);
  return;
}
const pos = ref({x:0,y:0})
const getPosition = (event: MouseEvent):void => {
  
  pos.value = {
    x: event.clientX,
    y: event.clientY
  }
  if (event.currentTarget instanceof HTMLButtonElement) {
    event.currentTarget.style.left = `${pos.value.x - 30}px`;
    event.currentTarget.style.top = `${pos.value.y - 30}px`;
  }
}

</script>



<style lang="scss">

@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css');

.buttonClass {
  position: absolute;
}
</style>