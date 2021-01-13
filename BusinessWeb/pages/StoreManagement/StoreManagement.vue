<template>
	<view>
		<view class="row">
			<u-tabs :list="list" :is-scroll="false" active-color="#C02C38" :current="current" @change="change"></u-tabs>
		</view>
		<!--  -->
		<view v-show="current==0" class="item">
			<view class="form">
				<view class="form-item">
					<text class="title">店铺名称</text>
					<u-input v-model="shop_name" :border="border" :disabled="disabled" class="input" placeholder="请输入店铺名称" />
				</view>
				<view class="form-item" @click="visible = true">
					<text class="title">店铺地址</text>
					<u-input @click="visible = true" v-model="address1" :border="border" :disabled="true" class="input" placeholder="店铺地址" />
				</view>
				<view class="form-item">
					<text class="title">详细地址</text>
					<u-input v-model="address" :border="border" :disabled="disabled" class="input" placeholder="店铺详细地址" />
				</view>
				<view class="form-item" @click="go">
					<text class="title">配送范围</text>
					<u-input @click="go" v-model="radiusKM" :border="border" :disabled="true" class="input" placeholder="店铺配送范围" />
					<!-- <u-input v-model="radiusKM" :border="border" :disabled="true" class="input" placeholder="请输入店铺名称" />
					<u-slider v-model="radiusKM" step="20" min="50" max="5000"></u-slider> -->
					<!-- <slider :value="radiusKM" min="50" max="5000" @change="sliderchange" show-value /> -->
					<!-- <u-input v-model="address" :border="border" :disabled="disabled" class="input" placeholder="店铺详细地址" /> -->
				</view>
				<view class="form-item">
					<text class="title">最低消费</text>
					<u-input type="number" v-model="since_money" :border="border" :disabled="disabled" class="input" placeholder="店铺最低消费" />
				</view>
				<view class="form-item te_item">
					<text class="title">营业</text>
					<switch checked @change="switch1Change" :checked="is_open==1?true:false" />
				</view>
				<view class="form-item">
					<text class="title">联系方式</text>
					<u-input v-model="tel" :border="border" :disabled="disabled" class="input" placeholder="请输入联系方式" />
				</view>
				<view class="form-item" @click="show = true">
					<text class="title">营业时间</text>
					<u-picker mode="time" v-model="show" :params="params" @confirm="expressTemplateChange"></u-picker>
					<u-picker mode="time" v-model="showtime2" :params="params" @confirm="expressTemplateChange2"></u-picker>
					<u-input @click="show = true" v-model="time_st" :border="border" :disabled="true" class="input" />
					<!-- <view style="position: absolute;right: 20px;">
						<u-icon name="arrow-right" class="icon" size="28"></u-icon>
					</view> -->

				</view>

				<div class="bjbox" v-if="visible">
					<div class="pickerbox" @click="visible=false">
						<div class="pickertitle">
							<!-- <image @click.stop="visible=false" class="left" src="../../static/fanhui.png" alt=""></image> -->
							<div @click.stop="visible=false" class="left">取消</div>
							<div class="title">选择地区</div>
							<div @click.stop="dqclick" class="right">确认</div>
						</div>
						<picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange">
							<picker-view-column>
								<view class="pickeritem" v-for="(item,index) in province" :key="index">{{item.name}}</view>
							</picker-view-column>
							<picker-view-column>
								<view class="pickeritem" v-for="(item,index) in cityList" :key="index">{{item.name}}</view>
							</picker-view-column>
							<picker-view-column>
								<view class="pickeritem" v-for="(item,index) in areaList" :key="index">{{item.name}}</view>
							</picker-view-column>
						</picker-view>
					</div>
				</div>
				<!-- <view class="form-item fle">
					<text class="title">店铺服务</text>
					<view v-show="checked2"><span v-if="order_price_full_1!=0&&order_price_reduce_1!=0">满{{order_price_full_1}}减{{order_price_reduce_1}}</span><span
						 v-if="order_price_full_2!=0&&order_price_reduce_2!=0">、满{{order_price_full_2}}减{{order_price_reduce_2}}</span></view>
				</view> -->
				<view class="form-item">
					<text class="title">店铺介绍</text>
					<u-input v-model="announcement" :border="border" type="textarea" :disabled="disabled" height="200rpx" placeholder="请输入店铺介绍"
					 style="    height: 80px;" />
				</view>
				<view class="form-item">
					<text class="title">店铺图片</text>
					<u-upload ref="uUpload" class="upload" :file-list="fileList" :action="action" :max-count="disabled?0:3"></u-upload>
				</view>
				<!-- <view class="form-item">
					<u-cell-group>
						<u-cell-item title="参与满减功能" :arrow="false">
							<u-switch slot="right-icon" v-model="checked2" active-color="#08C260"></u-switch>
						</u-cell-item>
					</u-cell-group>
				</view>
				<view style="display: flex;justify-content: space-between;margin-top: 25rpx;">
					<view v-show="checked2">已设置：<span v-if="order_price_full_1!=0&&order_price_reduce_1!=0">满{{order_price_full_1}}减{{order_price_reduce_1}}</span><span
						 v-if="order_price_full_2!=0&&order_price_reduce_2!=0">、满{{order_price_full_2}}减{{order_price_reduce_2}}</span></view>
					<view style="	font-size: 24rpx;color: #C02C38;text-decoration: underline;" @click="showpop=true" v-show="checked2">
						去修改
					</view>
				</view> -->
				<u-mask class="popshox" :show="showpop">
					<view class="option">
						<view style="font-size: 32rpx;line-height: 40rpx;margin-top: 20rpx;"> 满减设置</view>
						<view class="option_col ">
							<view class="col ">
								满<input type="number" placeholder="自定义" v-model="order_price_full_1" />减<input type="number" placeholder="自定义"
								 v-model="order_price_reduce_1" />
							</view>
							<view class="col ">
								满<input type="number" placeholder="自定义" v-model="order_price_full_2" />减<input type="number" placeholder="自定义"
								 v-model="order_price_reduce_2" />
							</view>
						</view>
						<view style="font-size: 22rpx;color: #9A9A9A;">例：满30减2</view>
						<view style="font-size: 22rpx;color: #9A9A9A;">合理的选择或自定义满减优惠，以便吸引更多顾客</view>
						<view class="btn-row">
							<view class="btn-p" @click="showpop = false">取消</view>
							<view class="btn-p btn_scuess" @click="showpop = false">确定</view>
						</view>
					</view>
				</u-mask>

				<u-mask class="popshox" :show="showedit">
					<view class="showbox">
						<image class="shownone" src="../../static/img/gb.png" @click="showedit=false"></image>
						<image class="showtb" src="../../static/img/cg.png"></image>
						<view class="showtitle">操作成功</view>
						<view class="showtext">店铺资料已修改</view>
						<view class="showbtn" @click="showedit=false">确定</view>
					</view>
				</u-mask>
				<!-- <navigator v-show="disabled" open-type="navigate" url="./way">
					<view class="form-item fle">
						<text class="title">打印方案</text>
						<u-icon name="arrow-right" class="icon" size="28"></u-icon>
					</view>
				</navigator> -->

				<view class="btn" @click="btn">
					{{btnText}}
				</view>
			</view>
		</view>
		<view v-show="current==1">
			<view class="ShopName">
				<image :src=src style="width: 140rpx;height: 140rpx;"></image>
				<view class="content">
					<view class="Shop_name">{{shop_name}}</view>
					<view class="pf">
						<image src="http://www.callingsell.com/static/shangjiaduan/img/five.png"></image><text style="font-size: 22rpx;color: #666666;">{{score}}</text>
					</view>
					<view style="display: flex;line-height: 30rpx;">
						<!-- <view class="jd">
							<view style="width: 70%;height: 100%;background: #C02C38;z-index: 2;"></view>
						</view> -->
						<!-- <text style="font-size: 20rpx;color: #666666;">1600/3520</text> -->
					</view>
					<view style="font-size: 20rpx;color: #666666;">
					</view>

				</view>
				<!-- <view class="shopLab">金牌店铺</view> -->
			</view>
			<view class="card">
				<!-- <view class="card-top">
					<view>
						综合排序
					</view>
					<image src="http://www.callingsell.com/static/shangjiaduan/img/dow.png"></image>
				</view> -->
				<view class="card-top" :class="timestatus==2?'':'cardte'" @click="timeclick()">
					<view>
						时间排序
					</view>
					<image src="http://www.callingsell.com/static/shangjiaduan/img/dow.png"></image>
				</view>
				<view class="card-top" :class="starstatus==2?'':'cardte'" @click="starclick()">
					<view>
						五星好评
					</view>
					<image src="http://www.callingsell.com/static/shangjiaduan/img/dow.png"></image>
				</view>
			</view>

			<view class="box" v-for="(item,index) in arr">
				<view class="box-top">
					<image :src="item.user.face"></image>
					<view class="box-title">
						<view class="">
							<view class="">
								{{item.user.account}}
							</view>
							<div class="starbox">
								<image :src="item.star>=index1+1?'http://www.callingsell.com/static/shangjiaduan/img/five.png':'../../static/img/xx.png'" v-for="(item1,index1) in 5"></image>
							</div>
							<!-- <u-rate :count="count" active-color="#C02C38" disabled inactive-color="#CCCCCC" :current="item.star" v-model="item.star"></u-rate> -->
						</view>
						<view class="time">
							{{timestampToTime(item.create_time)}}{{item.star}}
						</view>
					</view>
				</view>

				<view class="pl">
					<view class="pl-content">
						{{item.contents}}
					</view>
					<view class="pl-img">
						<image :src="items" v-for="(items,indexx) in item.images"></image>
					</view>

					<view class="hf" v-if="item.reply">
						<view class="hf-title">
							商家回复
						</view>
						<view style="font-size: 22rpx; color: #343434;margin-top: 10rpx;">
							{{item.reply}}
						</view>
					</view>

					<!-- <view class="thumb">
						<view class="thumb-item">
							<u-icon name="thumb-up" color="#9A9A9A" size="40"></u-icon>
							<text>268</text>
						</view>
						<view class="thumb-item">
							<u-icon name="thumb-down" color="#9A9A9A" size="40"></u-icon>
							<text>268</text>
						</view>

					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Api from '../../api/test';
	export default {
		data() {
			return {
				list: [{
					name: '店铺设定'
				}, {
					name: '店铺资料'
				}],
				current: 0,
				form: {
					name: '',
					intro: '',
					sex: ''
				},
				show: false,
				mode: 'range',
				shop_name: '',
				address: '',
				time: '',
				tel: '',
				announcement: '',
				border: false,
				disabled: false,
				btnText: '保存编辑',
				count: 4,
				value1: 2,
				src: 'http://www.callingsell.com/static/shangjiaduan/img/Shop.png',
				score: 0,
				time_st: '',
				params: {
					hour: true,
					minute: true
				},
				comment: [{
					img: '',
					user_name: '',
					comment: "",
					comment_time: '',
					dz: '',
					cai: ''
				}],
				showpop: false,
				des: '',
				checked2: false,
				showtime2: false,
				fileList: [],
				action: 'https://www.callingsell.com/wxapp/Ele/uploadImg',
				order_price_full_1: '',
				order_price_full_2: '',
				order_price_reduce_1: '',
				order_price_reduce_2: '',
				showedit: false,
				starstatus: 2,
				timestatus: 2,
				pageIndex: 1,
				arr: [],
				visible: false,
				province: [],
				province_id: '',
				province_name: '',
				cityList: [],
				city_id: '',
				city_name: '',
				areaList: [],
				area_id: '',
				area_name: '',
				value: [18, 0, 0],
				valueid: [19, 0, 0],
				address1: '',
				radiusKM: '200',
				since_money: 0,
				lat: '',
				lng: '',
				is_open:0,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;background-color:rgba(244,248,252,1);z-index:0;`,
				userid: uni.getStorageSync('userid')
			};
		},
		methods: {
			switch1Change(e){
				console.log(e)
				this.is_open = e.detail.value?1:0
			},
			go() {
				uni.navigateTo({
					url: '/pages/mapRange/mapRange'
				});
			},
			sliderchange(e) {
				console.log(e)
				this.radiusKM = e.detail.value
			},
			dqclick() {
				this.address1 = this.province[this.value[0]].name + this.cityList[this.value[1]].name + this.areaList[this.value[2]]
					.name
				this.province_id = this.province[this.value[0]].id
				this.province_name = this.province[this.value[0]].name
				this.city_id = this.cityList[this.value[1]].id
				this.city_name = this.cityList[this.value[1]].name
				this.area_id = this.areaList[this.value[2]].id
				this.area_name = this.areaList[this.value[2]].name
				this.visible = false
			},
			bindChange(e) {
				console.log(e)
				console.log(e.detail.value)
				if (this.valueid[0] == this.province[e.detail.value[0]].id) {
					console.log(this.valueid[1])
					console.log(this.cityList[e.detail.value[1]].id)
					if (this.valueid[1] != this.cityList[e.detail.value[1]].id) {
						this.getareaList(this.cityList[e.detail.value[1]].id)
						this.valueid[1] = this.cityList[e.detail.value[1]].id
					}
				} else {
					this.getcityList(this.province[e.detail.value[0]].id)
					this.valueid[0] = this.province[e.detail.value[0]].id
				}
				this.value = e.detail.value
			},
			getAllProvinceList() {
				// 省
				let self = this;
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getAllProvinceList').then(res => {
					console.log(res);
					self.province = res.data
					self.valueid[0] = res.data[18].id
					self.getcityList(res.data[18].id)
				}).catch(err => {
					console.error('is error', err);
				})
			},
			getcityList(id) {
				// 市
				let self = this;
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getCityListByProvince?id=' + id).then(res => {
					console.log(res);
					self.cityList = res.data
					self.valueid[1] = res.data[0].id
					self.getareaList(res.data[0].id)
				}).catch(err => {
					console.error('is error', err);
				})
			},
			getareaList(id) {
				// 区
				let self = this;
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getCityListByProvince?id=' + id).then(res => {
					console.log(res);
					self.areaList = res.data
					self.valueid[2] = res.data[0].id
				}).catch(err => {
					console.error('is error', err);
				})
			},
			timeclick() {
				this.timestatus = this.timestatus == 1 ? 2 : 1
				this.pageIndex = 1
				this.arr = []
				this.getshopInfo()
			},
			starclick() {
				this.starstatus = this.starstatus == 1 ? 2 : 1
				this.pageIndex = 1
				this.arr = []
				this.getshopInfo()
			},
			btn() {
				this.editshop()
				// if (this.disabled) {
				// 	this.disabled = false
				// 	this.btnText = "保存编辑"
				// } else {
				// 	this.editshop()
				// 	// this.disabled=true
				// 	// this.btnText = "编辑店铺设定"
				// }
			},
			editshop() {
				let self = this
				let files = [];
				files = self.$refs.uUpload.lists.filter(val => {
					return val.progress == 100;
				})
				let arr = []
				for (let i = 0; i < files.length; i++) {
					arr.push(files[i] && files[i].response ? files[i].response.files[0].filename : files[i].url.split(
						'https://www.callingsell.com')[1])
				}
				console.log(self.fileList)
				console.log(files)
				console.log(arr)
				if (arr.length > 0 && self.shop_name != '' && self.address != '' && self.address1 != '' && self.announcement != '' &&
					self.tel != '' &&
					self.time_st != '') {
					let dzstr = self.province_name + self.city_name + self.area_name + self.address
					Api.posteditshopData(self.APIS + '/wxapp/EleStore/about', self.shop_name, self.address, self.tel, self.checked2 ?
						1 : 0, self.announcement, self.order_price_full_1, self.order_price_reduce_1, self.order_price_full_2, self.order_price_reduce_2,
						self.time_st, self.province_id, self.city_id, self.area_id, dzstr, self.radiusKM, self.since_money,self.is_open, arr, self.userid
					).then(res => {
						console.log(res);
						if (res.data.message == '修改成功') {
							self.showedit = true
							self.disabled = true
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								duration: 2000
							});
						}
					}).catch(err => {
						console.error('is error', err);
					})
				} else {
					uni.showToast({
						title: '请填写店铺信息',
						icon: 'none',
						duration: 2000
					});
				}
			},
			change(index) {
				this.current = index;
			},
			getshopInfo() {
				let self = this;
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getShopInfo?userid=' + self.userid + '&orderbyStar=' + self.starstatus +
					'&orderbyTime=' + self.timestatus + '&page=' + self.pageIndex).then(res => {
					console.log(res);
					self.src = res.data.shop.logo;
					self.score = res.data.shop.star;
					if (res.data.dianping && res.data.dianping.length > 0) {
						self.pageIndex = self.pageIndex + 1
						self.arr.push(...res.data.dianping)
					}
				}).catch(err => {
					console.error('is error', err);
				})
			},
			getStoreInfo() {
				let self = this;
				Api.getRequestData(self.APIS + '/wxapp/EleStore/getShopDetail?userid=' + self.userid).then(res => {
					console.log(res);
					let data = res.data[0];
					self.shop_name = data.shop_name;
					self.address = data.addr;
					self.announcement = data.intro;
					self.tel = data.mobile;
					// self.src = data.logo;
					// self.score = data.score;
					self.time_st = data.busihour;
					self.checked2 = data.is_full == 1 ? true : false
					self.order_price_full_1 = data.order_price_full_1;
					self.order_price_full_2 = data.order_price_full_2;
					self.order_price_reduce_1 = data.order_price_reduce_1;
					self.order_price_reduce_2 = data.order_price_reduce_2;
					self.province_id = data.province_id;
					self.city_id = data.city2_id;
					self.area_id = data.region_id;
					self.province_name = data.province;
					self.city_name = data.city;
					self.area_name = data.region;
					self.address1 = data.province + data.city + data.region;
					self.radiusKM = data.is_radius2 ? data.is_radius2 : 200
					self.since_money = data.since_money ? data.since_money : 0
					self.lat = data.lat
					self.lng = data.lng
					self.is_open = data.is_open
					let arr = []
					for (let i = 0; i < data.photoList.length; i++) {
						arr.push({
							url: data.photoList[i].photo
						})
					}
					self.fileList = arr
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
			expressTemplateChange: function(obj) {
				let _this = this;
				console.log(obj)
				_this.time_st = obj.hour + ':' + obj.minute;
				_this.showtime2 = true
				console.log(_this.time_st)
			},
			expressTemplateChange2: function(obj) {
				let _this = this;
				console.log(obj)
				_this.time_st += '-' + obj.hour + ':' + obj.minute;
				console.log(_this.time_st)
			}

		},
		created() {
			this.getStoreInfo();
			this.getshopInfo()
			this.getAllProvinceList()
		},
		onReachBottom() {
			console.log(111)
			if (this.pageIndex > 1) {
				this.getshopInfo()
			}
		}
	}
</script>

<style>
	.starbox {
		
	}
	.starbox image {
		width: 28rpx !important;
		height: 28rpx !important;
		margin-right: 5rpx;
	}
	.thumb-item {
		margin: 10rpx 10rpx;
	}

	.thumb {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #9A9A9A;
		display: flex;
		justify-content: flex-end;
	}

	.hf-title {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #343434;
	}

	.hf {
		width: 615rpx;
		height: 146rpx;
		background: #F5F5F5;
		border-radius: 10rpx;
		margin-top: 20rpx;
		padding: 10rpx;
	}

	.pl-img {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

	}

	.pl-img image {
		width: 160rpx;
		height: 120rpx;
		margin-top: 20rpx;
	}

	.pl-content {
		width: 100%;
		height: 70rpx;
		line-height: 35rpx;
		font-size: 24rpx;
	}

	.pl {
		width: 610rpx;
		position: relative;
		left: 80rpx;
	}

	.time {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #5C5C5C;
		line-height: 60rpx;
		margin-top: 10rpx;
	}

	.box-title {
		display: flex;
		justify-content: space-between;
		width: 80%;
		margin-left: 30rpx;
	}

	.box-top image {
		width: 60rpx;
		height: 60rpx;
	}

	.box-top {
		display: flex;
	}

	.box {
		width: 690rpx;
		/* min-height: 600rpx; */
		position: relative;
		top: 140rpx;
		left: 30rpx;
		margin-bottom: 40rpx;
	}

	.card {
		width: 690rpx;
		position: relative;
		top: 120rpx;
		left: 30rpx;
		display: flex;
		justify-content: space-around;
	}

	.card-top image {
		width: 15rpx;
		height: 10rpx;
		margin-top: 15rpx;
		margin-left: 20rpx;
	}

	.cardte image {
		transform: rotate(180deg);
	}

	.card-top {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #343434;
		line-height: 42rpx;
		display: flex;
	}

	.jd {
		width: 200rpx;
		height: 6rpx;
		background: #000000;
		opacity: 0.3;
		border-radius: 10px 10px 0px 0px;
		margin-top: 15rpx;
		margin-right: 10rpx;
	}

	.pf image {
		width: 18rpx;
		height: 18rpx;
		margin-right: 10rpx;
	}

	.Shop_name {
		width: 350rpx;

		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #343434;
		line-height: 42rpx;

		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.shopLab {
		/* width: 114rpx; */
		height: 44rpx;
		border: 1px solid #C02C38;
		border-radius: 10rpx;
		padding: 0rpx 20rpx;
		box-sizing: border-box;

		font-size: 24rpx;
		line-height: 44rpx;
		text-align: center;
		font-family: PingFang SC;
		font-weight: bold;
		color: #C02D39;
	}

	.ShopName {
		width: 690rpx;
		min-height: 165rpx;
		background: #F5F5F5;
		border-radius: 10rpx 10rpx 0px 0px;
		position: relative;
		top: 100rpx;
		/* left: 30rpx; */
		margin: 0 auto;
		display: flex;
		/* justify-content: space-between; */
		padding: 30rpx 30rpx;
	}
	.ShopName .content {
		margin-left: 20rpx;
	}

	.row {
		width: 100%;
		position: fixed;
		z-index: 9;

	}

	.form {
		padding: 40rpx 30rpx;
	}

	.fle {
		display: flex;
		justify-content: space-between;
	}

	.item {
		width: 100%;
		min-height: 1100rpx;
		background: rgba(245, 245, 245, 1);
		position: relative;
		z-index: 1;
		top: 100upx;
	}

	.input {
		width: 70%;
		float: right;
		top: 5px;
		left: -15px;
	}

	.form-item {
		width: 690rpx;
		min-height: 88rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 10rpx;
		margin-bottom: 35rpx;
		padding: 0 20rpx;
		line-height: 88rpx;
	}

	.te-item {
		padding-bottom: 30rpx;
	}

	.title {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 88rpx;

	}

	.u-list-item {
		width: 100px !important;
		height: 100px !important;
	}

	.btn {
		width: 690rpx;
		height: 98rpx;
		background: rgba(192, 44, 56, 1);
		border-radius: 49rpx;
		line-height: 98rpx;
		text-align: center;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		margin-top: 70rpx;
	}

	/* 	.u-icon {
			position: relative;
			left: 500rpx;
		}
 */
	/* 	.upload {
		width: 100px;
		height: 100px;
	} */
	.col_h {
		background: #C02C38;

		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}

	.col {
		width: 100%;
		height: 56rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		text-align: center;
		line-height: 56rpx;
		margin-bottom: 25rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
		display: flex;
	}

	.col input {
		height: 100%;
		font-size: 28rpx;
		border-bottom: 1rpx solid #666;
	}

	.option_col {
		margin: 70rpx auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.option {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		/* left: 100rpx; */
		z-index: 999;
		min-width: 550rpx;
		min-height: 500rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		text-align: center;
		padding: 30upx 20upx;
	}

	.btn-row {
		display: flex;
		justify-content: space-around;
		margin-top: 20rpx;
	}

	.btn_scuess {
		color: #FFFFFF !important;
		background: #C02C38 !important;
		border: 1rpx solid #C02C38 !important;
	}

	.btn-p {
		width: 226rpx;
		height: 69rpx;
		background: #FFFFFF;
		border: 1rpx solid #343434;
		border-radius: 10rpx;

		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #343434;
		line-height: 69rpx;
		text-align: center;
	}

	.showbox {
		width: 550upx;
		height: 627upx;
		border-radius: 10px;
		background-color: #FFFFFF;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 20upx;
	}

	.showbox .shownone {
		position: absolute;
		right: 20upx;
		top: 20upx;
		width: 50upx;
		height: 50upx;
	}

	.showbox .showtb {
		width: 125upx;
		height: 161upx;
		margin: 50upx auto;
		display: block;
	}

	.showbox .showtitle {
		text-align: center;
		font-size: 30upx;
		color: #333333;
		margin-bottom: 39upx;
	}

	.showbox .showtext {
		text-align: center;
		font-size: 28upx;
		color: #999999;
		line-height: 48upx;
		max-width: 60%;
		margin: 0 auto;
	}

	.showbox .showbtn {
		width: 430upx;
		text-align: center;
		font-size: 34upx;
		color: #FFFFFF;
		line-height: 88upx;
		border-radius: 88upx;
		margin: 0 auto;
		margin-top: 60upx;
		background-color: #C02C38;
	}

	.bjbox {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0upx;
		left: 0upx;
		background: rgba(0, 0, 0, 0.3);
		z-index: 99;
	}

	uni-picker-view {
		width: 100%;
		height: 100%;
	}

	.pickerbox {
		width: 100%;
		height: 56%;
		position: fixed !important;
		bottom: 0upx;
		left: 0upx;
		background-color: #FFFFFF;
		border-top-left-radius: 56upx;
		border-top-right-radius: 56upx;
		overflow: hidden;
	}

	.uni-picker-view-content .pickeritem {
		text-align: center;
		line-height: 114upx;
	}

	.pickertitle {
		display: flex;
		align-items: center;
		font-size: 32upx;
		color: #222939;
		line-height: 112upx;
		padding: 0upx 58upx;
		position: relative;
	}

	.pickertitle .title {
		flex: 1;
		text-align: center;
	}

	.pickertitle .left {
		position: absolute;
		left: 58upx;
		/* color: #FE5E10; */
	}

	.pickertitle .right {
		position: absolute;
		right: 58upx;
		color: #FE5E10;
	}

	picker-view-column {
		width: 600rpx;
		text-align: center;
		line-height: 55px;
	}

	picker-view {
		display: flex;
		height: 100%;
	}
	.te_item switch {
		float: right;
	}
</style>
