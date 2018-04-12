<template>
  <div class="left-panel" :style="{width: `${width}px`}" v-show="visible">
    <div class="menu">
      <files-tree v-if="type === 'tree'"/>
      <components-tree v-else-if="type === 'tools'"/>
    </div>
  </div>
</template>

<script>
  import FilesTree from './FilesTree';
  import ComponentsTree from './ComponentsTree';
  
  export default {
    name: 'left-panel',
    props: ['type', 'visible'],
    components: {
      'files-tree': FilesTree,
      'components-tree': ComponentsTree,
    },
    computed: {
      width: {
        get() {
          return this.$store.state.Main.menuWidth;
        },
      },
    },
  };
</script>

<style scoped>
  .left-panel {
    display: flex;
    background: #1e1f1c;
    color: #ccc;
  }

  .menu {
    flex: 1;
  }
</style>
