<template>
	<view class="success">
		<view class="status">
			<image class="img" src="../../static/validation/success.png" />
			<view>支付成功</view>
			<view>XXXXXX酒吧</view>
			<view>¥125.00</view>
		</view>
		<view class="order-detail">
			<view class="txt">
				订单编号
				<view>8585858585858</view>
			</view>
			<view class="txt">
				交易单号
				<view>2255532432535363636</view>
			</view>
			<view class="txt">
				成交时间
				<view>2019-01-15 14:00</view>
			</view>
			<view class="txt">
				支付方式
				<view>微信</view>
			</view>
			<view class="txt">
				支付状态
				<view>支付成功</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {
		setTimeout(() => {
			uni.showLoading({
				title: '正在跳转首页...'
			});
		}, 1000);
		setTimeout(() => {
			uni.switchTab({
				url: '../commercial/index',
				success: () => {
					uni.hideLoading();
				}
			});
		}, 1500);
	},
	methods: {}
};
</script>

<style lang="scss">
.page {
	align-items: center;
	.status {
		width: 95%;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 320upx;
		margin: 50upx 0;
		border-bottom: 1px solid #5a5a80;
		.img {
			height: 125upx;
			width: 125upx;
			margin-bottom: 10upx;
		}
	}
	.order-detail {
		display: flex;
		flex-direction: column;
		width: 500upx;
		white-space: nowrap;
		.txt {
			display: flex;
			view {
				margin-left: 50upx;
			}
		}
	}
}
</style>
