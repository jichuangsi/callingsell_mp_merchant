<template>
	<view>
		<view class="map-box">
			<image src="http://www.callingsell.com/static/shangjiaduan/img/map.png"></image>
		</view>
		<view class="box">
			<view class="top" @click="down=!down">
				<image src="http://www.callingsell.com/static/shangjiaduan/img/hua.png" v-show="down"></image>
				<image src="http://www.callingsell.com/static/shangjiaduan/img/down.png" v-show="!down"></image>
			</view>
			<view class="item">
				<view class="title">
					广州食品生产有限公司
				</view>
				<view class="box-content">
					<view>
						<view>
							距离我位置
						</view>
						<view>
							<span class="lang">800m </span> <span class="time">步行5分钟</span>
						</view>
					</view>
					<view class="btn" hover-class="ho">
						<view>查看路线</view>
						<image src="http://www.callingsell.com/static/shangjiaduan/img/dh.png"></image>
					</view>
				</view>
				<u-line color="#F5F5F5" />
			</view>
			<view class="item">
				<view class="title">
					广州食品生产有限公司
				</view>
				<view class="box-content">
					<view>
						<view>
							距离我位置
						</view>
						<view>
							<span class="lang">800m </span> <span class="time">步行5分钟</span>
						</view>
					</view>
					<view class="btn" hover-class="ho">
						<view>查看路线</view>
						<image src="http://www.callingsell.com/static/shangjiaduan/img/dh.png"></image>
					</view>
				</view>
				<u-line color="#F5F5F5" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				down: true
			}
		},
		methods: {}
	}
</script>

<style>
	.ho {
		opacity: 0.8;
	}

	.lang {
		color: #C02D39;
		margin-right: 10rpx;
	}

	.time {
		color: #666666;
	}

	.btn image {
		width: 49rpx;
		height: 49rpx;
		margin-top: 10rpx;
	}

	.btn {
		width: 216rpx;
		height: 69rpx;
		background: #C02C38;
		border-radius: 35rpx;
		line-height: 69rpx;
		text-align: center;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		margin: auto 0;
		display: flex;
		justify-content: space-evenly;
	}

	.box-content {
		width: 100%;
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		line-height: 50rpx;
	}

	.top image {
		width: 40rpx;
		height: 40rpx;
		margin-top: 10rpx;
	}

	.top {
		width: 150rpx;
		height: 50rpx;
		border-radius: 25rpx 25rpx 0 0;
		position: absolute;
		top: -50rpx;
		background: #FFFFFF;
		left: 300rpx;
		text-align: center;
	}

	.title {
		width: 100%;
		height: 45rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #424242;
		line-height: 45rpx;
	}

	.item {
		width: 690rpx;
		min-height: 160rpx;
		position: relative;
		left: 30rpx;
		top: 20rpx;
	}

	.box {
		width: 100%;
		position: absolute;
		background: #FFFFFF;

	}

	.map-box image {
		width: 100%;
		height: 100%;
	}

	.map-box {
		width: 100%;
		height: 980rpx;
	}
</style>
