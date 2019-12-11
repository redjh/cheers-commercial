<template>
	<view v-if="isOnload" class="page">
		<template v-if="payStatus">
			<view class="status">
				<image class="img" src="../../../static/validation/success.png" />
				<view>{{payResult.status ==1 ?'支付成功':'支付失败'}}</view>
				<view>{{ barName }}</view>
				<view>¥{{ payResult.money }}元</view>
			</view>
			<view class="order-detail">
				<view class="txt">
					订单编号
					<view>{{ payResult.outTradeNo }}</view>
				</view>
				<view class="txt">
					交易编号
					<view>{{ payResult.transactionId }}</view>
				</view>
				<!-- <view class="txt">
					交易时间
					<view>{{ payResult.createTime }}</view>
				</view> -->
				<view class="txt">
					支付方式
					<view>微信</view>
				</view>
				<view class="txt">
					支付状态
					<view>{{payResult.status ==1 ?'支付成功':'支付失败'}}</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="head"></view>
			<view class="member">
				{{ barName }}
				<!-- <span>铂金会员</span> -->
			</view>
			<view class="qr-code"><image :src="qrCode" class="qr-code"></image></view>
		</template>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isOnload: false,
			barName: '',
			qrCode: '',
			payStatus: false, //支付状态
			payResult: {} //支付结果
		};
	},
	async onLoad(option) {
		uni.showLoading({
			mask: true
		});
		this.barName = option.barName;
		let res = await this.$http.get(`orders/${option.orderId}/pay`);
		if (res.data.code === 200) {
			this.qrCode = res.data.data;
			this.isOnload = true;
			uni.hideLoading();
		}
	},
	onShow() {
		// websocket 监听付款情况
		let loginTicket = uni.getStorageSync('loginTicket');
		uni.connectSocket({
			url: `wss://www.cheers.club/cheers/admin/ws/${loginTicket}`,
			fail(e) {
				console.error(e);
			}
		});
		uni.onSocketOpen(function(res) {
			console.log('WebSocket连接已打开！', res);
		});
		uni.onSocketError(function(res) {
			console.log('WebSocket连接打开失败，请检查！', res);
		});
		let _this = this;
		uni.onSocketMessage(res => {
			console.log('收到服务器内容：',res.data);
			let data = JSON.parse(res.data);
			if (data.type === 'PAY') {
				_this.payResult = data.data;
				_this.payStatus = true;
			}
		});
	},
	// #ifdef MP-WEIXIN
	onUnload() {
		uni.closeSocket();
		uni.onSocketClose(function(res) {
			console.log('WebSocket 已关闭！');
		});
		if(this.payStatus){
			uni.switchTab({
				url:'../index'
			})
		}
		return false;
	}
	// #endif
};
</script>

<style lang="scss">
.page {
	flex-direction: column;
	align-items: center;

	.head {
		height: 120upx;
		width: 120upx;
		border-radius: 60upx;
		background: #585889;
		margin-top: 50upx;
	}

	.member {
		text-align: center;
		margin-top: 30upx;
		span {
			font-size: 12px;
		}
		margin-bottom: 80upx;
	}

	.qr-code {
		height: 300upx;
		width: 300upx;
	}

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
		width: 690upx;
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
