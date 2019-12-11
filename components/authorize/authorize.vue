<template>
	<view class="list">
		<view class="item">
			<view class="">申请人：{{authorize.realName}}</view>
			<view class="type" :style="{backgroundColor:authorize.role=='ADMIN'?'#A742E1':'#476483'}" >{{authorize.role==='ADMIN'?'管理员':'服务员'}}</view>
		</view>
		<view class="item">
			<view class="">所在酒吧：{{authorize.barName}}</view>
			<view :class="[authorize.applyStatus==0?'status':'']">{{authorize.applyStatus==0?'待认证':'已认证'}}</view>
		</view>
		<view class="item">申请时间：{{authorize.createTime}}</view>
		<view v-if="authorize.applyStatus==1" class="item">认证时间：{{authorize.updateTime}}</view>
		<button :style="{backgroundColor:authorize.applyStatus==0?'#FF7A22':'#574968'}" @click="buttonClick">
			{{authorize.applyStatus==0?'立即认证':'取消认证'}}
		</button>
	</view>
</template>

<script>
	export default {
		name: 'authorize',
		props: {
			authorize: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {

			};
		},
		methods: {
			buttonClick() {
				let emit={
					status:this.authorize.applyStatus,
					userId:this.authorize.id
				}
				this.$emit('authorize', emit)
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
		margin-bottom: 25upx;
		.item{
			display: flex;
			justify-content: space-between;
			padding: 8upx 0;
			.type{
				padding: 4upx 10upx 0;
				height: 50upx;
				line-height: 50upx;
				border-radius: 6upx;
			}
			.status{
				display: flex;
				align-items: center;
			}
			.status::before{
				content: '';
				width: 25upx;
				height: 30upx;
				background-image: url('~@/static/authorize.png');
				background-size: 25upx 30upx;
				background-repeat: no-repeat;
				margin-right: 4upx;
			}
		}
		button{
			margin-top: 10upx;
			width: 100%;
			height: 80upx;
			line-height: 80upx;
			color: #FFFFFF;
			font-size: 30upx;
		}
	}
</style>
