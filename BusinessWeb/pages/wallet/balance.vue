<template>
	<view>
		<div class="box">
			<image src="../../static/img/ye.png" mode=""></image>
			<div class="title">店铺余额</div>
			<div class="money">￥620.0</div>
			<div class="s_btn">
				<span @click="go(1)">余额明细</span>
				<span>丨</span>
				<span @click="go(2)">提现明细</span>
			</div>
			<div class="btn">提现</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			go(index) {
				uni.navigateTo({
					url: '/pages/wallet/Withdrawalrecord?index='+index
				});
			}
		}
	}
</script>

<style>
	.box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	image {
		width: 78rpx;
		height: 78rpx;
		margin-bottom: 20rpx;
	}

	.money {
		font-size: 62rpx;
		color: #333333;
		margin-top: 140rpx;
		margin-bottom: 50rpx;
	}

	.s_btn {
		display: flex;
		align-items: center;
		color: #999999;
		font-size: 22rpx;
	}

	.btn {
		width: 280rpx;
		line-height: 80rpx;
		border: 2rpx solid #BE353D;
		background-color: #BE353D;
		color: #FFFFFF;
		margin: 0 auto;
		text-align: center;
		border-radius: 10rpx;
		font-size: 28rpx;
		font-weight: 600;
		letter-spacing: 2rpx;
		margin-top: 200rpx;
	}
</style>
