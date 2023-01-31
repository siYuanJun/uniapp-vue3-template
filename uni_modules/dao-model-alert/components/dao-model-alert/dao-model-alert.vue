<template>
  <uni-popup ref="labelPopup" type="center" :maskClick="false">
    <view class="dialog-box">
      <view class="z-p-t-20 z-p-b-50 z-font-32 text-w text-center title" v-if="props.title">{{ props.title }}</view>
      <slot name="info">
        <view class="z-p-t-36 z-p-b-50 z-font-28 text-center info" v-if="props.info">{{ props.info }}</view>
      </slot>
      <view class="flex justify-between padding-lr-lg">
        <dao-button-submit @submit="cancelSubmit" :text="props.cancelText"></dao-button-submit>
        <dao-button-submit
          :btn-class="['bg-blue']"
          @submit="confirmSubmit"
          :text="props.confirmText"
        ></dao-button-submit>
      </view>
    </view>
  </uni-popup>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  emits: ['cancelSubmit', 'confirmSumbit'],

  props: {
    title: {
      type: String,
      default: '',
    },
    info: {
      type: String,
      default: '',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    confirmText: {
      type: String,
      default: '确定',
    },
  },
  setup(props, { emit, expose }) {
    const labelPopup = ref(false)
    const open = () => {
      labelPopup.value.open()
    }
    const close = () => {
      labelPopup.value.close()
    }
    expose({ open, close })

    const cancelSubmit = () => {
      close()
      emit('cancelSubmit')
    }
    const confirmSubmit = () => {
      close()
      emit('confirmSubmit')
    }

    return {
      confirmSubmit,
      cancelSubmit,
      open,
      close,
      labelPopup,
      props,
    }
  },
}
</script>

<style lang="scss"></style>
