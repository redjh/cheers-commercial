<template>
	<view class="bottom-tab">
		<view class="bottom-tab-item" @click="changeTap(item)" v-for="(item,index) in tabList" :key="index">
			<image v-if="curTab==item.id" class="first-img" :src="item.imgOn"></image>
			<image v-if="curTab!=item.id" class="first-img" :src="item.imgOff"></image>
			<text :class="curTab==item.id?'text-position text-on':'text-position'">{{item.name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "wyg-bottom-tab",
		props: {
			tabIndex: {
				//图片的尺寸
				type: String,
				default: "1"
			},
			tabListParent: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				curTab: 1,
				tabList:[]
			}
		},
		created() {
			this.curTab = new Number(this.tabIndex);
			if (this.tabListParent.length > 0) {
				this.tabList = this.tabListParent;
			}
		},
		methods: {
			changeTap(e) {
				this.curTab = e.id;
				console.log("this.cutTab",this.curTab)
				uni.reLaunch({
					url:e.url
				})
			}

		}
	}
</script>

<style lang="scss">
	.bottom-tab {
		position: fixed;
		background-color: #1A2632;
		bottom: 0%;
		width: 100%;
		height: 50px;

		display: flex;
		align-items: flex-end;
		justify-content: space-between;

		.bottom-tab-item {
			width: 50%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.first-img {
				width: 46upx;
				height: 46upx;
			}

			.text-position {
				margin-top: 0rem;
				font-size: 0.6rem;
				color: #757575;
			}

			.text-on {
				color: #FF1C61;
			}
		}
	}
</style>
