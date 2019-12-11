<template>
	<view class="bg">
		<view class="bg-img"></view>
		<view class="head-img"></view>
	</view>
</template>

<script>
	export default {
		name: "bg",
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.bg {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.bg-img {
			height: 275upx;
			width: 100%;
			background-image: url('~@/static/mine/bg-mine.jpg');
			background-size: 100% 100%;
			background-repeat: no-repeat;
		}
		.head-img {
			margin-top: -90upx;
			height: 180upx;
			width: 180upx;
			border-radius: 50%;
			background-image: url('~@/static/mine/head-img.jpg');
			background-size: 100% 100%;
			background-repeat: no-repeat;
		}
	}
</style>
