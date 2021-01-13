<template>
	<view>
		<u-navbar back-text="取消" :title="id&&id!=''?'编辑商品':'新增商品'"></u-navbar>
		<view class="bgColor"></view>
		<view class="item">
			<view class="item_col">
				<input placeholder="请输入商品名称" v-model="product_name" style="width: 80%;height: 80rpx;" placeholder-class="item_input" />
			</view>
			<u-line color="#F5F5F5" style="width: 650rpx;margin: auto auto;" />
			<view class="item_col">
				<u-upload :action="action" ref="uUpload" :file-list="fileList" max-count="1"></u-upload>
			</view>
		</view>
		<view class="item">
			<u-cell-group>
				<u-cell-item title="商品类目" :value="cate_name" @click="go('商品类目')"></u-cell-item>
				<!-- <u-cell-item title="商品类型" value="实物商品" @click="go('商品类型')"></u-cell-item>
				<u-cell-item title="商品子分类" value="自定义垂直分类" @click="go('商品子分类')"></u-cell-item> -->
			</u-cell-group>
		</view>
		<view class="item">
			<u-cell-group>
				<u-cell-item title="促销" :arrow="false">
					<u-switch slot="right-icon" v-model="checked2" active-color="#08C260"></u-switch>
				</u-cell-item>
			</u-cell-group>
		</view>

		<view class="item">
			<u-cell-group>
				<u-cell-item title="多规格" :arrow="false">
					<u-switch slot="right-icon" v-model="checked" active-color="#08C260"></u-switch>
				</u-cell-item>
			</u-cell-group>
			<u-line color="#F5F5F5" style="width: 650rpx;margin: auto auto;" />
			<view class="item_col" v-show="!checked">
				<view>商品实际价格</view>
				<input type="text" placeholder="商品实际价格" placeholder-class="item_input" v-model="price" />
			</view>
			<u-line color="#F5F5F5" style="width: 650rpx;margin: auto auto;" />
			<view class="item_col" v-show="!checked">
				<view>商品库存</view>
				<input type="text" placeholder="设置合理库存避免超卖" placeholder-class="item_input" v-model="num" />
			</view>
			<u-cell-item title="商品规格" :value="specs_arr[0]&&specs_arr[0].name?'已设置':'请设置'" @click="specsgo" v-show="checked"></u-cell-item>
			<view class="item_col">
				<view>商品划线价格</view>
				<input type="text" placeholder="商品划线虚拟价格，非填写项" placeholder-class="item_input" v-model="cost_price" />
			</view>
		</view>
		<view class="item">
			<u-cell-group>
				<u-cell-item title="商品详情图" :arrow="false"></u-cell-item>
			</u-cell-group>
			<u-line color="#F5F5F5" style="width: 650rpx;margin: auto auto;" />
			<view class="item_col">
				<u-upload :action="action" ref="Upload" :file-list="filedetailsList" max-count="1"></u-upload>
			</view>
		</view>
		<!-- <view class="item">
			<u-cell-group>
				<u-cell-item title="参与会员折扣" :arrow="false">
					<u-switch slot="right-icon" v-model="checked1" active-color="#08C260"></u-switch>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="item">
			<u-cell-group>
				<u-cell-item title="参与满减功能" :arrow="false">
					<u-switch slot="right-icon" v-model="checked2" active-color="#08C260"></u-switch>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view style="display: flex;justify-content: space-around;margin-top: 25rpx;">
			<view>已设置：满30减3、满40减4、满50减5</view>
			<view style="	font-size: 24rpx;color: #C02C38;text-decoration: underline;" @click="show=true">
				去修改
			</view>
		</view> -->

		<view class="btn" hover-class="btn_h" @click="btn">
			{{id&&id!=''?'保存':'上架出售'}}
		</view>
		<!-- <u-mask :show="show" @click="show = false" style="z-index: 666;"></u-mask> -->
		<!-- <u-popup v-model="show">
			<view class="option">
				<view style="font-size: 32rpx;line-height: 40rpx;margin-top: 20rpx;"> 满减设置</view>
				<view class="option_col ">
					<view class="col " v-for="(item,i) in list" :key='i'>
						{{item.name}}
					</view>
					<view class="col ">
						<input type="text" placeholder="自定义" v-model="des" />
					</view>
				</view>
				<view style="font-size: 22rpx;color: #9A9A9A;">合理的选择或自定义满减优惠，以便吸引更多顾客</view>
				<view class="btn-row">
					<view class="btn-p" @click="show = false">取消</view>
					<view class="btn-p btn_scuess" @click="show = false">确定</view>
				</view>
			</view>
		</u-popup> -->
		<!-- <u-popup v-model="showpop">
			<view class="showbox">
				<image class="shownone" src="../../static/img/gb.png" @click="showpop=false"></image>
				<image class="showtb" src="../../static/img/cg.png"></image>
				<view class="showtitle">操作成功</view>
				<view class="showtext">{{btnstatus==1?'商品已加入回收站':'商品已上架'}}</view>
				<view class="showbtn" @click="showpop=false">确定</view>
			</view>
		</u-popup> -->
	</view>
