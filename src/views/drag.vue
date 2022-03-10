<template>
  <div class="tempset">
    <div class="left-content">
      <el-collapse value="base">
        <el-collapse-item
          class="coll-item"
          :name="item.type"
          v-for="(item, index) in baseList"
          :key="`col${index}`"
        >
          <template slot="title">
            <div class="title">
              <i class="el-icon-setting"></i>
              <i>{{ item.name }}</i>
            </div>
          </template>
          <div class="base-content">
            <div
              :class="['item', { disabled: ite.disabled }]"
              v-for="(ite, ind) in item.list"
              :key="`base${ind}`"
              :draggable="ite.disabled ? false : true"
              @dragstart="dragPosition = [index, ind]"
              @dragend="dragPosition = []"
            >
              <i class="icon" :style="`background-image:url(${ite.icon});`"></i>
              <div class="name">{{ ite.name }}</div>
              <div class="num">{{ ite.num }}/{{ ite.maxnum }}</div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="mid-content">
      <div
        class="show-content"
        @dragover="dragOver"
        @dragenter="dragenter"
        @dragleave="dragleave"
        @drop="drop"
      >
        <div :class="['content', { 'pe--none': showDropTip }]">
          <div
            :class="[
              'item-box',
              {
                'item-box--active':
                  renderList.length > 1 && renderList[0].type == 'dropTip'
                    ? setIndex + 1 == index
                    : setIndex == index,
              },
            ]"
            v-for="(item, index) in renderList"
            :key="index"
            @click="showSet(item, index)"
          >
            <component :is="item.type" :info="item.info"></component>
            <template v-if="item.name">
              <div class="item-tag">
                <div class="arrow"></div>
                <div class="txt">{{ item.name }}</div>
              </div>
              <div class="item-del" @click.stop="delSingle(item, index)">
                <i class="icon el-icon-delete"></i>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="right-content">
      <div class="oh-content">
        <div class="title">{{ rightTitle }}</div>
        <div class="right-set">
          <template v-if="showBaseSet">
            <div class="set-clearall">
              <el-button
                class="clear-btn"
                type="text"
                size="small"
                v-show="setList.length > 0"
                @click="delAll"
                >清除组件</el-button
              >
            </div>
            <Draggable
              v-bind="setOptions"
              v-model="setList"
              @update="setDragUpdate"
            >
              <div
                class="right-base-set"
                v-for="(item, index) in setList"
                :key="`set${index}`"
              >
                <div class="item-left">
                  <i class="el-icon-share"></i>
                  <i>{{ item.name }}</i>
                </div>
                <i
                  class="icon el-icon-delete"
                  @click="delSingle(item, index)"
                ></i>
              </div>
            </Draggable>
          </template>
          <template v-else>
            <div class="right-render-set">
              <div
                class="right-set-item"
                v-if="renderList.length && renderList[setIndex]"
              >
                <component
                  :is="
                    renderList[
                      renderList[0].type == 'dropTip' && renderList.length > 1
                        ? setIndex + 1
                        : setIndex
                    ].type + 'Set'
                  "
                  v-model="
                    renderList[
                      renderList[0].type == 'dropTip' && renderList.length > 1
                        ? setIndex + 1
                        : setIndex
                    ].info
                  "
                ></component>
              </div>
            </div>
          </template>
        </div>
        <div class="right-none" v-if="setList.length == 0">
          <img
            class="img"
            src="https://img.yzcdn.cn/public_files/2019/03/04/519dcf2c736ed6dc8412bf6836cb405d.png"
          />
          <div class="tip">暂无组件</div>
        </div>
      </div>
      <div class="right-tag">
        <div
          :class="['item', { 'right-tag--active': showBaseSet }]"
          @click="
            setIndex = -1;
            showBaseSet = true;
            rightTitle = '组件管理';
          "
        >
          <span class="icon el-icon-menu"></span>
          <span class="txt">组件管理</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const TIPDATA = {
  type: "dropTip",
};
import _ from "lodash";
import Draggable from "vuedraggable";
import TEMPLATES from "./components/index";

