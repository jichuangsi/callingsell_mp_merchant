<template>
	<view class="evaluate">
		<view class="bgColor">
		</view>
		<view class="item">
			<view class="title">
				<view class="ShopName">{{order.name}}</view>
			</view>
			<view class="shop" v-for="(items,indexs) in order.goods">
				<image :src="items.photo" style="width: 120rpx;height: 120rpx;"></image>
				<view class="shop_content" @click="order()">
					<view class="shop_title">{{items.name}}</view>
					<view class="lab" v-if="items.produceOption&&items.produceOption.length>0">规格：<span v-for="(itemq,indexq) in items.produceOption">{{itemq.name}}</span></view>
					<view class="lab">x{{items.num}}</view>
				</view>
			</view>

			<!--  -->
			<view class="row">
				<view class="left_lab">包装费</view>
				<view class="newPrice">¥{{order.tableware_price}}</view>
			</view>
			<view class="row">
				<view class="left_lab">配送费</view>
				<view class="newPrice">¥{{order.logistics}}</view>
			</view>
			<view class="row">
				<view class="left_lab">新人立减</view>
				<view class="newPrice" style="color: #C02C38;">-¥{{order.new_money}}</view>
			</view>
			<view class="row">
				<view class="left_lab">满减</view>
				<view class="newPrice" style="color: #C02C38;">{{order.full_reduce_price}}</view>
			</view>
			<view class="row-end">
				<view class="left_lab">商品小计</view>
				<view class="newPrice" style="color: #C02C38;">￥{{order.money}}</view>
			</view>
		</view>
		<view class="box" v-for="(item,index) in arr">
			<view class="box-top">
				<image :src="item.user.face"></image>
				<view class="box-title">
					<view class="">
						<view class="">
							{{item.user.account}}
						</view>
						<u-rate :count="count" active-color="#C02C38" inactive-color="#CCCCCC" v-model="value"></u-rate>
					</view>
					<view class="time">
						{{timestampToTime(item.create_time)}}
					</view>
				</view>
			</view>
		
			<view class="pl">
				<view class="pl-content">
					{{item.contents}}
				</view>
				<view class="pl-img">
					<image :src="items" v-for="(items,indexx) in item.images"></image>
				</view>
		
				<view class="hf" v-if="item.reply">
					<view class="hf-title">
						商家回复
					</view>
					<view style="font-size: 22rpx; color: #343434;margin-top: 10rpx;">
						{{item.reply}}
					</view>
				</view>
		
				<!-- <view class="thumb">
					<view class="thumb-item">
						<u-icon name="thumb-up" color="#9A9A9A" size="40"></u-icon>
						<text>268</text>
					</view>
					<view class="thumb-item">
						<u-icon name="thumb-down" color="#9A9A9A" size="40"></u-icon>
						<text>268</text>
					</view>
		
				</view> -->
			</view>
		</view>
				<div class="foot">
					<!-- <u-input type="text" v-model="value" confirm-type="send" :border="border" /> -->
					<input type="text" placeholder="说点什么..." v-model="val" confirm-type="send" @confirm="send">
				</div>
	</view>
</template>

