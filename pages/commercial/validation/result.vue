<template>
	<view class="page">
		<image class="img" src="../../../static/validation/success.png" />
		<view class="txt">核销成功</view>
		<view class="order-wine">
			<navigator url="../index" open-type="switchTab">
				<button type="primary" size="mini">点单</button>
			</navigator>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss">
.page {
	align-items: center;
	height: 500px;

	.img {
		margin-top: 54upx;
		height: 200upx;
		width: 200upx;
	}

	.txt {
		margin-top: 40upx;
	}

	.order-wine {
		margin-top: 100upx;

		button[type='primary'] {
			width: 340upx;
			height: 60upx;
			background: #ff7a22;
		}
	}
}
</style>
