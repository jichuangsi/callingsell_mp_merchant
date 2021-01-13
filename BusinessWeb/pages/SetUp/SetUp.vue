<template>
	<view>
		<view class="bgColor"></view>
		<!-- <view class="item">
			<u-cell-group>
				<u-cell-item title="账号管理"></u-cell-item>
				<u-cell-item title="帐号与安全"></u-cell-item>
			</u-cell-group>
		</view> -->
		<view class="item">
			<u-cell-group>
				<u-cell-item title="拎手社区新零售隐私政策" @click="go('agreement')"></u-cell-item>
				<u-cell-item title="拎手社区新零售用户服务协议" @click="go('agreement1')"></u-cell-item>
			</u-cell-group>
		</view>
		<!-- <view class="btn">退出登陆</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			go(val){
				uni.navigateTo({
					url: '/pages/' + val + '/' + val
				});
			}
		}
	}
</script>

<style>
	.btn{
		width: 590rpx;
		height: 98rpx;
		border: 1px solid #C02C38;
		border-radius: 49rpx;
		text-align: center;
		line-height: 98rpx;
		position: absolute;
		left: 80rpx;
		bottom: 200rpx;
		
		
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #C02D39;
	}
	.item {
		margin-top: 40rpx;
	}

	.bgColor {
		position: fixed;
		top: 45px;
		left: 0;
		right: 0;
		bottom: 0;
		background-size: 200%;
		background-position: center;
		background: #F5F5F5;
		z-index: -1;
	}
</style>
