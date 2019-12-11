<template>
	<view class="cost-detail">
		<view>交易时间 {{prop.time}}</view>
		<view v-if="prop.type===1" class="money">
			<view>消费
				<view class="cost">¥{{prop.cost}}</view>
			</view>
			<view>返利
				<view class="rebate">¥{{prop.rebate}}</view>
			</view>
		</view>
		<view v-else class="money">
			<view>金额
				<view class="cost">¥{{prop.cost}}</view>
			</view>
			<!-- <view class="status">订单状态 {{prop.status?'已转账':'未转账'}}</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		name: "order-head",
		props: {
			prop: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.cost-detail {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 0 20upx;
		background: #493362;
		margin-top: 20upx;
		height: 100upx;

		view {
			display: flex;
		}

		.money {
			.cost {
				color: #FFFC24;
			}

			.rebate {
				color: #FF59C6;
			}

			.cost,
			.status,
			.rebate {
				margin-left: 20upx;
			}
		}
	}
</style>
