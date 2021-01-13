<template>
	<view>
		<view class="bgColor">
		</view>
		<view class="box">
			<view class="item">
				<view class="head">
					<view class="headPortrait">
						<image :src="user.logo"></image>
					</view>
					<!-- <view class="head_btn">编辑</view> -->
				</view>
				<view class="content">
					<view class="" style="display: flex;">
						<view class="name">{{user.shop_name}}</view>
						<view class="lab">商家</view>
					</view>
					<!-- <view class="time">
						会员到期时间:2021-02-20
					</view> -->
				</view>
				<!-- <u-icon name="chat" color="#303133" size="40"></u-icon> -->
			</view>
			<!-- 
			<view class="Overview">
				<view class="over_item">
					<text class="item_lab">点赞</text>
					<text class="item_content">{{up}}</text>
				</view>
				<view class="over_item">
					<text class="item_lab">评论</text>
					<text class="item_content">{{comment}}</text>
				</view>
				<view class="over_item">
					<text class="item_lab">收藏</text>
					<text class="item_content">{{Collection}}</text>
				</view>
			</view> -->

			<!-- <view style="width: 690rpx;height: 80rpx;margin-left: 30rpx;margin-top: 40rpx;">
				<navigator url="../Member/Member" hover-class="none">
					<image src="http://www.callingsell.com/static/shangjiaduan/img/sq669.png" style="width: 690rpx;height: 80rpx;"></image>
				</navigator>
			</view> -->
			<view style="width: 100%;height: 40rpx;background: linear-gradient(0deg, #F9F9F9 0%, #FFFFFF 100%);"></view>
		</view>

		<view class="MyService">
			<view class="Service_title">我的服务</view>
			<view class="service_content">
				<!-- <view class="Service_item" @click="tomal"> -->
				<view class="Service_item">
					<navigator url="../Member/Member" hover-class="none">
					<image src="http://www.callingsell.com/static/shangjiaduan/img/my/Mymembers.png"></image>
					<view> 我的会员</view>
					</navigator>
				</view>
				<view class="Service_item">
					<navigator url="../ContactCustomerService/ContactCustomerService" hover-class="none">
						<image src="http://www.callingsell.com/static/shangjiaduan/img/my/Contactcustomerservice.png"></image>
						<view> 联系平台</view>
					</navigator>
				</view>
				<view class="Service_item">
					<navigator url="../SetUp/SetUp" hover-class="none">
						<image src="../../static/img/xy.png"></image>
						<view> 我的协议</view>
					</navigator>
				</view>
				<view class="Service_item">
					<navigator url="../Feedback/Feedback" hover-class="none">
						<image src="http://www.callingsell.com/static/shangjiaduan/img/my/Feedback.png"></image>
						<view> 意见反馈</view>
					</navigator>
				</view>
				<view class="Service_item">
					<!-- <navigator url="../OrderGrabbing/OrderGrabbing" hover-class="none">
						<image src="http://www.callingsell.com/static/shangjiaduan/img/my/hammer.png"></image>
						<view> 预定抢单</view>
					</navigator> -->
				</view>
				<view class="Service_item">
					<!-- <navigator url="../RankingList/RankingList" hover-class="none">
						<image src="http://www.callingsell.com/static/shangjiaduan/img/my/Handlist.png"></image>
						<view> 拎手榜</view>
					</navigator> -->
				</view>
				<!-- 		<view class="Service_item">
					<navigator url="../NearbyBusinesses/NearbyBusinesses" hover-class="none">
						<image src="http://www.callingsell.com/static/shangjiaduan/img/my/Nearbybusinesses.png"></image>
						<view> 附近商家</view>
					</navigator>
				</view> -->
				<!-- <view class="Service_item">
					<navigator url="../RecycleBin/RecycleBin" hover-class="none">
						<image src="http://www.callingsell.com/static/shangjiaduan/img/my/recyclebin.png"></image>
						<view> 回收站</view>
					</navigator>
				</view> -->
			</view>
		</view>
	<!-- 	<view class="MyService" style="margin-top: 30rpx;">
			<view class="Service_title">其他服务</view>
			<view class="service_content">
				<view class="Service_item">
					<navigator url="../ContactCustomerService/ContactCustomerService" hover-class="none">
						<image src="http://www.callingsell.com/static/shangjiaduan/img/my/Contactcustomerservice.png"></image>
						<view> 联系平台</view>
					</navigator>
				</view>
				<view class="Service_item">
					<navigator url="../SetUp/SetUp" hover-class="none">
						<image src="../../static/img/xy.png"></image>
						<view> 我的协议</view>
					</navigator>
				</view>
				<view class="Service_item">
					<navigator url="../Feedback/Feedback" hover-class="none">
						<image src="http://www.callingsell.com/static/shangjiaduan/img/my/Feedback.png"></image>
						<view> 意见反馈</view>
					</navigator>
				</view>
			</view>
		</view> -->

		<view class="showbox white" v-if="show" @click="isCanUse = true">

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
					<view class='bottom qxbtn' @click="sqclick">
						取消
					</view>
					<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
						授权登录
					</button>
				</div>
			</view>
		</view>
	</view>
