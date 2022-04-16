<template>
  <el-container>
    <Info v-if="listUserAvl.length > 0" :user-show="userShow" :class-name="currentClass"/>
    <h4 v-else-if="listUserAvl.length === 0"> No things to show </h4>
    <div v-if="listUserAvl.length > 0" class="action">
      <el-row>
        <el-col :span="2" :offset="10">
          <a href="#" @click="nextUser(passed)"><span class="icon-pass icon"/></a>
        </el-col>
        <el-col :span="2" :offset="0">
          <a href="#" @click="nextUser(liked)"><span class="icon-like icon"/></a>
        </el-col>
      </el-row>
    </div>
  </el-container>
</template>

<script>
import {fetchListUserAvailable, fetchDetailUser} from '../api/user'
import {fetchLikedUser, likedUser as likedAction, passUser as passAction} from '../api/userAction'
import Info from '@/components/Info'
import {getLocalStorage} from '@/utils/localStorage'
import CONSTANTS from '@/constants'

export default {
  components: {
    Info,
  },
  name: 'DiscoverPage',
  data() {
    return {
      userShow: {},
      nextUserShow: {},
      listUserAvl: [],
      liked: CONSTANTS.LIKED,
      passed: CONSTANTS.PASSED,
      currentClass: ' currentClass first ',
      currentUser: {},
    }
  },

  async created() {
    await this.getUserShow()
    this.currentClass = ' currentClass first '
  },
  mounted() {
    window.addEventListener('currentUserChanged', async () => {
      this.currentUser = getLocalStorage("currentUser")
      const usersRS = await fetchListUserAvailable(this.currentUser.uuid)
      this.listUserAvl = usersRS.data.data
      this.userShow = this.listUserAvl.length > 0 ? this.listUserAvl[0] : null
    });
  },
  methods: {
    getUserShow: async function () {

      this.currentUser = getLocalStorage("currentUser")
      if (this.currentUser) {
        const usersRS = await fetchListUserAvailable(this.currentUser.uuid)
        this.listUserAvl = usersRS.data.data
        this.userShow = this.listUserAvl.length > 0 ? this.listUserAvl[0] : null
      }
    },

    nextUser: async function (type) {
      if (type === CONSTANTS.LIKED) {
        // Like action
        await likedAction(this.currentUser.uuid, this.userShow.uuid)
        const usersRS = await fetchListUserAvailable(this.currentUser.uuid)
        this.listUserAvl = usersRS.data.data
        const detailUser = await fetchDetailUser(this.currentUser.uuid)
        const indexMatches = detailUser.data.data.matches.findIndex(i => this.userShow.uuid === i)
        this.currentClass = ' hide '
        setTimeout(() => {
          this.currentClass = ' hide show '
          this.userShow = this.listUserAvl.length > 0 ? this.listUserAvl[0] : null

          if (indexMatches > -1) {
            this.$notify({
              type: 'success',
              title: 'New watch',
              text: 'Send a message now!'
            });
          }
        }, 350)
        setTimeout(() => {
          this.currentClass = ' '
        }, 600);
      } else if (type === CONSTANTS.PASSED) {
        //Pass action
        await passAction(this.currentUser.uuid, this.userShow.uuid)
        const usersRS = await fetchListUserAvailable(this.currentUser.uuid)
        this.listUserAvl = usersRS.data.data

        let indexLiked = -1
        const userLikedRs = await fetchLikedUser(this.userShow.uuid)
        if (userLikedRs && userLikedRs.data.data.length > 0) {
          const listUserLiked = userLikedRs && userLikedRs.data.data.length > 0 ? userLikedRs.data.data : []
          indexLiked = listUserLiked.findIndex(e => e.uuid === this.currentUser.uuid)
        }

        setTimeout(() => {
          this.currentClass = ' hide show '
          this.userShow = this.listUserAvl.length > 0 ? this.listUserAvl[0] : null
          if (indexLiked > 0) {
            this.$notify({
              type: 'warn',
              title: 'Not feeling it?',
              text: 'Keep discovering!'
            });
          }
        }, 350)
        setTimeout(() => {
          this.currentClass = ' '
        }, 600);
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-container {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.el-container::before {
  content: '';
  position: absolute;
  z-index: 1;
  background: #282b37;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.action {
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
  height: 30px;
  z-index: 9;
}

.action a {
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  font-size: 13px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0px 1px 4px 1px #888888;
  padding: 5px;
}

.icon-pass {
  background-image: url('../assets/close.png');
  background-size: cover;
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
  border-radius: 50%
}

.icon-like {
  background-image: url('../assets/hearts-48.ico');
  background-size: cover;
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
}

.icon {
  position: relative;
}

h4 {
  z-index: 100;
  color: #fff;
  width: 100%;
}

</style>
