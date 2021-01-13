<template>
	<view class="container">
		<view class="bgColor"></view>
		<view class="panel">
			<text class="panel_title">今日业绩</text>
			<view class="panel_content">
				<view>
					<text class="capital">支付订单数</text>
					<view class="capital">{{paid}}</view>
				</view>
				<view>
					<text class="capital">今日交易(元)</text>
					<view class="capital">{{Trading}}</view>
				</view>
				<view>
					<text class="capital">总收益({{state}})</text>
					<view class="capital">{{Total}}</view>
				</view>
			</view>
		</view>
		<view class="Store">
			<text class="Store-title">店铺管理</text>
			<view class="content">
				<view class="c_item">
					<navigator url="../OrderManagement/OrderManagement" hover-class="none" open-type="navigate">
						<image src="../../static/img/ddgl.png" class="Store-img"></image>
					</navigator>
					<view class=" Store-text">
						订单管理
					</view>
					<view class="Store-ms">
						订单查看、记录
					</view>
				</view>
				<view class="c_item">
					<navigator url="../OrderGrabbing/OrderGrabbing" hover-class="none" open-type="navigate">
						<view class="imgbox">
							<image src="../../static/img/ydqd.png" class="Store-img"></image>
							<view class="hallstatus" v-if="hallcount&&hallcount>0"></view>
						</view>
					</navigator>
					<view class=" Store-text">
						预定抢单
					</view>
					<view class="Store-ms">
						抢单查看、记录
					</view>
				</view>
				<view class="c_item">
					<navigator url="../CommodityManagement/CommodityManagement" hover-class="none" open-type="navigate">
						<image src="http://www.callingsell.com/static/shangjiaduan/img/index-sp.png" class="Store-img"></image>
					</navigator>
					<view class=" Store-text">
						商品管理
					</view>
					<view class="Store-ms">
						商品编辑、上下架
					</view>
				</view>
			</view>
		</view>
		<view class="Store" style="margin-top: 30rpx;">
			<text class="Store-title">我的工具</text>

			<view class="item-box">
				<view class="item">
					<navigator url="../StoreManagement/StoreManagement" hover-class="none">
						<image src="../../static/img/dpgl.png"></image>
					</navigator>
					<view> 店铺管理</view>
				</view>
				<!-- <view class="item">
					<navigator url="../OrderManagement/OrderManagement" hover-class="none">
						<image src="http://www.callingsell.com/static/shangjiaduan/img/OrderManagement.png"></image>
					</navigator>
					<view> 订单管理</view>
				</view> -->
				<view class="item">
					<navigator url="../wallet/wallet" hover-class="none">
						<image src="../../static/img/qb.png"></image>
						<view> 我的钱包</view>
					</navigator>
				</view>
				<view class="item">
					<navigator url="../PaymentSet/PaymentSet" hover-class="none">
						<image src="http://www.callingsell.com/static/shangjiaduan/img/PaymentSetting.png"></image>
						<view> 支付设定</view>
					</navigator>
				</view>
				<!-- <view class="item">
					<navigator url="../info/info" hover-class="none">
						<image src="http://www.callingsell.com/static/shangjiaduan/img/OfficialInformation.png"></image>
						<view> 官方资讯</view>
					</navigator>
				</view> -->
				<view class="item">
					<navigator url="../StatisticalReport/StatisticalReport" hover-class="none">
						<image src="http://www.callingsell.com/static/shangjiaduan/img/StatisticalReport.png"></image>
						<view> 统计报表</view>
					</navigator>
				</view>
				<view class="item">
					<navigator url="../RecycleBin/RecycleBin" hover-class="none">
						<image src="http://www.callingsell.com/static/shangjiaduan/img/my/recyclebin.png"></image>
						<view> 回收站</view>
					</navigator>
				</view>
				<view class="item">
					<navigator url="../Feedback/Feedback" hover-class="none">
						<image src="http://www.callingsell.com/static/shangjiaduan/img/informationFeedback.png"></image>
						<view> 信息反馈</view>
					</navigator>
				</view>
				<!-- <view class="item">
					<image src="http://www.callingsell.com/static/shangjiaduan/img/CreatePromotion.png"></image>
					<view> 创建促销</view>
				</view> -->
			</view>
		</view>
		<view class="showbox white" v-if="show" @click="sqclick">

		</view>
		<view v-if="isCanUse" class="showbox">
			<view class="logobox">
				<view class='header'>
					<image src='../../static/img/logo.png'></image>
				</view>
				<view class='dl_content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>
				<div class="btn">
					<view class='bottom qxbtn' @click="isCanUse=false">
						取消
					</view>
					<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
						授权登录
					</button>
				</div>
			</view>
		</view>
		<!-- <button class='loginbtn' style="opacity:0" type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN"
		 @getuserinfo="wxGetUserInfo" v-if="isCanUse">
			授权登录
		</button> -->
		
	</view>