</template>

<script>
	import Api from '../../api/test';
	export default {
		data() {
			return {
				action: 'https://www.callingsell.com/wxapp/Ele/uploadImg',
				fileList: [],
				filedetailsList: [],
				checked: false,
				checked1: false,
				checked2: false,
				show: false,
				list: [{
						name: '满20减2'
					},
					{
						name: '满30减3'
					}, {
						name: '满40减4'
					}, {
						name: '满50减5'
					},
					{
						name: '满60减6'
					}
				],
				des: '',
				cate_name: '',
				cate_id: '',
				cate_index: '',
				product_name: '',
				specs_arr: [],
				cost_price: '',
				price: '',
				num: '',
				showpop: false,
				id: '',
				is_options:0,
				userid: uni.getStorageSync('userid'),
				shopid: uni.getStorageSync('shopid')
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.id = option.id
			if (this.id && this.id != '') {
				this.getdata()
			} else {
				this.getcatedata()
			}
		},
		methods: {
			go(val) {
				uni.navigateTo({
					url: '/pages/Classify/Classify?title=' + val
				});
			},
			specsgo() {
				uni.navigateTo({
					url: '/pages/specs/specs'
				});
			},
			getcatedata() {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getGoodCate?userid=' + self.userid).then(
					res => {
						console.log(res)
						self.cate_name = res.data[0].cate_name
						self.cate_id = res.data[0].cate_id
						self.cate_index = 0
					}).catch(err => {
					console.error('is error', err);
				})
			},
			getdata() {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getGoodDetail?goodid=' + self.id).then(
					res => {
						console.log(res)
						self.product_name = res.data[0].product_name
						self.cost_price = res.data[0].cost_price
						self.price = res.data[0].price
						self.num = res.data[0].num
						self.cate_id = res.data[0].cate_id
						self.fileList.push({'url':res.data[0].photo})
						self.filedetailsList.push({'url':res.data[0].detailphoto})
						self.is_options = res.data[0].is_options
						self.checked = res.data[0].is_options==1?true:false
						self.checked2 = res.data[0].is_promotion==1?true:false
						console.log(self.checked)
						Api.getRequestData(self.APIS + '/wxapp/EleStore/getGoodCate?userid=' + self.userid).then(
							res => {
								console.log(res)
								for (let i = 0; i < res.data.length; i++) {
									if (res.data[i].cate_id == self.cate_id) {
										self.cate_name = res.data[i].cate_name
										self.cate_index = i
									}
								}
							}).catch(err => {
							console.error('is error', err);
						})
					}).catch(err => {
					console.error('is error', err);
				})
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getProductOptionsByProductId?goodid=' + self.id).then(
					res => {
						console.log(res)
						if (res.data && res.data.length > 0) {
							// for(let i =0;i<res.data.length;i++){
							// 	res.data[i].
							// }
							self.specs_arr = res.data
							self.checked = self.is_options==1?true:false
							console.log( self.is_options)
							console.log(self.checked)
						}
					}).catch(err => {
					console.error('is error', err);
				})
			},
			getMinprice(arr) {
				var arrmin = Number(arr[0].price) // 初始化第一个值
				for (var i = 1; i < arr.length; i++) {
					if(arr[i].is_delete!=1||!arr[i].is_delete){
						if (Number(arr[i].price) < arrmin) {
							arrmin = Number(arr[i].price)
						}
					}
				}
				return arrmin //返回最小值
			},
			getMintotal(arr) {
				var arrmin = Number(arr[0].total) // 初始化第一个值
				for (var i = 1; i < arr.length; i++) {
					if(arr[i].is_delete!=1||!arr[i].is_delete){
						if (Number(arr[i].total) < arrmin) {
							arrmin = Number(arr[i].total)
						}
					}
				}
				return arrmin //返回最小值
			},
			btn() {
				let self = this
				let files = [];
				let filesdetails = [];
				// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
				files = self.$refs.uUpload.lists.filter(val => {
					return val.progress == 100;
				})
				filesdetails = self.$refs.Upload.lists.filter(val => {
					return val.progress == 100;
				})
				let tustatus = (self.fileList.length>0&&self.filedetailsList.length>0)||(files.length > 0 && filesdetails.length > 0)?true:false
				let price = self.price
				let num = self.num
				let arr = []
				if (self.checked) {
					console.log(5555)
					console.log(self.specs_arr)
					if (!self.specs_arr[0].name) {
						uni.showToast({
							title: '请填写商品信息',
							icon: 'none',
							duration: 2000
						});
						return
					} else {
						console.log(44444)
						price = self.getMinprice(self.specs_arr)
						num = self.getMintotal(self.specs_arr)
						if (tustatus && self.product_name != '' && self.cate_id != '' && price != '' && num != '') {} else {
							uni.showToast({
								title: '请填写商品信息',
								icon: 'none',
								duration: 2000
							});
							return
						}
					}
				} else {
					if (tustatus && self.product_name != '' && self.cate_id != '' && price != '' && num != '') {} else {
						uni.showToast({
							title: '请填写商品信息',
							icon: 'none',
							duration: 2000
						});
						return
					}
				}
				// 如果您不需要进行太多的处理，直接如下即可
				// files = this.$refs.uUpload.lists;
				// console.log(files[0].response.files[0].filename)
				// console.log(filesdetails[0].response.files[0].filename)
				console.log(self.product_name)
				console.log(self.cate_id)
				console.log(self.cost_price)
				console.log(self.price)
				console.log(self.num)
				// let postData = {
				// postData:{
				// product_name: self.product_name,
				// cate_id: self.cate_id,
				// cost_price: self.cost_price,
				// price: price,
				// num: num,
				// is_options: self.checked ? 1 : 0,
				// options: self.specs_arr,
				// photo:files[0].response.files[0].filename,
				// detailphoto:filesdetails[0].response.files[0].filename,
				// },
				// userid:self.userid
				// }
				console.log(111)
				console.log(files)
				console.log(self.fileList)
				if(self.id&&self.id!=''){
					let f1 = files[0]&&files[0].response?files[0].response.files[0].filename:self.fileList[0].url.split('https://www.callingsell.com')[1]
					let f2 = filesdetails[0]&&filesdetails[0].response?filesdetails[0].response.files[0].filename:self.filedetailsList[0].url.split('https://www.callingsell.com')[1]
					Api.posteditData(self.APIS + '/wxapp/EleStore/editGoods', self.product_name, self.cate_id, self.cost_price, price,
						num, self.checked ? 1 : 0, self.specs_arr, f1, f2, self.id,self.shopid, self.checked2 ? 1 : 0, self.userid).then(res => {
						console.log(res);
						if (res.data.message == '修改成功') {
							let pages = getCurrentPages();
							let prePage = pages[pages.length - 2];
							let data = prePage.$vm ? prePage.$vm : prePage
							data.pageIndex = 1
							data.arr = []
							data.getdata()
							uni.navigateBack({
								delta: 1
							})
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								duration: 2000
							});
						}
					}).catch(err => {
						console.error('is error', err);
					})
				}else{
					Api.postRequestData(self.APIS + '/wxapp/EleStore/addGoods', self.product_name, self.cate_id, self.cost_price, price,
						num, self.checked ? 1 : 0, self.specs_arr, files[0].response.files[0].filename, filesdetails[0].response.files[0]
						.filename, self.checked2 ? 1 : 0, self.userid).then(res => {
						console.log(res);
						if (res.data.message == '添加成功') {
							let pages = getCurrentPages();
							let prePage = pages[pages.length - 2];
							let data = prePage.$vm ? prePage.$vm : prePage
							data.pageIndex = 1
							data.arr = []
							data.getdata()
							uni.navigateBack({
								delta: 1
							})
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								duration: 2000
							});
						}
					}).catch(err => {
						console.error('is error', err);
					})
				}
			}
		}
	}
