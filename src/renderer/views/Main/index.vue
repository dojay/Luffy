/*
 * @Author: xin.wang 
 * @Date: 2018-04-11 23:00:40 
 * @Last Modified by:   xin.wang 
 * @Last Modified time: 2018-04-11 23:00:40 
 */
<template>
  <div 
    class="layout"
  >
    <left-panel :type="leftType" :visible="leftVisible"/>
    <menu-split />
    <main-panel />
    <right-panel />
  </div>
</template>
<script>
  import {
    TOOL_TOOLS_CLICK,
    TOOL_TREE_CLICK,
  } from '@/constants/events';
  import MenuSplit from '@/components/MenuSplit';
  
  import LeftPanel from './LeftPanel';
  import MainPanel from './MainPanel';
  import RightPanel from './RightPanel';

  export default {
    name: 'home',
    components: {
      LeftPanel, MenuSplit, MainPanel, RightPanel,
    },
    data() {
      return {
        leftType: 'tree',
        leftVisible: true,
        background: 'white',
      };
    },
    mounted() {
      // TODO 因为涉及到页面跳转，所以需要将状态放置vuex中，不然状态会记录错误
      // 监听工具栏中文件树点击事件
      this.$event.$on(TOOL_TREE_CLICK, () => {
        if (this.leftType === 'tree') {
          this.leftVisible = !this.leftVisible;
        } else {
          this.leftVisible = true;
        }
        this.leftType = 'tree';
      });
  
      // 监听工具栏中工具点击事件
      this.$event.$on(TOOL_TOOLS_CLICK, () => {
        if (this.leftType === 'tools') {
          this.leftVisible = !this.leftVisible;
        } else {
          this.leftVisible = true;
        }
        this.leftType = 'tools';
      });
    },
  };
</script>

<style scoped>
  .layout {
    display: flex;
    height: 100%;
  }

  .content {
    flex: 1;
  }

  .slide-fade-enter-active {
    transition: 0.3s ease;
    transform: translateX(0px)
  }
  
  .slide-fade-leave-active {
    transition: 0.3s ease;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(200px);
    opacity: 0;
  }
</style>