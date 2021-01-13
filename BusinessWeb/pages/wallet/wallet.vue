<template>
	<view>
		<view class="item-box">
			<view class="item" @click="go">
				<view class="title">
					<view> 店铺资产</view>
				</view>
				<view class="text">可提现余额</view>
				<view class="text">5,502</view>
			</view>
			<navigator url="./Withdrawal" hover-class="none">
				<u-cell-group>
					<u-cell-item title="去提现"></u-cell-item>
				</u-cell-group>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			go(){
				uni.navigateTo({
					url: '/pages/wallet/balance'
				});
			}
		}
	}
</script>

<style>
	.item-box {
		width: 690rpx;
		min-height: 50rpx;
		margin: 20rpx auto;
		border-radius: 2px;
		background-color: #fff;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
	}
.item {
		width: 690rpx;
		height: 302rpx;
		background: url(http://www.callingsell.com/static/shangjiaduan/img/dpzc.png) no-repeat;
		background-size: 100% 100%;
		margin: 40rpx auto;
		padding: 0 30rpx;
		text-align: center;
		color: #FFFFFF;
		border-radius: 2px;
		background-color: #fff;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
	}
	.title {
		font-size: 32rpx;
		font-size: 600;
		letter-spacing: 2rpx;
		text-align: left;
		line-height: 100rpx;
	}
	.text {
		font-size: 26rpx;
		line-height: 100rpx;
	}
	.text:last-child{
		font-size: 52rpx;
		line-height: 68rpx;
	}
</style>
