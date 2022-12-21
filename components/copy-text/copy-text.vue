<template>
  <view class="flex align-center" @click="copyData">
    <view class="flex-sub">
      <slot name="content"></slot>
    </view>
    <image src="/static/business/copy.png" class="copy-icon"></image>
  </view>
</template>

<script setup>
import { getCurrentInstance } from 'vue'

const { proxy: that } = getCurrentInstance()

const props = defineProps(['content'])

const copyData = () => {
  uni.setClipboardData({
    data: props.content,
    success: () => {
      that.common.alert('复制成功')
    },
  })
}
</script>

<style lang="scss" scoped>
.copy-icon {
  width: 30rpx;
  height: 30rpx;
  margin-left: 20rpx;
}
</style>
