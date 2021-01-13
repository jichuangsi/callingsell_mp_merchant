import Request from '../js_sdk/pocky-request/pocky-request v.2.0.4/index';

export default {
	// get 请求, 200 响应码
	getMockDataMethodGet200() {
		let r = Request();

		let reqId = r.interceptors.scoped.request.use(
			(config) => {
				console.log('is scoped request');
				return config;
			},
			(err) => {
				console.error('scoped request: ', err);

				return false;
			}
		);

		let repId = r.interceptors.scoped.response.use(
			(res, config) => {
				console.log('is scoped response');

				return res;
			},
			(err) => {
				console.error('scoped response: ', err);

				return Promise.reject(err);
			}
		);

		// 卸载 私有 请求 拦截器
		// instance.interceptors.scoped.request.eject(reqId)

		let instance = r.request({
			url: '/StoreList',
			method: 'get',
			header: {
				// sid: 'xx',
				// ContentType: "application/json"
			},
		});

		// 超时 3000ms 就中断请求
		setTimeout(() => {
			r.abort(instance);
		}, 6000);

		return instance;
	},

	// get 请求, 400 响应码
	getMockDataMethodGet400() {
		return global.$http.request({
			url: '/test/get/400',
			method: 'get',
			header: {
				uid: 'xx'
			},
			params: {
				name: 'xxx',
				age: 20
			}
		});

		// return Request().request({
		//     url: '/test/get/400',
		//     method: 'get',
		//     params: {
		//         name: 'xxx',
		//         age: 20
		//     },
		// });
	},

	// post 请求， 200 响应码
	getMockDataMethodPost200() {
		return Request().post('/test/post/200', {
			header: {
				contentType: 'application/json'
			},
			data: {
				name: 'xx',
				age: 20,
				arr: [1, 2, 3, [11, 22]],
				obj: {
					null: null
				},
				null: null
			}
		});
	},

	// download, 200 状态码
	getMockDataMethodDownload() {
		const r = Request();

		return r
			.get('/wxapp')
			.then((res) => {
				console.log('is then', res);
				return res.data.img;
			})
			.then((path) =>
				r.download(path, {
					params: {
						a: 'is a'
					},
					onProgressUpdate(res) {
						console.log(res);
					}
				})
			);
	},

	// upload, 200 状态码
	getMockDataMethodUpload(path) {
		let r = Request();

		let instance = r.upload('/test/upload', {
			name: 'file',
			filePath: path,
			header: {},
			formData: {
				text: 'is upload file'
			},
			onProgressUpdate(res) {
				console.log(res);
			}
		});

		// 5s 之后还没上传完成就中断上传，会进入 catch 回调中
		setTimeout(() => {
			r.abort(instance);
		}, 5000);

		return instance;
	},

	getRequestData(url) {
		let r = Request();
		let instance = r.request({
			url: url,
			method: 'get',
			header: {
				ContentType: "application/x-www-form-urlencoded"
			}
		})
		setTimeout(() => {
			r.abort(instance);
		}, 6000);
		return instance;
	},
	getDataByParam(url, param) {
		let r = Request();
		let instance = r.request({
			url: url,
			method: 'get',
			header: {
				ContentType: "application/x-www-form-urlencoded"
			},
			params: param
		})
		setTimeout(() => {
			r.abort(instance);
		}, 6000);
		return instance;
	},
	postRequestData(url, product_name, cate_id, cost_price, price, num, is_options, options, photo, detailphoto,is_promotion, userid) {
		let data = {
				'postData[product_name]': product_name,
				'postData[cate_id]': cate_id,
				'postData[cost_price]': cost_price,
				'postData[price]': price,
				'postData[num]': num,
				'postData[is_options]': is_options,
				'postData[photo]': photo,
				'postData[detailphoto]': detailphoto,
				'postData[is_promotion]': is_promotion,
				'userid': userid
		}
		if (is_options == 1) {
			for(let i = 0;i<options.length;i++){
				let name = 'postData[option]['+(i+1)+'][name]'
				let price = 'postData[option]['+(i+1)+'][price]'
				let total = 'postData[option]['+(i+1)+'][total]'
				data[name]=options[i].name
				data[price]=options[i].price
				data[total]=options[i].total
			}
		}
		let r = Request();
		let instance = r.request({
			url: url,
			method: 'post',
			header: {
				ContentType: "application/x-www-form-urlencoded"
			},
			data
		})
		return instance;
	},
	posteditData(url, product_name, cate_id, cost_price, price, num, is_options, options, photo, detailphoto,product_id,shopid,is_promotion, userid) {
		let data = {
				'postData[product_name]': product_name,
				'postData[cate_id]': cate_id,
				'postData[cost_price]': cost_price,
				'postData[price]': price,
				'postData[num]': num,
				'postData[is_options]': is_options,
				'postData[photo]': photo,
				'postData[detailphoto]': detailphoto,
				'postData[product_id]': product_id,
				'postData[shop_id]': shopid,
				'postData[is_promotion]': is_promotion,
				'userid': userid
		}
		if (is_options == 1) {
			for(let i = 0;i<options.length;i++){
					let name = 'postData[option]['+(i+1)+'][name]'
					let price = 'postData[option]['+(i+1)+'][price]'
					let total = 'postData[option]['+(i+1)+'][total]'
					let id = 'postData[option]['+(i+1)+'][id]'
					let is_delete = 'postData[option]['+(i+1)+'][is_delete]'
					data[name]=options[i].name
					data[price]=options[i].price
					data[total]=options[i].total
				if(options[i].id){
					data[id]=options[i].id
					if(options[i].is_delete){
						data[is_delete]=options[i].is_delete
					}
				} 
			}
		}
		console.log(data)
		let r = Request();
		let instance = r.request({
			url: url,
			method: 'post',
			header: {
				ContentType: "application/x-www-form-urlencoded"
			},
			data
		})
		return instance;
	},
	posteditshopData(url, shop_name, addr, mobile, is_full, intro, order_price_full_1, order_price_reduce_1, order_price_full_2,order_price_reduce_2,busihour,province_id,city2_id,region_id,full_address,radiusKM,since_money,is_open,photos, userid) {
		let data = {
				'postData[shop_name]': shop_name,
				'postData[addr]': addr,
				'postData[mobile]': mobile,
				'postData[is_full]': is_full,
				'postData[intro]': intro,
				'postData[order_price_full_1]': order_price_full_1,
				'postData[order_price_reduce_1]': order_price_reduce_1,
				'postData[order_price_full_2]': order_price_full_2,
				'postData[order_price_reduce_2]': order_price_reduce_2,
				'postData[busihour]': busihour,
				'postData[province_id]': province_id,
				'postData[city2_id]': city2_id,
				'postData[region_id]': region_id,
				'postData[full_address]': full_address,
				'postData[radiusKM]': radiusKM,
				'postData[since_money]': since_money,
				'postData[is_open]': is_open,
				'userid': userid
		}
		
			for(let i = 0;i<photos.length;i++){
					let name = 'postData[photos]['+(i+1)+'][photo]'
					data[name]=photos[i]
			}
		console.log(data)
		let r = Request();
		let instance = r.request({
			url: url,
			method: 'post',
			header: {
				ContentType: "application/x-www-form-urlencoded"
			},
			data
		})
		return instance;
	},
	
	postApiData(url,data) {
		let r = Request();
		let instance = r.request({
			url: url,
			method: 'post',
			header: {
				ContentType: "application/x-www-form-urlencoded"
			},
			data
		})
		return instance;
	}

};
