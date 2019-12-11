<template>
	<view v-if="isOnload" class="page">
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor" @clickItem="onClickItem" />
		</view>
		<template v-if="current == 0">
			<taxi @handleCar="handleTaxi" v-for="car in cars" :key="index" :prop="car"></taxi>
		</template>
		<template v-if="current === 1">
			<view class="search">
				<input type="text" v-model="keyword" placeholder="请输入酒吧名字或人员名字" />
				<button @click="search">搜索</button>
			</view>
			<authorize v-for="user in users" :key="user.id" @authorize="handleAuth" :authorize="user"></authorize>
		</template>
		<page-foot></page-foot>
		<wyg-bottom-tab tabIndex="1" :tabListParent="tabList"></wyg-bottom-tab>
	</view>
</template>

<script>
import authorize from '@/components/authorize/authorize.vue';
import taxi from '@/components/taxi/taxi.vue';
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
import wygBottomTab from '@/components/wyg-bottom-tab/wyg-bottom-tab.vue';
import TAB_LIST from '../../static/wyg-bottom-tab/js/botoom-list.js';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
export default {
	components: {
		authorize,
		uniSegmentedControl,
		taxi,
		wygBottomTab,
		uniNavBar
	},
	data() {
		return {
			isOnload: false,
			tabList: TAB_LIST,
			keyword: '',
			items: ['呼叫专车', '认证处理'],
			current: 0,
			colorIndex: 0,
			activeColor: '#FF8C1C',
			styleType: 'button',
			users: [],
			cars: []
		};
	},
	onLoad() {
		this.getData('cars');
	},
	methods: {
		onClickItem(index) {
			if (this.current !== index) {
				this.current = index;
			}
			if (this.current === 0) {
				this.getData('cars');
			} else if (this.current == 1) {
				this.getData('users');
			}
			console.log('选中的idnex = ', this.current);
		},
		handleTaxi(id) {
			uni.reLaunch({
				url: `carinfo?id=${id}`
			});
			console.log('handle', id);
		},
		search() {
			this.getData('users', { keyword: this.keyword });
			console.log('searchKey: ', this.keyword);
		},
		async getData(url, data = {}) {
			uni.showLoading();
			let res = await this.$http.get(url, data);
			if (res.data.code === 200) {
				this[url] = res.data.data;
				// 此句代码初始化时有效
				this.isOnload = true;
				uni.hideLoading();
			}
		},
		async handleAuth(e) {
			let applyStatus = e.status == 0 ? 1 : 0;
			let res = await this.$http.put('users', { applyStatus, id: e.userId });
			if (res.data.code === 200) {
				this.getData('users');
			}
		}
	}
};
</script>

<style lang="scss">
.page {
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background: #1a2632;
	}

	.search {
		margin: 25upx 0;
		display: flex;
		align-items: center;
		justify-content: center;

		input {
			width: 530upx;
			height: 60upx;
			box-sizing: border-box;
			border: 1px solid #8585a6;
			border-radius: 4upx;
			padding-left: 20upx;
		}

		button {
			height: 60upx;
			width: 135upx;
			line-height: 60upx;
			background: #ff7a22;
			color: #fff;
			margin: 0 0 0 14upx;
			font-size: 30upx;
		}
	}
}
</style>
