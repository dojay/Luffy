<template>
  <div class="app">
    <div class="header">
      Luffy beta
    </div>
    <div class="body">
      <tool-nav />
      <left-menu />
      <menu-split />
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuSplit from '@/components/MenuSplit';
  import ToolNav from '@/components/ToolNav';
  import LeftMenu from '@/components/LeftMenu';

  export default {
    name: 'app',
    components: {
      ToolNav,
      LeftMenu,
      MenuSplit,
    },
  };
</script>

<style scoped>
  .app {
    display: flex;
    user-select: none;
    flex-direction: column;
    height: 100%;
  }

  .header {
    -webkit-app-region: drag;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1e1f1c;
    color: #ccc;
    font-weight: bold;
    font-size: 14px;
  }

  .body {
    display: flex;
    flex: 1;
  }

  .container {
    display: flex;
    flex: 1;
  }
</style>
