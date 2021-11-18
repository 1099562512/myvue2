<template>
  <div class="home">
		<test1 v-if="home == 'test1'" :name="{name: 'test1'}"></test1>
		<test2 v-if="home == 'test2'" :name="{name: 'test2'}"></test2>
	<!-- <test>
		 <template v-slot="{user}">
			 <div>{{user.name}}</div>
		 </template>
	 </test> -->
  </div>
</template>

<script>

export default {
  name: 'Home',
	/* beforeRouteEnter(to,from,next) {
		console.log(to);
		next();
	}, */
	data: function() {
		return {
			home: "test1",
			list: JSON.parse(localStorage.getItem('user')).name
		}
	},
  components: {
		test1: () => import("@/components/test1.vue"),
		test2: () => import("@/components/test2.vue")
  },
	created() {
		
	},
	mounted() {

		/* setTimeout(() => {
			this.home = 'test1'
		}, 2000); */
		/* AMap.plugin('AMap.DistrictSearch', function () {
		  var districtSearch = new AMap.DistrictSearch({
		    // 关键字对应的行政区级别，country表示国家
		    level: 'country',
		    //  显示下级行政区级数，1表示返回下一级行政区
		    subdistrict: 1
		  })
		  
		  // 搜索所有省/直辖市信息
		  districtSearch.search('中国', function(status, result) {
		    // 查询成功时，result即为对应的行政区信息
				console.log(result);
		  })
		}) */
	},
	destroyed() {
	},
	methods: {
		changeName() {
			//this.list[0] = "李四";
			this.list = ["李四"];
			
			/* this.list = [{
				name: "change"
			}] */
			//this.$forceUpdate();
		}
	}
}
</script>
<style>
	.home {
		height: 500px;
	}
</style>
