<template>
	<view class="Withdrawalrecord">
		<view class="bgColor"></view>
		<view class="table" v-if="index==1">
			<view class="table-item" v-for="(item,index) in arr">
				<div class="left">
					<view>收入</view>
					<view class="time">{{item.addtime}}</view>
				</div>
				<view class="sh" style="color:#2BB600;" v-if="item.status==0">+60.00</view>
				<view class="sh" v-if="item.status==1">-620.00</view>
			</view>
		</view>
		<view class="table" v-if="index==2">
			<view class="table-item" v-for="(item,index) in arr">
				<div class="left">
					<view>收入</view>
					<view class="time">{{item.addtime}}</view>
				</div>
				<view>-{{item.moneys}}</view>
				<view class="sh" style="color:rgba(254,94,16,1);" v-if="item.status==0">审核中</view>
				<view class="sh" v-if="item.status==1">已完成</view>
				<view class="sh" v-if="item.status==2">未通过</view>
				<view class="msg" v-if="item.status==2">备注: {{item.reason}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arr: [{
					addtime: '2018-09-30',
					moneys: 100,
					status: 1
				}],
				index:2
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option)
			this.index = option.index
			if (option.index==1) {
				uni.setNavigationBarTitle({
					title:"余额明细"
				})
			}
		},
		methods: {

		}
	}
</script>

<style>
	.sh {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
	}
	.table {
		margin-top: 20upx;
	}
	.table-item {
		width: 100%;
		background: #FFFFFF;
		/* height: 100upx; */
		text-align: center;
		padding: 0px 32upx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		line-height: 50upx;
		border-bottom: 1upx solid #d6daf5;
		align-items: center;
	}

	.msg {
		width: 100%;
		text-align: left;
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
	.time {
		color: #999999;
		font-size: 22rpx;
	}
	.left {
		text-align: left;
		font-size: 28rpx;
	}
</style>
