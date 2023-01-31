<template>
  <view class="z-p-l-28 z-p-r-28">
    <view class="list">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  options: {
    styleIsolation: 'shared',
  },
}
</script>

<style lang="scss" scoped>
.list {
  margin-top: 40rpx;
  ::v-deep .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgb(15, 14, 14);
    border-radius: $radius-df;
    padding: 20rpx 33rpx;
    margin-bottom: 45rpx;

    .cu-avatar {
      width: 83rpx;
      height: 83rpx;
    }
  }
}
</style>
