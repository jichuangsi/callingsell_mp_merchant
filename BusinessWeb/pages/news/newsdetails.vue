<template>
	<view class="newsdetails">
		<div class="center" v-html="item.details">
			
		</div>
	</view>
</template>

<script>
	import Api from '../../api/test';
	export default {
		data() {
			return {
				id:'',
				item:''
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			// console.log(option.id)
			// console.log(777)
			this.id = option.id
			this.getdata()
		},
		methods: {
			getdata(){
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getMessageDetail?msg_id='+self.id).then(res => {
					console.log(res);
					self.item = res.data
					uni.setNavigationBarTitle({
						title: res.data.title
					})
				}).catch(err => {
					console.error('is error', err);
				})
			},
		}
	}
</script>

<style>
.newsdetails {
	padding: 20rpx 30rpx;
}
.center {
	text-indent: 2em;
}
</style>
