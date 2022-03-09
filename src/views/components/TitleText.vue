<template>
  <div class="title-text">
    <div class="top">
      <h1 class="title">{{ info.title || "请编辑标题内容" }}</h1>
      <div class="more">
        <span class="txt">查看更多</span>
      </div>
    </div>
    <div class="sub">{{ info.desc || "请编辑标题描述" }}</div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.title-text {
  padding: 16px 0;
  margin: 0 16px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .title {
    font-size: 16px;
    color: #323232;
  }
  .txt {
    color: #38f;
    font-size: 12px;
  }
  .sub {
    font-size: 12px;
    color: #969696;
    margin-top: 8px;
  }
}
</style>
