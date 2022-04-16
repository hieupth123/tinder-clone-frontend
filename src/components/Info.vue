<template>
  <div :class="'content' + className" v-if="userShow">
    <div class="pic">
      <img :src="userShow.picture"/>
    </div>
    <div class="info">
      {{ formatInfo }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  props: {
    userShow: {
      type: Object
    },
    className: {
      type: String
    }
  },
  computed: {
    formatInfo() {
      return `${this.userShow.lastName} ${this.userShow.firstName}, ${this.userShow.age} `
    }
  }
}
</script>

<style scoped>
.content {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  transition: left 0.3s linear;
  z-index: 8;
  opacity: 1;
}

.hide {
  left: -110%;
}

.hide.show {
  left: 110%;
  opacity: 0;
  z-index: -1;
  transform: unset;
}

.pic {
  position: relative;
}

.pic img {
  width: 100%;
  height: 100vh;
}

.info {
  position: absolute;
  padding: 20px;
  background: #fff;
  min-height: 80px;
  bottom: 0px;
  left: 0px;
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  z-index: 8;
}
</style>
