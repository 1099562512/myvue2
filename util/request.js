const axios = require('axios');

//baseUrl = localhost:3000
//axios.defaults.baseURL = '/api';

axios.interceptors.response.use(function(response) {
	console.log(response);
})

export default {
	get: function(url,params) {
		axios.get(url,{ 
			params: params
		});
	},
	post: function() {
		
	}
}