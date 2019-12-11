<template>
	<view v-if="isOnload" class="page">
		<view class="cost-detail">
			<view class="item">
				<view>金额</view>
				<view class="cost">¥{{ data.money }}</view>
			</view>
			<view class="item">交易时间 {{ data.createTime.split(' ')[0] }}</view>
		</view>
		<order-list :orderList="data.detailVOS"></order-list>
	</view>
</template>
<script>
import orderList from '@/components/order-list/order-list.vue';
export default {
	components: {
		orderList
	},
	data() {
		return {
			isOnload: false,
			data: {}
		};
	},
	methods: {},
	async onLoad(option) {
		uni.showLoading({
			mask: true
		});
		let res = await this.$http.get(`moneys/${option.orderId}`);
		if (res.data.code === 200) {
			this.data = res.data.data;
			this.isOnload = true;
			uni.hideLoading();
		}
	}
};
</script>

<style lang="scss">
.page {
	color: #b3adbb;
	.cost-detail {
		display: flex;
		justify-content: space-between;
		padding: 10upx 20upx;
		background: #493362;
		margin-top: 20upx;
		.item {
			display: flex;
			.cost {
				color: #fffc24;
				@extend .status;
			}
			.status {
				margin-left: 20upx;
			}
		}
	}
}
</style>
