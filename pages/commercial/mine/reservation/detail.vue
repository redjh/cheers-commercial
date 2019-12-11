<template>
	<view class="page">
		<image src="../../../static/mine/bg-order.png" class="bg-order"></image>
		<view class="summary-wrap">
			<view class="summary">
				<view class="bar-name size">{{data.name}}</view>
				<view class="seat-position size">{{data.seat}}</view>
				<view class="persion-num size">{{data.number}}</view>
				<view class="cost-time size">到店时间 {{data.time}}</view>
			</view>
			<view class="status-txt size" :style="{color:data.status?'#FF6FD5':'#b0b0b9'}">
				{{data.status?"已完成":"未完成"}}
			</view>
		</view>
		<view class="barcode-wrap">
			<view class="code-txt">
				预约码 1234dddddddd56
			</view>
			<image src="../../../static/mine/barcode.png" class="barcode"></image>
		</view>
		<view v-if="data.status" class="cover-style">不可用</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				data: {
					name: "XXXXXX酒吧",
					seat: "10号卡座",
					number: "5人",
					time: "2019-11-11 20:00-21:00",
					status: true
				}
			}
		},
		onLoad() {
			console.log("加载数据")
		},
		methods: {


		}
	}
</script>

<style>
	.page {
		/* align-items: center; */
		color: #FFFFFF;
	}

	.bg-order {
		margin-top: 14upx;
		height: 300upx;
		width: 750upx;
	}

	.summary-wrap {
		margin-top: 10upx;
		width: 100%;
		display: flex;
	}

	.barcode-wrap {
		margin-top: 50upx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.code-txt{
		display: flex;
		justify-content: center;
		font-size: 16px;
	}
	.barcode {
		margin-top: 20upx;
		height: 350upx;
		width: 350upx;
	}
	.summary {
		margin-top: 19upx;
		margin-left: 40upx;
		white-space: nowrap;
		flex: 1;
	}
	
	.size {
		font-size: 12px;
	}
	
	.status-txt {
		white-space: nowrap;
		position: relative;
		left: -43upx;
		top: 10upx;
	}
	/* 二维码遮罩 */
	.cover-style{
		height: 350upx;
		width: 350upx;
		background: #F0F0F0;
		opacity: 0.8;
		position: relative;
		margin: 0 auto;
		top:-350upx;
		display:flex;
		justify-content: center;
		align-items: center;
		color: #000000;
		font-weight: bold;
	}

</style>
