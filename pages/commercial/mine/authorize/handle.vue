<template>
	<view v-if="isOnload" class="page">
		<view class="search">
			<input type="text" v-model="keyword" placeholder="请输入认证人名字" />
			<button @click="search">搜索</button>
		</view>
		<authorize v-for="user in users" :key="user.id" @authorize="handleAuth" :authorize="user"></authorize>
	</view>
</template>

<script>
import authorize from '@/components/authorize/authorize.vue';
export default {
	components: {
		authorize
	},
	data() {
		return {
			isOnload: true,
			keyword: '',
			users: [],
		};
	},
	onLoad() {
		this.getData('users');
	},
	methods: {
		search() {
			this.getData('users', { keyword: this.keyword });
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
