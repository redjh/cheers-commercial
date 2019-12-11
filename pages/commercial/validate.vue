<template>
	<view v-if="isOnlad" class="page">
		<!-- 	<template v-if="isOnlad">
			<navigator class="navigator" url="mine" open-type="switchTab">去认证</navigator>
		</template> -->
		<template v-if="validateSuccess">
			<!-- 核销成功 start -->
			<image class="img" src="../../static/validation/success.png" />
			<view class="txt">核销成功</view>
			<view class="order-wine">
				<navigator url="index" open-type="switchTab"><button type="primary" size="mini">点单</button></navigator>
			</view>
			<!-- 核销成功 end -->
		</template>
		<template v-else>
			<!-- 核销页面 start -->
			<view class="input-wrap">
				<view class="code">
					核销码:
					<input class="input" v-model="validationCode" placeholder="请输入核销码..." />
				</view>
				<view class="button"><button class="mini-btn" type="primary" size="mini" @click="validation">核销</button></view>
			</view>
			<view class="scanner" @click="scanner"><image src="../../static/validation/scan.png" /></view>
			<!-- 核销页面 end -->
		</template>
	</view>
</template>

<script>
import common from '../../common/common.js';
export default {
	data() {
		return {
			validationCode: '',
			isOnlad: false,
			validateSuccess: false
		};
	},
	async onLoad() {
		// let applyStatus = common.checkApply();
		// if (applyStatus) {
		// 	this.isOnlad = true;
		// }

		let res = await this.$http.get('users/current');
		if (res.data.code === 200) {
			let user = res.data.data;
			if(user.applyStatus === 1){
				this.isOnlad = true;
			}
		}
	},
	onHide() {
		this.validationCode = '';
		this.validateSuccess = false;
	},
	methods: {
		scanner() {
			let _this = this;
			uni.scanCode({
				onlyFromCamera: true,
				success(res) {
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
					_this.check(res.result.split('?')[1]);
				},
				fail(e) {
					console.error('扫码失败：', e);
				}
			});
		},
		/* 手动核销 */
		validation() {
			let code = this.validationCode.trim();
			if (code) {
				this.check(`code=${code}`);
			} else {
				uni.showToast({
					title: '请输入核销码',
					icon: 'none'
				});
			}
		},
		/* 验证核销结果 */
		async check(code) {
			let res = await this.$http.get(`appointments/valid?${code}`);
			if (res.data.code === 200) {
				uni.showLoading({ mask: true });
				// 触发页面实践，传递预约用户的id,用于第一次下单
				uni.$emit('validate_success', res.data.data);
				// uni.setStorageSync('appointmentUserId', res.data);
				setTimeout(() => {
					this.validateSuccess = true;
					// uni.reLaunch({ url: 'validation/result' });
					uni.hideLoading();
				}, 500);
			} else {
				uni.showToast({
					title: res.data.message,
					icon: 'none'
				});
			}
		}
	}
};
</script>

<style lang="scss">
.page {
	align-items: center;
	view {
		display: flex;
	}
	.input-wrap {
		height: 80upx;
		align-items: center;
		justify-content: center;
		.code {
			align-items: center;
			.input {
				margin-left: 10upx;
				height: 60upx;
				width: 385upx;
				box-sizing: border-box;
				border: 1px solid #8585a6;
				border-radius: 10upx;
				padding: 0 10upx;
				font-size: 28upx;
			}
		}
		.button {
			margin-left: 20upx;
			button[type='primary'] {
				background-color: #ce7117;
			}
		}
	}
	.scanner {
		height: 300upx;
		width: 50%;
		justify-content: center;
		align-items: center;
		image {
			width: 120upx;
			height: 105upx;
		}
	}
	/* 核销成功 start */
	.img {
		margin-top: 54upx;
		height: 200upx;
		width: 200upx;
	}

	.txt {
		margin-top: 40upx;
	}

	.order-wine {
		margin-top: 100upx;

		button[type='primary'] {
			width: 340upx;
			height: 60upx;
			background: #ff7a22;
		}
	}
	/* 核销成功 end */
}
// .navigator {
// 	text-align: center;
// 	padding-top: 250rpx;
// 	font-size: 30px;
// 	color: #fff;
// 	text-decoration: underline;
// }
</style>
