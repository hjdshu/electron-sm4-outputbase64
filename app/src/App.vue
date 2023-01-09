<template>
  <div id="app">
    <div class="blockcenter">
      <h2 class="">SM4(BASE64)加解密工具</h2>
      <div class="">JavaScript加密代码示范：</div>
      <code>
        import { SM4 } from "gm-crypto"; <br />
        var val = SM4.encrypt(raw, this.val, {<br />
        inputEncoding: "utf8",<br />
        outputEncoding: "base64",<br />
        });<br />
      </code>
      <br />
      <br />
      <div>
        密钥
        <input
          type="checkbox"
          label="保存密码"
          :checked="isSave"
          name="save_s"
          @change="checked"
        /><label for="save_s">保存密钥</label>
      </div>
      <input
        v-model="val"
        type="password"
        oncopy="return false"
        placeholder="请输入密钥"
        @change="keyChange"
      />
      <div>加密/解密字符</div>
      <input v-model="val2" type="text" placeholder="请输入字符" />
      <br />
      <br />
      <div>
        结果：<span>{{ val3 || '暂无结果' }}</span>&nbsp;&nbsp;
        <button @click="copy" v-if="val3">复制</button>
      </div>
      <div style="margin-top: 5px">
        <button @click="encryptSensitiveData(val2)">加密</button>
        &nbsp; &nbsp; &nbsp;
        <button @click="decryptSensitiveData(val2)">解密</button>
      </div>
      <br />
      <div>密钥生成</div>
      <button @click="createKey">点击随机生成</button>
      <div v-if="key">
        {{ key }} <button @click="copyRandomKey">复制</button>
      </div>
    </div>
  </div>
</template>

<script>
import { SM4 } from "gm-crypto";
let clipboardWrite = () => {
  Toast("请yarn dev 在electron环境下操作");
};

function Toast(msg, duration) {
  duration = isNaN(duration) ? 3000 : duration;
  var m = document.createElement("div");
  m.innerHTML = msg;
  m.style.cssText =
    "max-width:80%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
  document.body.appendChild(m);
  setTimeout(function () {
    var d = 0.5;
    m.style.webkitTransition =
      "-webkit-transform " + d + "s ease-in, opacity " + d + "s ease-in";
    m.style.opacity = "0";
    setTimeout(function () {
      document.body.removeChild(m);
    }, d * 1000);
  }, duration);
}

if (window.electron) {
  const { clipboard } = window.electron;
  clipboardWrite = function (text) {
    clipboard.writeText(text);
    Toast("复制成功", 1000);
  };
}

export default {
  name: "App",
  components: {},
  data() {
    return {
      val: localStorage.getItem("is_save_key")
        ? localStorage.getItem("s_key") || ""
        : "",
      val2: "",
      val3: "",
      key: "",
      isSave: !!localStorage.getItem("is_save_key"),
    };
  },
  methods: {
    copy() {
      clipboardWrite(this.val3);
    },
    encryptSensitiveData(raw) {
      if (!raw) {
        Toast("请输入加解密字符", 1000);
        return;
      }
      try {
        this.val3 = SM4.encrypt(raw, this.val, {
          inputEncoding: "utf8",
          outputEncoding: "base64",
        });
      } catch (e) {
        Toast("加密出错，请输入正确的密钥字符串", 1000);
      }
    },
    decryptSensitiveData(raw) {
      if (!raw) {
        Toast("请输入加解密字符", 1000);
        return;
      }
      try {
        this.val3 = SM4.decrypt(raw, this.val, {
          inputEncoding: "base64",
          outputEncoding: "utf8",
        });
      } catch (e) {
        Toast("解密出错，请输入正确的密钥字符串", 1000);
      }
    },

    keyChange() {
      if (this.isSave) {
        localStorage.setItem("s_key", this.val);
      }
    },

    createKey() {
      let x = "abcdef0123456789";

      let d = "";

      for (var i = 0; i < 32; i++) {
        d += x.charAt(parseInt(Math.random() * 16));
      }
      this.key = d;
    },
    checked(e) {
      this.isSave = e.target.checked;
      if (!this.isSave) {
        localStorage.removeItem("s_key");
        localStorage.removeItem("is_save_key");
      } else {
        localStorage.setItem("is_save_key", true);
      }
    },
    copyRandomKey() {
      clipboardWrite(this.key);
    },
  },
};
</script>

<style lang="less" scoped>
#app{
  display: flex;
  justify-content: center;
}
.blockcenter{
  width: 350px;
}
.center {
  text-align: center;
}
.center-code {
  display: block;
  margin: 20px auto;
  width: 300px;
}
</style>
