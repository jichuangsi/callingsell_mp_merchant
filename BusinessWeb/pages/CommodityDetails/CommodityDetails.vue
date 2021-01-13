<template>
	<view class="CommodityDetails">
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"
					 indicator-active-color="#FE5E10" indicator-color="#ffffff">
						<swiper-item>
							<view class="swiper-item uni-bg-red">
								<image mode="aspectFill" class="yd1" :src="item.photo" alt=""></image>
								<div class="state">1/1</div>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<div class="topconter">
			<div class="title">{{item.product_name}}</div>
			<div class="text">
				<div>月售{{item.sold_num}}</div>
				<!-- <div>赞{{item.is_tuijian}}</div> -->
			</div>
			<div class="price">
				<div><span>￥</span>{{item.price}}</div>
				<div><span>￥</span>{{item.cost_price}}</div>
			</div>
		</div>
		<div class="center">
			<div class="h3">商品详情</div>
			<image mode="aspectFill" class="yd1" :src="item.detailphoto" alt=""></image>
		</div>
		<div class="btn">
			<div class="btnli" @click="edit(item)">
				<image src="../../static/img/bj.png" mode=""></image>
				<div>编辑</div>
			</div>
			<!-- <div class="btnli">
				<image src="../../static/img/xj.png" mode=""></image>
				<div>下架</div>
			</div> -->
			<div class="btnli" @click="undercarriage(item)" v-if="status==1">
				<image src="../../static/img/sc.png" mode=""></image>
				<div>加入回收站</div>
			</div>
			
			<view class="btnli te" @click.stop="dercarriage(item)" v-if="status==2">
				<image src="http://www.callingsell.com/static/shangjiaduan/img/shelf.png"></image>
				<view>恢复并上架</view>
			</view>
		</div>
		<u-mask class="popshox" :show="showpop">
			<view class="showbox">
				<image class="shownone" src="../../static/img/gb.png" @click="showpop=false"></image>
				<image class="showtb" src="../../static/img/cg.png"></image>
				<view class="showtitle">操作成功</view>
				<view class="showtext">{{btnstatus==1?'商品已加入回收站':'商品已上架'}}</view>
				<view class="showbtn" @click="showpop=false">确定</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import Api from '../../api/test';
	export default {
		data() {
			return {
				indicatorDots: false,
				autoplay: true,
				interval: 4000,
				duration: 500,
				id: '',
				item: '',
				showpop: false,
				status:1,
				btnstatus:1,
				userid:uni.getStorageSync('userid')
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			// console.log(option.id)
			// console.log(777)
			this.id = option.id
			this.status = option.status
			this.getdata()
		},
		methods: {
			edit(item) {
				uni.navigateTo({
					url: "../CommodityManagement/NewProduct?id="+item.product_id
				});
			},
			undercarriage(item) {
				console.log(item)
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/updateGoodClosed?userid='+self.userid+'&closed=1&goodid=' + item.product_id).then(
					res => {
						console.log(res)
						if (res.data.message == '修改成功') {
							self.showpop = true
							self.btnstatus= 1
							self.status= 2
							let pages = getCurrentPages();
							let prePage = pages[pages.length - 2];
							let data = prePage.$vm ? prePage.$vm : prePage
							data.pageIndex = 1
							data.arr = []
							data.getdata()
						}
					}).catch(err => {
					console.error('is error', err);
				})
			},
			dercarriage(item) {
				console.log(item)
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/updateGoodClosed?userid='+self.userid+'&closed=0&goodid=' + item.product_id).then(
					res => {
						console.log(res)
						if (res.data.message == '修改成功') {
							self.showpop = true
							self.btnstatus= 2
							self.status= 1
							let pages = getCurrentPages();
							let prePage = pages[pages.length - 2];
							let data = prePage.$vm ? prePage.$vm : prePage
							data.pageIndex = 1
							data.arr = []
							data.getdata()
						}
					}).catch(err => {
					console.error('is error', err);
				})
			},
			getdata() {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getGoodDetail?goodid=' + self.id).then(
					res => {
						console.log(res)
						self.item = res.data[0]
					}).catch(err => {
					console.error('is error', err);
				})
			},
		}
	}
</script>

<style>
	swiper {
		width: 100%;
		height: 564upx;
	}
	uni-swiper {
		width: 100%;
		height: 564upx;
	}

	.swiper-item {
		width: 100%;
		height: 564upx;
		position: relative;
	}
	.swiper-item image{
		width: 100%;
		height: 100%;
	}
	.state {
		position: absolute;
		right: 30upx;
		bottom: 34upx;
		width: 88upx;
		line-height: 44upx;
		font-size: 28upx;
		color: #FFFFFF;
		background-color: rgb(0, 0, 0, 0.5);
		border-radius: 22upx;
		text-align: center;
	}

	.topconter {
		width: 100%;
		padding: 0upx 32upx;
		padding-top: 38upx;
		border-bottom: 20upx solid #F5F5F5;
		box-sizing: border-box;
	}

	.topconter .title {
		color: #333333;
		font-size: 32upx;
		line-height: 48upx;
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.topconter .text {
		margin-top: 40upx;
		font-size: 22upx;
		color: #999999;
	}

	.topconter .text div {
		margin-right: 20upx;
		display: inline-block;
	}

	.topconter .price {
		margin-top: 70upx;
		margin-bottom: 56upx;
	}

	.topconter .price div {
		margin-right: 20upx;
		display: inline-block;
		color: #C02C38;
		font-size: 42upx;
	}

	.topconter .price div:nth-child(1) span {
		font-size: 32upx;
	}

	.topconter .price div:nth-child(2) {
		font-size: 24upx;
		color: #999999;
		text-decoration: line-through;
	}

	.topconter .price div:nth-child(2) span {
		font-size: 20upx;
	}

	.center {
		padding: 33upx 30upx;
		padding-bottom: 186upx;
		box-sizing: border-box;
	}

	.center .h3 {
		font-size: 32upx;
		color: #333333;
		font-weight: 600;
	}

	.center image {
		width: 100%;
		display: block;
	}

	.btn {
		width: 689upx;
		height: 98upx;
		background: #1A1A1A;
		border-radius: 49upx;
		position: fixed;
		left: 30upx;
		bottom: 68upx;
		display: flex;
		justify-content: space-between;
	}

	.btn .btnli {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		color: #FFFFFF;
		font-size: 24upx;
		padding: 14upx 0upx;
	}

	.btn .btnli image {
		width: 30upx;
	}
	.btn .te image {
		transform: rotate(180deg);
	}

	.showbox {
		width: 550upx;
		height: 627upx;
		border-radius: 10px;
		background-color: #FFFFFF;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
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
