<template>
  <view class="">
    <view class="cu-steps">
      <view
        class="cu-item"
        :class="[item.status > numCurrent ? '' : 'text-blue oldstatus ', numCurrent === item.status ? 'cur' : '']"
        v-for="(item, index) in numList"
        :key="index"
      >
        <text class="num"></text>
        {{ item.name }}
      </view>
    </view>
  </view>
</template>

<script>
import { reactive } from 'vue'

export default {
  props: {
    numList: {
      type: Array,
      default: [
        {
          name: '填写信息',
          status: 1,
        },
        {
          name: '平台服务',
          status: 2,
        },
        {
          name: '完成',
          status: 4,
        },
      ],
    },
    numCurrent: {
      type: Number,
      default: 1,
    },
  },
  setup() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.cu-steps .cu-item {
  &.oldstatus {
    color: $color-themes;
    .num {
      width: 36rpx;
      height: 36rpx;
      box-shadow: 0 0 0 0 rgba(#9fa9c6, 0.3);
      background: none;
      border: 2rpx solid $color-themes;
      margin: 20rpx auto;

      &::after {
        color: $color-themes;
      }
    }
  }
  .num {
    width: 16rpx;
    height: 16rpx;
    background: #9fa9c6;
    box-shadow: 0 0 0 8rpx rgba(#9fa9c6, 0.3);
    border: none;
    margin: 32rpx auto;
  }
  &.cur {
    .num {
      width: 16rpx;
      height: 16rpx;
      background: $color-themes;
      box-shadow: 0 0 0 8rpx rgba($color-themes, 0.3);
      border: none;
      margin: 32rpx auto;

      &::after {
        content: '';
      }
    }
  }
}
</style>