</template>

<script>
	import Api from '../../api/test';
	export default {
		data() {
			return {
				paid: 0,
				Trading: 0,
				Total: 0,
				state: '元',
				isCanUse: false,
				show: false,
				hallcount:0,
				userid: uni.getStorageSync('userid')
			}
		},
		methods: {
			sqclick(){
				this.isCanUse = true
				uni.requestSubscribeMessage({
				  tmplIds: ['3KLipkr7VK3ppCPxE_QiBSHhbQKNRo2VCkCZSj7kYsY'],
				  success (res) { 
					  console.log(1111)
							console.log(res)
				  },fail(err){
					  console.log(222)
					  console.log(err)
				  }
				})
			},
			wxGetUserInfo() {
				let self = this
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						console.log(res)
						uni.login({
							provider: 'weixin',
							success: (res2) => {
								console.log(res2)

								uni.getUserInfo({
									provider: 'weixin',
									success: (info) => { //这里请求接口
										console.log(res2);
										console.log(info);

										Api.postApiData(self.APIS + '/wxapp/wxapp/storeopenid', {
											code: res2.code
										}).then(res => {
											console.log(res);
											let data = {
												data: info.encryptedData,
												iv: info.iv,
												sessionKey: res.data.session_key
											}
											Api.postApiData(self.APIS + '/wxapp/wxapp/storeauth', data).then(res => {
												console.log(res);
												console.log(res.unionId)
												Api.postApiData(self.APIS + '/wxapp/wxapp/storecheck', {
													unionid: res.data.unionId
												}).then(res => {
													console.log(res);
													if (res.data.member && res.data.member.user_id) {
														uni.setStorageSync('userid', res.data.member.user_id)
														uni.setStorageSync('shopid', res.data.store.shop_id)
														self.userid = res.data.member.user_id
														self.show = false
														self.isCanUse = false
														self.Getdata()
													} else {
														uni.showToast({
															title: res.data.message,
															icon: 'none',
															duration: 2000
														});
													}
													// uni.setStorageSync('user', 'ahahaha')
												}).catch(err => {
													console.error('is error', err);
												})
											}).catch(err => {
												console.error('is error', err);
											})
										}).catch(err => {
											console.error('is error', err);
										})

									},
									fail: () => {
										uni.showToast({
											title: "微信登录授权失败",
											icon: "none"
										});
									}
								})
							},
							fail: () => {
								uni.showToast({
									title: "微信登录授权失败",
									icon: "none"
								});
							}
						})
					}
				});
			},
			// $_getApiData() {
			// 	Api.getMockDataMethodGet200().then(res => {
			// 		console.log('is then', res)
			// 		this.res = res;
			// 	}).catch(err => {
			// 		console.error('is catch', err)
			// 		this.err = err;
			// 	})
			// }
			Getdata() {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getTodayPerformance?userid=' + self.userid).then(res => {
					console.log(res);
					self.paid = res.data.todayOrderNum
					self.Trading = res.data.todayMoney
					self.Total = String(res.data.totalMoney).split('.')[0].length >= 5 ? String(res.data.totalMoney / 10000).split(
						'.')[0] : res.data.totalMoney
					self.state = String(res.data.totalMoney).split('.')[0].length >= 5 ? '万' : '元'
				}).catch(err => {
					console.error('is error', err);
				})
			},
			Gethallcount() {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/isNewOrder?userid=' + self.userid).then(res => {
					console.log(res);
					// hallcount
					self.hallcount = res.data.count
				}).catch(err => {
					console.error('is error', err);
				})
			},
			Getvipdata() {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/ele/updateVip?userid=' + self.userid).then(res => {
					console.log(res);
					if(res.data.status=='1'){
							uni.showModal({
								title: '提示',
								content: res.data.message,
								confirmText: '续费',
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
											uni.navigateTo({
												url: '/pages/Member/Member'
											});
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});
					}
				}).catch(err => {
					console.error('is error', err);
				})
			},
			cartesianProductOf() {
				return Array.prototype.reduce.call(arguments, function(a, b) {
					var ret = [];
					a.forEach(function(a) {
						b.forEach(function(b) {
							console.log(a)
							ret.push(a.concat([b]));
						});
					});
					return ret;
				}, [
					[]
				]);
			},
		},
		onShow() {
			console.log(333)
			// uni.setStorageSync('userid', '10')
			// uni.setStorageSync('shopid', '2')
			if (!uni.getStorageSync('userid')) {
				this.show = true
			} else {
				this.Getdata()
				this.Getvipdata()
				this.Gethallcount()
			}
		},
		mounted() {
			// let a ='{"appId":"wxc9a5c2cfa1172bef","timeStamp":"1609834125","nonceStr":"utv9daptcosjpg8nai0u5mxx5twrpds5","package":"prepay_id=","signType":"MD5","paySign":"9327050A491FAD3BB81268B544028BE5","rest":{"return_code":"FAIL","return_msg":"\u7b7e\u540d\u9519\u8bef"},"go_id":2,"grade_id":15}'
			// console.log(JSON.parse(a))
		},
		created() {
			// console.log(this)
			// uni.setStorageSync('userid', '10')
			// uni.setStorageSync('shopid', '2')
			// if (!uni.getStorageSync('userid')) {
			// 	this.show = true
			// } else {
			// 	this.Getdata()
			// }

			// console.log(this.cartesianProductOf(['1','3'],['a','b'],['q','w'],['11','22'],['99','12']))
			// this.recursive()
			// let tearr = []
			// for(let i =0;i<arr.length;i++){

			// 	for(let j=0;j<arr[i].chilren.length;j++){
			// 		console.log(arr[i].chilren[j])

			// 	}
			// }
			// this.$_getApiData();
			// let url = '/StoreList';
			// let param = {
			// 	id: 2,
			// 	user_id: 10
			// }
			// Api.getDataByParam(url, param).then(res => {
			// 	console.log(4545)
			// 	console.log(res)
			// 	let data = res.data;
			// }).catch(err => {
			// 	console.error('is error', err);
			// })
			// uni.request({
			// 	url: '/Store',
			// 	method: 'GET',
			// 	header: {
			// 		'content-type': 'application/x-www-form-urlencoded'
			// 	},
			// 	data:param,
			// 	success: (res) => {
			// 		console.log(res)
			// 	},

			// 	fail: (err) => {
			// 		console.log(err)
			// 	}
			// })
		},
	}
