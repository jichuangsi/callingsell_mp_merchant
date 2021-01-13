<template>
	<view class="specs">
		<view class="bgColor">
		</view>
		<view class="box">
			<view class="content">
				<view>规格名称</view>
				<view>价格（元）</view>
				<view>库存</view>
			</view>
			<u-swipe-action :show="item.show" :index="index" v-for="(item,index) in arr" :key="index" @click="click" @open="open"
			 :options="options" v-if="item.is_delete!=1||!item.is_delete">
				<view class="item u-border-bottom">
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap">
						<view class="content" @click.stop="edit(item,index)">
							<view>{{item.name}}</view>
							<view>{{item.price}}</view>
							<view>{{item.total}}</view>
						</view>
					</view>
				</view>
			</u-swipe-action>
		</view>
		<view class="btn">
			<view @click="addgo">新增</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arr: [{
					name: '撒大',
					price: '10.00',
					total: '99'
				}],
				pageIndex: 1,
				show: false,	
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
			}
		},
		onLoad: function() { //option为object类型，会序列化上个页面传递的参数
			// this.getdata()
			let pages = getCurrentPages();
			let prePage = pages[pages.length - 2];
			let data = prePage.$vm ? prePage.$vm : prePage
			this.arr = data.specs_arr
			console.log(data.specs_arr.length)
		},
		methods: {
			click(index) {
				let self = this
				console.log(index)
				uni.showModal({
					title: '提示',
					content: '是否删除该规格',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							self.arr.map((val, idx) => {
								self.arr[idx].show = false;
							})
							let pages = getCurrentPages();
							let prePage = pages[pages.length - 2];
							let data = prePage.$vm ? prePage.$vm : prePage
							if(self.arr[index].id){
								self.arr[index].is_delete=1
							}else{
								self.arr.splice(index,1)
							}
							data.specs_arr = self.arr
							console.log(self.arr)	
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			open(index) {
				console.log(index)
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.arr[index].show = true;
				this.arr.map((val, idx) => {
					if(index != idx) this.arr[idx].show = false;
				})
				console.log(this.arr)
			},
			edit(item, index) {
				console.log(item)
				uni.navigateTo({
					url: '/pages/specs/addspecs?state=1&&index=' + index
				});
			},
			addgo() {
				uni.navigateTo({
					url: '/pages/specs/addspecs?state=0'
				});
			},
			getdata() {},
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
		/* background: #C02C38; */
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
		display: flex;
		justify-content: space-between;
	}

	.btn view {
		flex: 1;
		height: 98upx;
		line-height: 98upx;
		text-align: center;
		background: #C02C38;
		color: #FFFFFF;
		border-radius: 47upx;
		font-size: 32upx;
	}

	.btn view:last-child {
		color: #C02C38;
		background-color: #FFFFFF;
		border: 1upx solid #C02C38;
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
		display: flex;
		background-color: #FFFFFF;
		/* border-right: 1px solid rgba(212, 218, 233, 1); */
	}

	.content view {
		flex: 1;
		text-align: center;
		line-height: 100upx;
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
		width: 100%;
		display: flex;
		/* min-height: 160upx; */
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
