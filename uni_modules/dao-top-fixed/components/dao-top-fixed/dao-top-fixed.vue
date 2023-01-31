<template class="">
  <view class="">
    <view class="head" :class="{ shadow: isShadow }" id="headDom" :style="`top: ${headHeight}px`">
      <slot></slot>
    </view>
    <view :style="`height: ${placeHeights}rpx`"></view>
  </view>
</template>

<script>
import common from '@/utils/common.js'
import { ref, onMounted } from 'vue'

export default {
  props: {
    isShadow: {
      type: Boolean,
      default: false,
    },
    placeHeight: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const placeHeights = ref(0)
    const headHeight = common.getStatusBarHeight()

    onMounted(async () => {
      let res = await common.domExec('headDom')
      placeHeights.value = props.placeHeight > 0 ? props.placeHeight : res.height

      console.log('placeHeight', res, placeHeights.value)
    })

    return {
      headHeight,
      placeHeights,
    }
  },
}
</script>

<style lang="scss" scoped>
.head {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  &.shadow {
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.007);
  }
}
</style>
