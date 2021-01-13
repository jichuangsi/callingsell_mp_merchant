<template>
	<view class="addspecs">
		<view class="bgColor">
		</view>
		<view class="item">
			<view class="item_col">
				<view>规格名称</view>
				<input type="text" placeholder="请输入规格名" placeholder-class="item_input" v-model="name" />
			</view>
			<u-line color="#F5F5F5" style="width: 650rpx;margin: auto auto;" />
			<view class="item_col">
				<view>价格（元）</view>
				<input type="number" placeholder="请输入价格" placeholder-class="item_input" v-model="price" />
			</view>
			<u-line color="#F5F5F5" style="width: 650rpx;margin: auto auto;" />
			<view class="item_col">
				<view>库存</view>
				<input type="number" placeholder="设置库存数" placeholder-class="item_input" v-model="total" />
			</view>
		</view>
		<view class="btn" @click="btn">保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				price: '',
				total: '',
				index:0,
				state:1
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			// console.log(JSON.parse(option.item))
			this.state = option.state
			if(this.state == 1){
				uni.setNavigationBarTitle({
					title: '编辑规格'
				})
				let pages = getCurrentPages();
				let prePage = pages[pages.length - 2];
				let data = prePage.$vm ? prePage.$vm : prePage
				this.index=option.index
				this.name = data.arr[this.index].name
				this.price = data.arr[this.index].price
				this.total = data.arr[this.index].total
			}
		},
		methods: {
			btn() {
				if(this.name!=''&&this.price!=''&&this.total!=''){
					let pages = getCurrentPages();
					let prePage = pages[pages.length - 2];
					let pvePage = pages[pages.length - 3];
					let data = prePage.$vm ? prePage.$vm : prePage
					let datan = pvePage.$vm ? pvePage.$vm : pvePage
					if(this.state==1){
						data.arr[this.index].name=this.name
						data.arr[this.index].price=this.price
						data.arr[this.index].total=this.total
						datan.specs_arr = data.arr
					}else{
						data.arr.push({name:this.name,price:this.price,total:this.total,show:false})
						datan.specs_arr = data.arr
						console.log(datan.specs_arr)
					}
					console.log(data.arr)
					uni.navigateBack({
						delta: 1
					})
				}
			}
		}
	}
</script>

<style>
	.item_input {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #CCCCCC;
	}

	.item_col input {
		width: 60%;
		height: 80rpx;
		margin-left: 30rpx;
	}

	.item_col {
		width: 690rpx;
		min-height: 80rpx;
		margin: auto auto;
		display: flex;
		line-height: 80rpx;

		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #343434;
	}

	.item {
		width: 100%;
		min-height: 100rpx;
		background: #FFFFFF;
		margin-top: 30rpx;
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

	.bgColor {
		position: fixed;
		top: 45px;
		left: 0;
		right: 0;
		bottom: 0;
		background: #F4F8FC;
		z-index: -1;
	}
</style>
