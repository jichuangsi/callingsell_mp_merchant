<template>
	<view>
		<view class="bgColor">
		</view>
		<view class="item">
			<view class="title">订单进度</view>
			<view style="margin-top: 25rpx;">
				<u-steps :list="numList" :current="status" active-color="#26C87E" mode=number></u-steps>
			</view>
		</view>
		<view class="top">
			<view style="display: flex;justify-content: space-between;width: 100%;">
				<view class="">
					收货人：{{order.address.name}}
				</view>
				<view class="">{{order.address.mobile}}</view>
			</view>
			<view class="address">
				收货地址：{{order.address.province==order.address.city?order.address.province+order.address.area+order.address.addr:order.address.province+order.address.city+order.address.area+order.address.addr}}
			</view>
			<image style="width: 100%; height: 4rpx;position: absolute;bottom: 0;left:0" src="http://www.callingsell.com/static/shangjiaduan/img/bottom.png"></image>
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
			<!-- <view class="row">
				<view class="left_lab">新人立减</view>
				<view class="newPrice" style="color: #C02C38;">-¥{{order.new_money}}</view>
			</view>
			<view class="row">
				<view class="left_lab">满减</view>
				<view class="newPrice" style="color: #C02C38;">{{order.full_reduce_price}}</view>
			</view> -->
			<view class="row-end">
				<view class="left_lab">商品小计</view>
				<view class="newPrice" style="color: #C02C38;">￥{{order.new_money}}</view>
			</view>
		</view>

		<view class="item">
			<view class="title">
				<view class="ShopName">备注</view>
			</view>
			<view style="padding: 20rpx 30rpx;font-size: 28rpx;color: #333333;line-height: 42rpx;word-break: break-all;">
				{{order.note}}
			</view>
		</view>

		<view class="item">
			<view class="title">
				<view class="ShopName">订单信息</view>
			</view>
			<view class="item_row">
				<view class="left_a">订单编号：</view>
				<view class="left_b">{{order.orderCode}}</view>
			</view>
			<view class="item_row">
				<view class="left_a">创建时间：</view>
				<view class="left_b">{{timestampToTime(order.time)}}</view>
			</view>
			<view class="item_row">
				<view class="left_a">支付方式：</view>
				<view class="left_b">{{order.code=="wxapp"?'微信支付':'货到付款'}}</view>
			</view>
			<view class="item_row">
				<view class="left_a">实付款：</view>
				<view class="left_b">¥{{order.money}}</view>
			</view>
			<view class="btn_row">
				<view class="btn" @click.stop="phoneclick()">联系买家</view>
				<!-- <view class="box_border"></view>
				<view class="btn">拨打电话</view> -->
			</view>
		</view>

		<!-- 遮罩层 -->
		<view class="mask" v-show="mask ||layer"></view>
		<view class="task layui-anim-scale layui-anim" v-show="mask">
			<view class="content">
				<view class="task_title">接单说明</view>
				<u-line color="#F5F5F5"></u-line>
				<view class="task_content">
					<view class="tab">
						自主配送
					</view>
					<view style="text-align: left;font-size: 24rpx;margin-top: 20rpx;">商家可自己注册成为拎手，自行配送</view>
					<view class="tab" style="margin-top: 50rpx;">
						发布任务
					</view>
					<view style="text-align: left;font-size: 24rpx;margin-top: 20rpx;">商家接单后，可发布任务到拎手大厅，由附近拎手接单并送出</view>
					<view class="btn_row">
						<view class="btn_row_col" @click="Receiving()">
							自主配送
						</view>
						<view class="btn_row_col" @click="nonefb">
							发布任务
						</view>
					</view>
				</view>
			</view>
			<view class="close" @click.stop="mask=false">x</view>
		</view>
		<!-- 发布任务 -->
		<view class="task_rw layui-anim-scale layui-anim" v-show="layer">
			<view class="close_img " @click="layer=false">
				<image src="http://www.callingsell.com/static/shangjiaduan/img/close.png"></image>
			</view>
			<view class="secuss">
				<image src="http://www.callingsell.com/static/shangjiaduan/img/secuss.png"></image>
			</view>
			<view style="font-size: 30rpx;font-weight: bold;color: #333333;">发布成功</view>
			<view class="secuss_font">
				系统已将订单发布到任务大 厅，等待拎手接单
			</view>
			<view class="secuss_btn" @click="layer=false">我知道了</view>
		</view>
		<u-mask class="popshox" :show="showpop">
			<view class="showbox">
				<image class="shownone" src="../../static/img/gb.png" @click="showpop=false"></image>
				<image class="showtb" src="../../static/img/cg.png"></image>
				<view class="showtitle">操作成功</view>
				<!-- <view class="showtext">已接单</view> -->
				<view class="showbtn" @click="showpop=false">确定</view>
			</view>
		</u-mask>
		<view class="bottom">
			<view class="btn_b" style="color: #C02C38;border: 1rpx solid #C02C38;" v-if="order.state==1" @click.stop="refuse()">
				拒绝接单
			</view>
			<view class="btn_b" style="color: #C02C38;border: 1rpx solid #C02C38;" v-if="order.state==1" @click.stop="mask=true">
				我要接单
			</view>
			<!-- <view class="btn_b" style="color: #C02C38;border: 1rpx solid #C02C38;" v-if="order.state==2" @click="mask=true">
				开始配送
			</view> -->
			<view class="btn_b" style="color: #C02C38;border: 1rpx solid #C02C38;" v-if="order.state==2&&order.delivery_type==2" @click.stop="confirmbtn()">
				{{order.is_play&&order.is_play=='1'?'确认送达':'确认送达并收款'}}
			</view>
			<view class="btn_b" style="color: #C02C38;border: 1rpx solid #C02C38;" v-if="order.state==8" @click="del()">
				删除订单
			</view>
			<view class="btn_b" style="color: #C02C38;border: 1rpx solid #C02C38;" v-if="order.state==8" @click="comment()">
				查看评价
			</view>
		</view>
		<!-- 发布任务配送费 -->
		
		<u-popup v-model="logisticsshow" mode="center" border-radius="14" width="80%" height="30%">
			<view>
				<view class="pop">
					配送费
				</view>
				<view class="pop_center">
					<input type="digit" class="pop_input" v-model="desc"/>
				</view>
				<view class="pop_btn" hover-class="btnr" @click="getGrab()">
					提交
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import Api from '../../api/test';
	export default {
		data() {
			return {
				show: false,
				list: [{
						value: '1',
						label: '商品价格有误'
					},
					{
						value: '2',
						label: '物品已售空'
					},
					{
						value: '3',
						label: '其他原因'
					}
				],
				numList: [{
					name: '生成订单'
				}, {
					name: '商家接单'
				}, {
					name: '配送中'
				}, {
					name: '交易完成'
				}, ],
				id: '',
				order: '',
				status: 0,
				showpop: false,
				layer: false,
				mask: false,
				logisticsshow:false,
				desc:'',
				userid: uni.getStorageSync('userid')
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option)
			// console.log(777)
			this.id = option.id
			this.getdata()
		},
		methods: {
			nonefb() {
				// uni.showModal({
				// 	title: '仅支持在线支付时使用',
				// 	content: '用户使用在线支付时，此时商家可自行配送，也可发布到任务大厅，由拎手配送',
				// 	confirmText: '确定',
				// 	success: function(res) {
				// 		if (res.confirm) {
				// 			console.log('用户点击确定');
				// 		} else if (res.cancel) {
				// 			console.log('用户点击取消');
				// 		}
				// 	}
				// });
				
				let self = this
				if(self.order.code!='daofu'){
						self.logisticsshow=true
				}else{
					uni.showToast({
						title: '货到付款不能发布任务',
						icon:'none',
						duration: 2000
					})
				}
			},
			getGrab(){
				let self = this
				if(self.desc==''){
					uni.showToast({
						title: '请填写配送费',
						icon:'none',
						duration: 2000
					})
					return
				}
					Api.getRequestData(self.APIS + '/wxapp/EleStore/updateOrderStatus?orderid=' + self.order.id + '&userid=' + self.userid +
						'&delivery_type=' + 1+'&logistics_price='+self.desc).then(
						res => {
							console.log(res);
							if (res.data.message == '修改成功') {
								let pages = getCurrentPages();
								let prePage = pages[pages.length - 2];
								let data = prePage.$vm ? prePage.$vm : prePage
								self.logisticsshow=false
								self.showpop = true
								self.mask = false
								self.getdata()
								data.getreset()
							}
						}).catch(err => {
						console.error('is error', err);
					})
			},
			comment() {
				let self = this
				uni.navigateTo({
					url: '/pages/evaluate/evaluate?id=' + self.order.id
				});
			},
			phoneclick() {
				let self = this
				uni.showModal({
					title: '电话',
					content: '电话号码' + self.order.address.mobile,
					confirmText: '呼叫',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.makePhoneCall({
								phoneNumber: self.order.address.mobile //仅为示例
							});

						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			del(item) {
				let self = this
				uni.showModal({
					title: '提示',
					content: '是否拒绝该订单',
					confirmText: '确定',
					success: function(res) {
						console.log(res)
						if (res.confirm) {
							console.log('用户点击确定');
							Api.getRequestData(self.APIS + '/wxapp/EleStore/del_order?type=shop&orderid=' + self.order
								.id).then(
								res => {
									console.log(res);
									if (res.data.message == '删除成功') {
										let pages = getCurrentPages();
										let prePage = pages[pages.length - 2];
										let data = prePage.$vm ? prePage.$vm : prePage
										self.showpop = true
										self.getdata()
										data.getreset()
									}
								}).catch(err => {
								console.error('is error', err);
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			refuse(item) {
				let self = this
				uni.showModal({
					title: '提示',
					content: '是否拒绝该订单',
					confirmText: '确定',
					success: function(res) {
						console.log(res)
						if (res.confirm) {
							console.log('用户点击确定');
							Api.getRequestData(self.APIS + '/wxapp/EleStore/finishOrder?userid=' + self.userid + '&orderid=' + self.order
								.id + '&type=' + 6).then(
								res => {
									console.log(res);
									if (res.data.message == '拒绝接单成功') {
										let pages = getCurrentPages();
										let prePage = pages[pages.length - 2];
										let data = prePage.$vm ? prePage.$vm : prePage
										self.showpop = true
										self.getdata()
										data.getreset()
									}
								}).catch(err => {
								console.error('is error', err);
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			confirmbtn(item) {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/finishOrder?userid=' + self.userid + '&orderid=' + self.order.id +
					'&type=' + 5).then(
					res => {
						console.log(res);
						if (res.data.message == '确认送达成功') {
							let pages = getCurrentPages();
							let prePage = pages[pages.length - 2];
							let data = prePage.$vm ? prePage.$vm : prePage
							self.showpop = true
							self.getdata()
							data.getreset()
						}
					}).catch(err => {
					console.error('is error', err);
				})
			},
			Receiving() {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/updateOrderStatus?orderid=' + self.order.id + '&userid=' + self.userid +
					'&delivery_type=' + 2).then(
					res => {
						console.log(res);
						if (res.data.message == '修改成功') {
							let pages = getCurrentPages();
							let prePage = pages[pages.length - 2];
							let data = prePage.$vm ? prePage.$vm : prePage
							self.showpop = true
							self.mask = false
							self.getdata()
							data.getreset()
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
						let state = Number(self.order.state)
						// self.status = state==1?'0':state==2?'1':state==3?'2':'4'
						self.status = state
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
	.btn_b {
		/* width: 160rpx; */
		height: 60rpx;
		background: #FFFFFF;
		border: 1rpx solid #666666;
		border-radius: 30rpx;
		text-align: center;
		line-height: 60rpx;

		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
		margin: auto 20rpx;
		padding: 0rpx 20rpx;
	}

	.bottom {
		width: 100%;
		height: 100rpx;
		background: #FFFFFF;
		display: flex;
		justify-content: flex-end;

	}

	.box_border {
		width: 2rpx;
		height: 60rpx;
		border: 1rpx solid #cccccc;
		margin: auto 0;
	}

	.btn:hover {
		opacity: 0.8;
	}

	.btn {
		margin-top: 20rpx;
		width: 160rpx;
		height: 60rpx;
		background: #FFFFFF;
		border: 1rpx solid #666666;
		border-radius: 30rpx;
		text-align: center;
		line-height: 60rpx;


		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
	}

	.btn_row {
		display: flex;
		justify-content: space-evenly;
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

	.address {
		width: 100%;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
		display: flex;
		margin-top: 35rpx;
		/* text-indent: 1rem; */

		/* overflow: hidden;
		webtext-overflow: ellipsis;
		-webkit-webtext-overflow: ellipsis;
		white-space: nowrap;
		-webkit-white-space: nowrap; */
	}

	.top {
		/* width: 100%; */
		width: 690rpx;
		/* height: 160rpx; */
		background: #FFFFFF;

		padding-top: 25rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		position: relative;
		left: 30rpx;
		padding: 20upx;
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

	.secuss_btn {
		width: 430rpx;
		height: 88rpx;
		background: #C02C38;
		border-radius: 44rpx;
		text-align: center;
		line-height: 88rpx;

		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		margin: 100rpx auto 20rpx auto;
	}

	.secuss_font {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
		line-height: 48rpx;
		width: 334rpx;
		height: 73rpx;
		margin: 20rpx auto;
	}

	.secuss {
		width: 125rpx;
		height: 160rpx;
		margin: 20rpx auto;
		transition: all .5s;
		transform: scale(1.02, 1.02);
	}

	.secuss image {
		width: 100%;
		height: 100%;
		transition: all .5s;
		transform: scale(1.1, 1.1);
	}

	.close_img {
		width: 50rpx;
		height: 50rpx;
		position: relative;
		left: 480rpx;
		top: 20rpx;
	}

	.close_img image {
		width: 100%;
		height: 100%;
	}

	.task_rw {
		width: 550rpx;
		height: 630rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		margin: auto auto;

		position: fixed;
		z-index: 999;
		top: 25%;
		left: 100rpx;
		text-align: center;
	}

	.btn_row {
		display: flex;
		justify-content: space-around;
		margin-top: 70rpx;
	}

	.btn_row_col {
		width: 220rpx;
		height: 78rpx;
		background: #FFFFFF;
		border: 2rpx solid #C02C38;
		border-radius: 39rpx;


		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #C02C38;
		text-align: center;
		line-height: 78rpx;
	}

	.task_content {
		padding: 45rpx;
	}

	.tab {
		width: 140rpx;
		height: 48rpx;
		background: url(http://www.callingsell.com/static/shangjiaduan/img/tab.png) no-repeat;
		background-size: 100% 100%;


		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
	}

	.task_title {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		line-height: 72rpx;
	}

	.close {
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
		border: 1rpx solid #FFFFFF;
		color: #FFFFFF;
		text-align: center;
		line-height: 50rpx;
		font-size: 60rpx;
		font-weight: 300;
		position: relative;
		top: 40rpx;
		left: 340rpx;
	}

	.content {
		width: 690rpx;
		height: 620rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		margin-left: 30rpx;

		transition: all 1s;
		-moz-transition: all 1s;
		-webkit-transition: all 1s;
		-ms-transform: scale(1.01);
		transform: scale(1.01)
	}


	.task {
		position: fixed;
		z-index: 999;
		top: 25%;
		width: 100%;
		text-align: center;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 666;

		background: #000000;
		opacity: 0.5;
	}

	.showbox {
		width: 550upx;
		height: 627upx;
		border-radius: 10px;
		background-color: #FFFFFF;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
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
</style>
