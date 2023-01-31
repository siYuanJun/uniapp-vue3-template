<template>
  <button class="cu-btn button-themes" :class="btnClass" v-if="!props.loading && !isDisabled" @click="handlerSubmit">
    <view>{{ props.text }}</view>
  </button>
  <button class="cu-btn button-themes" :class="btnClass" v-else disabled>
    <view>{{ props.text }}</view>
    <uni-load-more
      iconType="circle"
      :iconSize="18"
      status="loading"
      color="#888"
      :contentText="{ contentrefresh: '&nbsp;' }"
      class="z-m-l-10"
      v-if="!isDisabled"
    />
  </button>
</template>

<script setup>
import throttle from '@/utils/throttle.js'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: '提交',
  },
  btnClass: {
    type: Array,
    default: () => {
      return []
    },
  },
})

const emit = defineEmits(['submit'])

const handlerSubmit = () => {
  throttle(() => {
    emit('submit')
  }, 200)
}
</script>

<style lang="scss" scoped>
.button-themes {
  max-width: $body-max-width;
  width: 100%;
  height: 98rpx;
  line-height: 98rpx;
  text-align: center;
  background: $color-themes;
  border-radius: $radius-df;
  font-size: 32rpx;
  font-weight: 700;
  color: $text-color-white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 32rpx;
  // box-shadow: 0 0 1rpx rgba(0, 0, 0, 0.25);

  &.round-sm {
    border-radius: 12rpx;
  }

  &.round {
    border-radius: 98rpx;
  }

  &.disabled,
  &[disabled] {
    opacity: 0.5;
    background: $color-themes;
    color: #fff;
  }

  &.bottom-fixed {
    position: fixed;
    bottom: 120rpx;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - $body-padding-lr * 2);

    &.small {
      width: 300rpx;
    }
  }
}
</style>
