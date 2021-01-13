<template>
	<view>
		<div class="box">
			<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in arr" :key="item.id" @click="click" @open="open"
			 :options="options" style="margin-bottom: 20px;">
				<view class="item u-border-bottom">
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap">
						<div class="li" @click.stop="check(index)">
							<div class="title">{{item.xm}}</div>
							<div class="n_box">
								<div class="number">
									<span></span>
									<span></span>
									<span></span>
									<span></span>
								</div>
								<div class="number">
									<span></span>
									<span></span>
									<span></span>
									<span></span>
								</div>
								<div class="number">
									<span></span>
									<span></span>
									<span></span>
									<span></span>
								</div>
								<div class="number">1568</div>
							</div>
						</div>
					</view>
				</view>
			</u-swipe-action>
			<div class="addbtn" @click="addgo">添加银行卡</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arr: [{
					xm: '中国工商银行储蓄卡1',
					tel: '13546457845',
					show: false,
					id:1
				}, {
					xm: '中国工商银行储蓄卡2',
					tel: '13546457845',
					show: false,
					id:2
				}, {
					xm: '中国工商银行储蓄卡3',
					tel: '13546457845',
					show: false,
					id:3
				}, {
					xm: '中国工商银行储蓄卡4',
					tel: '13546457845',
					show: false,
					id:4
				}],
				options: [{
					text: '编辑',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
			}
		},
		methods: {
			addgo() {
				uni.navigateTo({
					url: '/pages/card/addcard'
				});
			},
			check(index) {
				console.log(index)
				console.log(99)
			},
			click(index, index1) {
				console.log(index)
				console.log(index1)
				console.log(88)
				if (index1 == 1) {
					this.arr.splice(index, 1)
					console.log(this.arr)
					this.arr = this.arr
				} else {
					uni.navigateTo({
						url: '/pages/card/addcard?index='+index
					});
				}
			},
			open(index) {
				console.log(index)
				console.log(77)
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.arr[index].show = true;
				this.arr.map((val, idx) => {
					if (index != idx) this.arr[idx].show = false;
				})
			},
		}
	}
</script>

<style>
	.box {
		width: 100%;
		padding: 20rpx;
		padding-bottom: 200rpx;
		box-sizing: border-box;
	}

	.li {
		width: 100%;
		height: 259rpx;
		/* background: url(../../static/img/cardbj.png) no-repeat; */ 
		background-size: 100% 100%;
		overflow: hidden;
		box-sizing: border-box;
	}

	.li .title {
		margin-left: 39rpx;
		margin-top: 51rpx;
		margin-bottom: 48rpx;
		color: #FFFFFF;
		font-size: 30rpx;
		letter-spacing: 2rpx;
		font-weight: 600;
	}

	.li .n_box {
		margin-left: 39rpx;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		padding-right: 54rpx;
	}

	.li .n_box .number {
		font-size: 42rpx;
		color: #FFFFFF;
	}

	.li .n_box .number span {
		display: inline-block;
		width: 17rpx;
		height: 17rpx;
		border-radius: 50%;
		background: #FFFFFF;
		opacity: 0.3;
		margin-right: 13rpx;
	}

	.addbtn {
		width: 280rpx;
		line-height: 80rpx;
		border: 2rpx solid #BE353D;
		color: #BE353D;
		margin: 0 auto;
		text-align: center;
		border-radius: 10rpx;
		font-size: 28rpx;
		font-weight: 600;
		letter-spacing: 2rpx;
		position: fixed;
		bottom: 100rpx;
		left: 50%;
		transform: translateX(-50%);
		background-color: #FFFFFF;
	}
</style>
