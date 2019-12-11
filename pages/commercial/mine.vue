<template>
	<view class="page" v-if="isOnload"><mine :on_off="on_off" :manage="manage"></mine></view>
</template>

<script>
import mine from '@/components/mine/mine.vue';
export default {
	components: {
		mine
	},
	data() {
		return {
			isOnload: false,
			manage: {
				income: 0,
				orderNum: 0,
				authNum:0,
				authority: false,
				role:''
			},
			user: {},
			on_off: true //控制提交认证按钮的开关
		};
	},
	async onLoad() {
		let res = await this.$http.get('users/current');
		if (res.data.code === 200) {
			this.user = res.data.data;
			if (this.user.applyStatus !== 1) {
				this.isOnload = true;
			} else {
				this.on_off = false; // 隐藏我要认证按钮
				this.queryData();
			}
		}
	},
	async onHide() {
		let res = await this.$http.get('users/current');
		if (res.data.code === 200) {
			this.user = res.data.data;
			if (this.user.applyStatus !== 1) {
				this.isOnload = true;
			} else {
				this.on_off = false; // 隐藏我要认证按钮
				this.queryData();
			}
		}
	},
	methods: {
		async queryData() {
			uni.showLoading();
			// 请求今日收入额接口
			if (this.user.role === 'ADMIN') {
				this.manage.role = 'ADMIN';
				this.manage.authority = true;
				let moneys = await this.$http.get('moneys/now');
				if (moneys.data.code === 200) {
					this.manage.income = moneys.data.data || 0;
				}
				// 请求待认证数量接口
				let authRes = await this.$http.get('users/total');
				if (authRes.data.code === 200) {
					this.manage.authNum = authRes.data.data || 0;
				}
			}
			// 酒吧服务员只能查看预约数量，请求预约总数接口
			let appointments = await this.$http.get('appointments/count');
			if (appointments.data.code === 200) {
				this.manage.orderNum = appointments.data.data || 0;
			}
			this.isOnload = true;
			uni.hideLoading();
		}
	}
};
</script>

<style lang="scss"></style>
