<template>
	<view>
		<view class="bgColor"></view>
		<view class="container" style="background: url(http://www.callingsell.com/static/shangjiaduan/img/bg-tjq.png);">
			<view>
				<view class="canvasView">
					<mpvue-echarts :echarts="echarts" :onInit="lineInit" canvasId="line" ref="lineChart" />
				</view>
			</view>
			<view class="box">
				<u-line color="#ffffff" />
				<view class="box-item">
					<view>
						<view class="">¥{{item.totalPrice}}</view>
						<view class="">七天收入</view>
					</view>
					<view>
						<view class="">¥{{item.macPrice}}</view>
						<view class="">单日最高</view>
					</view>
					<view>
						<view class="">¥{{item.averagePrice}}</view>
						<view class="">日均</view>
					</view>
				</view>
			</view>
		</view>

		<!-- <view class="item">
			<view class="title">
				<view style="font-size: 32rpx;color: #FFFFFF;"> 店铺资产</view>
				<navigator url="./Pool" hover-class="none">
					<view style="font-size: 26rpx;color: #FFFFFF;">收资汇总> </view>
				</navigator>
			</view>
			<view style="font-size: 52rpx;color: #FFFFFF;line-height: 150rpx;">5,502</view>
		</view> -->

		<view class="item-box">
			<navigator url="./Pool" hover-class="none">
				<u-cell-group>
					<u-cell-item title="收支汇总"></u-cell-item>
				</u-cell-group>
			</navigator>
			<!-- <navigator url="./Withdrawal" hover-class="none">
				<u-cell-group>
					<u-cell-item title="去提现"></u-cell-item>
				</u-cell-group>
			</navigator> -->
		</view>
	</view>

</template>

