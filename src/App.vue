<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>
        <SideBar/>
      </el-footer>
      <notifications position="top right"/>
    </el-container>
  </div>
</template>

<script>
import SideBar from './components/SideBar'
import {fetchRandomUser} from './api/user'
import {getLocalStorage, setLocalStorage} from '@/utils/localStorage'

export default {
  name: 'App',
  components: {
    SideBar
  },
  async created() {
    const currentUser = getLocalStorage('currentUser');
    if (!currentUser) {
      const randomUser = await fetchRandomUser()
      const currentUser = randomUser.data.data
      setLocalStorage('currentUser', currentUser);
      window.dispatchEvent(new CustomEvent('currentUserChanged', {}));
    }
  }
}
</script>

<style>
body {
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

.el-footer {
  background: #fff;
  padding: 0 !important;
}

.el-main {
  height: calc(100vh - 60px);
  padding: 0 !important;
}

.common-layout {
  background: #fff;
}
</style>
