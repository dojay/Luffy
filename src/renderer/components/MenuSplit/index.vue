<template>
  <div
    ref="split"
    class="menu_split"
    draggable="true"
    @dragstart="onDragStart"
    @drag.prevent="onDrag"
    @dragend="onDragEnd"
  >
  </div>
</template>

<script>
  export default {
    name: 'menu-split',
    props: ['width'],
    data() {
      return {
        lastDraggedX: 0,
      };
    },
    mounted() {
      // 初始化时，获取根据距离视口左侧的距离，定位最小可移动距离
      this.defaultXPoint = this.$refs.split.getBoundingClientRect().left;
    },
    computed: {
      menuWidth: {
        get() {
          return this.$store.state.Main.menuWidth;
        },
        set(width) {
          this.$store.commit('UPDATE_MENU_WIDTH', width);
        },
      },
    },
    methods: {
      onDragStart(e) {
        // 防止中间容器触发drop，所以指定
        e.dataTransfer.effectAllowed = 'none';
        this.lastDraggedX = e.clientX;
      },
      onDrag(e) {
        const last = this.lastDraggedX;
        const current = e.clientX;
        // 距离上次拖动差值
        const diff = current - last;
        // 避免无效commit，当前拖动位置大于等于默认位置且拖动距离不为0
        if (last && current >= this.defaultXPoint && diff !== 0) {
          this.menuWidth += diff;
          this.lastDraggedX = current;
        }
      },
      onDragEnd() {
        if (this.lastDraggedX) {
          this.lastDraggedX = 0;
        }
      },
    },
  };
</script>

<style scoped>
  .menu_split {
    width: 5px;
  }

  .menu_split:hover {
    cursor: ew-resize;
  }
</style>
