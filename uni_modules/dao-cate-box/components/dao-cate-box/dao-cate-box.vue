<template>
  <view>
    <view class="header-top abs">
      <view class="cate-box flex justify-between align-center" :class="isHeadBlacks ? 'box-black' : 'box-white'">
        <view class="flex justify-between flex-sub">
          <view
            class="item"
            v-for="(item, index) in list"
            :class="{ cur: current === item.type }"
            :key="index"
            @click="change(item)"
          >
            <view class="text">{{ item.title }}</view>
          </view>
        </view>
        <view class="menu-icon" :class="[isHeadBlacks ? 'box-black' : 'box-white']" @click="menuChange"></view>
      </view>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Array,
    default: () => {
      return []
    },
  },
  current: {
    type: String,
    default: '',
  },
  isPlace: {
    type: Boolean,
    default: true,
  },
  isHeadBlacks: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['change', 'menuChange'])

const change = (item) => {
  emit('change', item)
}

const menuChange = () => {
  emit('menuChange', '')
}
</script>

<style lang="scss" scoped>
.cate-box {
  padding-left: 80rpx;
  padding-right: 40rpx;
  &.box-black {
    .item {
      color: $text-gray-646464;
      &.cur {
        color: $text-gray-121212;
      }
    }
  }

  &.box-white {
    .item {
      color: #b3b3b3;
      &.cur {
        color: #fff;
      }
    }
  }

  .item {
    font-size: 36rpx;
    font-weight: 800;
    position: relative;
    @include function-transition-all-ease();

    .text {
      position: relative;
      z-index: 1;
    }

    &::after {
      content: '';
      @include function-transition-all-ease();
      @include function-transform-scale-rotate(0.5);
      bottom: -16rpx;
    }

    &.cur {
      font-weight: bold;

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 40rpx;
        background: url(@/static/images/cate-cur-ioc.png) no-repeat center;
        background-size: contain;
        left: 0;
        bottom: -6rpx;
        @include function-transition-all-ease();
        @include function-transform-scale-rotate(1);
      }
    }
  }
}

.menu-icon {
  width: 38rpx;
  height: 34rpx;
  margin-left: 100rpx;

  &.box-black {
    background: url(@/static/images/menu-icon.png) no-repeat center/cover;
  }

  &.box-white {
    background: url(@/static/images/menu-icon-white.png) no-repeat center/cover;
  }
}
</style>
