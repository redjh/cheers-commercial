<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<button open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">获取用户信息</button>
		<button open-type="getPhoneNumber" lang="zh_CN" @getphonenumber="getPhoneNumber">授权登陆</button>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		name:'login',
		data() {
			return {

			};
		},
		methods: {
			getUserInfo(e) {
				console.log(e.detail.errMsg)
				console.log(e.detail.userInfo)
				console.log(e.detail.rawData)
			},
			getPhoneNumber(e) {
				console.log(JSON.stringify(e))
			}
		}

	}
</script>

<style lang="scss">

</style>
