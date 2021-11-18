import request from './request.js'

export default {
	getBase: function({params = ''}) {
		//console.log(params);
		return request.get('/index', params);
	}
}