<template>
  <view class="">
    <view class="z-font-28 text-center" :class="[smsTextColor]" v-if="paramLoca.buttonLoaing" @tap="getSmsSubmit">
      {{ paramLoca.smsTxt }}
    </view>
    <view class="text-grey-1 z-font-28 text-center" v-else>{{ paramLoca.smsTxt }}</view>
  </view>
</template>

<script>
export default {
  props: {
    phone: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'register',
    },
    smsTextColor: {
      type: String,
      default: 'text-gray-666',
    },
  },
  data() {
    return {
      paramLoca: {
        smsMiao: 60,
        smsTxt: '获取验证码',
        buttonLoaing: true,
      },
    }
  },
  methods: {
    smsMiaoChang() {
      let that = this
      that.paramLoca.smsTxt = '(' + this.paramLoca.smsMiao + 's 重新获取)'
      if (that.paramLoca.smsMiao > 0) {
        that.paramLoca.smsMiao -= 1
        setTimeout(() => {
          that.smsMiaoChang()
        }, 1000)
      } else {
        that.paramLoca.smsMiao = 60
        that.paramLoca.smsTxt = '获取验证码'
        that.paramLoca.buttonLoaing = true
      }
    },
    getSmsSubmit() {
      const that = this
      if (that.paramLoca.smsMiao !== 60) {
        return
      }
      if (!that.phone) {
        that.common.alert('请先输入手机号')
        return
      }
      if (that.common.phoneVerification(that.phone)) {
        that.common.alert('手机号格式错误')
        return
      }

      that.smsMiaoChang()

      that.paramLoca.buttonLoaing = false
      return

      sendSms({ phone: this.phone, type: this.type })
        .then((res) => {
          that.smsMiaoChang()
        })
        .catch((err) => {})
    },
  },
}
</script>

<style></style>
