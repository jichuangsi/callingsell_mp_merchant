<template>
	<view>
		<view class="bgColor">
		</view>

		<view class="row">
			<view class="rowsearch" v-if="false">
				<u-search placeholder="" v-model="keyword" style="width: 690rpx;height: 70rpx; margin:20rpx 30rpx ;"></u-search>
			</view>

			<u-tabs :list="list" :is-scroll="false" active-color="#C02C38" :current="current" @change="change"></u-tabs>
		</view>
		<!-- 全部 -->
		<view v-show="current==0" class="box">
			<view class="item" v-for="(item,index) in arr1" @click="detailgo(item)">
				<view class="title">
					<view class="ShopName">{{item.name}}</view>
					<view class="shopStatus">{{item.statename}}</view>
				</view>
				<view class="shop" v-for="(items,indexs) in item.goods">
					<image :src="items.photo" style="width: 120rpx;height: 120rpx;"></image>
					<view class="shop_content" @click="detailgo(item)">
						<view class="shop_title">{{items.name}}</view>
						<view class="lab" v-if="items.produceOption&&items.produceOption.length>0">规格：<span v-for="(itemq,indexq) in items.produceOption">{{itemq.name}}</span></view>
						<view class="lab">x{{items.num}}</view>
					</view>
				</view>
				<view class="shop_count">
					商品小计<text class="money">￥{{item.money}}</text>
				</view>
				<view class="btn_cont">
					<view class="btn1" v-if="item.state==1" @click="detailgo(item)">查看订单</view>
					<view class="btn2" v-if="item.state==1" @click.stop="refuse(item)">拒绝接单</view>
					<view class="btn2" v-if="item.state==1" @click.stop="check_id=item.id,check_item=item,mask=true">我要接单</view>
					<view class="btn1" v-if="item.state==2||item.state==3" @click.stop="phoneclick(item)">联系买家</view>
					<!-- <view class="btn2" @click.stop="mask=true" v-if="item.state==2">开始配送</view> -->
					<view class="btn2" v-if="item.state==2&&item.delivery_type==2" @click.stop="confirmbtn(item)">{{item.is_pay=='1'?'确认送达':'确认送达并收款'}}</view>
					<view class="btn2" @click.stop="comment(item)" v-if="item.state==8">查看评价</view>
					<view class="btn2" @click.stop="del(item)" v-if="item.state==8">删除订单</view>
				</view>
			</view>

		</view>

		<!--待接单-->
		<view v-show="current==1" class="box">

			<view class="item" v-for="(item,index) in arr2" @click="detailgo(item)">
				<view class="title">
					<view class="ShopName">{{item.name}}</view>
					<view class="shopStatus">{{item.statename}}</view>
				</view>
				<view class="shop" v-for="(items,indexs) in item.goods">
					<image :src="items.photo" style="width: 120rpx;height: 120rpx;"></image>
					<view class="shop_content" @click="detailgo(item)">
						<view class="shop_title">{{items.name}}</view>
						<view class="lab" v-if="items.produceOption&&items.produceOption.length>0">规格：<span v-for="(itemq,indexq) in items.produceOption">{{itemq.name}}</span></view>
						<view class="lab">x{{items.num}}</view>
					</view>
				</view>
				<view class="shop_count">
					商品小计<text class="money">￥{{item.money}}</text>
				</view>
				<view class="btn_cont">
					<view class="btn1" v-if="item.state==1" @click="detailgo(item)">查看订单</view>
					<view class="btn2" v-if="item.state==1" @click.stop="refuse(item)">拒绝接单</view>
					<view class="btn2" v-if="item.state==1" @click.stop="check_id=item.id,check_item=item,mask=true">我要接单</view>
					<view class="btn1" v-if="item.state==2||item.state==3" @click.stop="phoneclick(item)">联系买家</view>
					<!-- <view class="btn2" @click.stop="mask=true" v-if="item.state==2">开始配送</view> -->
					<view class="btn2" v-if="item.state==2&&item.delivery_type==2" @click.stop="confirmbtn(item)">{{item.is_pay=='1'?'确认送达':'确认送达并收款'}}</view>
					<view class="btn2" @click.stop="comment(item)" v-if="item.state==8">查看评价</view>
					<view class="btn2" @click.stop="del(item)" v-if="item.state==8">删除订单</view>
				</view>
			</view>
		</view>
		<!--待配送-->
		<!-- <view v-show="current==2" class="box">

			<view class="item" v-for="(item,index) in arr3" @click="detailgo(item)">
				<view class="title">
					<view class="ShopName">{{item.name}}</view>
					<view class="shopStatus">{{item.statename}}</view>
				</view>
				<view class="shop" v-for="(items,indexs) in item.goods">
					<image :src="items.photo" style="width: 120rpx;height: 120rpx;"></image>
					<view class="shop_content" @click="detailgo(item)">
						<view class="shop_title">{{items.name}}</view>
						<view class="lab" v-if="items.produceOption&&items.produceOption.length>0">规格：<span v-for="(itemq,indexq) in items.produceOption">{{itemq.name}}</span></view>
						<view class="lab">x{{items.num}}</view>
					</view>
				</view>
				<view class="shop_count">
					商品小计<text class="money">￥{{item.money}}</text>
				</view>
				<view class="btn_cont">
					<view class="btn1" v-if="item.state==1" @click="detailgo(item)">查看订单</view>
					<view class="btn2" v-if="item.state==1" @click.stop="check_id=item.id,check_item=item,mask=true">我要接单</view>
					<view class="btn1" v-if="item.state==2||item.state==3" @click.stop="phoneclick(item)">联系买家</view>
					<view class="btn2" @click.stop="mask=true" v-if="item.state==2">开始配送</view>
					<view class="btn2" v-if="item.state==3">确认送达</view>
					<view class="btn2" @click.stop="comment(item)" v-if="item.state==8">查看评价</view>
				</view>
			</view>
		</view> -->
		<!--待确认-->
		<view v-show="current==2" class="box">

			<view class="item" v-for="(item,index) in arr4" @click="detailgo(item)">
				<view class="title">
					<view class="ShopName">{{item.name}}</view>
					<view class="shopStatus">{{item.statename}}</view>
				</view>
				<view class="shop" v-for="(items,indexs) in item.goods">
					<image :src="items.photo" style="width: 120rpx;height: 120rpx;"></image>
					<view class="shop_content" @click="detailgo(item)">
						<view class="shop_title">{{items.name}}</view>
						<view class="lab" v-if="items.produceOption&&items.produceOption.length>0">规格：<span v-for="(itemq,indexq) in items.produceOption">{{itemq.name}}</span></view>
						<view class="lab">x{{items.num}}</view>
					</view>
				</view>
				<view class="shop_count">
					商品小计<text class="money">￥{{item.money}}</text>
				</view>
				<view class="btn_cont">
					<view class="btn1" v-if="item.state==1" @click="detailgo(item)">查看订单</view>
					<view class="btn2" v-if="item.state==1" @click.stop="refuse(item)">拒绝接单</view>
					<view class="btn2" v-if="item.state==1" @click.stop="check_id=item.id,check_item=item,mask=true">我要接单</view>
					<view class="btn1" v-if="item.state==2||item.state==3" @click.stop="phoneclick(item)">联系买家</view>
					<!-- <view class="btn2" @click.stop="mask=true" v-if="item.state==2">开始配送</view> -->
					<view class="btn2" v-if="item.state==2&&item.delivery_type==2" @click.stop="confirmbtn(item)">{{item.is_pay=='1'?'确认送达':'确认送达并收款'}}</view>
					<view class="btn2" @click.stop="comment(item)" v-if="item.state==8">查看评价</view>
					<view class="btn2" @click.stop="del(item)" v-if="item.state==8">删除订单</view>
				</view>
			</view>
		</view>
		<!--已完成-->
		<view v-show="current==3" class="box">

			<view class="item" v-for="(item,index) in arr5" @click="detailgo(item)">
				<view class="title">
					<view class="ShopName">{{item.name}}</view>
					<view class="shopStatus">{{item.statename}}</view>
				</view>
				<view class="shop" v-for="(items,indexs) in item.goods">
					<image :src="items.photo" style="width: 120rpx;height: 120rpx;"></image>
					<view class="shop_content" @click="detailgo(item)">
						<view class="shop_title">{{items.name}}</view>
						<view class="lab" v-if="items.produceOption&&items.produceOption.length>0">规格：<span v-for="(itemq,indexq) in items.produceOption">{{itemq.name}}</span></view>
						<view class="lab">x{{items.num}}</view>
					</view>
				</view>
				<view class="shop_count">
					商品小计<text class="money">￥{{item.money}}</text>
				</view>
				<view class="btn_cont">
					<view class="btn1" v-if="item.state==1" @click="detailgo(item)">查看订单</view>
					<view class="btn2" v-if="item.state==1" @click.stop="refuse(item)">拒绝接单</view>
					<view class="btn2" v-if="item.state==1" @click.stop="check_id=item.id,check_item=item,mask=true">我要接单</view>
					<view class="btn1" v-if="item.state==2||item.state==3" @click.stop="phoneclick(item)">联系买家</view>
					<!-- <view class="btn2" @click.stop="mask=true" v-if="item.state==2">开始配送</view> -->
					<view class="btn2" v-if="item.state==2&&item.delivery_type==2" @click.stop="confirmbtn(item)">{{item.is_pay=='1'?'确认送达':'确认送达并收款'}}</view>
					<view class="btn2" @click.stop="comment(item)" v-if="item.state==8">查看评价</view>
					<view class="btn2" @click.stop="del(item)" v-if="item.state==8">删除订单</view>
				</view>
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
						<view class="btn_row_col" @click="nonefb()">
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
				keyword: '请输入订单编号',
				list: [{
					name: '全部'
				}, {
					name: '待接单'
				}, {
					name: '待确认'
				}, {
					name: '已完成'
				}],
				current: 0,
				mask: false,
				layer: false,
				pageindex1: 1,
				pageindex2: 1,
				pageindex3: 1,
				pageindex4: 1,
				pageindex5: 1,
				arr1: [],
				arr2: [],
				arr3: [],
				arr4: [],
				arr5: [],
				showpop: false,
				check_id: '',
				check_item:'',
				logisticsshow:false,
				desc:'',
				userid: uni.getStorageSync('userid')
			}
		},
		mounted() {
			this.getreset()
		},
		methods: {
			nonefb() {
				let self = this
				console.log(self.check_item)
				if(self.check_item.code!='daofu'){
					self.logisticsshow=true
					// Api.getRequestData(self.APIS + '/wxapp/EleStore/updateOrderStatus?orderid=' + self.check_id + '&userid=' + self.userid +
					// 	'&delivery_type=' + 1).then(
					// 	res => {
					// 		console.log(res);
					// 		if (res.data.message == '修改成功') {
					// 			self.showpop = true
					// 			self.mask = false
					// 			self.getreset()
					// 		}
					// 	}).catch(err => {
					// 	console.error('is error', err);
					// })
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
					Api.getRequestData(self.APIS + '/wxapp/EleStore/updateOrderStatus?orderid=' + self.check_id + '&userid=' + self.userid +
						'&delivery_type=' + 1+'&logistics_price='+self.desc).then(
						res => {
							console.log(res);
							if (res.data.message == '修改成功') {
								self.logisticsshow=false
								self.showpop = true
								self.mask = false
								self.getreset()
							}
						}).catch(err => {
						console.error('is error', err);
					})
			},
			phoneclick(item) {
				let self = this
				uni.showModal({
					title: '电话',
					content: '电话' + item.adderss.mobile,
					confirmText: '呼叫',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.makePhoneCall({
								phoneNumber: item.adderss.mobile //仅为示例
							});

						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			comment(item) {
				uni.navigateTo({
					url: '/pages/evaluate/evaluate?id=' + item.id
				});
			},
			detailgo(item) {
				console.log(item)
				console.log(item.id)
				uni.navigateTo({
					url: '/pages/OrderManagement/OrderDetails?id=' + item.id
				});
			},
			change(index) {
				this.current = index;
			},
			changeTime(e) {
				console.log(e);
			},
			getreset() {
				let self = this
				self.pageindex1 = 1
				self.pageindex2 = 1
				// self.pageindex3 = 1
				self.pageindex4 = 1
				self.pageindex5 = 1
				self.arr1 = []
				self.arr2 = []
				// self.arr3=[]
				self.arr4 = []
				self.arr5 = []
				self.getdata1()
				self.getdata2()
				// self.getdata3()
				self.getdata4()
				self.getdata5()
			},
			del(item){
				let self = this
				uni.showModal({
					title: '提示',
					content: '是否删除该订单',
					confirmText: '确定',
					success: function(res) {
						console.log(res)
						if (res.confirm) {
							console.log('用户点击确定');
							Api.getRequestData(self.APIS + '/wxapp/EleStore/del_order?type=shop&orderid=' + item.id).then(
								res => {
									console.log(res);
									if (res.data.message == '删除成功') {
										self.showpop = true
										self.getreset()
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
							Api.getRequestData(self.APIS + '/wxapp/EleStore/finishOrder?userid=' + self.userid + '&orderid=' + item.id +
								'&type=' + 6).then(
								res => {
									console.log(res);
									if (res.data.message == '拒绝接单成功') {
										self.showpop = true
										self.getreset()
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
				Api.getRequestData(self.APIS + '/wxapp/EleStore/finishOrder?userid=' + self.userid + '&orderid=' + item.id +
					'&type=' + 5).then(
					res => {
						console.log(res);
						if (res.data.message == '确认送达成功') {
							self.showpop = true
							self.getreset()
						}
					}).catch(err => {
					console.error('is error', err);
				})
			},
			Receiving() {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/updateOrderStatus?orderid=' + self.check_id + '&userid=' + self.userid +
					'&delivery_type=' + 2).then(
					res => {
						console.log(res);
						if (res.data.message == '修改成功') {
							self.showpop = true
							self.mask = false
							self.getreset()
						}
					}).catch(err => {
					console.error('is error', err);
				})
			},
			getdata1() {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getOrderByStatus?userid=' + self.userid + '&status=-1&page=' + self
					.pageindex1).then(
					res => {
						console.log(res);
						if (res.data.order && res.data.order.length > 0) {
							self.pageindex1 = self.pageindex1 + 1
							self.arr1.push(...res.data.order)
						}
					}).catch(err => {
					console.error('is error', err);
				})
			},
			getdata2() {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getOrderByStatus?userid=' + self.userid + '&status=1&page=' + self.pageindex2)
					.then(
						res => {
							console.log(res);
							if (res.data.order && res.data.order.length > 0) {
								self.pageindex2 = self.pageindex2 + 1
								self.arr2.push(...res.data.order)
							}
						}).catch(err => {
						console.error('is error', err);
					})
			},
			getdata3() {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getOrderByStatus?userid=' + self.userid + '&status=2&page=' + self.pageindex3)
					.then(
						res => {
							console.log(res);
							if (res.data.order && res.data.order.length > 0) {
								self.pageindex3 = self.pageindex3 + 1
								self.arr3.push(...res.data.order)
							}
						}).catch(err => {
						console.error('is error', err);
					})
			},
			getdata4() {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getOrderByStatus?userid=' + self.userid + '&status=2&page=' + self.pageindex4)
					.then(
						res => {
							console.log(res);
							if (res.data.order && res.data.order.length > 0) {
								self.pageindex4 = self.pageindex4 + 1
								self.arr4.push(...res.data.order)
							}
						}).catch(err => {
						console.error('is error', err);
					})
			},
			getdata5() {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getOrderByStatus?userid=' + self.userid + '&status=8&page=' + self.pageindex5)
					.then(
						res => {
							console.log(res);
							if (res.data.order && res.data.order.length > 0) {
								self.pageindex5 = self.pageindex5 + 1
								self.arr5.push(...res.data.order)
							}
						}).catch(err => {
						console.error('is error', err);
					})
			}
		},
		onReachBottom() {
			console.log(111)
			if (this.current == 0 && this.pageindex1 > 1) {
				this.getdata1()
			} else if (this.current == 1 && this.pageindex2 > 1) {
				this.getdata2()
			} else if (this.current == 2 && this.pageindex4 > 1) {
				this.getdata4()
			} else if (this.current == 3 && this.pageindex5 > 1) {
				this.getdata5()
			}
		}
	}
</script>

<style>
	.rowsearch {
		width: 100%;
		padding: 0rpx 20rpx;
		box-sizing: border-box;
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

	.btn2:hover {
		opacity: 0.8;
		filter: alpha(opacity=80);
	}

	.btn1:hover {
		opacity: 0.8;
		filter: alpha(opacity=80);
	}

	.shop_title {
		width: 480rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.btn_cont {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #343434;
		margin-top: 40rpx;
		display: flex;
		justify-content: flex-end;
	}

	.btn1 {
		width: 160rpx;
		height: 60rpx;
		background: #FFFFFF;
		border: 1rpx solid #343434;
		border-radius: 30rpx;

		text-align: center;
		line-height: 60rpx;
		color: #343434;
		margin: auto 20rpx;
	}

	.btn2 {
		/* width: 160rpx; */
		height: 60rpx;
		background: #FFFFFF;
		border: 1rpx solid #C02C38;
		border-radius: 30rpx;

		text-align: center;
		line-height: 60rpx;
		color: #C02C38;
		margin: auto 20rpx;
		padding: 0rpx 20rpx;
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
		justify-content: space-between;
		padding: 0 30rpx;
		box-sizing: border-box;
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

	.row {
		position: fixed;
		top: 0rpx;
		z-index: 66;
		background: #f5f5f5;
		width: 100%;
	}

	.item {
		width: 690rpx;
		/* min-height: 400rpx; */
		border-radius: 10rpx;
		background: #FFFFFF;
		margin: 30rpx;
		padding: 30rpx 0;
	}

	.box {
		position: relative;
		top: 80rpx;
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
