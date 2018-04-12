<template>
  <div class="right-panel" ref="panel" v-show="visible">
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { TRIGGER_SET_PROPERTIES } from '@/constants/events';
  export default {
    name: 'right-panel',
    data() {
      return {
        visible: false,
        type: '',
        propertyData: {},
      };
    },
    computed: mapState({
      width: state => state.Main.leftWidth,
    }),

    mounted() {
      // 监听右侧菜单变化事件
      this.$event.$on(TRIGGER_SET_PROPERTIES, (payload) => {
        // 响应显示事件
        if (!this.visible) {
          this.visible = true;
          this.$refs.panel.classList.remove('move-out');
          this.$refs.panel.classList.add('move-in');
        } else {
          this.$refs.panel.classList.remove('move-in');
          this.$refs.panel.classList.add('move-out');
          // 增加300毫秒延迟，为消失动画做准备
          setTimeout(() => {
            this.visible = false;
          }, 300);
        }

        this.type = payload.type;
        this.propertyData = payload.data;
      });
    },
  };
</script>

<style scoped>
  .right-panel {
    display: flex;
    background: #1e1f1c;
    color: #ccc;
    width: 200px;
  }

  .move-in {
    animation: in 0.2s;
  }

  .move-out {
    animation: out 0.3s;
  }

  @keyframes in {
    0% { width: 0px; opacity: 0; }
    100% { width: 200px; opacity: 1; }
  }

  @keyframes out {
    0% { width: 200px; opacity: 1; }
    100% { width: 0px; opacity: 0; }
  }
  .menu {
    flex: 1;
  }
</style>
