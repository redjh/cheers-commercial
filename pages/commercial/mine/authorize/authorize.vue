<template>
	<view class="page">
		<bg></bg>
		<view v-if="!success" class="info">
			<view class="row">
				姓名：
				<input class="uni-input" v-model="username" focus placeholder="请输入姓名" />
			</view>
			<view class="row">
				酒吧：
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="index" :range="barNameList">
						<view class="uni-input">{{ barNameList[index] }}</view>
					</picker>
				</view>
			</view>

			<view class="button"><button type="primary" @click="authorize">提交认证</button></view>
		</view>
		<view v-else class="result">提交成功，等待审核</view>
	</view>
</template>

<script>
import bg from '@/components/bg/bg.vue';
export default {
	components: {
		bg
	},
	data() {
		return {
			index: 0,
			bars:[],
			username: '',
			success: false
		};
	},
	async onLoad() {
		let res = await this.$http.get('users/current');
		if (res.data.code === 200) {
			let user = res.data.data;
			if(user.applyStatus === 0){
				this.success = true;
			}else{
				let bars = await this.$http.get('bars');
				if (bars.data.code === 200) {
					this.bars = bars.data.data;
				}
			}
		}
	},
	computed:{
		barNameList(){
			return this.bars.map((item)=>{
				return item.barName;
			})
		}
	},
	methods: {
		bindPickerChange(e) {
			this.index = e.target.value;
		},
		async authorize() {
			let realName = this.username.trim();
			if (realName === '') {
				uni.showToast({
					title: '姓名不能为空',
					icon: 'none'
				});
			} else {
				let res = await this.$http.post('users/apply', { realName, barId: this.bars[this.index].id });
				if (res.data.code === 200) {
					this.success = true;
				}
			}
		}
	}
};
</script>

<style lang="scss">
.page {
	.info {
		margin: 60upx 60upx 0;

		.row {
			display: flex;
			align-items: center;
			margin-top: 20upx;

			.uni-input {
				background: transparent;
				box-sizing: border-box;
				border: 1px solid #8585a6;
				border-radius: 10upx;
				line-height: 60upx;
				height: 60upx;
				padding: 0 24upx;
			}
		}

		.business {
			margin-top: 60upx;
		}

		.button {
			margin: 0 35upx;
			margin-top: 150upx;
			button[type='primary'] {
				background: #ff7a22;
				line-height: 80upx;
			}
		}
	}

	.result {
		text-align: center;
		font-size: 40upx;
		margin-top: 200upx;
	}
}
</style>
