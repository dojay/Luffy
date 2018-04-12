<template>
  <div class="container">
    <tool-bar />
    <div 
      class="main-panel"
      @dragenter.prevent="onDragEnter"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <div 
        class="row" 
        v-for="(item, index) in layout" 
        @click="onItemClick"
      >

      </div>
    </div>
  </div>
  
</template>

<script>
  import { mapState } from 'vuex';
  import { TRIGGER_SET_PROPERTIES } from '@/constants/events';

  import ToolBar from './ToolBar';

  export default {
    name: 'main-panel',
    data() {
      return {
        status: '',
        layout: [],
      };
    },
    computed: mapState({
      draggingElement: state => state.main.draggingElement,
    }),
    components: {
      ToolBar,
    },
    mounted() {
      /*
       * 这里需要全局监听拖拽的结束事件来移除对应的占位元素
       * 也许你会疑问，为什么dragover看起来什么都没做？
       * 因为只有dragover调用了preventDefault后，drop才会触发
       */
      document.body.ondragover = (e) => {
        e.preventDefault();
      };
      document.body.ondrop = (e) => {
        this.removePlaceholder();
        e.preventDefault();
      };
    },
    methods: {
      onDragEnter(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
      },

      onDragOver(e) {
        e.preventDefault();

        const dragging = this.draggingElement;
        // 当前存在拖动中的组件
        if (dragging) {
          // 获得距离最近的节点
          const targetElement = e.target;
          // 判断当前拖拽节点在主面板上
          if (targetElement.classList.contains('main-panel')) {
            // 判断如果当前容器是空时，直接创建一个空的占位
            if (this.layout.length === 0) {
              // 在主容器中，仅处理布局组件
              if (dragging.type === 'layout') {
                // 在最近的节点中，插入placeholder占位
                this.setPlaceholder(targetElement);
              }
            }
          }
        }
      },
  
      onDragLeave(e) {
        e.preventDefault();
        console.log('leave', e);
      },

      onDrop() {
        const dragging = this.draggingElement;
        if (this.layout.length === 0) {
          if (dragging && dragging.type === 'layout') {
            this.layout.push(dragging);
          } else {
            this.$Notice.warning({
              title: '提示',
              desc: '先尝试拖个布局组件进来吧',
            });
          }
        }
  
        this.removePlaceholder();
      },

      setPlaceholder(targetElement, pos = 'inner') {
        this.removePlaceholder();
        const ele = document.createElement('div');
        ele.setAttribute('id', 'placeholder');
        ele.classList.add('placehoder');

        if (pos === 'inner') {
          targetElement.appendChild(ele);
        }
      },

      removePlaceholder() {
        const holder = document.getElementById('placeholder');
        if (holder) {
          holder.parentElement.removeChild(holder);
        }
      },

      onItemClick(item) {
        this.$event.$emit(TRIGGER_SET_PROPERTIES, item);
      },
    },
  };
</script>

<style scoped>
  .container {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  .main-panel {
    display: flex;
    flex: 1;
    margin: 10px;
    padding: 30px 15px 15px;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    position: relative;
    word-wrap: break-word;
  }

  .main-panel::after {
    background-color: #F5F5F5;
    border: 1px solid #DDDDDD;
    border-radius: 4px 0 4px 0;
    color: #9DA0A4;
    content: "容器";
    font-size: 12px;
    font-weight: bold;
    left: -1px;
    padding: 3px 7px;
    position: absolute;
    top: -1px;
  }

  .row {
    background-color: #FFFFFF;
    border: 1px solid #DDDDDD;
    border-radius: 4px 4px 4px 4px;
    padding: 39px 19px 24px;
    position: relative;
    flex: 1;
    height: 152px;
  }
  .row::after {
    background-color: #F5F5F5;
    border: 1px solid #DDDDDD;
    border-radius: 4px 0 4px 0;
    color: #9DA0A4;
    content: '行布局';
    font-size: 12px;
    font-weight: bold;
    left: -1px;
    padding: 3px 7px;
    position: absolute;
    top: -1px;
  }

  .row:hover {
    background-color: #a0c6e8;
  }
</style>
<style>
  .placehoder {
    outline: 1px dashed #ddd;
    border-radius: 4px;
    flex: 1;
    height: 152px;
  }
</style>