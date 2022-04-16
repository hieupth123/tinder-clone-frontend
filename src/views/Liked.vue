<template>
  <div class="liked">
    <el-row v-if="listUserLiked.length > 0">
      <el-col v-for="(user, index) in listUserLiked"
              :key="index"
              :span="12"
      >
        <el-card :body-style="{ padding: '0px' }" class="card">
          <img
              :src="user.picture"
              class="image"
          />
          <div style="padding: 14px" class="info">
            <span>{{ `${user.lastName} ${user.firstName}` }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row v-else-if="listUserLiked.length === 0">
      <h4> No things to show </h4>
    </el-row>
  </div>
</template>

<script>
import {fetchLikedUser} from '../api/userAction'
import {getLocalStorage} from '@/utils/localStorage'

export default {
  name: 'LikedPage',
  data() {
    return {
      currentUser: {},
      listUserLiked: []
    }
  },
  async created() {
    await this.fetchListLikedUser()
  },
  methods: {
    fetchListLikedUser: async function () {
      this.currentUser = getLocalStorage("currentUser")
      const dataRs = await fetchLikedUser(this.currentUser.uuid)
      this.listUserLiked = dataRs && dataRs.data.data.length > 0 ? dataRs.data.data : []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.liked {
  background: #fff;
}

.image {
  width: 100%;
  display: block;
}

.card {
  position: relative;
  border: none;
  box-shadow: none;
  border-radius: unset;
}

.card .info {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background: #3840486e;
  color: #fff;
  text-align: left;
  box-sizing: border-box;
}

.el-row {
  padding: 5px;
}

.el-col:nth-child(odd) {
  padding-right: 5px;
}

.el-col:nth-child(even) {
  padding-left: 5px
}

.el-col {
  padding-bottom: 10px;
  background: #fff;
}
</style>
