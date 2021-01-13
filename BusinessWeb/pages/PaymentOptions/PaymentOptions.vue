<template>
	<view>
		<view class="bgColor">
			<u-button class="btn">保存</u-button>
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

		}
	}
</script>

<style>
	.bgColor {
		position: fixed;
		top: 40px;
		left: 0;
		right: 0;
		bottom: 0;
		background: #F5F5F5;
		z-index: -1;
	}

	.btn {
		width: 690rpx;
		height: 98rpx;
		background: rgba(192, 44, 56, 1);
		border-radius: 49rpx;
		line-height: 98rpx;
		text-align: center;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		position: absolute;
		bottom: 40rpx;
		left: 30rpx;
	}
</style>
