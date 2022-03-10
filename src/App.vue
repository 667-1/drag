<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="links">
      <router-link to="home">home</router-link> | 
      <router-link to="magic">magic(魔方)</router-link> | 
      <router-link to="drag">drag(拖拽模板)</router-link>
    </div>
    <router-view />
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
