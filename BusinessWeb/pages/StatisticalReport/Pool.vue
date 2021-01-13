<template>
	<view>
		<view class="">
			<u-tabs name="cate_name" :list="list" active-color="#C02D39" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</view>
		<view class="item">
			<view class="table">
				<view class="th">
					日期
				</view>
				<view class="th">
					收入
				</view>
				<view class="th">
					订单数
				</view>
			</view>
		</view>
		<view class="tr" v-if="current==0" v-for="(item,index) in day_arr">
			<view class="td">{{item[0].date}}</view>
			<view class="td" style="color: #2FAB1B;">+{{item[0].totalPrice}}元</view>
			<view class="td">{{item[0].count}}</view>
		</view>
		<view class="tr" v-if="current==1" v-for="(item,index) in month_arr">
			<view class="td">{{item[0].date}}</view>
			<view class="td" style="color: #2FAB1B;">+{{item[0].totalPrice}}元</view>
			<view class="td">{{item[0].count}}</view>
		</view>
		<view class="tr" v-if="current==2" v-for="(item,index) in mou_arr">
			<view class="td">{{item[0].date}}</view>
			<view class="td" style="color: #2FAB1B;">+{{item[0].totalPrice}}元</view>
			<view class="td">{{item[0].count}}</view>
		</view>
		<u-picker mode="time" v-model="show" :params="params" @confirm="confirm"></u-picker>
	</view>
</template>

<script>
	import Api from '../../api/test';
	export default {
		data() {
			return {
				list: [{
					cate_name: '日总汇'
				}, {
					cate_name: '月总汇'
				}, {
					cate_name: '2020-07'
				}],
				current: 0,
				startdate: '',
				enddate: '',
				day_arr: [],
				month_arr: [],
				show: false,
				params: {
					year: true,
					month: true,
					day: false,
					hour: false,
					minute: false,
					second: false
				},
				mou_arr:[],
				userid:uni.getStorageSync('userid')
			}
		},
		mounted() {
			this.setDate()
		},
		methods: {
			confirm(e) {
				console.log(e)
				let startdate = e.year + '-' + e.month + '-' + '01'
				let enddate = e.year + '-' + e.month + '-' + this.getLastDayOfMonth(e.year, e.month)
				this.list[2].cate_name = e.year + '-' + e.month
				this.getmouday(startdate,enddate)
			},
			change(index) {
				this.current = index;
				if (this.current == 2) {
					this.show = true
				}
			},
			getmouday(startdate,enddate) {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getCollectionSummary?userid='+self.userid+'&start_Time=' + startdate +
					'&end_Time=' + enddate + '&status=0').then(res => {
					console.log(res);
					self.mou_arr = res.data
				}).catch(err => {
					console.error('is error', err);
				})
			},
			getdata() {
				let self = this
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getCollectionSummary?userid='+self.userid+'&start_Time=' + self.startdate +
					'&end_Time=' + self.enddate + '&status=0').then(res => {
					console.log(res);
					self.day_arr = res.data
				}).catch(err => {
					console.error('is error', err);
				})
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getCollectionSummary?userid='+self.userid+'&start_Time=' + self.startdate +
					'&end_Time=' + self.enddate + '&status=1').then(res => {
					console.log(res);
					self.month_arr = res.data
				}).catch(err => {
					console.error('is error', err);
				})
			},
			setDate() {
				let curDate = new Date();
				let y = curDate.getFullYear();
				let m = curDate.getMonth() + 1; //本身就得+1才等于当前月份，然而我要计算下一个月，所以直接+2
				if (m > 12) {
					m = 1;
					y++
				}
				let monthLastDay = new Date(y, m, 0).getDate();
				this.startdate = y + '-' + (m < 10 ? '0' + m : m) + '-' + '01';
				this.enddate = y + '-' + (m < 10 ? '0' + m : m) + '-' + (monthLastDay < 10 ? '0' + monthLastDay : monthLastDay);
				this.getdata()
			},
			getLastDayOfMonth(year, month) {
				//获取本年本月的第一天日期
				var date = new Date(year, month - 1, '01');
				//设置日期
				date.setDate(1);
				//设置月份
				date.setMonth(date.getMonth() + 1);
				//获取本月的最后一天
				let cdate = new Date(date.getTime() - 1000 * 60 * 60 * 24);
				//打印某年某月的最后一天
				// alert(cdate.getFullYear() + "年" + (Number(cdate.getMonth()) + 1) + "月最后一天的日期:" + cdate.getDate() + "日");
				//返回结果
				return cdate.getDate();
			}
		}
	}
</script>

<style>
	.td {
		flex: 1;
		text-align: center;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #343434;
	}

	.tr {
		width: 100%;
		min-height: 100rpx;
		display: flex;
		justify-content: space-around;

	}

	.th {
		flex: 1;
		text-align: center;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #9A9A9A;
	}

	.table {
		width: 100%;
		min-height: 100rpx;
		display: flex;
		justify-content: space-around;
		margin-top: 60rpx;
	}
</style>
