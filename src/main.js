import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AMap from 'vue-amap'
import api from '../util/api.js'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUi);
Vue.use(AMap);
AMap.initAMapApiLoader({
	key: "07e9abe7c3ce1485c2264df0ae92b43e",
	plugin: [
		'Autocomplete', 
		'PlaceSearch', 
		'Scale', 
		'OverView', 
		'ToolBar', 
		'MapType', 
		'PolyEditor',
		'AMap.CircleEditor',
		'AMap.DistrictSearch'
	]
});


Vue.prototype.$api = api;
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
