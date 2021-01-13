<template>
	<view>
		<view class="bgColor"></view>
		<!-- <view class="item">
			<view class="radio"@click="check()">
				<u-checkbox-group >
					<u-checkbox v-model="checked" active-color="#C02C38" shape="circle">线上支付</u-checkbox>
				</u-checkbox-group>
			</view>
		</view> -->

		<view class="item">
			<view class="radio">
			<!-- <view class="radio" @click="check1()"> -->
				<u-checkbox-group style="width: 100%;height: 100%;">
					<u-checkbox v-model="checked1" active-color="#C02C38" shape="circle" style="width: 100%;height: 100%;">货到付款</u-checkbox>
				</u-checkbox-group>
			</view>
		</view>
		<view class="btn" hover-class="btnH" @click="btn">
			保存
		</view>
	</view>
</template>

<script>
	import Api from '../../api/test';
	export default {
		data() {
			return {
				checked: false,
				checked1: false,
				userid:uni.getStorageSync('userid')
			}
		},
		mounted() {
			this.GetUserInfo()
		},
		methods: {
			check() {
				let _this = this;
				_this.checked = !_this.checked;
			},
			check1() {
				console.log(1111)
				let _this = this;
				_this.checked1 = !_this.checked1;
				console.log(_this.checked1)
			},
			ceshi(){
				console.log(666)
			},
			GetUserInfo() {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getEleDetail?userid=' + self.userid).then(res => {
					console.log(res);
					self.checked=res.data[0].is_pay==1?true:false
					self.checked1=res.data[0].is_daofu==1?true:false
				}).catch(err => {
					console.error('is error', err);
				})
			},
			btn(){
				console.log(1111)
				let self = this
				let data = self.checked?1:0
				let data1 = self.checked1?1:0
				Api.getRequestData(self.APIS + '/wxapp/EleStore/updatePaymentMethod?userid='+self.userid+'&is_pay='+data+'&is_daofu='+data1).then(
					res => {
						console.log(res)
						if (res.data.message == '修改成功') {
								uni.showToast({
									title: '修改成功',
									duration: 2000
								})
						}else{
							uni.showToast({
								title: res.data.message,
								icon:'none',
								duration: 2000
							})
						}
					}).catch(err => {
					console.error('is error', err);
				})
			}
		}
	}
</script>

<style>
	.btnH{
		opacity: 0.8;
	}
	.btn{
		width: 690rpx;
		height: 102rpx;
		background: #C02C38;
		border-radius: 51rpx;
		text-align: center;
		position: absolute;
		bottom: 60rpx;
		left: 30rpx;
		line-height: 102rpx;
		
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
	}
	.radio {
		line-height: 88rpx;
		position: relative;
		left: 25rpx;
	}

	.item {
		width: 690rpx;
		/* min-height: 88rpx; */
		margin: 20rpx auto;
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 20rpx 0rpx;
	}

	.bgColor {
		position: fixed;
		top: 0px;
		left: 0;
		right: 0;
		bottom: 0;
		background: #F5F5F5;
		z-index: -1;
	}
</style>
</style>