</script>

<style>
	.u-cell {
		align-items: center;
	}

	.btn-row {
		display: flex;
		justify-content: space-around;
		margin-top: 20rpx;
	}

	.btn_scuess {
		color: #FFFFFF !important;
		background: #C02C38 !important;
		border: 1rpx solid #C02C38 !important;
	}

	.btn-p {
		width: 226rpx;
		height: 69rpx;
		background: #FFFFFF;
		border: 1rpx solid #343434;
		border-radius: 10rpx;

		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #343434;
		line-height: 69rpx;
		text-align: center;
	}

	.col_h {
		background: #C02C38;

		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}

	.col {
		width: 146rpx;
		height: 56rpx;
		background: #FFFFFF;
		border: 1rpx solid #666666;
		border-radius: 10rpx;
		text-align: center;
		line-height: 56rpx;
		margin-bottom: 25rpx;


		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
	}

	.col input {
		height: 100%;
		font-size: 28rpx;
	}

	.option_col {
		margin: 70rpx auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.option {
		position: fixed;
		top: 30%;
		transform: translateX(20%);
		/* left: 100rpx; */
		z-index: 999;
		min-width: 550rpx;
		min-height: 500rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		text-align: center;
		padding: 30upx 20upx;
	}

	.item_input {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #CCCCCC;
	}

	.item_col input {
		width: 60%;
		height: 80rpx;
		margin-left: 30rpx;
	}

	.btn_h {
		opacity: 0.8;
	}

	.btn {
		width: 690rpx;
		height: 98rpx;
		background: #C02C38;
		border-radius: 49rpx;
		text-align: center;
		line-height: 98rpx;

		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		margin: 70rpx auto 30rpx auto;
	}

	.item_col {
		width: 690rpx;
		min-height: 80rpx;
		margin: auto auto;
		display: flex;
		line-height: 80rpx;

		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #343434;
	}

	.item {
		width: 100%;
		min-height: 100rpx;
		background: #FFFFFF;
		margin-top: 30rpx;
	}

	.bgColor {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
		background-size: 200%;
		background-position: center;
		background: #F5F5F5;
	}

	.showbox {
		width: 550upx;
		height: 627upx;
		border-radius: 10px;
		background-color: #FFFFFF;
		position: fixed;
		top: 50%;
		left: 100upx;
		transform: translateY(-50%);
		padding: 20upx;
	}

	.showbox .shownone {
		position: absolute;
		right: 20upx;
		top: 20upx;
		width: 50upx;
		height: 50upx;
	}

	.showbox .showtb {
		width: 125upx;
		height: 161upx;
		margin: 50upx auto;
		display: block;
	}

	.showbox .showtitle {
		text-align: center;
		font-size: 30upx;
		color: #333333;
		margin-bottom: 39upx;
	}

	.showbox .showtext {
		text-align: center;
		font-size: 28upx;
		color: #999999;
		line-height: 48upx;
		max-width: 60%;
		margin: 0 auto;
	}

	.showbox .showbtn {
		width: 430upx;
		text-align: center;
		font-size: 34upx;
		color: #FFFFFF;
		line-height: 88upx;
		border-radius: 88upx;
		margin: 0 auto;
		margin-top: 60upx;
		background-color: #C02C38;
	}
</style>