<script>
	import Api from '../../api/test';
	export default {
		data() {
			return {
				id: '',
				order: '',
				val: '',
				count: 4,
				value: 5,
				arr:[],
				userid: uni.getStorageSync('userid'),
				dianping_id:''
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			// console.log(option.id)
			// console.log(777)
			this.id = option.id
			this.getdata()
			this.getcomment()
		},
		methods: {
			send() {
				let self = this
				if(self.dianping_id!=''&&(!self.arr[0].reply||self.arr[0].reply=='')){
					if (self.val != '') {
						Api.getRequestData(self.APIS + '/wxapp/EleStore/replyComment?userid=' + self.userid + '&dianping_id='+self.dianping_id+'&content=' +
							self.val).then(
							res => {
								console.log(res);
								if(res.data.message=='修改成功'){
										uni.showToast({
											title: '回复成功',
											duration: 2000
										});
										self.val = ''
										self.getcomment()
								}else{
										uni.showToast({
											title: res.data.message,
											icon: 'none',
											duration: 2000
										});
								}
							}).catch(err => {
							console.error('is error', err);
						})
					} else {
						uni.showToast({
							title: '请填写回复信息',
							icon: 'none',
							duration: 2000
						});
					}
				}
			},
			getcomment() {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getCommentByOrderId?orderid=' + self.id).then(
					res => {
						console.log(res);
						if(res.data.dianping&&res.data.dianping.length>0){
							self.arr = res.data.dianping
							self.dianping_id = res.data.dianping[0].dianping_id
						}
					}).catch(err => {
					console.error('is error', err);
				})
			},
			getdata() {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getOrderDetail?orderid=' + self.id).then(
					res => {
						console.log(res);
						self.order = res.data.order[0]
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
		}
	}
</script>

<style>
	.thumb-item {
		margin: 10rpx 10rpx;
	}

	.thumb {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #9A9A9A;
		display: flex;
		justify-content: flex-end;
	}

	.hf-title {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #343434;
	}

	.hf {
		width: 615rpx;
		/* height: 146rpx; */
		background: #F5F5F5;
		border-radius: 10rpx;
		margin-top: 20rpx;
		padding: 10rpx;
	}

	.pl-img {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

	}

	.pl-img image {
		width: 160rpx;
		height: 120rpx;
		margin-top: 20rpx;
	}

	.pl-content {
		width: 100%;
		height: 70rpx;
		line-height: 35rpx;
		font-size: 24rpx;
	}

	.pl {
		width: 610rpx;
		position: relative;
		left: 80rpx;
	}

	.time {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #5C5C5C;
		line-height: 60rpx;
		margin-top: 10rpx;
	}

	.box-title {
		display: flex;
		justify-content: space-between;
		width: 80%;
		margin-left: 30rpx;
	}

	.box-top image {
		width: 60rpx;
		height: 60rpx;
	}

	.box-top {
		display: flex;
	}

	.box {
		width: 100%;
		min-height: 600rpx;
		position: relative;
		/* top: 140rpx; */
		/* left: 30rpx; */
		padding: 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}

	.card {
		width: 690rpx;
		position: relative;
		top: 120rpx;
		left: 30rpx;
		display: flex;
		justify-content: space-around;
	}

	.card-top image {
		width: 15rpx;
		height: 10rpx;
		margin-top: 15rpx;
		margin-left: 20rpx;
	}

	.card-top {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #343434;
		line-height: 42rpx;
		display: flex;
	}

	.foot {
		width: 100%;
		height: 88upx;
		display: flex;
		align-items: center;
		padding: 12upx 32upx;
		position: fixed;
		bottom: 0upx;
		left: 0upx;
		background-color: #FFFFFF;
		border-top: 1upx solid rgba(209, 216, 222, 1);
		box-sizing: border-box;
	}

	.foot input {
		flex: 1;
		margin-right: 32upx;
		background: rgba(241, 244, 252, 1);
		border-radius: 32px;
		padding: 0upx 32upx;
		font-size: 26upx;
		height: 64upx;
	}

	.left_b {
		margin-left: 25rpx;
	}

	.left_a {
		width: 25%;
	}

	.item_row {
		margin-top: 15rpx;
		display: flex;
		padding: 0 30rpx;

		font-size: 28rpx;
		line-height: 40rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
	}

	.row-end {
		display: flex;
		justify-content: flex-end;
		padding: 0 30rpx;
		margin-top: 20rpx;
	}

	.left_lab {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
	}

	.row {
		display: flex;
		justify-content: space-between;
		padding: 0 30rpx;
		margin-top: 15rpx;
	}

	.lab-row {
		display: flex;
		justify-content: space-between;

	}

	.lab-price {
		display: flex;
	}

	.newPrice {
		font-size: 32rpx;
		font-family: DIN;
		font-weight: bold;
		color: #333333;
		line-height: 42rpx;
	}

	.oldPrice {

		font-size: 32rpx;
		font-family: DIN;
		font-weight: bold;
		text-decoration: line-through;
		color: #999999;
		line-height: 42rpx;
	}

	.shop_title {
		width: 480rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.shop_count {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		text-align: right;
		margin-right: 70rpx;
	}

	.money {
		font-size: 32rpx;
		font-family: DIN;
		font-weight: bold;
		color: #BF242A;
		line-height: 42rpx;
	}

	.shop {
		display: flex;
		justify-content: space-evenly;
		margin-top: 30rpx;
	}

	.lab {
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
		line-height: 42rpx;
	}

	.title {
		display: flex;
		justify-content: end;
		text-indent: 1rem;
	}

	.shopStatus {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #C02C38;
		line-height: 40rpx;
	}

	.ShopName {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}

	.item {
		width: 690rpx;
		width: 690rpx;
		min-height: 200rpx;
		margin-top: 35rpx;
		background: #FFFFFF;
		position: relative;
		left: 30rpx;
		padding: 30rpx 0;
		bottom: 25rpx;
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
