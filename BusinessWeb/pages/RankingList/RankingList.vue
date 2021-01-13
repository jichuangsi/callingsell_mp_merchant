<template>
	<view>
		<view class="box-top">
			<view class="box-title">
				<image src="http://www.callingsell.com/static/shangjiaduan/img/phb.png"></image>
			</view>
		</view>
		<view class="box">
			<view class="item-title">
				<view>排名</view>
				<view>拎手ID</view>
				<view>拎手总单数</view>
			</view>
			<view class="item item-bg">
				<view class="item-name">
					<image src="http://www.callingsell.com/static/shangjiaduan/img/01.png"></image>
				</view>
				<view class="item-id">
					<image src="http://www.callingsell.com/static/shangjiaduan/img/tx-list.png"></image>
					<view>布***</view>
				</view>
				<view class="item-cunt">218000</view>
			</view>
			<view class="item ">
				<view class="item-name">
					<image src="http://www.callingsell.com/static/shangjiaduan/img/02.png"></image>
				</view>
				<view class="item-id">
					<image src="http://www.callingsell.com/static/shangjiaduan/img/tx-list.png"></image>
					<view>布***</view>
				</view>
				<view class="item-cunt">218060</view>
			</view>
			<view class="item item-bg">
				<view class="item-name">
					<image src="http://www.callingsell.com/static/shangjiaduan/img/03.png"></image>
				</view>
				<view class="item-id">
					<image src="http://www.callingsell.com/static/shangjiaduan/img/tx-list.png"></image>
					<view>布***</view>
				</view>
				<view class="item-cunt">210</view>
			</view>
			<view class="item ">
				<view class="item-name">
					4
				</view>
				<view class="item-id">
					<image src="http://www.callingsell.com/static/shangjiaduan/img/tx-list.png"></image>
					<view>布***</view>
				</view>
				<view class="item-cunt">20</view>
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
	.item-cunt{
		width: 120rpx;
		text-align: end;
	}
	.item-name image {
		width: 55rpx;
		height: 45rpx;
		margin-top: 30rpx;
	}
	.item-name{
		width: 60rpx;
	}
	.item-id {
		display: flex;
	}

	.item-id image {
		width: 60rpx;
		height: 60rpx;
		margin-top: 20rpx;
		margin-right: 8rpx;
	}

	/* 	.item image{
		width: 55rpx;
		height: 45rpx;
		margin-top: 30rpx;
	} */
	.item-title {
		display: flex;
		justify-content: space-around;
		height: 82rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		line-height: 80rpx;
		text-align: center;
	}

	.item {
		width: 100%;
		height: 110rpx;
		text-align: center;
		display: flex;
		justify-content: space-around;
		line-height: 110rpx;

		font-size: 32rpx;
	}

	.item-bg {
		background: #F9F8F9;
	}

	.box {
		width: 100%;
		position: relative;
		top: -160rpx;
		background: #FFFFFF;
		min-height: 600rpx;
		border-radius: 42rpx 42rpx 0 0;
	}

	.box-title image {
		width: 310rpx;
		height: 80rpx;
	}

	.box-title {
		width: 100%;
		height: 80rpx;
		position: relative;
		top: 60rpx;
		left: 30rpx;
	}

	.box-top {
		width: 100%;
		height: 435rpx;
		background: url(http://www.callingsell.com/static/shangjiaduan/img/list.png) no-repeat;
		background-size: 100% 100%;
	}
</style>
