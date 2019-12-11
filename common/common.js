export default {
	checkRole(res) {
		if (res.code === 200) {
			let user = res.data;
			// 判断用户权限，并跳转到对应的首页
			let url;
			if (user.role === 'SUPER') {
				url = '/pages/platform/index';
			} else {
				uni.setStorageSync('applyStatus', user.applyStatus);
				if (user.applyStatus !== 1) {
					url = '/pages/commercial/mine';
				} else {
					url = '/pages/commercial/index';
				}
			}
			uni.reLaunch({
				url
			});
		}
	},
	checkApply() {
		let applyStatus = uni.getStorageSync('applyStatus');
		return applyStatus === 1;
	},
	descFilter: {
		filterA(value) {
			let str = value && value.split('||')[0];
			return str && str.replace(':', ': ');
		},
		filterB(value) {
			let str = value && value.split('||')[1];
			return str && str.replace(':', ': ');
		},
		filterC(value) {
			let str = value && value.split('||')[2];
			return str && str.replace(':', ': ');
		}
	}
}
