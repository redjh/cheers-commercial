<template>
	<view class="list">
		<view class="item">
			<view>代叫车人：{{prop.nickname}}</view>
			<view class="status" :style="{backgroundColor:prop.status==0?'#A742E1':'#476483'}">{{prop.status==0?'待叫车':'已叫车'}}</view>
		</view>
		<view class="item">
			<view>乘客：{{prop.passenger}}</view>
			<view>联系电话： {{prop.telephone}}</view>
		</view>
		<view class="item">呼叫时间：{{prop.createTime}}</view>
		<view class="item">叫车类型：{{prop.type==1?'恭送':'接驾'}}</view>
		<view class="item">出发地：{{prop.origin}}</view>
		<view class="item">目的地：{{prop.destination}}</view>
		<button v-if="prop.status==0" @click="buttonClick">立即处理</button>
	</view>
</template>

<script>
	export default {
		name: 'taxi',
		props: {
			prop: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {

			};
		},
		methods:{
			buttonClick(){
				this.$emit('handleCar',this.prop.id)
			}
		}
	}
</script>

<style lang="scss">
	.list {
		color: #FFFFFF;
		display: flex;
		flex-direction: column;
		background: #493362;
		padding: 30upx 40upx;
		margin-top: 25upx;

		.item {
			display: flex;
			justify-content: space-between;
			padding: 8upx 0;

			.status {
				padding: 4upx 10upx 0;
				height: 50upx;
				line-height: 50upx;
				border-radius: 6upx;
			}
		}

		button {
			margin-top: 10upx;
			width: 100%;
			height: 80upx;
			line-height: 80upx;
			color: #FFFFFF;
			background: #FF7A22;
			font-size: 30upx;
		}
	}
</style>
