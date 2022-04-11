<template>
<el-row>
    <el-col :span="8" >
        <router-link :to="{ name: 'Liked', params: { userId: '123' }}" ><span class="icon-like"/> Linked</router-link>
    </el-col>

    <el-col :span="8">
        <router-link :to="{ name: 'Discover'}"><span class="icon-discover"/>Discover</router-link>
    </el-col>

    <el-col :span="8">
        <router-link :to="{ name: 'Matches', params: { userId: '123' }}"><span class="icon-matches"/>Matches</router-link>
    </el-col>
</el-row>
</template>

<script>
export default {
  name: 'SideBar',

}
</script>

<style scoped>
.el-row {
  height: 100%;
}
.el-col {
    border-top: 1px solid #000;
}

.el-col a {
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    border-right: 1px solid #000;
    font-size: 13px;
}

.el-col:last-child a {
     border-right: none;
}

.icon-like {
    background-image: url('../assets/icons8-happy-48.png');
    background-size: cover;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    margin-right: 10px;
}

.icon-discover {
    background-image: url('../assets/hearts-48.ico');
    background-size: cover;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    margin-right: 10px;
}

.icon-matches {
    background-image: url('../assets/messaging_icon.png');
    background-size: cover;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    margin-right: 10px;
}



</style>
