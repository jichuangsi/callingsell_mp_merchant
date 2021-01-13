<template>
	<view class="Classify">
		<view class="bgColor">
		</view>
		<view class="box">
			<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in arr" :key="item.id" @click="click" @open="open"
			 :options="options" style="margin-bottom: 20px;" disabled>
				<view class="item u-border-bottom" @click.stop="top(index)">
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap">
						<view class="content">
							{{item.cate_name}}
						</view>
						<view class="right" v-if="cate_index==index">
							<view class="bj">
								<image src="../../static/img/gou.png"></image>
							</view>
						</view>
					</view>
				</view>
			</u-swipe-action>
		</view>
		<view class="btn" @click="show=true">新增{{title}}</view>
		<!-- <u-modal v-model="true" width="70%"></u-modal> -->
		<u-popup v-model="show" mode="center" border-radius="14" width="80%" height="30%">
			<view>
				<view class="pop">
					新增{{title}}
				</view>
				<view class="pop_center">
					<input type="text" class="pop_input" v-model="desc"/>
				</view>
				<view class="btnbox">
					<view class="pop_btn" hover-class="btnr btnl" @click="show=false">
						取消
					</view>
					<view class="pop_btn" hover-class="btnr" @click="btn">
						提交
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import Api from '../../api/test';
	export default {
		data() {
			return {
				arr: [{
					xm: '撒大',
					tel: '13546457845',
					area_str: '广东省广州市xx区'
				}, {
					xm: '撒大1',
					tel: '13546457845',
					area_str: '广东省广州市xx区'
				}, {
					xm: '撒大2',
					tel: '13546457845',
					area_str: '广东省广州市xx区'
				}, {
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
				title: '',
				show: false,
				desc:'',
				cate_index:0,
				userid: uni.getStorageSync('userid')
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.getdata()
			uni.setNavigationBarTitle({
				title: option.title
			})
			this.title = option.title
		},
		methods: {
			btn() {
				let self = this
				if(self.desc!=''){
					Api.getRequestData(self.APIS + '/wxapp/EleStore/addGoodsCate?userid='+self.userid+'&catename=' + self.desc).then(
						res => {
							console.log(res)
							self.show=false
							self.desc = ''
							self.getdata()
						}).catch(err => {
						console.error('is error', err);
					})
				}else{
					uni.showToast({
						title: '请填写类目名称',
						icon: 'none',
						duration: 2000
					});
				}
			},
			click(index) {
				console.log(1111)
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
			top(index) {
				console.log(index)
				// this.arr.unshift(this.arr.splice(index, 1)[0])
				console.log(this.arr)
				let pages = getCurrentPages();
				let prePage = pages[pages.length - 2];
				let data = prePage.$vm ? prePage.$vm : prePage
				data.cate_name = this.arr[index].cate_name
				data.cate_id = this.arr[index].cate_id
				data.cate_index = index
				
				uni.navigateBack({
					delta: 1
				})
			},
			getdata() {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getGoodCate?userid=' + self.userid).then(
					res => {
						console.log(res)
						self.arr = res.data
						let pages = getCurrentPages();
						let prePage = pages[pages.length - 2];
						let data = prePage.$vm ? prePage.$vm : prePage
						self.cate_index = data.cate_index
						// for (let i = 0; i < self.arr.length; i++) {
						// 	if (self.arr[i].cate_id == data.cate_id) {
						// 		cate_index = i
						// 		// self.top(i)
						// 		// return
						// 	}
						// }
					}).catch(err => {
					console.error('is error', err);
				})
			},
		},
		onReachBottom() {}
	}
</script>

<style>
	.btnbox {
		width: 525rpx;
		display: flex;
		justify-content: space-between;
		margin: 20rpx auto;
		box-sizing: border-box;
	}
	.pop_btn {
		width: 250rpx;
		height: 78rpx;
		background: #FFFFFF;
		border: 2rpx solid #C02C38;
		border-radius: 5rpx;
		text-align: center;
		line-height: 78rpx;
		font-size: 32rpx;
		color: #C02D38;
		/* margin: 20rpx auto; */
		display: inline-block;
	}

	.pop_input {
		width: 100%;
		height: 100%;
		text-align: center;

		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #343434;
	}

	.pop_center {
		width: 525rpx;
		height: 93rpx;
		background: #EFEFF5;
		border-radius: 5rpx;
		margin: 30rpx auto;
	}

	.pop {
		width: 100%;
		height: 124rpx;
		text-align: center;
		line-height: 124rpx;

		background: linear-gradient(250deg, #F9B942 0%, #F9CA61 100%);
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FEFEFE;
	}

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
		transform: rotate(84deg);
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
		transform: rotate(-90deg);
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
		padding: 32upx;
		align-items: center;
		padding-right: 0upx;
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
