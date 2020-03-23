<template functional>
  <div class="drop-tip">
    <div class="txt">组件放置区域</div>
  </div>
</template>

<style lang="scss" scoped>
.drop-tip {
  position: relative;
  height: 50px;
  background-color: #94b4eb;
  .txt {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 1;
    padding: 6px 20px;
    font-size: 14px;
    color: #fff;
    background-color: #5487df;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      rgba(0, 153, 68, 0.5) 0,
      rgba(0, 153, 68, 0.5) 5%,
      transparent 5%,
      transparent 10%,
      rgba(0, 153, 68, 0.5) 10%,
      rgba(0, 153, 68, 0.5) 15%,
      transparent 15%,
      transparent 20%,
      rgba(0, 153, 68, 0.5) 20%,
      rgba(0, 153, 68, 0.5) 25%,
      transparent 25%,
      transparent 30%,
      rgba(0, 153, 68, 0.5) 30%,
      rgba(0, 153, 68, 0.5) 35%,
      transparent 35%,
      transparent 40%,
      rgba(0, 153, 68, 0.5) 40%,
      rgba(0, 153, 68, 0.5) 45%,
      transparent 45%,
      transparent 50%,
      rgba(0, 153, 68, 0.5) 50%,
      rgba(0, 153, 68, 0.5) 55%,
      transparent 55%,
      transparent 60%,
      rgba(0, 153, 68, 0.5) 60%,
      rgba(0, 153, 68, 0.5) 65%,
      transparent 65%,
      transparent 70%,
      rgba(0, 153, 68, 0.5) 70%,
      rgba(0, 153, 68, 0.5) 75%,
      transparent 75%,
      transparent 80%,
      rgba(0, 153, 68, 0.5) 80%,
      rgba(0, 153, 68, 0.5) 85%,
      transparent 85%,
      transparent 90%,
      rgba(0, 153, 68, 0.5) 90%,
      rgba(0, 153, 68, 0.5) 95%,
      transparent 95%,
      transparent
    );
  }
}
</style>