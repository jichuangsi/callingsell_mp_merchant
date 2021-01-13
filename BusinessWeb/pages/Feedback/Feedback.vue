<template>
	<view class="Feedback">
		<view class="nav">
			<view class="navtitle">反馈问题类型</view>
			<view class="navli" :class="{'checkli':index==1}" @click="index=1">功能异常</view>
			<view class="navli" :class="{'checkli':index==2}" @click="index=2">体验问题</view>
			<view class="navli" :class="{'checkli':index==3}" @click="index=3">功能建议</view>
			<view class="navli" :class="{'checkli':index==4}" @click="index=4">其他问题</view>
		</view>
		<view class="center">
			<view class="box">
				<textarea value="" placeholder="请输入反馈意见" maxlength="200" v-model="desc" />
				<view class="state">{{desc.length}}/200</view>
				<u-upload ref="uUpload" :action="action" max-count="1" class="upload"></u-upload>
			</view>
		</view>
		<view class="btn" @click="btn">
			提交
		</view>
		<u-mask class="popshox" :show="show">
			<view class="showbox">
				<image class="shownone" src="../../static/img/gb.png" @click="show=false"></image>
				<image class="showtb" src="../../static/img/cg.png"></image>
				<view class="showtitle">反馈成功</view>
				<view class="showtext">我们已经收到您的反馈 将会尽快处理</view>
				<view class="showbtn" @click="show=false">我知道了</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import Api from '../../api/test';
	export default {
		data() {
			return {
				index:1,
				desc:'',
				show:false,
				action: 'http://www.callingsell.com/wxapp/Ele/uploadImg',
				userid: uni.getStorageSync('userid')
			}
		},
		methods: {
			btn(){
				let self = this
				if(self.desc!=''){
					let files = [];
					// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
					files = self.$refs.uUpload.lists.filter(val => {
						return val.progress == 100;
					})
					let f1 = files[0]&&files[0].response?files[0].response.files[0].filename:''
					console.log(this.$refs.uUpload)
					Api.getRequestData(self.APIS + '/wxapp/EleStore/addFeedBack?userid='+self.userid+'&detail='+'反馈'+'&cate_id='+self.index+'&image=' + f1).then(res => {
						console.log(res)
						if(res.data.message=='提交成功'){
							self.show = true
							self.desc = ''
							self.$refs.uUpload.remove(0)
						}else{
						uni.showToast({
							title: '反馈失败',
							icon: 'none',
							duration: 2000
						});
						}
					})
				}else{
						uni.showToast({
							title: '请填写信息',
							icon: 'none',
							duration: 2000
						});
				}
			}
		}
	}
</script>

<style>
	.Feedback{
		width: 100%;
		height: 100%;
		background: #F4F8FC;
	}
	.nav {
		width: 100%;
		padding: 32upx;
		background-color: #FFFFFF;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.nav .navtitle {
		width: 100%;
		font-size: 34upx;
	}
	.nav .navli {
		padding: 10upx 20upx;
		border: 1upx solid #CCCCCC;
		border-radius: 40upx;
		line-height: 40upx;
		font-size: 28upx;
		margin-top: 20upx;
		margin-bottom: 20upx;
	}
	.nav .checkli{
		color: #FFFFFF;
		background-color: #C02C38;
		border-color: #C02C38;
	}
	.center {
		padding: 32upx;
	}
	.box {
		padding: 10upx;
		background-color: #FFFFFF;
	}
	.state {
		text-align: right;
		margin: 20upx 0upx;
	}
	.btn {
		width: 90%;
		line-height: 96upx;
		font-size: 36upx;
		color: #FFFFFF;
		background-color: #C02C38;
		text-align: center;
		border-radius: 96upx;
		margin: 0 auto;
		margin-top: 60upx;
	}
	.showbox {
		width: 550upx;
		height: 627upx;
		border-radius: 10px;
		background-color: #FFFFFF;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
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
</style>
