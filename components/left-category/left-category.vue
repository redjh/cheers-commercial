<template>
  <view class="container">
    <view class="page-body">
      <scroll-view class="nav-left" scroll-y :style="'height:' + height + 'px'">
        <view
          class="nav-left-item"
          @click="categoryClickMain(item, index)"
          :key="index"
          :class="index == categoryActive ? 'active' : ''"
          v-for="(item, index) in categoryList"
        >
          <view class="txt">{{ item.name }}</view>
        </view>
        <view class="foot"></view>
      </scroll-view>
      <scroll-view
        class="nav-right"
        scroll-y
        :scroll-top="scrollTop"
        @scroll="scroll"
        :style="'height:' + height + 'px'"
        scroll-with-animation
      >
        <view
          :id="index === 0 ? 'first' : ''"
          class="nav-right-item"
          v-for="(sub, index) in subList"
          :key="sub.id"
        >
          <view class="goods-wrap">
            <view class="img">
              <image :src="sub.image" />
              <!-- 商户端不需要查看返利 -->
              <!-- <view class="rebate">返利{{ sub.rate * 100 }}%</view> -->
            </view>
            <view class="name-price">
              <view>{{ sub.goodsName }}</view>
              <view class="price">
                <view class="sale-price">¥{{ sub.salePrice }}</view>
                <view class="origin-price">¥{{ sub.originalPrice }}</view>
              </view>
            </view>
          </view>
          <view class="h-line"></view>
          <view class="desc">
            <view class="txt">产品描述</view>
            <view class="txt">{{ sub.description | filterA }}</view>
            <view class="txt">{{ sub.description | filterB }}</view>
            <view class="txt">{{ sub.description | filterC }}</view>
          </view>
          <view class="h-line txt-line"></view>
          <!-- 增减数量 start -->
          <view class="goods-number">
            <view>数量</view>
            <view class="number">
              <image @click="decrease(sub)" src="../../static/index/minus.png" />
              <view>{{ sub.number }}</view>
              <image @click="increase(sub)" src="../../static/index/add.png" />
            </view>
          </view>
          <!-- 增减数量 end -->
          <view class="h-line txt-line"></view>
        </view>
        <page-foot></page-foot>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import common from "../../common/common.js";
export default {
  name: "left-category",
  props: {
    categoryList: {
      type: Array,
      default: []
    },
    subCategoryList: {
      type: Array
    }
  },
  data() {
    return {
      categoryActive: 0,
      scrollTop: 0,
      scrollHeight: 0,
      name: "七月_",
      height: 0,
      subList: []
    };
  },
  created() {
    console.log("shopping", this.shopping);
    this.height = uni.getSystemInfoSync().windowHeight;
    this.handleData();
  },
  watch: {
    subCategoryList: {
      handler() {
        console.error("【subCategoryList】=====【watch】");
        this.handleData();
      },
      deep: true
    }
  },
  methods: {
    /* 处理数据，给每个商品数据添加number */
    handleData() {
      this.subList = this.subCategoryList.map(item => Object.assign({}, { number: 0 }, item));
    },
    scroll(e) {
      this.scrollHeight = e.detail.scrollHeight;
    },
    /* 点击商品类目菜单 */
    categoryClickMain(categroy, index) {
      this.categoryActive = index;
      this.scrollTop = -this.scrollHeight * index;
      this.$emit("clickCategory", categroy.type);
    },
    /* 减少商品个数 */
    decrease(sub) {
      if (sub.number > 0) {
        sub.number--;
      }
      this.$emit("countMoney", sub);
    },
    /* 增加商品个数 */
    increase(sub) {
      sub.number++;
      this.$emit("countMoney", sub);
    }
  },
  /* 商品描述数据处理 */
  filters: common.descFilter
};
</script>

<style lang="scss">
.page-body {
  display: flex;
}

.nav {
  display: flex;
  width: 100%;
}

.nav-left {
  width: 30%;
  background: #493362;
}

.nav-left-item {
  height: 80upx;
  font-size: 30upx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-left-item .txt {
  flex: 1;
  display: flex;
  justify-content: center;
}

.active::before {
  content: "";
  height: 60upx;
  width: 2px;
  background: #ff8c1c;
  position: relative;
  left: 40upx;
}

.active {
  background: #372051;
}

// 右侧商品样式
.nav-right {
  width: 70%;
  color: #ffffff;

  .nav-right-item {
    // height: 400upx;
    margin-bottom: 15upx;
    padding: 11upx;
    font-size: 28upx;
    margin-right: 24upx;

    view {
      display: flex;
    }

    .h-line {
      height: 1px;
      width: 100%;
      background: #999999;
      margin-top: 10upx;
    }

    .txt-line {
      margin-top: 0;
    }
  }
}

$marginLeft: 10upx;
.goods-wrap {
  height: 135upx;
  & {
    margin-left: $marginLeft;
  }
  .img {
    position: relative;
    overflow: hidden;
    &,
    image {
      width: 220upx;
      height: 135upx;
    }
    /* 返利 start */
    .rebate {
      padding: 0 42upx;
      font-size: 20upx;
      background: #a303e6;
      line-height: 40upx;
      transform: rotate(45deg);
      white-space: nowrap;
      position: absolute;
      top: 20upx;
      right: -40upx;
    }
    /* 返利 end */
  }
  .name-price {
    flex: 1;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 20upx;
    margin-left: 10upx;

    .price {
      justify-content: space-between;

      .sale-price {
        color: #fffc1c;
        font-size: 12px;
      }

      .origin-price {
        font-size: 12px;
        text-decoration: line-through;
      }
    }
  }
}
.goods-number {
  justify-content: space-between;
  align-items: center;
  padding-right: 10upx;
  .number {
    align-items: center;
    justify-content: space-between;
    width: 140upx;
    image {
      width: 35upx;
      height: 35upx;
    }
  }
  & {
    margin-left: $marginLeft;
  }
}

.desc {
  & {
    margin-left: $marginLeft;
  }
  margin-top: 10upx;
  line-height: 1.5;
  flex-direction: column;
  .txt {
    font-size: 12px;
  }
}
</style>
