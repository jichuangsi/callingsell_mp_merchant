<template>
	<view class="bgColor">
		<view class="form">
			<view class="form-item">
				<text class="title">打印机</text>

				<view>
					<text class="content">配置小票打印机进行接单、备货、配送</text>
				</view>
				<u-icon name="arrow-right" class="icon" size="28"></u-icon>
			</view>
			<view class="form-item">
				<text class="title">小票样式</text>

				<view>
					<text class="content">商家可自定义小票样式，适用于不同场景</text>
				</view>
				<u-icon name="arrow-right" class="icon" size="28"></u-icon>

			</view>

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
	.form {
		position: fixed;
		top: 40rpx;
		padding: 80rpx 30rpx;
	}

	.form-item {
		width: 690rpx;
		min-height: 126rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 10rpx;
		margin-bottom: 35rpx;
		padding: 0 20rpx;
	}

	.title {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 60rpx;
	}

	.content {
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
	}

	.bgColor {
		position: fixed;
		top: 40px;
		left: 0;
		right: 0;
		bottom: 0;
		background: #F5F5F5;
		z-index: -1;
	}

	.u-icon {
		position: relative;
		left: 600rpx;
		bottom: 58rpx;
	}
</style>
