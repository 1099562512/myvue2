<template>
  <div id="app">
   <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <!-- <el-upload
        action="/"
        :auto-upload="false"
        :on-change = "onChange"
        accept=".xls, .xlsx"
      >
        <el-button size="small" type="text" class="upload-bom uploadBtn">
          <span class="iconXlSX-sty-test">导入名单</span>
        </el-button>
      </el-upload> -->
    </div>
    <router-view/>
  </div>
</template>
<script>
  import * as XLSX from "xlsx"
	export default {
		data() {
			return {
			}
		},
		created() {
			//console.log("app created");
			
		},
		mounted() {
			//console.log("app mounted");
			//localStorage.setItem('user',JSON.stringify({name: '张三'}))
		},
		destroyed() {
			//console.log("app destoryed");
		},
    methods: {
      onChange(res) {
        const fileReader = new FileReader();
        function isNumeric(str) {
            return /^\d+$/.test(str);
        }
        fileReader.onload = (ev) => {
          const workbook = XLSX.read(ev.target.result, {
            type: "binary",
          });
          //console.log(workbook);

          const wsname = workbook.SheetNames[0];
          // 生成json表格内容
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
          console.log(ws);

          // 循环 ws 取得其中的数据 
          // 把 ws 打印出来 就可以看得很清楚了 之后就进行自己想要的操作就可以了
          // 没有一样的代码 没有一样的需求
          var temporary = [];
          let carTitle = "", oreLocation = ""
          for (let i = 0; i < ws.length; i++) {
            if(i == 0) {
              //console.log(Object.entries(ws[i]));
              for(let [key, value] of Object.entries(ws[i])) {
                if(value === "卸点") {
                  oreLocation = key
                }
                if(value === "车辆编号") {
                  carTitle = key
                }
              }
            }
            if(ws[i][oreLocation] == "620南") {
              let carList = ws[i][carTitle].split(".")
              
              //处理空格情况
              for(let [index, value] of carList.entries()) {
                carList[index] = value.trim()
              }
              console.log(carList);
              temporary.push(...carList)
            }
          }
          let resultCars = []
          for(let carNo of temporary) {
            if(isNumeric(carNo)) {
              console.log(carNo.charAt(0));
             // if(carNo.charAt(0))
             if(carNo.charAt(0) == 6) {
              resultCars.push("矿FD" + carNo)
             }
             if(carNo.charAt(0) == 8) {
              resultCars.push("矿HD" + carNo)
             }
             if(carNo.charAt(0) == 9) {
              resultCars.push("矿WX" + carNo)
             }
            }
          }
          console.log(resultCars);
          return resultCars.join(',')
        }
        fileReader.readAsBinaryString(res.raw);
        fileReader.onerror = (err) => {
          console.log(err);
        }
      }
    },
	}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
