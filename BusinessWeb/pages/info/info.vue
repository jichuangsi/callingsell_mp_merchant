<template>
	<view class="info">
		
	<!-- 	<view class="row">
			<u-tabs :list="list" :is-scroll="false" active-color="#C02C38" :current="current" @change="change"></u-tabs>
		</view> -->
		<view v-show="current==0" class="content-box">
			<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in arr" :key="item.id" @click="click" @open="open"
			 :options="options">
				<view class="item u-border-bottom">
					<image mode="aspectFill" :src="item.images" />
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap">
						<text class="title u-line-2">{{ item.title }}</text>
						<text class="time">{{item.time}}</text>
						<text class="title u-line-2 content">{{ item.content }}</text>

					</view>
				</view>
			</u-swipe-action>
		</view>
		<view v-show="current==1">

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '通知'
				}, {
					name: '消息'
				}],
				current: 0,
				arr: [{
						id: 1,
						title: '官方客服',
						images: 'http://www.callingsell.com/static/shangjiaduan/img/news-kf.png',
						show: false,
						content: "[链接]新功能上线啦，立刻体验！",
						time: "刚刚"
					},
					{
						id: 2,
						title: '订单留言',
						images: 'http://www.callingsell.com/static/shangjiaduan/img/news-ly.png',
						show: false,
						content: "您有一条新的订单留言，请及时查看...",
						time: "刚刚"
					},
					{
						id: 3,
						title: '投诉信息',
						images: 'http://www.callingsell.com/static/shangjiaduan/img/news-qh.png',
						show: false,
						content: "当前有两款商品缺货，请做好缺货登记...",
						time: "2020-07-02"
					}, {
						id: 4,
						title: '缺货登记',
						images: 'http://www.callingsell.com/static/shangjiaduan/img/news-ts.png',
						show: false,
						content: "当前未收到投诉信息，请继续保持...当前未收到投诉信息，请继续保持...",
						time: "2020-07-02"
					},
					{
						id: 5,
						title: '缺货登记',
						images: 'http://www.callingsell.com/static/shangjiaduan/img/news-ts.png',
						show: false,
						content: "当前未收到投诉信息，请继续保持...当前未收到投诉信息，请继续保持...",
						time: "2020-07-02"
					}
					
				],
				disabled: false,
				btnWidth: 180,
				show: false,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			};
		},
		methods: {
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
