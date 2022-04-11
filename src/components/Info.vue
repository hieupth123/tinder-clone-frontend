<template>
    <div class="content" v-if="userShow">
        <div class="pic">
            <img :src="userShow.picture"/>
        </div>
        <div class="info">
            {{formatInfo}}
        </div>
    </div>
</template>

<script>
export default {
  name: 'SideBar',
  props: {
    userShow: {
        type: Object
    }
  },
  computed: {
      formatInfo() {
          return `${this.userShow.title} ${this.userShow.lastName} ${this.userShow.firstName}`
      }
  }
}
</script>

<style scoped>
.content {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.pic{
    position: relative;
}

.pic img {
    width: 100%;
    height: 100vh;
}

.info{
    position: absolute;
    padding: 20px;
    background: #fff;
    min-height: 80px;
    bottom: 0px;
    left: 0px;
    width: 100%;
    text-align: left;
    box-sizing: border-box;
}
</style>
