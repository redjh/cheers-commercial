<template>
	<view class="page">
		<template v-if="isOnload">
			<view ref="goods" class="goods">
				<left-category @click-category="clickCategory" @count-money="countMoney" :categoryList="categoryList" :subCategoryList="subCategoryList"></left-category>
			</view>
			<count-bar :money="totalMoney" @confirm="togglePopup">结算</count-bar>
		</template>
		<uni-popup :show="show" type="center" :custom="true" :mask-click="false" @change="change">
			<view class="uni-tip">
				<view class="uni-tip-title">请输入桌号</view>
				<view class="uni-tip-content"><input class="uni-input" maxlength="3" type="number" v-model.number="tableNo" focus placeholder="桌号不能为空..." /></view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @click="cancel">取消</view>
					<view class="uni-tip-button" @click="confirm">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import common from '../../common/common.js';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import countBar from '@/components/count-bar/count-bar.vue';
import leftCategory from '@/components/left-category/left-category.vue';
export default {
	components: {
		leftCategory,
		countBar,
		uniPopup
	},
	data() {
		return {
			isOnload: false,
			applyStatus: false,
			categoryList: [{ name: '酒水', type: 0 }, { name: '饮料', type: 1 }, { name: '小吃', type: 2 }],
			subCategoryList: [],
			shoppingCart: [], //购物车
			goodsNumList: [], //商品数量
			totalMoney: 0, //总金额
			show: false, //控制输入弹框是否显示
			tableNo: '', //桌号
			customerId: '' //已核销预约用户的ID
		};
	},
	async onLoad() {
		console.error('onLoad');
		// let applyStatus = common.checkApply();
		let res = await this.$http.get('users/current');
		if (res.data.code === 200) {
			let user = res.data.data;
			if(user.applyStatus === 1){
				this.getSubCategoryList(0);
			}
		}
		// if (applyStatus) {
		// 	this.getSubCategoryList(0);
		// }

		//每次打开首页时，需要监听一次是否收到核销用户的ID
		uni.$on('validate_success', data => {
			this.customerId = data;
			console.log('validate_success-----on');
		});
	},
	onUnload() {
		uni.$off('validate_success', e => {
			console.warn(e);
		});
	},
	onShow() {
		// 重其他页面返回首页时，购物车商品及总金额归零
		this.shoppingCart = [];
		this.totalMoney = 0;
		// 从其他页面返回首页时，商品选择数量归零
		this.subCategoryList.map(item => {
			if (item.number > 0) {
				item.number = 0;
			}
			item.random = Math.random();
		});
		console.error('onShow', this.subCategoryList);
	},
	methods: {
		/* 点击商品类目菜单 */
		clickCategory(type) {
			//this.type = type;
			this.getSubCategoryList(type);
		},
		/* 获取单个栏目数据 */
		async getSubCategoryList(type) {
			uni.showLoading({ mask: true });
			let res = await this.$http.get('goods', { type });
			if (res.data.code) {
				this.mergeData(res.data.data);
				this.isOnload = true; //只有页面初始化的时候有作用
				uni.hideLoading();
			}
		},
		/* 将购物车中的商品数量合并到每次请求的商品中 */
		mergeData(subCategoryList) {
			for (let goods of this.shoppingCart) {
				for (let sub of subCategoryList) {
					if (goods.id === sub.id) {
						sub.number = goods.number;
					}
				}
			}
			this.subCategoryList = subCategoryList;
			console.error('mergeData');
		},
		/* 计算购物车金额 */
		countMoney(e) {
			// 如果已在购物车，将旧数据替换为新数据
			let has = this.shoppingCart.find(goods => {
				if (goods.id === e.id) {
					goods.number = e.number;
					return goods;
				}
			});
			console.log('hasThisGoods:', JSON.stringify(has));
			!has && this.shoppingCart.push(e);
			console.log('shoppingCart商品种类：', JSON.stringify(this.shoppingCart));
			//计算总金额
			let totalMoney = this.shoppingCart.reduce((accumulator, value, index) => {
				return (accumulator = accumulator + value.number * value.salePrice * 100);
			}, 0);
			this.totalMoney = Number.parseFloat(totalMoney / 100).toFixed(2);
		},
		/* 弹框打开事件 */
		togglePopup() {
			if (this.totalMoney === 0) {
				return uni.showToast({
					title: '请先选择商品!',
					icon: 'none',
					mask: true
				});
			}
			this.tableNo = '';
			this.show = true;
		},
		/* 弹框取消事件 */
		cancel() {
			this.show = false;
		},
		/* 弹框确认事件 ～～ 下订单 */
		async confirm() {
			let tableNo = this.tableNo;
			if (tableNo !== '') {
				let orderGoods = this.shoppingCart.map(item => {
					return {
						goodsId: item.id,
						num: item.number
					};
				});
				//预约用户第一次点单，需要取得用户的ID
				// let customerId = uni.getStorageSync('appointmentUserId');

				let res = await this.$http.post('orders', { orderGoods, tableNo, customerId: this.customerId });
				if (res.data.code === 200) {
					// if (customerId !== '') {
					// 	//预约用户第一次下单成功后，删除用户ID
					// 	uni.removeStorageSync('appointmentUserId');
					// }
					this.customerId = '';
					this.cancel();
					uni.navigateTo({
						url: `order/preview?orderId=${res.data.data}`,
						fail(e) {
							console.error(e);
						}
					});
				} else {
					this.cancel();
					setTimeout(() => {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						});
					}, 500);
				}
			}
		},
		change(e) {
			console.log(e.show);
		}
	}
};
</script>

<style lang="scss">
page {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
}
/* 提示窗口 --start*/
.uni-tip {
	padding: 15px;
	width: 250px;
	background: #fff;
	box-sizing: border-box;
	border-radius: 10px;
	margin-top: -70px;
}
.uni-tip .uni-input {
	border: 1px solid;
	border-radius: 5px;
}
.uni-tip-title {
	text-align: center;
	font-weight: bold;
	font-size: 16px;
	color: #333;
}

.uni-tip-content {
	padding: 15px;
	font-size: 14px;
	color: #666;
}

.uni-tip-group-button {
	margin-top: 10px;
	display: flex;
}

.uni-tip-button {
	width: 100%;
	text-align: center;
	font-size: 14px;
	color: #3b4144;
}
/* 提示窗口 --end*/

.navigator {
	text-align: center;
	padding-top: 250rpx;
	font-size: 30px;
	color: #fff;
	text-decoration: underline;
}
</style>
