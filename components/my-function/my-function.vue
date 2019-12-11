<template>
	<view class="business">
		<navigator open-type="navigate" url="/pages/commercial/mine/reservation/reservation">
			<view class="item">
				<image src="../../static/mine/order.png" class="img"></image>
				<view class="">今日预约数</view>
				<view class="">{{ manage.orderNum }}个</view>
			</view>
		</navigator>
		<navigator v-if="manage.authority" open-type="navigate" url="/pages/commercial/mine/income/income">
			<view class="item">
				<image src="../../static/mine/balance.png" class="img"></image>
				<view class="">今日收入额</view>
				<view class="">¥{{ manage.income }}元</view>
			</view>
		</navigator>
		<navigator v-if="manage.role === 'ADMIN'" open-type="navigate" url="/pages/commercial/mine/authorize/handle">
			<view class="item">
				<image src="../../static/mine/balance.png" class="img"></image>
				<view class="">待处理认证</view>
				<view class="">{{ manage.authNum }}个</view>
			</view>
		</navigator>
	</view>
</template>

<script>
export default {
	name: 'my-function',
	props: {
		manage: {
			type: Object
		}
	}
};
</script>

<style lang="scss">
.business {
	width: 100%;
	display: flex;
	justify-content: space-around;
	/* #ifdef MP-WEIXIN */
	margin-top: 60upx;
	/* #endif */

	.item {
		display: flex;
		flex-direction: column;
		align-items: center;

		image {
			height: 40upx;
			width: 40upx;
			margin-bottom: 8upx;
		}

		view {
			line-height: 40upx;
		}
	}
}
</style>
