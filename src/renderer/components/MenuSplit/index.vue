<template>
  <div
    ref="split"
    class="menu_split"
    draggable="true"
    @dragstart="onDragStart"
    @drag.prevent="onDrag"
    @dragend="onDragEnd"
  >
    <div ref="dragged" class="split-dragged"></div>
  </div>
</template>

<script>
  import { SET_MENU_WIDTH } from '@/store/mutations';

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
          return this.$store.state.menu.width;
        },
        set(width) {
          this.$store.commit(SET_MENU_WIDTH, width);
        },
      },
    },
    methods: {
      onDragStart(e) {
        // 防止中间容器触发drop，所以指定
        e.dataTransfer.effectAllowed = 'none';
        this.lastDraggedX = e.clientX;
        // 因为顶部菜单存在阴影 所以这里拖拽时设置个空白div，就不会存在拖拽时出现的小阴影框了
        e.dataTransfer.setDragImage(this.$refs.dragged, 0, 0);
      },
      onDrag(e) {
        // TODO 这里拖拽时，如果菜单隐藏了，应该不计算新的width
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
    background: #272822;
  }

  .menu_split:hover {
    cursor: ew-resize;
  }

  .split-dragged {
    position: absolute;
    left: -1000px;
    right: -1000px;
    width: 10px;
    height: 10px;
  }
</style>
