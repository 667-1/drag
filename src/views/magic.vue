<template>
  <div class="box">
    <el-select v-model="mode" placeholder="请选择" class="select" size="small">
      <el-option label="4 x 4" :value="4" />
      <el-option label="5 x 5" :value="5" />
      <el-option label="6 x 6" :value="6" />
      <el-option label="7 x 7" :value="7" />
    </el-select>
    <div class="container" ref="container">
      <div class="row" v-for="(item, row) in mode" :key="row">
        <div
          :class="[
            'item',
            highLight.some((item) => item == `${row}${col}`) && begin
              ? 'item-selected'
              : '',
          ]"
          v-for="(item1, col) in mode"
          :key="col"
          :style="itemStyle"
          @click="tapItem(row, col)"
          @mouseenter="enterItem(row, col)"
        ></div>
      </div>
      <div
        :class="['cover', item.select ? 'cover-select' : '']"
        :style="item.style"
        v-for="(item, index) in coverStyle"
        :key="'cover-' + index"
        @click="coverTap(item, index)"
      >
        <div class="innertxt">
          <div>
            <span>{{ item | coverSize(mode) }}</span>
            <span v-show="mode == 4">像素</span>
          </div>
          <div v-show="mode != 7">或同等比例</div>
        </div>
        <i
          class="cover-close el-icon-close"
          @click="coverStyle.splice(index, 1)"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mode: 4,
      width: 81.5,
      begin: false,
      itemStyle: "",
      isSetOne: false,
      coverStyle: [],
      highLight: [],
      tapArr: [],
    };
  },
  watch: {
    mode: {
      handler() {
        this.$nextTick(() => {
          this.isSetOne = false;
          this.tapArr = [];
          this.highLight = [];
          this.coverStyle = [];
          this.width = this.$refs.container.clientWidth / this.mode;
          this.itemStyle = `
            width: ${this.width}px;
            height: ${this.width}px;
          `;
        });
      },
      immediate: true,
    },
  },
  methods: {
    tapItem(row, col) {
      this.begin = true;
      this.highLight.push(`${row}${col}`);
      this.tapArr.push(`${row}${col}`);
      this.highLight = [...new Set(this.highLight)];
      if (this.tapArr.length == 2) {
        let startRow = this.tapArr[0].split("")[0];
        let startCol = this.tapArr[0].split("")[1];
        let beginRow = this.isSetOne ? startRow : Math.min(startRow, row);
        let beginCol = this.isSetOne ? startCol : Math.min(startCol, col);
        let endRow = Math.max(
          startRow,
          this.isSetOne ? startRow : this.tapArr[1].split("")[0]
        );
        let endCol = Math.max(
          startCol,
          this.isSetOne ? startCol : this.tapArr[1].split("")[1]
        );
        this.clearCoverBorder();
        this.coverStyle.push({
          area: {
            beginRow,
            beginCol,
            endRow,
            endCol,
          },
          style: {
            left: beginCol * this.width + "px",
            top: beginRow * this.width + "px",
            right: (this.mode - 1 - endCol) * this.width - 1 + "px",
            bottom: (this.mode - 1 - endRow) * this.width - 1 + "px",
          },
          select: true,
        });
        this.begin = false;
        this.highLight = [];
        this.tapArr = [];
      }
    },
    clearCoverBorder() {
      this.coverStyle.forEach((item) => {
        item.select = false;
      });
    },
    enterItem(row, col) {
      if (this.begin) {
        let position = `${row}${col}`;
        let startRow = this.tapArr[0].split("")[0];
        let startCol = this.tapArr[0].split("")[1];
        let beginRow = Math.min(startRow, row);
        let beginCol = Math.min(startCol, col);
        let endRow = Math.max(startRow, row);
        let endCol = Math.max(startCol, col);
        if (this.highLight.indexOf(position) == -1) {
          this.drawLight(beginRow, endRow, beginCol, endCol);
        } else {
          this.highLight = [];
          this.drawLight(beginRow, endRow, beginCol, endCol);
        }
        this.isSetOne = false;
        if (this.coverStyle.length > 0) {
          this.coverStyle.forEach((item) => {
            let arr1 = [];
            let arr2 = [];
            for (let o = item.area.beginRow; o <= item.area.endRow; o++) {
              for (let k = item.area.beginCol; k <= item.area.endCol; k++) {
                arr1.push(`${o}${k}`);
              }
            }
            for (let i = beginRow; i <= endRow; i++) {
              for (let j = beginCol; j <= endCol; j++) {
                arr2.push(`${i}${j}`);
              }
            }
            arr1.forEach((item) => {
              arr2.forEach((ite) => {
                if (item == ite) {
                  this.highLight = [this.highLight[0]];
                  this.isSetOne = true;
                }
              });
            });
          });
        }
      }
    },
    drawLight(beginRow, endRow, beginCol, endCol) {
      for (let i = beginRow; i <= endRow; i++) {
        for (let j = beginCol; j <= endCol; j++) {
          this.highLight.push(`${i}${j}`);
        }
      }
      this.highLight = [...new Set(this.highLight)];
    },
    leaveContainer() {
      this.begin = false;
      this.highLight = [];
      this.tapArr = [];
    },
    coverTap(item, index) {
      console.log(index);
      this.clearCoverBorder();
      item.select = true;
    },
  },
  filters: {
    coverSize(item, mode) {
      return (
        Math.round((750 / mode) * (item.area.endCol - item.area.beginCol + 1)) +
        "×" +
        Math.round((750 / mode) * (item.area.endRow - item.area.beginRow + 1))
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  padding-top: 50px;
}

.select {
  margin-bottom: 20px;
}

.container {
  position: relative;
  width: 326px;
  height: 326px;
  border-right: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  background-color: #fff;
  margin: 0 auto;
  .row {
    display: flex;
    align-items: center;
    .item {
      cursor: pointer;
      border-top: 1px solid #e5e5e5;
      border-left: 1px solid #e5e5e5;
    }
    .item-selected {
      background-color: #e8f7fd;
    }
  }
  .cover {
    cursor: pointer;
    position: absolute;
    border: 1px solid #bdf;
    background-color: #e8f7fd;
    .innertxt {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 100%;
      text-align: center;
      font-size: 12px;
      line-height: 16px;
      color: #88c4dc;
    }
    .cover-close {
      display: none;
      position: absolute;
      right: -10px;
      top: -10px;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      color: #fff;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
    }
  }
  .cover-select {
    cursor: default;
    border: 1px solid #38f;
    z-index: 1;
    &:hover {
      .cover-close {
        display: block;
        cursor: pointer;
      }
    }
  }
}
</style>
