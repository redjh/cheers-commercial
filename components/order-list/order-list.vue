<template>
	<view class="list">
		<view class="nav-right-item" v-for="(item,index) in orderList" :key="index">
			<view class="goods-name-wrap">
				<image :src="item.image" class="goods-img" />
				<view class="goods-name">
					<view class="name">{{item.goodsName}}</view>
					<view class="price">
						<view class="sale-price">¥{{item.salePrice || item.settlePrice}}</view>
						<view class="origin-price">¥{{item.originalPrice}}</view>
					</view>
				</view>
			</view>
			<view class="h-line"></view>
			<view class="goods-desc">
				<view class="txt">产品描述</view>
				<view class="txt">{{ item.description | filterA }}</view>
				<view class="txt">{{ item.description | filterB }}</view>
				<view class="txt">{{ item.description | filterC }}</view>
			</view>
			<view class="h-line txt-line"></view>
			<view class="total-wrap">
				<view class="number">
					数量 <view>{{item.num}}</view>
				</view>
				<!-- <view class="rebate">
					返利 <view>¥{{item.rebate}}</view>
				</view> -->
				<view class="total">
					合计 <view>¥{{item.total}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import common from '../../common/common.js';
	export default {
		name: 'order-list',
		props: {
			orderList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {

			}
		},
		/* 商品描述数据处理 */
		filters: common.descFilter,
		methods: {

		}
	}
</script>

<style lang="scss">
	.list {
		width: 100%;

		.nav-right-item {
			background: #493362;
			margin-top: 20upx;
			padding: 11upx 20upx;
			font-size: 28upx;

			view {
				display: flex;
			}

			.h-line {
				height: 1px;
				width: 100%;
				background: #52526D;
				margin-top: 10upx;
			}

			.goods-name-wrap {
				height: 135upx;

				image {
					width: 220upx;
					height: 135upx;
				}

				.goods-name {
					flex: 1;
					flex-direction: column;
					margin-left: 10upx;
					justify-content: space-around;
					padding: 0 20upx;

					.price {
						justify-content: space-between;

						.sale-price {
							color: #FFFC1C;
							font-size: 12px;
						}

						.origin-price {
							font-size: 12px;
							color: #B3ADBB;
							text-decoration: line-through;
						}
					}
				}
			}

			.goods-desc,
			.goods-name-wrap {
				margin-left: 10upx;
			}

			.goods-desc {
				margin-top: 10upx;
				line-height: 1.5;
				flex-direction: column;

				.txt {
					font-size: 12px;
				}
			}

			.txt-line {
				margin-top: 0;
			}
		}

		.total-wrap {
			padding: 0 10upx;
			flex-direction: column;

			view {
				font-size: 12px;
				justify-content: space-between;
			}

			.rebate,
			.total {
				padding-left: 24upx;
			}
		}
	}
</style>
