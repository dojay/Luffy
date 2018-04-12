<template>
  <div class="tool-nav">
    <div 
      class="item"
      v-for="(item,index) in tools"
      @click="onClick(item, index)"
      :alt="item.alt"
      :key="index"
    >
      <Icon 
        :type="item.icon" 
        :color="item.color"
        :size="item.size"
      />
    </div>
  </div>
</template>

<script>
  import { TOOL_ICON_DEFAULT_COLOR, TOOL_ICON_SELECTED_COLOR } from '@/constants';
  import { SET_MENU_TYPE } from '@/store/mutations';

  export default {
    name: 'left-panel',

    data() {
      return {
        lastSelected: 0,
        tools: [
          {
            icon: 'document',
            color: TOOL_ICON_SELECTED_COLOR,
            alt: '文件树',
            size: 35,
            clickFunc: this.handleTreeClick,
          },
          {
            icon: 'settings',
            color: TOOL_ICON_DEFAULT_COLOR,
            alt: '工具',
            size: 32,
            clickFunc: this.handleToolsClick,
          },
          {
            icon: 'archive',
            color: TOOL_ICON_DEFAULT_COLOR,
            alt: '导出',
            size: 32,
            clickFunc: this.handleExportClick,
          },
          {
            icon: 'share',
            color: TOOL_ICON_DEFAULT_COLOR,
            alt: '分享',
            size: 35,
            clickFunc: this.handleShareClick,
          },

          {
            icon: 'refresh',
            color: TOOL_ICON_DEFAULT_COLOR,
            alt: '刷新',
            size: 35,
            clickFunc: this.hanldeRefreshClick,
          },
        ],
      };
    },
    methods: {
      onClick(item, idx) {
        this.tools[this.lastSelected].color = TOOL_ICON_DEFAULT_COLOR;
        this.tools[idx].color = TOOL_ICON_SELECTED_COLOR;
        this.lastSelected = idx;

        if (item.clickFunc) {
          item.clickFunc();
        }
      },

      handleTreeClick() {
        this.$store.commit(SET_MENU_TYPE, 'files');
        // TODO 没有在首页，就跳到首页。暂时写在这，组件和业务耦合有点严重
        if (this.$route.name !== 'home') {
          this.$router.push({ path: '/home' });
        }
      },

      handleToolsClick() {
        this.$store.commit(SET_MENU_TYPE, 'components');
  
        if (this.$route.name !== 'home') {
          this.$router.push({ path: '/home' });
        }
      },

      handleExportClick() {
        this.$router.push({ path: '/export' });
      },

      handleShareClick() {
        this.$router.push({ path: '/share' });
      },

      hanldeRefreshClick() {
        window.location.reload();
      },
    },
  };
</script>

<style scoped>
  .tool-nav {
    display: flex;
    width: 60px;
    background: #272822;
    flex-direction: column;
    align-items: center;
    line-height: 60px;
  }

  .item {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .item:first-child {
    margin-top: 10px;
  }

  .item:not(:first-child) {
    margin-top: 20px;
  }
</style>
