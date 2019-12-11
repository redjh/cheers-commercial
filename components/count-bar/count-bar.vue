<template>
	<view class="count" :style="{bottom:bottom+'px',height:height+'px',backgroundColor:color}">
		<view>合计：¥{{money}}</view>
		<view>
			<button @click="buttonClick" class="button-wrap" type="primary" size="mini"><slot/></button>
		</view>
	</view>
</template>

<script>
	export default {
		name:'count-bar',
		props:{
			bottom:{
				type:Number,
				default:0
			},
			height:{
				type:Number,
				default:40
			},
			color:{
				type:String,
				default:'#464661'
			},
			money:{
				type:Number,
				default:0
			}
		},
		data() {
			return {

			};
		},
		methods:{
			buttonClick(){
				this.$emit('confirm')
			}
		}
	}
</script>

<style lang="scss">
	.count {
		position: fixed;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;

		view {
			display: flex;
			padding: 0 40upx;
		}

		button[type=primary] {
			background-color: #CE7117;
			height: 50upx;
			line-height: 50upx;
		}
	}
</style>
