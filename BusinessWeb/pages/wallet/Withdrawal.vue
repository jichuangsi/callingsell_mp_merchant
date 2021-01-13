<template>
	<view class="Withdrawal">
		<view class="bgColor"></view>
		<view class="center">
			<u-cell-group>
				<u-cell-item title="店铺名称" :arrow="false">店铺名称</u-cell-item>
			</u-cell-group>
			<u-cell-group>
				<u-cell-item title="店铺余额" :arrow="false">￥{{available}}</u-cell-item>
			</u-cell-group>
			<div class="xian"></div>
			<u-cell-group>
				<u-cell-item icon="plus-circle" title="微信零钱提现"></u-cell-item>
			</u-cell-group>
			<div class="xian"></div>
			<div class="tbz">提现金额</div>
			<view class="ipt">
				￥<input type="digit" placeholder="输入提现金额" v-model="money">
			</view>
			<view class="bz">
				最低提现金额为¥50.00，建议提现金额为100的整数倍
			</view>
		</view>
		<view class="btn">
			<view @click="show=true">提现</view>
			<!-- <view class="delbtn" @click="jlgo">提现记录</view> -->
		</view>
		<u-mask class="popshox" :show="show">
			<view class="showbox">
				<image class="shownone" src="../../static/img/gb.png" @click="show=false"></image>
				<image class="showtb" src="../../static/img/cg.png"></image>
				<view class="showtitle">提现成功</view>
				<view class="showtext">我们将在3个工作日内处理您的提现申请</view>
				<view class="showbtn" @click="show=false">完成</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				available: 4511,
				money: '',
				show: false
			}
		},
		methods: {
			jlgo() {
				uni.navigateTo({
					url: '/pages/StatisticalReport/Withdrawalrecord'
				});
			},
			cardgo(){
				uni.navigateTo({
					url: '/pages/card/card'
				});
			}
		},
		onNavigationBarButtonTap(val) {

		}
	}
</script>

<style>
	.center {
		width: 100%;
		padding: 20upx;
		/* background-color: #FFFFFF; */
		margin-top: 20upx;
		margin-bottom: 40upx;
		box-sizing: border-box;
	}

	.xian {
		width: 100%;
		height: 20rpx;
	}

	.ipt {
		padding: 30upx 20upx;
		font-size: 46upx;
		display: flex;
		align-items: center;
		border-bottom: 1upx solid #F5F5F5;
		background-color: #FFFFFF;
	}

	.ipt input {
		font-size: 36upx;
	}

	.tbz {
		padding: 30upx 20upx;
		font-size: 28upx;
		color: #333333;
		background-color: #FFFFFF;
	}

	.bz {
		padding: 30upx 20upx;
		font-size: 20upx;
		color: #999999;
		background-color: #FFFFFF;
	}

	.t_nz {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.t_bz {
		color: #999999;
	}

	/* 	.btn {
		width: 90%;
		line-height: 86upx;
		text-align: center;
		margin: 0 auto;
		color: #FFFFFF;
		background-color: #C02C38;
		border-radius: 86upx;
	} */

	.bgColor {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
		background-size: 200%;
		background-position: center;
		background: #F5F5F5;
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

	.btn {
		width: 280upx;
		display: flex;
		justify-content: justify-content;
		margin: 0 auto;
		margin-top: 135rpx;
	}

	.btn view {
		flex: 1;
		height: 80upx;
		background: #C02C38;
		opacity: 1;
		border-radius: 10upx;
		text-align: center;
		line-height: 80upx;
		font-size: 32upx;
		color: #FFFFFF;
	}

	.btn .delbtn {
		flex: none;
		width: 200upx;
		background: #F4F8FC;
		color: #C02C38;
	}
</style>
