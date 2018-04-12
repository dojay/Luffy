<template>
  <div class="components-tree">
    <div v-for="(item, index) in treeData">
      <div
        :ref="item.name"
        :class="{
          'tree-item': true,
          title: true,
          selected: `${index}` === selected,
        }"
        @click="onClickTitle(item, index)"
      >
        <Icon :type="item.opened ? 'arrow-down-b' : 'arrow-right-b'"></Icon>
        <Icon :type="item.icon" :color="item.iconColor" size="17"></Icon>
        {{item.text}}
      </div>
      <div class="sub-item" v-show="item.opened" v-for="(child, idx) in item.subitem">
        <div 
          :class="{
            'tree-item': true,
            item: true,
            rotate: child.needRotate,
            selected: `${index}_${idx}` === selected,
          }"
          :style="child.childStyle"
          @click="onClickItem(child, idx, index)"
          draggable="true"
          @mousedown="onMouseDown(child)"
          @dragstart="onItemDragStart(idx, index, $event)"
        >
          <Icon :type="child.icon" color="#ccc" :size="child.iconSize || 17"></Icon>
          {{child.text}}
        </div>
      </div>
    </div>
    <div 
      ref="dragPreview"
      class="preview"
      :data-content='preview'
      :style="{
        position: 'absolute',
        left: '-1000px',
        top: '-1000px',
        width: '300px',
        height: '150px',
      }"
    >
    </div>
  </div>
</template>
<script>
  export default {
    name: 'components-tree',
    data() {
      return {
        selected: '',
        preview: '',
        treeData: [
          {
            name: 'layout',
            text: '布局组件',
            icon: 'ios-browsers',
            iconColor: '#59a2ed',
            opened: true,
            subitem: [
              {
                text: '行布局',
                icon: 'minus-round',
              },
              {
                text: '列布局',
                icon: 'minus',
                needRotate: true,
              },
            ],
          },
          {
            name: 'basic',
            text: '基础组件',
            icon: 'cube',
            iconColor: '#e64a19',
            opened: true,
            subitem: [
              {
                text: '标签',
                icon: 'pricetag',
                iconSize: 15,
              },
              {
                text: '表格',
                icon: 'ios-grid-view',
              },
              {
                text: '按钮',
                icon: 'social-youtube-outline',
                iconSize: 13,
              },
              {
                text: '卡片',
                icon: 'ios-browsers-outline',
              },
              {
                text: '徽标数',
                icon: 'email-unread',
                iconSize: 14,
              },
              {
                text: '树形控件',
                icon: 'network',
              },
              {
                text: '导航',
                icon: 'chevron-right',
                childStyle: {
                  marginLeft: '3.5px',
                },
              },
              {
                text: '面包屑',
                icon: 'link',
              },
              {
                text: '加载进度条',
                icon: 'minus',
              },
              {
                text: 'Loading',
                icon: 'load-d',
              },
            ],
          },
          {
            name: 'form',
            text: '表单',
            icon: 'ios-list',
            iconColor: '#8bc34a',
            opened: true,
            subitem: [
              {
                text: '输入框',
                icon: 'ios-compose-outline',
              },
              {
                text: '单选框',
                icon: 'ios-circle-filled',
              },
              {
                text: '多选框',
                icon: 'android-checkbox-outline',
              },
              {
                text: '开关',
                icon: 'toggle',
              },
              {
                text: '选择器',
                icon: 'code',
              },
              {
                text: '自动完成',
                icon: 'ios-list-outline',
              },
              {
                text: '日期选择器',
                icon: 'ios-calendar-outline',
              },
              {
                text: '时间选择器',
                icon: 'ios-clock-outline',
              },
              {
                text: '级联选择',
                icon: 'more',
              },
              {
                text: '穿梭框',
                icon: 'pause',
                childStyle: {
                  marginLeft: '3px',
                },
                iconSize: 18,
              },
              {
                text: '数字输入框',
                icon: 'calculator',
                childStyle: {
                  marginLeft: '3px',
                },
              },
              {
                text: '上传',
                icon: 'ios-cloud-upload',
                iconSize: 15,
              },
              {
                text: '颜色选择器',
                icon: 'android-color-palette',
              },
            ],
          },
          {
            name: 'custom',
            text: '自定义组件',
            icon: 'happy',
            iconColor: '#ffca28',
            opened: false,
            subitem: [],
          },
        ],
      };
    },

    methods: {
      onClickTitle(item, index) {
        const data = this.treeData[index];
        data.opened = !data.opened;

        this.selected = `${index}`;
      },
      onClickItem(item, index, parentIdx) {
        const data = this.treeData[parentIdx];
        const current = data.subitem[index];
        current.selected = true;

        this.selected = `${parentIdx}_${index}`;
      },
      onMouseDown(item) {
        this.preview = item.text;
      },
      onItemDragStart(index, parentIdx, event) {
        this.$store.commit('MOVING_COMPONENT', `${parentIdx}_${index}`);
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('Text', `${parentIdx}_${index}`);
        event.dataTransfer.setDragImage(this.$refs.dragPreview, 0, 0);
      },
    },
  };
</script>

<style scoped>
.components-tree {
  color: #ccc;
  font-size: 14px;
  font-weight: 500;
}

.tree-item {
  cursor: pointer;
  padding-top: 3px;
  padding-bottom: 3px;
}

.tree-item:hover {
  background: #3e3d32;
}

.selected {
  background: #75715e;
  color: #fff;
  font-weight: bold;
}

.selected:hover {
  background: #75715e;
}

.title {
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.title i {
  margin-right: 10px;
}

.item {
  padding-left: 50px;
}

.item i {
  margin-right: 10px;
}

.rotate i {
  transform: rotate(90deg);
  line-height: 0;
}

.preview {
  background-color: #FFFFFF;
  border: 1px solid #DDDDDD;
  border-radius: 4px 4px 4px 4px;
  margin: 15px 0;
  padding: 39px 19px 24px;
  position: relative;
}

.preview::after {
  background-color: #F5F5F5;
  border: 1px solid #DDDDDD;
  border-radius: 4px 0 4px 0;
  color: #9DA0A4;
  content: attr(data-content);
  font-size: 12px;
  font-weight: bold;
  left: -1px;
  padding: 3px 7px;
  position: absolute;
  top: -1px;
}

</style>