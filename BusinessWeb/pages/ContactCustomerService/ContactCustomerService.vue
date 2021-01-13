<template>
	<view>
		<view class="item" @click="phoneclick()">
			<view class="">
				客服电话
			</view>
			<view class="">
				{{item.mobile}}
			</view>

		</view>
		<u-line color="#F5F5F5" style="width: 690rpx;margin-left: 30rpx;" />
		<view class="item">
			<view class="">
				联系邮箱
			</view>
			<view class="">
				{{item.qq}}
			</view>
		</view>
	</view>
</template>

<script>
	import Api from '../../api/test';
	export default {
		data() {
			return {
				item: '',
				userid: uni.getStorageSync('userid')
			}
		},
		mounted() {
			this.Getdata()
		},
		methods: {
			phoneclick() {
				let self = this
				uni.showModal({
					title: '电话',
					content: '电话' + self.item.mobile,
					confirmText: '呼叫',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.makePhoneCall({
								phoneNumber: item.mobile //仅为示例
							});

						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			Getdata() {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getContactUs?userid=' + self.userid).then(res => {
					console.log(res);
					self.item = res.data
				}).catch(err => {
					console.error('is error', err);
				})
			},
		}
	}
</script>

<style>
	.item {
		width: 690rpx;
		height: 100rpx;
		line-height: 100rpx;
		display: flex;
		justify-content: space-between;
		position: relative;
		left: 30rpx;
	}
</style>
