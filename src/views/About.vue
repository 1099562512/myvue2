<template>
  
  <div class="about">
    <el-button @click="bindMarker">标记</el-button>
    <div id="map"></div>
  </div>
</template>
<script>
import L from 'leaflet'
import 'leaflet-draw'
import "leaflet-draw/dist/leaflet.draw.css"
L.drawLocal = {
  draw: {
    toolbar: {
      actions: {
        title: '取消绘制',
        text: '取消'
      },
      finish: {
        title: '完成绘制',
        text: '完成'
      },
      undo: {
        title: '删除最后一个绘制点',
        text: '删除最后一个点'
      },
      buttons: {
        polyline: '绘制折线',
        polygon: '绘制多边形',
        rectangle: '绘制矩形',
        circle: '绘制圆',
        marker: '绘制标记点'
      }
    },
    handlers: {
      circle: {
        tooltip: {
          start: '点击并拖动鼠标绘制圆'
        },
        radius: '半径'
      },
      marker: {
        tooltip: {
          start: '点击地图放置标记点hhhhh'
        }
      },
      polygon: {
        tooltip: {
          start: '点击开始绘制多边形',
          cont: '点击继续绘制多边形',
          end: '点击起始点闭合多边形'
        }
      },
      polyline: {
        error: '<strong>错误:</strong> 绘制折线必须至少包含两个顶点。',
        tooltip: {
          start: '点击开始绘制折线',
          cont: '点击继续绘制折线',
          end: '点击最后一个点完成绘制'
        }
      },
      rectangle: {
        tooltip: {
          start: '点击并拖动鼠标绘制矩形'
        }
      },
      simpleshape: {
        tooltip: {
          end: '松开鼠标完成绘制'
        }
      }
    }
  },
  edit: {
    toolbar: {
      actions: {
        save: {
          title: '保存修改',
          text: '保存'
        },
        cancel: {
          title: '取消编辑，放弃所有修改',
          text: '取消'
        },
        clearAll: {
          title: '清除所有图形',
          text: '清除所有'
        }
      },
      buttons: {
        edit: '编辑图形',
        editDisabled: '没有可编辑的图形',
        remove: '删除图形',
        removeDisabled: '没有可删除的图形'
      }
    },
    handlers: {
      edit: {
        tooltip: {
          text: '拖动控制点或标记点以编辑图形',
          subtext: '点击取消以撤销修改'
        }
      },
      remove: {
        tooltip: {
          text: '点击一个图形以删除'
        }
      }
    }
  }
};
	export default {
    data() {
      return {
        map: null,
        drawControl: null,
        drawObj: null
      }
    },
		mounted() {
      const layer = L.tileLayer(
        "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}"
      );
      this.map = L.map('map', {
        center: [24.490143, 118.036644], //中心坐标
        zoom: 12, //缩放级别
        zoomControl: false, //缩放组件
        attributionControl: false, //去掉右下角logol
        layers: [layer], //图层
      })
     
      //创建绘图图层
      let editableLayers = new L.FeatureGroup().addTo(this.map);
      console.log(L.drawLocal);

      this.drawControl = new L.Control.Draw({
        draw: {
          marker: {
            
          }
        },
        edit: {
          featureGroup: editableLayers
        }
      })
     // map.addControl(drawControl)
      /* let drawObj = null
      drawObj = new L.Draw.Marker(map, ) */

      this.map.on(L.Draw.Event.CREATED, function (e) {
        var layer = e.layer;
        editableLayers.addLayer(layer);
        // var latlngs = e.layer._latlngs   // arr [lat,lng] 一组经纬度，每个点都有
        // console.log(latlngs)
        // var type = e.layerType,
        //     layer = e.layer;
        // if (type === 'marker') {
        //     layer.bindPopup('A popup!');
        // }
        // editableLayers.addLayer(layer);
        // map.addLayer(editableLayers)
      });

      function customProp() {
         /* L.drawLocal.draw.toolbar.buttons.polyline = '折线';
        L.drawLocal.draw.toolbar.buttons.polygon = '多边形';
        L.drawLocal.draw.handlers.circle.tooltip.start = '点击并拖动以绘制自定义圆';
        L.drawLocal.edit.handlers.edit.tooltip.text = '拖动控制点或标记以自定义编辑要素'; */
      }
		},
    methods: {
      bindMarker() {
        this.drawObj = new L.Draw.Marker(this.map, this.drawControl.options.draw.marker)
        console.log(this.drawObj);
        this.drawObj.enable()
      }
    },
	}
</script>

<style>
#map {
  height: 600px;
}
</style>
