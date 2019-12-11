<template>
	<view v-if="isOnload" class="page">
		<template v-if="userConfirm">
			<view class="userinfo">
				<view>顾客详情</view>
				<image :src="user.avatarUrl" />
				<view>
					<view class="key">顾客姓名：</view>
					<view>{{ user.realName | filterName }}</view>
				</view>
				<view>
					<view class="key">微信昵称：</view>
					<view>{{ user.nickName }}</view>
				</view>
				<view>
					<view class="key">微信账号：</view>
					<view>{{ user.chatId }}</view>
				</view>
				<view class="button-wrap">
					<button @click="confirm" type="primary">确认</button>
					<button @click="cancel" type="default">取消</button>
				</view>
			</view>
		</template>
		<template v-else>
			<order-list :orderList="order.detailVOS"></order-list>
			<count-bar :height="50" :money="order.total" color="#1A2632" @confirm="gotoPay">付款</count-bar>
			<page-foot></page-foot>
		</template>
	</view>
</template>

<script>
import orderList from '@/components/order-list/order-list.vue';
import countBar from '@/components/count-bar/count-bar.vue';
export default {
	components: {
		orderList,
		countBar
	},
	data() {
		return {
			order: {},
			isOnload: true,
			userConfirm: true,
			user: {}
		};
	},
	async onLoad(option) {
		uni.showLoading({
			mask: true
		});
		let res = await this.$http.get(`orders/${option.orderId}`);
		if (res.data.code === 200) {
			this.order = res.data.data;
			this.user = this.order.customer;
		}
		this.isOnload = true;
		uni.hideLoading();
	},
	methods: {
		gotoPay(e) {
			uni.navigateTo({
				url: `../pay/pay?barName=${this.order.barName}&orderId=${this.order.id}`
			});
		},
		/* 顾客确认订单 */
		confirm() {
			this.userConfirm = false;
		},
		/* 顾客取消订单 */
		cancel() {
			uni.navigateBack();
		}
	},
	filters: {
		filterName(val) {
			return val && val.replace(/^./, '*');
		}
	}
};
</script>

<style lang="scss">
.page {
	.userinfo {
		display: flex;
		flex-direction: column;
		align-items: center;
		image {
			height: 120upx;
			width: 120upx;
			border-radius: 5upx;
			margin-top: 50upx;
		}
		margin-top: 50upx;
		& > view:first-child{
			font-size: 28px !important;
			justify-content: center;
		}
		& > view {
			width: 100%;
			display: flex;
			flex: 1;
			margin-top: 20upx;
			.key{
				width: 50%;
				text-align: right;
			}
		}
		.button-wrap {
			display: flex;
			margin-top: 68upx;
			padding: 0 30upx;
			button {
				width: 200upx;
				color: #ffffff;
				background: #ff7a22;
				&[type='default'] {
					background: #463956;
				}
			}
		}
	}
}
</style>
