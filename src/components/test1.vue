<template>
	<div class="test1">
		<div class="baidu-map" id="baiduMap"></div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				position_NKYYGS: {
					bdLNG: 104.114026,
					bdLAT: 30.630106
				}
			}
		},
		props: {
			name: Object
		},
		mounted() {
			let obj = new Proxy({}, {
				get: function(target, propKey, receiver) {
					
					console.log(`getting ${propKey}!`);
					console.log(target);
					console.log(receiver);
					return Reflect.get(target, propKey, receiver);
				},
				set: function(target, propKey, value, receiver) {
					console.log(target);
					console.log(value);
					console.log(receiver);
					console.log(`setting ${propKey}!`);
					return Reflect.set(target, propKey, value, receiver);
				}
			})
			 obj.name = "张三";
			 console.log(obj.name);
			//this.initBaiduMap();
		},
		methods: {
			initBaiduMap() {
				console.log(BMapGL);
				let map = new BMapGL.Map('baiduMap');
				console.log(map);
				//console.log(map.hasOwnProperty('enableScrollWheelZoom'));
				map.enableScrollWheelZoom(true);
				map.clearOverlays();
				
				/* map.setMapStyle({
					style: 'midnight'
				})
				 */
				map.setMapStyleV2({
					styleId: "2f2664e8f1b528c346a44c24d4172733"
				});
				
				const point = new BMapGL.Point(this.position_NKYYGS.bdLNG,this.position_NKYYGS.bdLAT);
				const marker = new BMapGL.Marker(point);
				map.addOverlay(marker);
				map.centerAndZoom(point, 10)
			}
		}
	}
</script>

<style>
	.baidu-map {
		height: 500px;
	}
</style>