</script>

<style>
	.panel_content {
		display: flex;
		justify-content: space-around;
		text-align: center;
		margin-top: 60rpx;
	}

	.content {
		display: flex;
		/* justify-content: space-around; */
		justify-content: space-between;
		text-align: center;
		margin-top: 40rpx;
	}
	.c_item {
		flex: 1;
	}
	.c_item .imgbox {
		position: relative;
		display: inline-block;
	}

	.item image {
		width: 44upx;
		height: 44upx;
	}

	.item {
		width: 25%;
		text-align: center;
		margin-bottom: 30upx;
	}

	.item-box {
		width: 100%;
		margin-top: 30upx;
		display: flex;
		flex-wrap: wrap;
		/* padding: 0px 30upx; */

	}

	.container {
		width: 100%;
		height: 100%;
		background-color: rgba(245, 245, 245, 1);
	}

	.panel {
		width: 690rpx;
		height: 235rpx;
		position: relative;
		top: 30rpx;
		left: 30rpx;
		background-image: url(http://www.callingsell.com/static/shangjiaduan/img/index001.png);
		border-radius: 2%;
		background-size: 100% 100%;
	}

	.panel_title {
		font-size: 32rpx;
		font-family: PingFang;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		position: relative;
		top: 30rpx;
		left: 30rpx;
	}

	.capital {
		font-size: 24rpx;
		font-family: PingFang;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		line-height: 40rpx;
	}

	.Store {
		width: 690rpx;
		height: 335rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 10px;
		padding: 20upx 25upx;
		position: relative;
		left: 30rpx;
		top: 60rpx;
	}

	.Store-title {
		font-size: 32rpx;
		font-family: PingFang;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		/* 	position: relative;
		top: 20rpx;
		left: 20rpx; */
	}

	.Store-img {
		width: 98rpx;
		height: 98rpx;
	}

	.Store-text {
		font-size: 26rpx;
		font-family: PingFang;
		font-weight: bold;
		color: rgba(85, 85, 85, 1);
	}

	.Store-ms {
		font-size: 20rpx;
		font-family: PingFang;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
	}

	.bgColor {
		position: fixed;
		top: 45px;
		left: 0;
		right: 0;
		bottom: 0;
		background-size: 200%;
		background-position: center;
		background: #F5F5F5;
		z-index: -1;
	}

	.loginbtn {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		background-color: rgba(0, 0, 0, 0.3);
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.showbox {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		background-color: rgba(0, 0, 0, 0.3);
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.white {
		background-color: rgba(0, 0, 0, 0);
	}

	.logobox {
		background-color: #FFFFFF;
	}

	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.dl_content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.dl_content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.btn {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.qxbtn {
		text-align: center;
		background-color: #C02C38;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.bottom {
		flex: 1;
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
	.hallstatus {
		position: absolute;
		right: 0rpx;
		top: 0rpx;
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		background-color: #C02C38;
	}
</style>
