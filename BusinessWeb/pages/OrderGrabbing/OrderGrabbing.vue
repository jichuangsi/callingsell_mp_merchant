<template>
	<view>
		<view class="bgColor"></view>
		<view class="">
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" active-color="#343434"></u-tabs>
		</view>
		<view v-show="current==0">
			<view class="item" v-for="(item,index) in arr1">
				<view class="box">
					<view class="row">
						<view class="">想要购买的商品</view>
						<view class="" v-if="item.is_new">new</view>
						<view class="" style="color: #C02D38;">抢单中</view>
					</view>
					<view class="content">
						{{item.content}}
					</view>
					<view class="row">
						<view>价格区间(元)</view>
						<view>{{item.min_price}}-{{item.max_price}}</view>
					</view>
					<!-- <view class="row">
						<view>配送费(元)</view>
						<view>￥{{item.logistic}}</view>
					</view> -->
				</view>
				<view class="btn" hover-class="btnr" @click="show=true,id=item.id">
					我要抢单
				</view>
			</view>

		</view>
		<u-popup v-model="show" mode="center" border-radius="14" width="80%" height="30%">
			<view>
				<view class="pop">
					我要抢单
				</view>
				<view class="pop_center">
					<input type="number" class="pop_input" v-model="desc"/>
				</view>
				<view class="pop_btn" hover-class="btnr" @click="getGrab()">
					提交
				</view>
			</view>
		</u-popup>
		<view class="" v-show="current==1">
			<view class="item" v-for="(item,index) in arr2">
				<view class="box">
					<view class="row">
						<view class="">想要购买的商品</view>
						<view class="" style="color: #C02D38;">{{item.status==1?'抢单成功':item.status==2?'抢单失败':'抢单中'}}</view>
					</view>
					<view class="content">
						{{item.order.content}}
					</view>
					<view class="row">
						<view>价格区间(元)</view>
						<view>{{item.order.min_price}}-{{item.order.max_price}}</view>
					</view>
					<!-- <view class="row">
						<view>配送费(元)</view>
						<view>￥{{item.order.logistic}}</view>
					</view> -->
				</view>
				<!--  v-if="item.status==1" -->
				<view class="btn" hover-class="btnr" v-if="item.status==1" @click="detailgo(item.order.id)">
					查看订单
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Api from '../../api/test';
	export default {
		data() {
			return {
				list: [{
					name: '预定市场'
				}, {
					name: '我的抢单'
				}],
				current: 0,
				show: false,
				pageindex1:1,
				pageindex2:1,
				arr1:[],
				arr2:[],
				id:'',
				desc:'',
				userid:uni.getStorageSync('userid')
			}
		},
		mounted() {
			this.getreset()
		},
		methods: {
			change(index) {
				this.current = index;
			},
			detailgo(id) {
				uni.navigateTo({
					url: '/pages/OrderGrabbing/OrderGrabbingdetails?id=' + id
				});
			},
			getreset(){
				let self = this
				self.pageindex1 = 1
				self.pageindex2 = 1
				self.arr1=[]
				self.arr2=[]
				self.getdata1()
				self.getdata2()
			},
			getGrab() {
				let self = this
				if(self.desc!=''){
					Api.getRequestData(self.APIS + '/wxapp/EleStore/getOrderGrabbing?userid='+self.userid+'&orderid='+self.id+'&price='+self.desc).then(res => {
						console.log(res);
						if(res.data.message=='成功'){
							self.show=false
							self.desc=''
							self.getreset()
							uni.showToast({
								title: res.data.message,
								duration: 2000
							});
						}else{
							self.show=false
							self.desc=''
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
					
				}
			},
			getdata1() {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getOrderGrabbingList?userid='+self.userid+'&page='+self.pageindex1).then(res => {
					console.log(res);
					if (res.data && res.data.length > 0) {
						self.pageindex1 = self.pageindex1 + 1
						self.arr1.push(...res.data)
					}
				}).catch(err => {
					console.error('is error', err);
				})
			},
			getdata2() {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getMyOrderGrabbingList?userid='+self.userid+'&page='+self.pageindex2).then(res => {
					console.log(res);
					console.log(777)
					if (res.data && res.data.length > 0) {
						self.pageindex2 = self.pageindex2 + 1
						self.arr2.push(...res.data)
					}
				}).catch(err => {
					console.error('is error', err);
				})
			},
		},
		onReachBottom() {
			console.log(111)
			if (this.current == 0 && this.pageindex1 > 1) {
				this.getdata1()
			} else if (this.current == 1 && this.pageindex2 > 1) {
				this.getdata2()
			}
		}
	}
</script>

<style>
	.pop_btn {
		width: 290rpx;
		height: 78rpx;
		background: #FFFFFF;
		border: 2rpx solid #C02C38;
		border-radius: 5rpx;
		text-align: center;
		line-height: 78rpx;

		font-size: 32rpx;
		color: #C02D38;
		margin: 20rpx auto;
	}

	.pop_input {
		width: 100%;
		height: 100%;
		text-align: center;

		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #343434;
	}

	.pop_center {
		width: 525rpx;
		height: 93rpx;
		background: #EFEFF5;
		border-radius: 5rpx;
		margin: 30rpx auto;
	}

	.pop {
		width: 100%;
		height: 124rpx;
		text-align: center;
		line-height: 124rpx;

		background: linear-gradient(250deg, #F9B942 0%, #F9CA61 100%);
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FEFEFE;
	}

	.content {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #343434;
		line-height: 36rpx;
		margin-bottom: 25rpx;
	}

	.row {
		height: 60rpx;
		display: flex;
		justify-content: space-between;


		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #343434;
		margin: 20rpx auto;
	}

	.box {
		width: 630rpx;
		margin: auto auto;
		padding: 20rpx 0;
	}

	.btnr {
		opacity: 0.8;
	}

	.btn {
		width: 690rpx;
		height: 90rpx;
		background: #C02C38;
		border-radius: 10rpx;

		text-align: center;
		line-height: 90rpx;
		color: #FFFFFF;
		font-size: 32rpx;
		/* position: absolute;
		bottom: 0; */
	}

	.item {
		width: 690rpx;
		min-height: 300rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		margin: 20rpx auto;
		position: relative;
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
</style>
