<template>
	<view>
		<view class="bgColor"></view>
		<div class="box">
			<div class="bz">*请填写银行卡信息</div>
			<u-cell-group>
				<u-cell-item title="持卡人：" :arrow="false"><input type="text" placeholder="持卡人姓名"></u-cell-item>
			</u-cell-group>
			<u-cell-group>
				<u-cell-item title="银   行："><input type="text" disabled="disabled" placeholder="请选择银行"></u-cell-item>
			</u-cell-group>
			<u-cell-group>
				<u-cell-item title="卡   号：" :arrow="false"><input type="text" placeholder="请输入银行卡号"></u-cell-item>
			</u-cell-group>
			<div class="btn">确认</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option)
			if (option.index) {
				uni.setNavigationBarTitle({
					title:"修改银行卡"
				})
				this.getdata()
			}
		},
		methods: {
			getdata() {
				let pages = getCurrentPages();
				let prePage = pages[pages.length - 2];
				let data = prePage.$vm ? prePage.$vm : prePage
			}
		}
	}
</script>

<style>
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

	.u-cell {
		align-items: center;
	}

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

	.box {
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
	}

	input {
		text-align: left;
		font-size: 28rpx;
	}

	.bz {
		color: #999999;
		font-size: 20rpx;
		margin-bottom: 32rpx;
		margin-top: 30rpx;
	}
</style>
