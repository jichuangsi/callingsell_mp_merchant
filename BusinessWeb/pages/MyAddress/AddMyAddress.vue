<template>
	<view>
		<view class="bgColor">

		</view>
		<view class="form">
			<view class="row">
				<view class="label">
					姓名：
				</view>
				<view class="text_input">
					<input type="text" placeholder="请输入收件人姓名" v-model="name" />
				</view>
			</view>

			<view class="row">
				<view class="label">
					手机号码：
				</view>
				<view class="text_input">
					<input type="number" placeholder="请输入收件人号码" v-model="phone" />
				</view>
			</view>

			<view class="row">
				<view class="label">
					所在地区：
				</view>
				<view class="text_input" @click="visible=true">
					<input type="text" placeholder="选择省/市/区" v-model="address" disabled="disabled" />
					<!-- <image src="../../static/xuanz.png" mode=""></image> -->
				</view>
			</view>
			<view class="row">
				<view class="label">
					详细地址：
				</view>
				<view class="text_input">
					<input type="text" placeholder="请输入详细地址" v-model="detailaddress" />
				</view>
			</view>
			<view class="row te">
				<view class="label">
					设为默认收货地址
				</view>
				<view class="text_input">
					<switch :checked="checked" color="#C02C38" @change="switchChange" />
				</view>
			</view>
		</view>
		<u-picker v-model="visible" mode="region" @confirm="confirm" :params="params" :default-region="['广东省', '广州市','天河区']"></u-picker>
		<view class="btn">
			<div @click="btn">保存</div>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				checked: false,
				address: '',
				name: '',
				phone: '',
				detailaddress: '',
				show: false,
				visible: false,
				btnstate: true,
				params: {
					province: true,
					city: true,
					area: true
				},
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			// console.log(JSON.parse(option.item))
			if (option.state == 1) {
				this.id = JSON.parse(option.item).id
				if (this.id != '') {
					uni.setNavigationBarTitle({
						title: '编辑地址'
					})
				}
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			confirm(e) {
				console.log(e)
				if (e.city.label == "市辖区") {
					this.address = e.province.label+e.area.label
				} else {
					this.address = e.province.label+e.city.label+e.area.label
				}
			},
			switchChange(e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
				this.checked = e.target.value
			},
			btn() {
				let self = this
				if (self.name != "" && self.phone != "" && self.address != "" && self.detailaddress != "" && self.btnstate) {
					self.btnstate = false
					if (self.id == '') {
						uni.request({
							url: this.APIS + '?s=App.Gift_Gift.AddMyShippingAddress', //仅为示例，并非真实接口地址。
							data: {
								xm: self.name,
								default: self.checked ? 1 : 0,
								province_id: self.province_id,
								city_id: self.city_id,
								area_id: self.area_id,
								province: self.province_name,
								city: self.city_name,
								area: self.area_name,
								info: self.detailaddress,
								tel: self.phone,
							},
							method: "GET",
							header: {
								token: uni.getStorageSync('token')
							},
							success: function(res) {
								console.log(res);
								self.btnstate = true
								if (res.data.data) {
									uni.showToast({
										title: '保存成功',
										duration: 2000
									});
									let pages = getCurrentPages();
									let prePage = pages[pages.length - 2];
									console.log(prePage)
									prePage.$vm.pageIndex = 1
									prePage.$vm.arr = []
									prePage.$vm.getdata()
									self.back()
								} else {
									uni.showToast({
										title: '保存失败',
										icon: 'none',
										duration: 2000
									});
								}
							},
							fail: function() {
								self.btnstate = true
								uni.showToast({
									title: '保存失败',
									icon: 'none',
									duration: 2000
								});
							}
						});
					} else {
						uni.request({
							url: this.APIS + '?s=App.Gift_Gift.UpdateMyShippingAddress', //仅为示例，并非真实接口地址。
							data: {
								id: self.id,
								xm: self.name,
								default: self.checked ? 1 : 0,
								province_id: self.province_id,
								city_id: self.city_id,
								area_id: self.area_id,
								province: self.province_name,
								city: self.city_name,
								area: self.area_name,
								info: self.detailaddress,
								tel: self.phone,
							},
							method: "GET",
							header: {
								token: uni.getStorageSync('token')
							},
							success: function(res) {
								console.log(res);
								self.btnstate = true
								if (res.data.data) {
									uni.showToast({
										title: '保存成功',
										duration: 2000
									});
									let pages = getCurrentPages();
									let prePage = pages[pages.length - 2];
									prePage.$vm.getdata()
									self.back()
								} else {
									uni.showToast({
										title: '保存失败',
										icon: 'none',
										duration: 2000
									});
								}
							},
							fail: function() {
								self.btnstate = true
								uni.showToast({
									title: '保存失败',
									icon: 'none',
									duration: 2000
								});
							}
						});
					}
				} else {
					uni.showToast({
						title: '请填写收货地址',
						icon: 'none',
						duration: 2000
					});
				}
			}
		}
	}
</script>

<style>
	.text_input input {
		flex: 1;
		padding-right: 24upx;
		font-size: 32upx;
		line-height: 45upx;
	}

	.u-cell__value {
		text-align: left !important;
	}

	.text_input {
		flex: 1;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1upx solid rgba(212, 218, 233, 1);
	}

	.text_input image {
		width: 22upx;
		height: 22upx;
	}

	.te .label {
		flex: 1;
	}

	.te .text_input {
		justify-content: flex-end;
		border-bottom: none;
	}

	.label {
		font-size: 32upx;
		line-height: 45upx;
		line-height: 100upx;
		width: 26%;
		color: #333333;
		font-weight: 600;
		/* text-align: right; */
	}

	.row {
		display: flex;
		align-items: center;
		height: 110upx;
		width: 100%;
	}

	.form {
		width: 100%;
		min-height: 550upx;
		position: relative;
		top: 35upx;
		background: #FFFFFF;
		padding: 0px 32upx;

	}

	.btn {
		width: 660upx;
		display: flex;
		justify-content: justify-content;
		position: fixed;
		bottom: 50upx;
		left: 45upx;
	}

	.btn div {
		flex: 1;
		height: 80upx;
		background: #C02C38;
		opacity: 1;
		border-radius: 47upx;
		text-align: center;
		line-height: 80upx;
		font-size: 32upx;
		color: #FFFFFF;
	}
	.btn .delbtn {
		flex: none;
		width: 200upx;
		background: #F4F8FC;
		color: rgba(254, 94, 16, 1);
	}

	.bgColor {
		position: fixed;
		top: 45px;
		left: 0;
		right: 0;
		bottom: 0;
		background: #F4F8FC;
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

	.uni-picker-view-content .item {
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
		width: 48upx;
		height: 48upx;
		position: absolute;
		left: 58upx;
		color: #C02C38;
	}

	.pickertitle .right {
		position: absolute;
		right: 58upx;
		color: #FE5E10;
	}
</style>
