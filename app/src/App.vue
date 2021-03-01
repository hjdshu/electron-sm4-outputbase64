<template>
  <div id="app">
    <h2>输出sm4(ouput base64格式)的加密</h2>
    <div>JavaScript示范：</div>
    <code>
      import { SM4 } from "gm-crypto";
      var val = SM4.encrypt(raw, this.val, {
        inputEncoding: "utf8",
        outputEncoding: "base64",
      });
    </code>
    <br>
    <br>
    <div>密钥</div>
    <input v-model="val" type="password" placeholder="请输入密钥" />
    <div>加密/解密字符</div>
    <input v-model="val2" type="text" placeholder="请输入字符" />
    <br />
    <br />
    <br />
    <div>
      结果:<span>{{ val3 }}</span>
    </div>
    <div>
      <button @click="encryptSensitiveData(val2)">加密</button>
      <button @click="decryptSensitiveData(val2)">解密</button>
    </div>
    <br />
  </div>
</template>

<script>
import { SM4 } from "gm-crypto";
let clipboardWrite = () => {
  alert("请yarn dev 在electron环境下操作");
};
if (window.electron) {
  const { clipboard } = window.electron;
  clipboardWrite = function (text) {
    clipboard.writeText(text);
    alert("复制成功");
  };
}

export default {
  name: "App",
  components: {},
  data() {
    return {
      val: "",
      val2: "",
      val3: "",
    };
  },
  methods: {
    copy() {
      clipboardWrite(this.val);
    },
    encryptSensitiveData(raw) {
      try {
        this.val3 = SM4.encrypt(raw, this.val, {
          inputEncoding: "utf8",
          outputEncoding: "base64",
        });
      } catch (e) {
        alert("加密出错，请输入正确的密钥和字符串");
      }
    },
    decryptSensitiveData(raw) {
      try {
        this.val3 = SM4.decrypt(raw, this.val, {
          inputEncoding: "base64",
          outputEncoding: "utf8",
        });
      } catch (e) {
        alert("解密出错，请输入正确的密钥和加密字符串");
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>
