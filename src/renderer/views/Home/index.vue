<template>
  <div class="home">
    <img class="image" src="../../assets/home.png"  />
  </div>
</template>

<script>
  export default {
    name: 'home',
  };
</script>

<style scoped>
  .home {
    background: #272822;
    flex: 1;
    display: flex;
    justify-content: center;
    padding-top: 100px;
  }

  .image {
    height: 300px;
    opacity: 0.5;
  }

</style>