</template>

<script>
	import Api from '../../api/test';
	export default {
		data() {
			return {
				name: "",
				up: '0',
				comment: '0',
				Collection: '0',
				user: '',
				isCanUse: false,
				show: false,
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
														self.GetUserInfo()
													}else{
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
			GetUserInfo() {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getEleDetail?userid=' + self.userid).then(res => {
					console.log(res);
					self.user = res.data[0]
					console.log(self.user)
				}).catch(err => {
					console.error('is error', err);
				})
			},
			tomal() {
				console.log(755)
				uni.showToast({
					title: '当前免费使用',
					icon: 'none',
					duration: 2000
				});
			}
		},
		created() {
			let that = this;
			if (!uni.getStorageSync('userid')) {
				that.show = true
			} else {
				that.GetUserInfo()
			}
			// let url = '/GetUserInfo';
			// Api.getRequestData(url).then(res => {
			// 	console.log(res.data);
			// 	let data = res.data;
			// 	_this.name = data.user_name;
			// }).catch(err => {
			// 	console.error('is error', err);
			// })
		},
	}
</script>

<style>
	.service_content {
		margin-top: 30rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.Service_item {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;

		width: 33%;
		text-align: center;
		margin-bottom: 30rpx;
	}

	.Service_item image {
		width: 44rpx;
		height: 44rpx;
	}

	.Service_title {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		margin-left: 20rpx;
		line-height: 62rpx;
	}

	.MyService {
		width: 690rpx;
		min-height: 240rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		position: relative;
		left: 30rpx;
	}

	.item_content {
		font-size: 42rpx;
		font-family: DIN;
		font-weight: bold;
		color: #333333;
		margin-left: 10rpx;
	}

	.item_lab {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
	}

	.Overview {
		display: flex;
		justify-content: space-around;
	}

	.content {
		width: 320rpx;
		margin-top: 40rpx;
		margin-left: 20rpx;
	}

	.u-icon {
		display: block;
		margin-top: 40rpx;
	}

	.item {
		display: flex;
		/* justify-content: space-around; */
		padding: 0rpx 30rpx;
	}

	.time {
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
		line-height: 40rpx;
		margin-top: 20rpx;
	}

	.lab {
		margin-left: 15rpx;
		text-align: center;
		line-height: 36rpx;

		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;

		width: 80rpx;
		height: 36rpx;
		background: #C02C38;
		border-radius: 10rpx;
	}

	.name {
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		line-height: 36rpx;
	}

	.headPortrait image {
		width: 150rpx;
		height: 150rpx;
	}

	.head_btn {
		text-align: center;
		line-height: 40rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;

		width: 86rpx;
		height: 40rpx;
		background: #F5F5F5;
		border-radius: 10rpx;

		position: relative;
		top: -30rpx;
		left: 40rpx;
	}

	.bgColor {
		position: fixed;
		top: 40px;
		left: 0;
		right: 0;
		bottom: 0;
		background: #F5F5F5;
		z-index: -1;
	}

	.box {
		width: 100%;
		/* min-height: 400rpx; */
		background: rgba(255, 255, 255, 1);
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
</style>
