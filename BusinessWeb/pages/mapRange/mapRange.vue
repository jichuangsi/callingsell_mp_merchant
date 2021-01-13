<template>
	<view class="mapRange">
		<map id="map" :longitude="longitude" :latitude="latitude" :circles="circle" :scale="13" show-location></map>
		<div class="changbox"><text>调节距离</text><slider :value="radiusKM" min="200" max="5000" @change="sliderchange" activeColor="#C02C38"/><text>{{radiusKM}}m</text></div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude: 23.12586,
				longitude: 113.24428,
				radiusKM:200,
				circle: [{
					latitude: 23.12586,
					longitude: 113.24428,
					color: '#4ca2d5',
					fillColor: '#7cb5ec88',
					radius: 200,
					strokeWidth: 1
				}]
			}
		},
		mounted() {
			let pages = getCurrentPages();
			let prePage = pages[pages.length - 2];
			let data = prePage.$vm ? prePage.$vm : prePage
			if(data.lat){
				this.latitude = data.lat
				this.longitude = data.lng
				this.radiusKM = data.radiusKM
				this.circle= [{
					latitude: data.lat,
					longitude: data.lng,
					color: '#4ca2d5',
					fillColor: '#7cb5ec88',
					radius: Number(data.radiusKM),
					strokeWidth: 1
				}]
			}
		},
		methods: {
			sliderchange(e) {
				console.log(e)
				this.radiusKM = e.detail.value
				console.log(this.circle)
				let pages = getCurrentPages();
				let prePage = pages[pages.length - 2];
				let data = prePage.$vm ? prePage.$vm : prePage
				data.radiusKM=this.radiusKM
				this.circle = [{
					latitude: data.lat,
					longitude: data.lng,
					color: '#4ca2d5',
					fillColor: '#7cb5ec88',
					radius: Number(this.radiusKM),
					strokeWidth: 1
				}]
			},
		}
	}
</script>

<style>
	#map {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0rpx;
		left: 0rpx;
	}
	.changbox {
		width: 690rpx;
		height: 90rpx;
		background-color: rgba(0,0,0,0.3);
		margin: 0 auto;
		position: fixed;
		bottom: 10vh;
		left: 50%;
		color: #FFFFFF;
		border-radius: 45rpx;
		display: flex;
		align-items: center;
		padding: 0rpx 20rpx;
		transform: translateX(-50%);
	}
	slider {
		flex: 1;
		margin-left: 40rpx;
		margin-right: 40rpx;
	}
</style>
