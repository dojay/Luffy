<template>
  <div class="menu" :style="{width: `${width}px`}" v-show="visible">
    <files-tree v-if="type === 'files'"/>
    <components-tree v-else-if="type === 'components'"/>
  </div>
</template>

<script>
  import FilesTree from './FilesTree';
  import ComponentsTree from './ComponentsTree';
  
  // Menu和iview重名 所以暂且叫leftMenu，将来干掉iview再换回来
  export default {
    name: 'left-menu',
    components: {
      'files-tree': FilesTree,
      'components-tree': ComponentsTree,
    },
    computed: {
      width: {
        get() {
          return this.$store.state.menu.width;
        },
      },

      visible: {
        get() {
          return this.$store.state.menu.visible;
        },
      },

      type: {
        get() {
          return this.$store.state.menu.type;
        },
      },
    },

    mounted() {
      console.log(this.visible);
      console.log(this.width);
    },
  };
</script>

<style scoped>
  .menu {
    display: flex;
    background: #1e1f1c;
    color: #ccc;
  }

</style>
