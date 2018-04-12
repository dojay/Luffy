<template>
  <div class="layout">
    <main-panel />
    <right-panel />
  </div>
</template>
<script>
  import MainPanel from './MainPanel';
  import RightPanel from './RightPanel';

  export default {
    name: 'home',
    components: {
      MainPanel, RightPanel,
    },
  };
</script>

<style scoped>
  .layout {
    display: flex;
    flex: 1;
  }

</style>