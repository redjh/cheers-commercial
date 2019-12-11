<template>
	<view v-if="isOnload" class="page">
		<view class="total">
			<view>
				今日收入
				<view class="today">¥{{ today }}</view>
			</view>
			<view>
				总收入
				<view class="sum">¥{{ income }}</view>
			</view>
		</view>

		<!-- <view class="uni-list order-search">
			<view class="uni-list-cell">
				<view class="uni-list-cell-db">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" style="flex: 1;">
						<view class="uni-input">{{ date }}</view>
					</picker>
					<image src="../../../static/mine/date.png" class="search-img"></image>
				</view>
			</view>
		</view> -->

		<uni-collapse ref="add" class="warp" @change="change">
			<uni-collapse-item v-for="(item, key) in list" :key="key" :open="item.open" :show-animation="item.showAnimation" :disabled="item.disabled" :title="item.subName">
				<view class="single-cost" v-for="(sub, i) in item.subList" :key="i" @click="gotoDetail(sub.id)">
					<view class="cost-detail">
						<view class="money">金额 ¥{{ sub.money }}</view>
						<view class="order">
							<view class="cost">订单编号：{{ sub.orderNo }}</view>
							<view class="status">详情 ></view>
						</view>
						<view class="time">{{ sub.createTime }}</view>
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';
import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue';
export default {
	components: {
		uniCollapse,
		uniCollapseItem
	},
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			isOnload:false,
			list: [],
			date: currentDate,
			today: 0, //今日收入
			income: 0 //总收入
		};
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	methods: {
		async change(e) {
			console.log(e);
			for (let i = 0; i < e.length; i++) {
				let item = this.list[e[i]];
				if (!item.subList) {
					let res = await this.$http.get('moneys', { searchTime: item.time });
					if (res.data.code === 200) {
						this.$set(item, 'subList', res.data.data);
						console.log('xxx', JSON.stringify(item));
					}
				}
			}
		},
		/* 进去详情页 */
		gotoDetail(orderId) {
			uni.navigateTo({
				url: `detail?orderId=${orderId}`
			});
		},
		bindDateChange: function(e) {
			this.date = e.target.value;
		},
		/* 格式化时间 */
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		/* 初始化数据，默认只能查询最近7天的数据 */
		initData() {
			const date = new Date();
			let today = date.getDate();
			for (let i = 6; i >= 0; i--) {
				const tempDate = new Date();
				tempDate.setDate(today - i);
				let year = tempDate.getFullYear();
				let month = tempDate.getMonth() + 1;
				let day = tempDate.getDate();
				day = day > 9 ? day : '0' + day;
				month = month > 9 ? month : '0' + month;
				
				let temp = {};
				temp.subName = `${year}年-${month}月-${day}日`;
				temp.time = `${year}-${month}-${day}`;
				temp.showAnimation = true;
				if (i === 0) {
					temp.open = true;
				}
				this.list.push(temp);
			}
			this.list.reverse()
		}
	},
	async onLoad(option) {
		uni.showLoading({
			mask: true
		});
		this.initData();
		//默认查询当前月的数据
		let current = await this.$http.get('moneys', { searchTime: this.list[0].time });
		if (current.data.code === 200) {
			this.list[0].subList = current.data.data;
		}

		// 今日收入
		let res = await this.$http.get('moneys/now');
		if (res.data.code === 200) {
			this.today = res.data.data;
		}
		// 总收入
		let moneys = await this.$http.get('moneys/total');
		if (moneys.data.code === 200) {
			this.income = moneys.data.data;
		}
		this.isOnload=true;
		uni.hideLoading();
	}
};
</script>

<style lang="scss">
.page {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	background-color: #372051;
	$left: 30upx;

	.total {
		display: flex;
		margin-left: $left;
		margin-top: 10upx;

		view {
			display: flex;
			flex: 1;

			.today {
				color: #fffc24;
			}

			.sum {
				color: #ff59c6;
			}

			.today,
			.sum {
				margin-left: 10upx;
			}
		}
	}

	.warp {
		margin-top: 10upx;

		.single-cost {
			display: flex;
			align-items: center;
			height: 156upx;
			margin-left: $left;
			box-sizing: border-box;
			border-bottom: 1px solid #5a5a7b;

			.cost-detail {
				display: flex;
				flex-direction: column;
				flex: 1;
				padding: 0 30upx 0 20upx;

				.money {
					font-weight: bold;
				}

				.order {
					display: flex;
					justify-content: space-between;
					// font-size: 12px;
				}
			}
		}
	}

	.uni-list::before {
		height: 0;
	}

	.uni-list::after {
		height: 0;
	}

	.uni-list {
		background-color: #372051;
		margin-top: 10upx;

		.uni-list-cell-db {
			margin: 0 40upx 10upx;
			display: flex;
			align-items: center;

			.uni-input {
				background: #372051;
				height: 60upx;
				width: 520upx;
				border-radius: 10upx;
				box-sizing: border-box;
				border: 1px solid #7e7e9f;
				padding: 0 15upx;
				font-size: 12px;
				display: flex;
				align-items: center;
			}

			.search-img {
				width: 30upx;
				height: 30upx;
				position: relative;
				left: -170upx;
			}
		}
	}
}
</style>
