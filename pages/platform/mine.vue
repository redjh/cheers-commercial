<template>
	<view v-if="isOnload" class="page">
		<mine :on_off="on_off" :manage="manage"></mine>
		<wyg-bottom-tab tabIndex="2" :tabListParent="tabList"></wyg-bottom-tab>
	</view>
</template>

<script>
import mine from '@/components/mine/mine.vue';
import wygBottomTab from '@/components/wyg-bottom-tab/wyg-bottom-tab.vue';
import TAB_LIST from '../../static/wyg-bottom-tab/js/botoom-list.js';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
export default {
	components: {
		mine,
		wygBottomTab,
		uniNavBar
	},
	data() {
		return {
			isOnload: false,
			tabList: TAB_LIST,
			manage: {
				income: 0,
				orderNum: 0,
				authority: true
			},
			on_off: false //控制提交认证按钮的开关,平台管理员不需此功能
		};
	},
	async onLoad() {
		uni.showLoading();
		let appointments = await this.$http.get('appointments/count');
		if (appointments.data.code === 200) {
			this.manage.orderNum = appointments.data.data || 0;
		}
		let moneys = await this.$http.get('moneys/now');
		if (moneys.data.code === 200) {
			this.manage.income = moneys.data.data || 0;
		}
		this.isOnload = true;
		uni.hideLoading();
	}
};
</script>

<style lang="scss">
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
	background: #1a2632;
}
</style>
