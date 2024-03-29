//for zoom_change
var Taipei = ol.proj.fromLonLat([121.555558, 25.072948])
var Keelung = ol.proj.fromLonLat([121.723801, 25.130247])
var Newtaipei = ol.proj.fromLonLat([121.596121, 25.010076])
var Yeeelan = ol.proj.fromLonLat([121.645922, 24.600284])
var Taoyuan = ol.proj.fromLonLat([121.280965, 24.884941])
var Xinchu_city = ol.proj.fromLonLat([120.942488, 24.787515])
var Xinchu = ol.proj.fromLonLat([121.166126, 24.670291])
var Miaoli = ol.proj.fromLonLat([120.905051, 24.498282])
var Taizhong = ol.proj.fromLonLat([120.937755, 24.225453])
var Zhanghua = ol.proj.fromLonLat([120.484475, 23.965178])
var Nantou = ol.proj.fromLonLat([120.981433, 23.811067])
var Jiayi_city = ol.proj.fromLonLat([120.444489, 23.483047])
var Jiayi = ol.proj.fromLonLat([120.508871, 23.474318])
var Yunlin = ol.proj.fromLonLat([120.395599, 23.727391])
var Tainan = ol.proj.fromLonLat([120.328989, 23.152469])
var Kaoshong = ol.proj.fromLonLat([120.605279, 22.971507])
var Ponghu = ol.proj.fromLonLat([119.618139, 23.566545])
var Jingman = ol.proj.fromLonLat([118.380078, 24.440651])
var Pingdon = ol.proj.fromLonLat([120.625981, 22.370858])
var Taidong = ol.proj.fromLonLat([121.052658, 22.845853])
var Hualian = ol.proj.fromLonLat([121.411609, 23.815980])
var LianJian = ol.proj.fromLonLat([119.953364, 26.180745])

function doPan(location) {// 橫移畫面

  view.animate({
    center: location,
    duration: 1800
  });

}

function doZoom(location) {// 放大縮小，每個縣市有最適的比例
  var Zoom;

  if (location == Xinchu_city || location == Jiayi_city){
    Zoom = 12;
  }
  else if (location == Taipei || location == Keelung || location == Jingman){
    Zoom = 11.5;
  }
  else if (location == Zhanghua){
    Zoom = 11;
  }
  else if (location == Nantou){
    Zoom = 9.9;
  }
  else if (location == Kaoshong || location == Pingdon  || location == Taidong){
    Zoom = 9.7;
  }
  else if (location == Hualian){
    Zoom = 9.3;
  }
  else {
    Zoom = 10.2;
  }
  view.animate({
    zoom: Zoom,
    duration: 1500
  });
}

function func(location) { //不讓他邊移編放大
  doPan(location);
  setTimeout(function(){doZoom(location);}, 1500);
}

//----------------------------------------------------------

// Choose City change District 戳下拉是選單，改表格
function changeCity() {

  //下拉選單長度 = 0
  $("#district option").remove(); // 清掉之前的區
  $("#district").append($("<option></option>").attr("value", "none").text("-"));
  $("#village option").remove(); // 清掉之前的里
  $("#village").append($("<option></option>").attr("value", "none").text("-"));


  var City = $('#city').val();
  //console.log(City);

  var District = data[City];
  //console.log(District);

  var Dist_len = District.length;
  //console.log(Dist_len);

  for (var i = 0; i < Dist_len; i++) {
    //塞進來摟

    var newOpt = new Option(District[i], i, true, false);
    //console.log(newOpt)

    $('#district').append(newOpt);
  }
}

//-----------------------------------------------
//clickCity

function clickCity(location){ // 直接戳地圖

  var put = [Taipei,Keelung,Newtaipei,Yeeelan,Taoyuan,Xinchu_city,Xinchu,
                Miaoli,Taizhong,Zhanghua,Nantou,Jiayi_city,Jiayi,Yunlin,
                Tainan,Kaoshong,Ponghu,Jingman,Pingdon,Taidong,Hualian,LianJian];
  var chinese = ['臺北市',"基隆市","新北市","宜蘭縣","桃園縣","新竹市","新竹縣",
                "苗栗縣","臺中市","彰化縣","南投縣","嘉義市","嘉義縣","雲林縣",
                "臺南市","高雄市","澎湖縣","金門縣","屏東縣","臺東縣","花蓮縣","連江縣"];
  for(i=0; i<22; i++){
    if (location == chinese[i]) {
      func(put[i]);
    }
  }

}

//-----------------------------------------------
//"pointermove geojson"

var select = new ol.interaction.Select({ // 滑到地圖上的時候
  condition: ol.events.condition.pointerMove,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      width: 3,
      color: '#33CCFF'
    }),
    fill: new ol.style.Fill({
      color: [215, 40, 0, 0]
    })
  })
});

if (select !== null) { // 有戳到的話
  map.addInteraction(select);
}

function add_interaction() {
  //console.log(123);
  map.addInteraction(select); // openlayers 內建的
}

//del_interaction
function del_interaction() {
  map.removeInteraction(select);
}

//----------------------------------------------------------
//"click" 戳下去地圖的時候，抄OP
var featureName;
var displayFeatureInfo = function(pixel) {

  var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
    return feature;
  });

  if (feature) {

    featureName = feature.get('name');
    // console.log(featureName);
    
    // 自己寫的 X2
    clickCity(featureName);
    loadVill(1, 1);

  }
};

map.on('singleclick', function(evt) {
  if (evt.dragging) {
    return;
  }
  //console.log(evt.originalEvent);
  var pixel = map.getEventPixel(evt.originalEvent);
  displayFeatureInfo(pixel); // openlayers 內建
});
