# 前端期末報告 ── 2018 公投結果

## 主題簡介
我的期末報告主題是2018公投結果，由於我國2018的公投結果和2016年美國總統選舉一樣，最終的結果和主流媒體及各大民調社所預測的結果大相逕庭，在經過老師教導介接資料後，我就想以這個主題作為我的前端報告。本次報告主要內容有：介接資料庫(包含行政區域及公投結果)、套用Openlayers的地圖模板、決定地圖視覺化不同比例對應到的色階、針對使用者的查詢互動出正確的資料。

## 使用方法
我的網站主要提供兩種呈現模式：   
 1. 地圖上呈現特定縣市各村里的支持比例：越深紅為反對、越深綠為同意。   
  * 該模式可以直接點選地圖上的縣市
  * 可以平移、縮放地圖
 2. 使用者點選下拉式表單，選取特定縣市(可詳細到村里，也可不選)以及欲搜尋之特定公投案，表格會即時呈現對應的詳細數據。

## 參考函式庫
 1. Openlayers:  地圖架設參考來源
 2. Semantic UI: 表格版面及其他的設計來源
 3. MDL:         介面美化
 4. jQuery:      使用者互動情境的控制

## 專案架構   
<pre>
Final_Project   
      |──── semantic    
      |──── css   
      |      |──── index.css    
      |   
      |──── js    
      |   　 |
      |   　 |──── request        (JS Group 1)
      |   　 |──── district_data   
      |   　 |
      |   　 |──── index          (JS Group 2)
      |   　 |──── draw    
      |   　 |──── callDraw    
      |   　 |──── paint   
      |   　 |
      |   　 |──── table          (JS Group 3)
      |   　 |──── vill    
      |   　 |──── condition   
      |   　 |   
      |   　 |──── changeCity.js  (JS Group 4) 
      |   
      |──── index.html    
</pre>

## 程式(技術)
 1. html
    - index.html: 建構網頁呈現的基本架構
 2. css
    - index.css:  美化網頁的排版
 3. js
    - JS Group 1 ﹝BASIC﹞
<pre>
      - request.js: 介接所有資料(地圖、各公投案)
          functions:
            ● loadVill: 地圖
            ● seven ~ sixteen: 公投案
      - district_data.js: 記錄所有鄉鎮市區的資料(Array)
          var:
            ● data
</pre>
    - JS Group 2  ﹝MAP﹞
<pre>
      - index.js: 設定好地圖 (參考Openlayers)
         var:
            ● 框架：View、Raster、Vector、vectorSource
            ● 圖層：villLayer、my_layer1、my_layer2
            ● 架設：map

      - Draw.js: 設定地圖呈現的色階
          function:
            ● getStyle7 ~ getStyle16

      - callDraw.js: 決定圖層上甚麼公投的顏色
          var:
            ● drawCheck1、drawCheck2
          function:
            ● callDraw1、callDraw2
</pre>  