export default {
  components: {
    Draggable,
    ...TEMPLATES,
  },
  data() {
    return {
      dragPosition: [],
      showDropTip: false,
      showBaseSet: true,
      setIndex: -1,
      rightTitle: "组件管理",
      target: "",
      baseList: [
        {
          type: "base",
          name: "基础组件",
          list: [
            {
              icon: "https://img.yzcdn.cn/public_files/2019/02/12/add4829af43def85a200029c3e485d77.png",
              name: "测试限制",
              type: "title",
              disabled: false,
              component: "TitleText",
              num: 0,
              maxnum: 1,
            },
            {
              icon: "https://img.yzcdn.cn/public_files/2019/02/12/add4829af43def85a200029c3e485d77.png",
              name: "测试禁用",
              type: "title",
              disabled: true,
              component: "TitleText",
              num: 0,
              maxnum: 20,
            },
            {
              icon: "https://img.yzcdn.cn/public_files/2019/02/12/add4829af43def85a200029c3e485d77.png",
              name: "标题文本",
              type: "title",
              disabled: false,
              component: "TitleText",
              num: 0,
              maxnum: 20,
            },
            {
              icon: "https://img.yzcdn.cn/public_files/2019/02/12/a6806f6ff8c220aa7a57eb89d253e126.png",
              name: "商品",
              type: "goods",
              disabled: false,
              component: "TitleText",
              num: 0,
              maxnum: 30,
            },
            {
              icon: "https://img.yzcdn.cn/public_files/2019/02/12/eae47c9a22c8d49ecbe88b4e6ca689e6.png",
              name: "辅助分割",
              type: "split",
              disabled: false,
              component: "TitleText",
              num: 0,
              maxnum: 30,
            },
          ],
        },
      ],
      renderList: [],
      setList: [],
      setOptions: {
        sort: true,
        forceFallback: true,
        chosenClass: "setDragItem",
      },
    };
  },
  methods: {
    createData(x, y) {
      return {
        type: this.baseList[x].list[y].component,
        name: this.baseList[x].list[y].name,
        x: x,
        y: y,
        info: {},
      };
    },
    dragOver(e) {
      if (this.baseList[this.dragPosition[0]].list[this.dragPosition[1]].disabled) return;
      e.preventDefault();
    },
    dragenter(e) {
      if (this.baseList[this.dragPosition[0]].list[this.dragPosition[1]].disabled) return;
      this.target = e.target;
      this.showDropTip = true;
      this.renderList.unshift(TIPDATA);
      let num = 0;
      this.renderList.forEach((item, index) => {
        console.log(index);
        if (item.type == "dropTip") num++;
        if (num == 2 && item.type == "dropTip") this.renderList.shift();
      });
    },
    dragleave(e) {
      if (this.target == e.target) {
        this.showDropTip = false;
        this.renderList.shift();
      }
    },
    drop(e) {
      console.log(e);
      let x = this.dragPosition[0];
      let y = this.dragPosition[1];
      if (this.baseList[x].list[y].num + 1 > this.baseList[x].list[y].maxnum) {
        this.$alert(
          `<i style="color:red">${this.baseList[x].list[y].name}模块</i>已超出最大添加限制！`,
          "警告",
          {
            dangerouslyUseHTMLString: true,
            closeOnClickModal: true,
            showClose: false,
            type: "warning",
          }
        );
        this.showDropTip = false;
        this.renderList.shift();
        return;
      }
      this.showDropTip = false;
      this.renderList.shift();
      this.renderList.unshift(this.createData(x, y));
      this.baseList[x].list[y].num = this.baseList[x].list[y].num + 1;
      this.setList = _.cloneDeep(this.renderList);
      this.showBaseSet = false;
      this.rightTitle = this.setList[0].name;
      this.setIndex = 0;
    },
    showSet(item, index) {
      console.log(item);
      this.rightTitle = item.name;
      this.showBaseSet = false;
      this.setIndex = index;
    },
    setDragUpdate(e) {
      const bf = _.cloneDeep(this.renderList);
      let oldData = this.renderList[e.oldIndex];
      let newData = this.renderList[e.newIndex];
      bf.splice(e.oldIndex, 1, newData);
      bf.splice(e.newIndex, 1, oldData);
      this.renderList = bf;
    },
    delSingle(item, index) {
      this.renderList.splice(index, 1);
      this.setList.splice(index, 1);
      this.baseList[item.x].list[item.y].num =
        this.baseList[item.x].list[item.y].num - 1;
      if (this.renderList.length) {
        this.setIndex = this.setIndex - 1;
        if (this.setIndex < 0) this.setIndex = this.setIndex + 1;
      } else {
        this.setIndex = -1;
        this.showBaseSet = true;
        this.rightTitle = "组件管理";
      }
    },
    delAll() {
      this.setList.forEach((item) => {
        this.baseList[item.x].list[item.y].num = 0;
      });
      this.renderList = [];
      this.setList = [];
    },
  },
  created() {
    this.setList = _.cloneDeep(this.renderList);
  },
};
</script>

<style lang="scss" scoped>
.pe--none {
  pointer-events: none;
}

.tempset {
  position: relative;
  height: 100vh;
}

