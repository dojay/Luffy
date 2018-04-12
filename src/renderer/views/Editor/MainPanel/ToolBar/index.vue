<template>
  <div class="tool-bar">
    <div class="button">
      <Icon type="reply" size="20" color="#4c4c4c" />
      撤销
    </div>
    <div class="button">
      <Icon type="forward" size="20" color="#4c4c4c" />
      恢复
    </div>
    <div class="button">
      <Icon type="eye" size="20" color="#4c4c4c" />
      预览
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tool-bar',
  };
</script>

<style scoped>
  .tool-bar {
    height: 40px;
    background: #ebeaec;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    color: #4c4c4c;
    padding: 5px;
    padding-left: 8px;
    padding-right: 8px;
    cursor: pointer;
    border-radius: 5px;
  }

  .button:hover {
    background: #e1e1e1;
  }

  .button i {
    margin-right: 5px;
  }

</style>
