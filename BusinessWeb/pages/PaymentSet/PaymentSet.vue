<template>
	<view>
		<view class="bgColor"></view>
		<!-- <view class="item">
			<u-cell-group>
				<u-cell-item title="支付类型选择" @click='pay()'></u-cell-item>
			</u-cell-group>
		</view> -->
		
		<view class="item">
			<u-cell-group>
				<u-cell-item title="支付方式管理" @click='pay()'></u-cell-item>
			</u-cell-group>
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
			pay(){
				uni.navigateTo({
					url:"./PaymentType"
				})
			}
		}
	}
</script>

<style>
	.item{
		width: 690rpx;
		min-height: 50rpx;
		margin: 20rpx auto;
	}
	.bgColor {
		position: fixed;
		top: 0px;
		left: 0;
		right: 0;
		bottom: 0;
		background: #F5F5F5;
		z-index: -1;
	}
</style>
