<template>
	<view class="MyAddress">
		<view class="bgColor">
		</view>
		<view class="box">
			<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in arr" :key="item.id" @click="click" @open="open"
			 :options="options" style="margin-bottom: 20px;">
				<view class="item u-border-bottom">
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap">
						<view class="content">
							<view class="title">
								<text class="name">{{item.xm}}</text>
								<text class="name">{{item.tel}}</text>
							</view>
							<view class="address">
								{{item.area_str}}
							</view>
						</view>
						<view class="right" @click.stop="edit(item)">
							<view class="bj">
								<image src="../../static/img/bianji.png"></image>
							</view>
						</view>
					</view>
				</view>
			</u-swipe-action>
		</view>
		<navigator url="AddShippingAddress" hover-class="none">
			<view class="btn">新增收货地址</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arr: [{
					xm: '撒大',
					tel: '13546457845',
					area_str: '广东省广州市xx区'
				},{
					xm: '撒大1',
					tel: '13546457845',
					area_str: '广东省广州市xx区'
				},{
					xm: '撒大2',
					tel: '13546457845',
					area_str: '广东省广州市xx区'
				},{
					xm: '撒大3',
					tel: '13546457845',
					area_str: '广东省广州市xx区'
				}],
				pageIndex: 1,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				list: [{
						id: 1,
						title: '长安回望绣成堆，山顶千门次第开，一骑红尘妃子笑，无人知是荔枝来',
						images: 'https://cdn.uviewui.com/uview/common/logo.png',
						show: false
					},
					{
						id: 2,
						title: '新丰绿树起黄埃，数骑渔阳探使回，霓裳一曲千峰上，舞破中原始下来',
						images: 'https://cdn.uviewui.com/uview/common/logo.png',
						show: false
					},
					{
						id: 3,
						title: '登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇',
						images: 'https://cdn.uviewui.com/uview/common/logo.png',
						show: false,
					}
				],
			}
		},
		onLoad: function() { //option为object类型，会序列化上个页面传递的参数
			// this.getdata()
		},
		methods: {
			click(index) {
				console.log(index)
			},
			open(index) {
				console.log(index)
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				// this.list[index].show = true;
				// this.list.map((val, idx) => {
				// 	if(index != idx) this.list[idx].show = false;
				// })
			},
			edit(item) {
				console.log(item)
				uni.navigateTo({
					url: '/pages/MyAddress/AddMyAddress?state=1&&item=' + JSON.stringify(item)
				});
			},
			getdata() {
				let self = this
				// 收货地址
				uni.request({
					url: this.APIS + '?s=App.Gift_Gift.GetMyShippingAddress', //仅为示例，并非真实接口地址。
					data: {
						page: self.pageIndex
					},
					header: {
						token: uni.getStorageSync('token')
					},
					method: "GET",
					success: function(res) {
						console.log(res);
						self.pageIndex = res.data.data.list.length != 0 ? (self.pageIndex + 1) : self.pageIndex
						self.arr.push(...res.data.data.list)
					}
				});
			},
		},
		onReachBottom() {
			if (this.pageIndex > 1) {
				this.getdata()
			}
		}
	}
</script>

<style>
	.btn {
		width: 660upx;
		height: 80upx;
		background: #C02C38;
		opacity: 1;
		border-radius: 47upx;
		position: fixed;
		bottom: 50upx;
		left: 45upx;
		text-align: center;
		line-height: 80upx;
		font-size: 32upx;
		color: #FFFFFF;
		z-index: 9;
	}

	.bj {
		margin: auto;
	}

	.bj image {
		width: 40upx;
		height: 40upx;
	}

	.address {
		font-size: 28upx;
		line-height: 40upx;
		color: rgba(16, 39, 70, 1);
		margin-left: 6%;
	}

	.right {
		display: flex;
		height: 100%;
		padding-left: 53upx;
		padding-right: 46upx;
	}

	.content {
		flex: 1;
		padding-right: 78upx;
		/* border-right: 1px solid rgba(212, 218, 233, 1); */
	}

	.title image {
		width: 78upx;
		height: 36upx;
		/* left: 35upx; */
		/* top: 4upx; */
	}

	.title {
		line-height: 60upx;
		text-indent: 1rem;
		/* width: 70%; */
	}

	.title-wrap {
		display: flex;
		min-height: 160upx;
		align-items: center;
	}

	.name {
		font-size: 32upx;
		line-height: 45upx;
		color: rgba(16, 39, 70, 1);
		margin-right: 30upx;
	}

	.box {
		position: relative;
		padding-top: 50upx;
		padding-bottom: 170upx;
		background-color: #F4F8FC;
	}

	.bgColor {
		position: fixed;
		top: 45px;
		left: 0;
		right: 0;
		bottom: 0;
		background: #F4F8FC;
	}
</style>
