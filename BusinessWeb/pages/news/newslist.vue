<template>
	<view>
		
	<!-- 	<view class="row">
			<u-tabs :list="list" :is-scroll="false" active-color="#C02C38" :current="current" @change="change"></u-tabs>
		</view> -->
		<view v-show="current==0" class="content-box">
			<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in arr" :key="item.id" @click="click" @open="open"
			 :options="options" disabled>
				<view class="item u-border-bottom" @click.stop="go(index)">
					<!-- <image mode="aspectFill" :src="item.images" /> -->
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap">
						<text class="title u-line-2">{{ item.title }}</text>
						<text class="time">{{timestampToTime(item.create_time)}}</text>
						<text class="title u-line-2 content">{{ item.intro }}</text>

					</view>
				</view>
			</u-swipe-action>
		</view>
		<view v-show="current==1">

		</view>
	</view>
</template>

<script>
	import Api from '../../api/test';
	export default {
		data() {
			return {
				list: [{
					name: '通知'
				}, {
					name: '消息'
				}],
				current: 0,
				arr: [],
				disabled: false,
				btnWidth: 180,
				show: false,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				pageIndex:1,
				userid: uni.getStorageSync('userid')
			};
		},
		mounted() {
			this.getdata()
		},
		methods: {
			go(index){
				uni.navigateTo({
					url: '/pages/news/newsdetails?id='+this.arr[index].msg_id
				});
			},
			change(index) {
				this.current = index;
			},
			click(index, index1) {
				this.arr.splice(index, 1);
				// this.$u.toast(`删除了第${index}个cell`);
			},
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.arr[index].show = true;
				this.arr.map((val, idx) => {
					if (index != idx) this.arr[idx].show = false;
				})
			},
			getdata(){
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getMessageList?userid='+self.userid+'&page=' + self.pageIndex).then(res => {
					console.log(res);
						if (res.data && res.data.length > 0) {
							self.pageIndex = self.pageIndex + 1
							self.arr.push(...res.data)
						}
				}).catch(err => {
					console.error('is error', err);
				})
			},
			timestampToTime(timestamp) {
				var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = date.getDate() + ' ';
				var h = date.getHours() + ':';
				var m = date.getMinutes() + ':';
				var s = date.getSeconds();
				return Y + M + D + h + m + s;
			},
		},
		onReachBottom() {
			console.log(111)
			if ( this.pageIndex > 1) {
				this.getdata()
			}
		}
	}
</script>

<style lang="scss">
	.row{
		    position: fixed;
		    z-index: 9;
		    width: 100%;

	}
	.item {
		display: flex;
		padding: 20rpx;
	}

	image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}
	.content-box{
		    position: relative;
		    // top: 50px;
	}
	.title {
		text-align: left;
		color: $u-content-color;
		margin-top: 20rpx;
		font-size: 32rpx;
		font-family: PingFang;
		font-weight: 500;
		color: rgba(1, 1, 1, 1);
	}

	.content {
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		font-size: 28rpx;
		font-family: PingFang;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
	}

	.time {
		position: absolute;
		right: 20rpx;
		top: 22rpx;
		font-size:24rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(153,153,153,1);
	}
</style>
