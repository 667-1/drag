<template>
  <div class="titleText-set">
    <div class="item">
      <div class="title" @click="handle">标题内容</div>
      <el-input
        v-model="value.title"
        placeholder="请输入标题内容"
        size="small"
      ></el-input>
    </div>
    <div class="item">
      <div class="title">描述内容</div>
      <el-input
        v-model="value.desc"
        type="textarea"
        resize="none"
        :rows="3"
        placeholder="请输入描述内容"
        size="small"
      ></el-input>
    </div>
    <div class="hr"></div>
    <div class="d-item" v-for="(item, index) in list" :key="index">
      <div class="lt">
        <div class="title">{{ item.title }}</div>
        <div class="txt">{{ value[item.bindname] }}</div>
      </div>
      <div class="rt">
        <el-radio-group
          v-model="value[item.bindname]"
          size="mini"
          v-if="item.type == 'radio'"
        >
          <el-radio-button
            v-for="(ite, ind) in item.radioList"
            :key="ind"
            :label="ite.label"
          ></el-radio-button>
        </el-radio-group>
        <el-color-picker
          v-model="value[item.bindname]"
          size="mini"
          v-if="item.type == 'color'"
        ></el-color-picker>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      list: [
        {
          title: "显示位置",
          bindname: "radio4",
          type: "radio",
          radioList: [
            {
              label: "居左",
              icon: "",
            },
            {
              label: "居中",
              icon: "",
            },
          ],
        },
        {
          title: "标题大小",
          bindname: "title-size",
          type: "radio",
          radioList: [
            {
              label: "大",
              icon: "",
            },
            {
              label: "中",
              icon: "",
            },
            {
              label: "小",
              icon: "",
            },
          ],
        },
        {
          title: "描述大小",
          bindname: "desc-size",
          type: "radio",
          radioList: [
            {
              label: "大",
              icon: "",
            },
            {
              label: "中",
              icon: "",
            },
            {
              label: "小",
              icon: "",
            },
          ],
        },
        {
          title: "标题粗细",
          bindname: "desc-size1",
          type: "radio",
          radioList: [
            {
              label: "常规",
              icon: "",
            },
            {
              label: "加粗",
              icon: "",
            },
          ],
        },
        {
          title: "标题颜色",
          bindname: "desc-color",
          type: "color",
          default: "#323233",
        },
        {
          title: "描述颜色",
          bindname: "desc-desc",
          type: "color",
          default: "#969799",
        },
        {
          title: "背景颜色",
          bindname: "desc-bg",
          type: "color",
          default: "#ffffff",
        },
        {
          title: "底部分割线",
          bindname: "radio5",
          type: "radio",
          radioList: [
            {
              label: "展示",
              icon: "",
            },
            {
              label: "不展示",
              icon: "",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handle() {
      console.log(1);
    }
  }
};
</script>

<style lang="scss" scoped>
.hr {
  height: 1px;
  margin: 20px 0;
  background-color: #ebedf0;
}

.titleText-set {
  margin-top: -20px;

  .item {
    margin-top: 20px;

    .title {
      font-size: 14px;
      margin-bottom: 10px;
    }
  }

  .d-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    .lt {
      display: flex;
      align-items: center;

      .title {
        margin-right: 16px;
        font-size: 14px;
        color: #969799;
      }
      
      .txt {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
}
</style>
