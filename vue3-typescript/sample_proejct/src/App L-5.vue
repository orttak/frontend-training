<template>
  <div class="text-center">
    <h1>MAIN PAGE</h1>
    <span v-once> {{ msg }}</span>
    <br>
    <h1>aa</h1>
    {{  getRandomNumber()  }}
    {{  msg = getRandomNumber().toString() }} 
  </div>
</template>

<script lang="ts" setup>
// ref bir proxy. proxy degismeye duyarli bir obje. degisiklik oldugunda otomatik olarak yeniden render edilir.
import { ref } from 'vue';

const msg = ref('')
const getRandomNumber = () : number => {
  return Math.floor(Math.random() * 100);
};
</script>



<style lang="scss">

@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css');

.buttonClass {
  position: absolute;
}
</style>