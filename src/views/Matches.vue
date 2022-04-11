<template>
  <div class="matches">
		<h4>Matches: </h4>
    <el-row v-if="listUserMatches.length > 0" :gutter="12" >
        <el-col v-for="(user, index) in listUserMatches"
					:key="index"
					:span="24">
					<el-card shadow="always" class="card_matches" :body-style="{marginBottom:'5px', padding: '10px', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }">
						<img :src="user.picture" class=""/>
						<span class="info"> {{`${user.lastName} ${user.firstName}`}} </span>
					</el-card>
        </el-col>
    </el-row>
		<el-row v-else-if="listUserMatches.length === 0">
			<h4> No things to show </h4>
		</el-row>
  </div>
</template>

<script>
import { getLocalStorage } from '@/utils/localStorage'
export default {
  name: 'MatchesPage',
	data() {
		return {
			listUserMatches: []
		}
	},
	created() {
			this.fetchListMatchesUser()
	},
	methods: {
			fetchListMatchesUser: function() {
					this.listUserMatches = getLocalStorage("likedUser") || []
			}
	}
}
</script>

<style scoped>
h4 {
	text-align: left;
	padding: 0 10px;
}
.matches img {
	width: 48px;
  height: 48px;
  border-radius: 50%;
}
.info {
	padding-left: 15px;
}

.el-row {
	margin: 0px !important;
}
.el-col {
	padding: 0px !important;
	margin-bottom: 10px;
}
</style>
