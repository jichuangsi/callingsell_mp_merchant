<template>
	<view>
		<view class="memu">
				<view class="memu_item" v-for="(item,index) in arr" @click="detailgo(item)">
					<view class="item_img">
						<image :src="item.photo"></image>
					</view>
					<view class="item_content">
						<view class="shop_title">{{item.product_name}}</view>
						<view class="shp_count">库存{{item.num}} <text style="margin-left: 30rpx;">已售{{item.sold_num}}</text></view>
						<view class="shop_price">￥{{item.price}}<text class="shop_price_old">￥{{item.cost_price}}</text></view>
					</view>
					<view class="option" @click.stop="cx(item,index)">
						<image src="http://www.callingsell.com/static/shangjiaduan/img/png.png"></image>
					</view>
					<view class="option_menu layui-anim" v-show="item.status">
						<view class="option_title" @click.stop="edit(item,index)">
							<image src="http://www.callingsell.com/static/shangjiaduan/img/edit.png"></image>
							<view>编辑</view>
						</view>
						<view class="option_title te" @click.stop="undercarriage(item)">
							<image src="http://www.callingsell.com/static/shangjiaduan/img/shelf.png"></image>
							<view>恢复并上架</view>
						</view>
						<view class="option_title" @click.stop="del(item)">
							<image src="http://www.callingsell.com/static/shangjiaduan/img/cdsc.png"></image>
							<view>彻底删除</view>
						</view>
					</view>
				</view>
			<!-- 分割线 -->
			<u-line color="#F5F5F5" style="width: 650rpx;margin: auto auto;" />

		</view>
		<u-mask class="popshox" :show="showpop">
			<view class="showbox">
				<image class="shownone" src="../../static/img/gb.png" @click="showpop=false"></image>
				<image class="showtb" src="../../static/img/cg.png"></image>
				<view class="showtitle">操作成功</view>
				<view class="showtext">{{status==1?'商品已上架':'商品已删除'}}</view>
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
				member: false,
				number: 5,
				memu_l: false,
				pageIndex: 1,
				arr: [],
				showpop: false,
				status:1,
				userid:uni.getStorageSync('userid')
			}
		},
		mounted() {
			this.getdata()
		},
		methods: {
			cx(item,index){
				this.arr[index].status = !this.arr[index].status
			},
			detailgo(item){
				uni.navigateTo({
					url: "../CommodityDetails/CommodityDetails?status=2&&id="+item.product_id
				});
			},
			edit(item,index) {
				this.arr[index].status=false
				uni.navigateTo({
					url: "../CommodityManagement/NewProduct?id="+item.product_id
				});
			},
			undercarriage(item) {
				console.log(item)
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/updateGoodClosed?userid='+self.userid+'&closed=0&goodid=' + item.product_id).then(
					res => {
						console.log(res)
						if (res.data.message == '修改成功') {
							self.status = 1
							self.showpop = true
							self.pageIndex = 1
							self.arr = []
							self.getdata()
						}
					}).catch(err => {
					console.error('is error', err);
				})
			},
			del(item) {
				console.log(item)
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/deleteGood?userid='+self.userid+'&goodid=' + item.product_id).then(
					res => {
						console.log(res)
						if (res.data.message == '删除成功') {
							self.status = 2
							self.showpop = true
							self.pageIndex = 1
							self.arr = []
							self.getdata()
						}
					}).catch(err => {
					console.error('is error', err);
				})
			},
			getdata() {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getGoodsList?userid='+self.userid+'&page=' + self.pageIndex + '&closed=1').then(
					res => {
						console.log(res)
						if (res.data && res.data.length > 0) {
							self.pageIndex = self.pageIndex + 1
							for (let i = 0; i < res.data.length; i++) {
								res.data[i].status = false
								self.arr.push(res.data[i])
							}
						}
					}).catch(err => {
					console.error('is error', err);
				})
			},
		},
		onReachBottom() {
			console.log(111)
			if (this.pageIndex > 1) {
				this.getdata()
			}
		}
	}
</script>

<style>
	.open {
		opacity: .8;
	}

	.option_title image {
		width: 32rpx;
		height: 27rpx;
	}
	.te image {
		transform: rotate(180deg);
	}
	.option_title {
		margin: auto;
		text-align: center;
		line-height: 40rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}

	.option_menu {
		width: 430rpx;
		height: 140rpx;
		background: url(http://www.callingsell.com/static/shangjiaduan/img/tips.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 30rpx;
		right: 120rpx;
		display: flex;
		animation-name: memu_a;
	}

	@keyframes memu_a {
		0% {
			transition-property: width 0.5s linear 0.5s;
			-ms-transform: scale(.5);
			transform: scale(.5)
		}

		100% {
			transition-property: width 0.5s linear 0.5s;
			opacity: 1;
			-ms-transform: scale(1);
		}
	}

	.option image {
		width: 42rpx;
		height: 10rpx;
		position: absolute;
		bottom: 70rpx;
	}
	
	.option {
		width: 42rpx;
		height: 100%;
		position: absolute;
		right: 60rpx;
		top: 0rpx;
	}

	.shop_price_old {
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
		line-height: 42rpx;
		text-decoration: line-through;
		margin-left: 30rpx;
	}

	.shop_price {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #C02C38;
		line-height: 42rpx;
	}

	.shp_count {

		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
		line-height: 42rpx;
	}

	.shop_title {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		line-height: 42rpx;
	}

	.item_content {
		margin: auto 0 auto 30rpx;

	}

	.item_img {
		width: 140rpx;
		height: 140rpx;
		margin: auto 0;
	}

	.item_img image {
		width: 100%;
		height: 100%;
	}

	.memu_item {
		width: 690rpx;
		height: 200rpx;
		margin: auto auto;
		display: flex;
		position: relative;
	}

	.memu {
		width: 100%;
		min-height: 400rpx;

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
