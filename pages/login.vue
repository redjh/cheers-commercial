<template>
	<view v-if="isOnload" class="page">
		<view class="title">切尔斯CLUB</view>
		<image src="../static/login.png" class="img"></image>
		<button open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">授权登陆</button>
	</view>
</template>

<script>
import common from '../common/common.js';
export default {
	data() {
		return {
			isOnload: true,
			loginReq: {}
		};
	},
	onLoad() {
		//获取微信登陆接口返回的code
		let _this = this;
		uni.login({
			provider: 'weixin',
			success(res) {
				if (res.errMsg === 'login:ok') {
					_this.loginReq.code = res.code;
				}
			},
			fail(error) {
				console.error('login-fail: ', error);
			}
		});
	},
	methods: {
		/* 微信授权，用户登录 */
		async getUserInfo(e) {
			let d = e.detail;
			if (d.encryptedData) {
				this.loginReq.iv = d.iv;
				this.loginReq.rawData = d.rawData;
				this.loginReq.signature = d.signature;
				this.loginReq.encryptedData = d.encryptedData;
				let loginResult = await this.$http.post('users/login', this.loginReq);
				if (loginResult.data.code === 200) {
					uni.setStorageSync('loginReq', this.loginReq);
					uni.setStorageSync('loginTicket', loginResult.data.data);
					let userResult = await this.$http.get('users/current');
					common.checkRole(userResult.data);
				}
			} else {
				console.error('授权失败: ', d);
			}
		}
	}
};
</script>

<style lang="scss">
.page {
	height: 100vh;
	background-color: #f5f5f5;
	align-items: center;
	.title {
		margin-top: 246upx;
		margin-bottom: 48upx;
		font-size: 48upx;
		color: #1a2632;
	}
	.img {
		height: 245upx;
		width: 245upx;
		margin-bottom: 280upx;
	}
	button {
		width: 340upx;
		padding: 0;
		box-sizing: border-box;
		border: 1px solid rgba(73, 51, 98, 1);
		border-radius: 8px;
		line-height: 80upx;
		color: #493362;
		font-size: 30upx;
	}
}
</style>
