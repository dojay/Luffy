<template>
  <div id="app">
    <tool-nav />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import ToolNav from '@/components/ToolNav';

  export default {
    name: 'gui',
    components: { ToolNav },
  };
</script>

<style scoped>
  #app {
    user-select: none;
    display: flex;
    height: 100%;
  }
  .container {
    flex: 1;
  }
</style>
