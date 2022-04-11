<template>
  <el-container>
		<Info :user-show="userShow" />
		<div class="action">
			<el-row>
				<el-col :span="2" :offset="10">
					<a href="#" @click="nextUser(passed)"><span class="icon-pass icon"/></a>
				</el-col>
				<el-col :span="2" :offset="0" >
					<a href="#" @click="nextUser(liked)"><span class="icon-like icon"/></a>
				</el-col>
			</el-row>
		</div>
  </el-container>
</template>

<script>
import Info from '@/components/Info'
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage'
import CONSTANTS from '@/constants'
export default {
	components: {
    Info,
  },
  name: 'DiscoverPage',
	data() {
		return {
			userShow: {},
			oldUser: {},
			listUserAvl: [],
			liked: CONSTANTS.LIKED,
			passed: CONSTANTS.PASSED
		}
	},
	created() {
		this.getUserShow()
	},
	methods: {
		getUserShow: function() {
			this.listUserAvl = getLocalStorage("userAvailable") || []
			this.userShow = this.listUserAvl.length > 0 ? this.listUserAvl[0]: null
		},

		nextUser: function(type) {
				if (type === CONSTANTS.LIKED) {
					this.listUserAvl = this.listUserAvl.filter(user => user.id != this.userShow.id)
					let likedUser = getLocalStorage("likedUser") || []
					likedUser.push(this.userShow)
					setLocalStorage("likedUser", likedUser)
					this.oldUser = this.userShow
					this.userShow = this.listUserAvl.length > 0 ? this.listUserAvl[0]: null
					setLocalStorage("userAvailable", this.listUserAvl)
					this.$notify({
							type: 'success',
							title: 'New watch',
							text: 'Send a message now!'
						});
				} else if (type === CONSTANTS.PASSED) {
					this.listUserAvl = this.listUserAvl.filter(user => user.id != this.userShow.id)
					this.userShow = this.listUserAvl.length > 0 ? this.listUserAvl[0]: null
					setLocalStorage("userAvailable", this.listUserAvl)
						this.$notify({
							type: 'warn',
							title: 'Not feeling it?',
							text: 'Keep discovering!'
						});
				}
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-container{
	position: relative;
	height: 100%;
}
.action {
	position: absolute;
	bottom:20px;
	left: 0;
	width: 100%;
	height: 30px;
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
		border-radius:50%
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


</style>
