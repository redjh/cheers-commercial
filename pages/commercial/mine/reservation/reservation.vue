<template>
	<view v-if="isOnload">
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor" @clickItem="onClickItem" />
		</view>

		<view class="uni-list order-search">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">预约时间：</view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" style="flex: 1;">
						<view class="uni-input">{{ date }}</view>
					</picker>
					<image src="../../../static/mine/date.png" class="search-img"></image>
				</view>
			</view>
		</view>

		<view class="order-list-wrap">
			<view class="order-list" v-for="data in dataList" :key="data.id" @click="gotoDetail(data.id)">
				<view class="order-image"><image :src="data.image" class="img"></image></view>
				<view class="summary">
					<view class="bar-name">{{ data.nickname }}</view>
					<view v-if="data.status == 1" class="seat-position">{{ data.type==10?'卡座':'吧台' }}</view>
					<view class="persion-num">{{ data.num }}人</view>
					<view v-if="data.status == 1" class="cost-time">到店时间 {{ data.arrivalTime }}</view>
					<view v-else class="cost-time">预约时间 {{ data.appointmentTime }}</view>
				</view>
				<view class="status-txt" :style="{ color: data.status == 1 ? '#b0b0b9' : '#FF6FD5' }">{{ data.status == 1 ? '已完成' : '未完成' }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
export default {
	components: {
		uniSegmentedControl
	},
	data() {
		const currentDate = this.getDate();
		return {
			isOnload: false,
			items: ['全部', '已完成', '未完成'],
			current: 0,
			colorIndex: 0,
			activeColor: '#FF8C1C',
			styleType: 'button',
			status: true,
			dataList: [],
			date: currentDate
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
		onClickItem(index) {
			if (this.current !== index) {
				this.current = index;
			}
			if (index === 1) {
				this.queryData({ status: 1 });
			} else if (index === 2) {
				this.queryData({ status: 0 });
			} else {
				this.queryData();
			}
		},
		gotoDetail(id) {
			uni.navigateTo({ url: `detail?id=${id}` });
		},
		bindDateChange: function(e) {
			this.date = e.target.value;
			console.log('选择时间：：：：：', this.date);

			this.queryData({ searchTime: this.date });
		},
		/* 获取日期 */
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
		/* 查询数据 */
		async queryData(param = {}) {
			uni.showLoading({
				title: '数据加载中',
				mask: true
			});
			let res = await this.$http.get('appointments', param);
			if (res.data.code === 200) {
				console.log(res.data.data);
				this.dataList = res.data.data;
				//此句代码页面初始化才生效，页面其余数据请求没有作用
				this.isOnload = true;
			}
			uni.hideLoading();
		}
	},
	onLoad() {
		this.queryData();
	}
};
</script>

<style>
page {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	color: #f6f6f7;
}

view {
	font-size: 28upx;
	line-height: inherit;
}

.uni-common-mt {
	margin-top: 20upx;
}

.order-list-wrap {
	display: flex;
	width: 100%;
	flex-direction: column;
	font-size: 14upx;
	color: #f6f6f7;
}

.order-list {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	background: #493362;
	margin-top: 18upx;
}

.summary {
	margin: 19upx 0;
	white-space: nowrap;
	flex: 1;
	color: #b0b0b9;
}

.status-txt {
	white-space: nowrap;
	position: relative;
	left: -43upx;
	top: 10upx;
}

.order-image {
	margin-left: 40upx;
	margin-right: 20upx;
	display: flex;
	align-items: center;
}

.order-list .img {
	width: 130upx;
	height: 130upx;
}

.uni-list {
	background-color: #372051;
	margin-top: 38upx;
}

.uni-list::before {
	height: 0;
}

.uni-list::after {
	height: 0;
}

.uni-list-cell-left {
	padding: 0 0 0 40upx;
}

.uni-list-cell-db {
	margin-right: 13upx;
	margin-left: 10upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.uni-input {
	background: #372051;
	height: 60upx;
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
	left: -45upx;
}
</style>
