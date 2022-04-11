<template>
 <div class="common-layout">
 <el-container>
     <el-main>
         <router-view/>
     </el-main>
    <el-footer > <SideBar/></el-footer>
   <notifications position="top right"/>
 </el-container>
 </div>
</template>

<script>
import SideBar from './components/SideBar'
import {fetchListUser} from './api/user'
import { setLocalStorage, remove } from '@/utils/localStorage'

export default {
  name: 'App',
  components: {
    SideBar
  },
  async created() {
      const users = await fetchListUser({limit: 20})
      const randomUser = this.getRandomInt(users.data.data.length)
      const currentUser = users.data.data[randomUser]
      const userAvailable = users.data.data.filter(e => e.id !== currentUser.id)
      setLocalStorage('currentUser', currentUser);
      setLocalStorage('userAvailable', userAvailable);
      remove('likedUser')
  },
  methods: {
    getRandomInt: (max) => {
        return Math.floor(Math.random() * max);
    }
  }
}
</script>

<style>
body{
    background: #282b37;
	width: 700px;
	margin: 0 auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-footer{
   background: #fff; 
   padding: 0 !important;
}
.el-main{
    height: calc(100vh - 60px);
    padding: 0 !important;
}
.common-layout {
    background: #fff;
}
</style>