<script>
	import * as echarts from '@/components/echarts/echarts.simple.min.js';
	import mpvueEcharts from '@/components/mpvue-echarts/src/echarts.vue';
	import Api from '../../api/test';
	let lineOption = {
		animation: true,
		color: ['#ffffff'],
		tooltip: {
			show: true
		},
		textStyle: {
			color: "#fff"
		},
		grid: {
			x: 35,
			x2: 10,
			y: 30,
			y2: 25
		},
		calculable: false,
		xAxis: [{
			type: 'category',
			data: ['7月1号', '7月3号', '7月4号', '7月6号'],
			nameTextStyle: {
				color: "rgba(255, 255, 255, 0.6)"
			},
			splitLine: {
				type: 'dashed',
				show: true,
				lineStyle: {
					color: 'rgba(255,255,255,0.3)',
				}
			},
			axisLine: {
				lineStyle: {
					type: 'dashed',
					color: 'rgba(255,255,255,0.3)',
				}
			},
			show: true,
			length: 1
		}],
		yAxis: [{
			type: 'value',
			splitLine: {
				type: 'dashed',
				show: true
			},
			show: false
		}],
		series: [{
			name: '降水量',
			type: 'line',
			data: [35, 25, 37, 20],
			smooth: true,
			symbol: 'circle',
			itemStyle: {
				normal: {
					label: {
						show: true, //开启显示
						position: 'top', //在上方显示
						textStyle: { //数值样式
							color: '#fff',
							fontSize: 15
						}
					}
				}
			},
			areaStyle: {
				normal: {
					color: {
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 0,
							color: "rgba(255,255,255,0.4)" // 0% 处的颜色
						}, {
							offset: 0.7,
							color: "rgba(217, 35, 50, 0.3)" // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
					}
				}
			},
		}]
	};

	export default {
		data() {
			return {
				echarts: echarts,
				updateStatus: false,
				timearr:[],
				time_arr:[],
				ceshiL:'',
				item:'',
				width:'',
				height:'',
				userid:uni.getStorageSync('userid')
			}
		},
		created() {
			let that = this;
			that.getdata()
		},
		methods: {
			getdata() {
				let self = this
				self.timearr = self.getWeekDay()
				for(let i = 0;i<7;i++){
					console.log(i)
					self.time_arr.push(self.timearr[i].split('-')[1]+'月'+self.timearr[i].split('-')[2]+'日')
				}
				console.log(self.timearr)
				console.log(888)
				// self.timearr = ['2020-12-02','2020-12-03','2020-12-04','2020-12-05','2020-12-06','2020-12-07','2020-12-08']
				console.log(self.timearr)
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getStatisticalReport?userid='+self.userid+'&start_Time='+self.timearr[0]+'&end_Time='+self.timearr[6]).then(
					res => {
						console.log(res);
						// self.user = res.data[0]
						self.item = res.data
						console.log(res.data.sevenDay[self.timearr[0]])
						lineOption = {
							animation: true,
							color: ['#ffffff'],
							tooltip: {
								show: true
							},
							textStyle: {
								color: "#fff"
							},
							grid: {
								x: 35,
								x2: 10,
								y: 30,
								y2: 25
							},
							calculable: false,
							xAxis: [{
								type: 'category',
								data: self.time_arr,
								nameTextStyle: {
									color: "rgba(255, 255, 255, 0.6)"
								},
								splitLine: {
									type: 'dashed',
									show: true,
									lineStyle: {
										color: 'rgba(255,255,255,0.3)',
									}
								},
								axisLine: {
									lineStyle: {
										type: 'dashed',
										color: 'rgba(255,255,255,0.3)',
									}
								},
								show: true,
								length: 1
							}],
							yAxis: [{
								type: 'value',
								splitLine: {
									type: 'dashed',
									show: true
								},
								show: false
							}],
							series: [{
								name: '降水量',
								type: 'line',
								data: [res.data.sevenDay[self.timearr[0]],res.data.sevenDay[self.timearr[1]],res.data.sevenDay[self.timearr[2]],res.data.sevenDay[self.timearr[3]],res.data.sevenDay[self.timearr[4]],res.data.sevenDay[self.timearr[5]],res.data.sevenDay[self.timearr[6]]],
								smooth: true,
								symbol: 'circle',
								itemStyle: {
									normal: {
										label: {
											show: true, //开启显示
											position: 'top', //在上方显示
											textStyle: { //数值样式
												color: '#fff',
												fontSize: 15
											}
										}
									}
								},
								areaStyle: {
									normal: {
										color: {
											x: 0,
											y: 0,
											x2: 0,
											y2: 1,
											colorStops: [{
												offset: 0,
												color: "rgba(255,255,255,0.4)" // 0% 处的颜色
											}, {
												offset: 0.7,
												color: "rgba(217, 35, 50, 0.3)" // 100% 处的颜色
											}],
											globalCoord: false // 缺省为 false
										}
									}
								},
							}]
						};
						self.lineInit(self.ceshiL,self.width,self.height)
						// this.$refs.lineChart.onInit()
						// console.log(self.ceshiL)
					}).catch(err => {
					console.error('is error', err);
				})
			},
			goBrowser() {
				// #ifdef APP-PLUS
				plus.runtime.openURL('https://github.com/F-loat/mpvue-echarts');
				// #endif
				// #ifdef MP-WEIXIN
				uni.showModal({
					content: '请复制链接在浏览器里打开',
					showCancel: false
				})
				// #endif
			},
			updatePie() {
				if (this.updateStatus) {
					return;
				}
				pieOption.series[0].data.push({
					value: 20,
					name: '武汉'
				});
				pieOption.series[0].data.push({
					value: 10,
					name: '杭州'
				});
				this.$refs.pieChart.init();
				this.updateStatus = true;
			},
			lineInit(canvas, width, height) {
				console.log(11111)
				this.ceshiL = canvas
				this.width = width
				this.height = height
				let lineChart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(lineChart)
				lineChart.setOption(lineOption)
				return lineChart
			},
			getWeekDay() {
				let self = this
				console.log(self.formatDate(new Date()))
				let dateString = self.formatDate(new Date()); //当天的日期，例如2020-2-28
				// let dateString = '2020-11-30'; //当天的日期，例如2020-2-28
				let presentDate = new Date(dateString);
				let today = presentDate.getDay() !== 0 ? presentDate.getDay() : 7;

				return Array.from(new Array(7), function(val, index) {
					return self.formatDate(new Date(presentDate.getTime() - (today - index - 1) * 24 * 60 * 60 * 1000));
				});
			},
			formatDate(date) {
				date = new Date(date);
				let myyear = date.getFullYear();
				let mymonth = date.getMonth() + 1;
				let myweekday = date.getDate();
				mymonth < 10 ? mymonth = "0" + mymonth : mymonth;
				myweekday < 10 ? myweekday = "0" + myweekday : myweekday;
				return `${myyear}-${mymonth}-${myweekday}`;
			},
		},
		components: {
			mpvueEcharts
		}
	}
</script>

<style>
	.box-item {
		margin: 20rpx;
		display: flex;
		justify-content: space-around;
		font-size: 24rpx;
		color: #FFFFFF;
		padding-bottom: 20rpx;
		text-align: center;
		line-height: 40rpx;
	}

	.box {
		width: 690rpx;
		margin-left: 30rpx;
		margin-top: 20rpx;
	}

	.ec-canvas {
		display: flex;
		height: 100%;
		flex: 1;
	}

	.canvasView {
		width: 100%;
		height: 500upx;
	}

	.item-box {
		width: 690rpx;
		min-height: 50rpx;
		margin: 20rpx auto;
		border-radius: 2px;
		background-color: #fff;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
	}

	.uni-page-body {
		color: #FFFFFF !important;
	}

	.title {
		display: flex;
		justify-content: space-between;
		line-height: 90rpx;
	}

	.item {
		width: 690rpx;
		height: 302rpx;
		background: url(http://www.callingsell.com/static/shangjiaduan/img/dpzc.png) no-repeat;
		background-size: 100% 100%;
		margin: 40rpx auto;
		padding: 0 30rpx;
		text-align: center;

		border-radius: 2px;
		background-color: #fff;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
	}

	.charts[data-v-88ee2334] {
		background-color: #fbae91;
		/* background: url(http://www.callingsell.com/static/shangjiaduan/img/bg-tjq.png); */
	}

	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.bgColor {
		position: fixed;
		top: 40px;
		left: 0;
		right: 0;
		bottom: 0;
		background: #F5F5F5;
		z-index: -1;
	}
</style>
