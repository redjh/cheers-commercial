<template>
	<view>
		<form @submit.stop="formSubmit" @reset="formReset">
			<view class="info-list">
				<view class="single-info">
					<view class="uni-title">车牌号</view>
					<view class="uni-list-cell"><input class="uni-input" name="carNo" /></view>
				</view>
				<view class="single-info">
					<view class="uni-title">司机名</view>
					<view class="uni-list-cell"><input class="uni-input" name="driver" /></view>
				</view>
				<view class="single-info">
					<view class="uni-title">司机电话</view>
					<view class="uni-list-cell"><input class="uni-input" type="number" name="driverTel" /></view>
				</view>
				<view class="single-info">
					<view class="uni-title">查询地址</view>
					<view class="uni-list-cell"><input class="uni-input" name="searchUrl" /></view>
				</view>
			</view>
			<view class="button-wrap">
				<button formType="submit" type="primary" style="background-color: #FF7A22;">确定</button>
				<button formType="reset" type="default" style="background-color: #463956;">取消</button>
			</view>
		</form>
	</view>
</template>

<script>
import graceChecker from '@/common/graceChecker.js';
import fromRule from '@/common/fromRule.js';
export default {
	data() {
		return {
			id: ''
		};
	},
	onLoad(option) {
		this.id = option.id;
	},
	methods: {
		/* 表单提交 */
		formSubmit: async function(e) {
			//定义表单规则，进行表单检查
			let formData = e.detail.value;
			let checkRes = graceChecker.check(formData, fromRule.rule);
			if (checkRes) {
				formData.id = this.id;
				let res = await this.$http.post('cars', formData);
				if (res.data.code === 200) {
					uni.showToast({ title: '处理成功', icon: 'none' });
					setTimeout(() => {
						uni.reLaunch({ url: 'index' });
					}, 500);
				}
			} else {
				// 表单检验出错
				uni.showToast({ title: graceChecker.error, icon: 'none' });
			}
		},
		/* 清除表单数据 */
		formReset: function(e) {
			this.chosen = '';
			uni.reLaunch({ url: 'index' });
		}
	}
};
</script>

<style lang="scss">
page {
	display: flex;
	flex-direction: column;
	.single-info {
		display: flex;
		margin-top: 26upx;
		.uni-title {
			width: 180upx;
			text-align: right;
			padding-right: 20upx;
		}
		.uni-list-cell {
			flex: 1;
			margin-right: 70upx;
			input {
				border: 1px solid #8585a6;
				border-radius: 5px;
				background: #372051;
			}
			&::after {
				height: 0;
			}
		}
	}
	.button-wrap {
		display: flex;
		margin-top: 68upx;
		padding: 0 30upx;
		button {
			width: 200upx;
			color: #ffffff;
		}
	}
}
</style>
