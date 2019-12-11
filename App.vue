<script>
export default {
	data() {
		return {
			loginReq: {}
		};
	},
	onLaunch() {
		let _this = this;
		let loginReq = uni.getStorageSync('loginReq');
		if (typeof loginReq === 'object') {
			uni.login({
				provider: 'weixin',
				async success(res) {
					if (res.errMsg === 'login:ok') {
						loginReq.code = res.code;
						let loginResult = await _this.$http.post('users/login', loginReq);
						if (loginResult.data.code === 200) {
							uni.setStorageSync('loginReq', loginReq);
							uni.setStorageSync('loginTicket', loginResult.data.data);
						}
					}
				},
				fail(error) {
					console.error('login-fail: ', error);
				}
			});
		}
		let systemInfo = uni.getSystemInfoSync();
		console.error(systemInfo);
		
		
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
@import './common/uni.css';

/*每个页面公共css */
page {
	background-color: #372051;
	font-family: Hiragino Sans GB;
	font-size: 14px;
	color: #e1e1e1;
}

.page {
	/* height: 100%; */
	/* width: 100%; */
	display: flex;
	flex-direction: column;
}
</style>