.left-content {
  width: 200px;
  height: 100%;
  background-color: #fff;
  user-select: none;

  .title {
    margin: 0 auto;
  }

  .base-content {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    margin-top: -8px;

    .item {
      flex-shrink: 0;
      width: 50%;
      margin-top: 8px;
      text-align: center;
      padding: 5px 0;
      font-size: 12px;

      .icon {
        display: inline-block;
        width: 32px;
        height: 32px;
        background-position: 0 0;
        background-size: cover;
      }

      .name {
        color: #323233;
      }

      .num {
        color: #7d7e80;
      }

      &:hover {
        cursor: move;
        font-weight: 700;
        border-radius: 2px;
        background-color: #155bd4;

        .name {
          color: #fff;
        }

        .num {
          color: #fff;
        }

        .icon {
          background-position: 0 32px;
        }
      }
    }

    .disabled {
      opacity: 0.5;
      &:hover {
        cursor: not-allowed;
        font-weight: normal;
        border-radius: 0;
        background-color: unset;

        .name {
          color: #323233;
        }

        .num {
          color: #7d7e80;
        }

        .icon {
          background-position: 0 0;
        }
      }
    }
    .baseDragItem {
      font-weight: 700;
      background-color: #155bd4;

      .name {
        color: #fff;
      }

      .num {
        color: #fff;
      }

      .icon {
        background-position: 0 32px;
      }
    }
  }
}
.mid-content {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  max-height: 100%;
  overflow-y: auto;
  user-select: none;

  &::-webkit-scrollbar {
    width: 0;
    display: none;
    opacity: 0;
  }

  .show-content {
    margin-top: 56px;
    margin-bottom: 56px;
    margin-right: 100px;
    width: 375px;
    min-height: 603px;
    background-color: #fff;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);

    .item-box {
      position: relative;
      cursor: pointer;

      &:hover {
        .item-del {
          display: block;
        }

        .item-tag {
          opacity: 0;
        }

        &:after {
          display: block;
        }
      }

      &:after {
        display: none;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        border: 1px dashed #155bd4;
      }
    }

    .item-box--active {
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        border: 2px solid #155bd4;
      }
    }

    .item-tag {
      position: absolute;
      top: 0;
      right: -86px;
      width: 80px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      font-size: 12px;
      cursor: pointer;
      background-color: #fff;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);

      .arrow {
        position: relative;
        &::after {
          content: "";
          position: absolute;
          top: 6px;
          left: -11px;
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-right: 6px solid #fff;
          border-bottom: 6px solid transparent;
          border-left: 6px solid transparent;
        }
      }
    }

    .item-del {
      display: none;
      position: absolute;
      top: 0;
      z-index: 1;
      right: -28px;
      padding: 5px;
      background-color: #fff;
      cursor: pointer;
      border-radius: 2px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    }
  }
}

.right-content {
  position: absolute;
  right: 0;
  top: 0;

  .oh-content {
    width: 376px;
    height: 100vh;
    overflow: auto;
    box-sizing: border-box;
    background-color: #fff;
    &::-webkit-scrollbar {
      opacity: 0;
      display: none;
    }
  }

  .title {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #fff;
    color: #323233;
    font-size: 18px;
    font-weight: 600;
    padding: 24px 16px;
    border-bottom: 1px solid #f2f4f6;
  }

  .right-set {
    position: relative;
    padding: 12px 16px;
    margin-top: -10px;
    .set-clearall {
      overflow: hidden;
      .clear-btn {
        float: right;
      }
    }
  }

  .right-base-set {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 40px;
    font-size: 14px;
    color: #323233;
    border-radius: 2px;
    padding: 0 10px;
    margin-top: 10px;
    cursor: move;
    background-color: #fff;
    box-shadow: 0 0 4px 0 rgba(10, 42, 97, 0.2);
    .icon {
      cursor: pointer;
      padding: 5px;
    }
  }

  .setDragItem {
    color: #fff;
    background-color: #155bd4;
  }

  .right-tag {
    position: absolute;
    top: 67px;
    left: -104px;

    .item {
      width: 94px;
      height: 32px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
      background-color: #fff;
      border-radius: 2px;

      .icon {
        margin-right: 3px;
      }
    }

    .right-tag--active {
      color: #fff;
      background-color: #155bd4;
    }
  }

  .right-none {
    text-align: center;
    margin-top: 150px;
    user-select: none;
    pointer-events: none;

    .img {
      width: 150px;
      height: 150px;
    }

    .tip {
      font-size: 12px;
    }

  }
  
  .right-render-set {
    padding: 16px 0;
  }
}
</style>
