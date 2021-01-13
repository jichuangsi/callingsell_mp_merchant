<template>
	<view class="Member">
		<view class="box">
			<view class="nomember">
				<view class="mem" style="font-size: 32rpx;">{{status?'商家会员':'您还不是商家会员'}}</view>
				<view class="mem" style="font-size: 26rpx;">{{status?'会员到期时间：'+time:'开通会员，享受超多权益'}}</view>
				<view class="btn" hover-class="op">
					{{status?'续费会员':'开通会员'}}
					<image src="../../static/img/fx.png"></image>
				</view>
			</view>
		</view>
		<view class="title">
			<image src="http://www.callingsell.com/static/shangjiaduan/img/xss.png"></image>
			<view class="lin"></view>
			<view class="">开会员，享优惠</view>
		</view>
		<view class="content">
			<view class="item " :class="cur==index?'item_bor':'' " v-for="(item,index) in list" @click="clickReduceNumber(index)"
			 :key=index>
				<view style="margin-top: 25rpx;">{{item.grade_name}}</view>
				<view class="pirce">￥{{item.money}}</view>
				<view class="old">
					原价{{item.gold}}
				</view>
			</view>
		</view>
		<div class="tishi">
			<div class="t_title">
				<span></span>
				<div>会员权益</div>
				<span></span>
			</div>
		</div>
		<div class="qybox">
			<div class="qy_item">
				<image src="../../static/img/xz.png"></image>
				<div class="qy_title">无上传限制</div>
				<div class="qy_text">开放权限没有产品 上传数量限制</div>
			</div>
			<div class="qy_item">
				<image src="../../static/img/money.png"></image>
				<div class="qy_title">货到付款</div>
				<div class="qy_text">开通货到付款权限</div>
			</div>
		</div>
		<div class="btnbox" @click="btn">{{status?'立即续费':'立即开通'}}</div>
	</view>
</template>

<script>
	import Api from '../../api/test';
	export default {
		data() {
			return {
				nomember: false,
				list: [],
				cur: 0,
				userid: uni.getStorageSync('userid'),
				status:false,
				time:'',
				userid: uni.getStorageSync('userid')
			}
		},
		mounted() {
			this.getdata()
		},
		methods: {
			clickReduceNumber: function(index) {
				let _this = this;
				_this.cur = index;
			},
			getdata() {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/ele/getGradeList').then(res => {
					console.log(res);
					self.list = res.data.data
				}).catch(err => {
					console.error('is error', err);
				})
				Api.getRequestData(self.APIS + '/wxapp/ele/getUserVip?userid='+self.userid).then(res => {
					console.log(res);
					if(res.data.grade){
						self.status = true
						self.time = self.timestampToTime(res.data.dq_time)
					}else{
						self.status = false
					}
				}).catch(err => {
					console.error('is error', err);
				})

			},
			timestampToTime(timestamp) {
				var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = date.getDate() + ' ';
				var h = date.getHours() + ':';
				var m = date.getMinutes() + ':';
				var s = date.getSeconds();
				return Y + M + D + h + m + s;
			},
			btn() {
				let self = this
				console.log(self.cur)
				Api.getRequestData(self.APIS + '/wxapp/ele/gradePay?userid=' + self.userid + '&gradeid=' + self.list[self.cur].grade_id)
					.then(res => {
						console.log(res);
						// console.log(JSON.parse(res.data))
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: res.data.timeStamp,
							nonceStr: res.data.nonceStr,
							package: res.data.package,
							signType: res.data.signType,
							paySign: res.data.paySign,
							success: function(res) {
								console.log('success:' + JSON.stringify(res));
								uni.showToast({
									title: '支付成功',
									duration: 2000
								})
								self.getdata()
							},
							fail: function(err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});
					}).catch(err => {
						console.error('is error', err);
					})
			}
		}
	}
</script>

<style>
	.Member {
		padding-bottom: 200rpx;
	}

	.qybox {
		display: flex;
		flex-wrap: wrap;
		margin-top: 40rpx;
		align-items: flex-start;
		padding: 0rpx 20rpx;
	}

	.qy_item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		margin-right: 20rpx;
		max-width: 250rpx;
	}

	.qy_item image {
		width: 40rpx;
		height: 40rpx;
		margin-bottom: 34rpx;
	}

	.qy_title {
		color: #4F5563;
		margin-bottom: 19rpx;
		font-size: 32rpx;
	}

	.qy_text {
		color: #979CA5;
		font-size: 24rpx;
	}

	.btnbox {
		width: 690rpx;
		height: 90rpx;
		text-align: center;
		line-height: 90rpx;
		border-radius: 45rpx;
		color: #FFFFFF;
		position: fixed;
		bottom: 100rpx;
		left: 50%;
		transform: translateX(-50%);
		background-color: #C02C38;
	}

	.tishi {
		margin-top: 40rpx;
		display: flex;
		flex-wrap: wrap;
	}

	.t_title {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #77777F;
	}

	.t_title span {
		width: 64rpx;
		height: 1rpx;
		background-color: #77777F;
	}

	.t_title div {
		margin: 0rpx 20rpx;
	}

	.old {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		text-decoration: line-through;
		color: #9A9A9A;
		line-height: 80rpx;
	}

	.pirce {
		font-size: 52rpx;
		font-family: DIN;
		font-weight: 500;
		color: #BF252B;
		margin-top: 30rpx;
		width: 100%;
		overflow-x: auto;
	}

	.content {
		width: 690rpx;
		position: relative;
		left: 30rpx;
		display: flex;
		flex-wrap: wrap;
	}

	.item_bor {
		border: 2rpx solid #BF242A;
		background: #FFF7E5 !important;
	}

	.item {
		width: 214rpx;
		height: 254rpx;
		background: #F5F5F5;
		border-radius: 12rpx;
		margin-top: 20rpx;
		text-align: center;
		font-size: 32rpx;
		margin-right: 20rpx;
	}

	.item:nth-child(3n) {
		margin-right: 0rpx;
	}

	.lin {
		width: 2rpx;
		height: 30rpx;
		border: #D8D8D8 1rpx solid;
		margin: 15rpx 10rpx;
	}

	.title image {
		width: 86rpx;
		height: 26rpx;
		margin-top: 15rpx;
	}

	.title {
		width: 690rpx;
		position: relative;
		left: 30rpx;
		height: 60rpx;
		line-height: 60rpx;
		display: flex;
		margin-top: 30rpx;

	}

	.op {
		opacity: 0.8;
	}

	.mem {
		font-family: PingFang SC;
		font-weight: 500;
		color: #FCDA92;
		line-height: 60rpx;
		position: relative;
		top: 40rpx;
	}

	.nomember .btn {
		width: 220rpx;
		height: 60rpx;
		background: linear-gradient(124deg, #FDE0A4 0%, #FCD684 100%);
		border-radius: 30rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #343434;
		text-align: center;
		line-height: 60rpx;
		margin: auto;
		margin-top: 80rpx;
	}

	.nomember .btn image {
		width: 12rpx;
		height: 20rpx;
		margin-left: 10rpx;
	}

	.nomember {
		width: 100%;
		text-align: center;
		height: 100%;
		margin: 0 auto;
	}

	.box {
		width: 710rpx;
		height: 299rpx;
		background: url(http://www.callingsell.com/static/shangjiaduan/img/Membercard.png);
		background-size: 100% 100%;
		position: relative;
		left: 20rpx;
	}
</style>
