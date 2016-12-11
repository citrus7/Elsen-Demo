"use strict";angular.module("elsenApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","smart-table","ngPapaParse"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).otherwise({redirectTo:"/"})}]),angular.module("elsenApp").controller("MainCtrl",["$scope","$filter","DataService",function(a,b,c){function d(){c.loadData().then(function(b){a.dataMap=b,a.dataArray=$.map(b,function(a,b){return{identifier:b,startDate:a[0],endDate:a[1],count:a[2]}})})}function e(a,b){Highcharts.stockChart("chartContainer",{rangeSelector:{selected:1},title:{text:a},series:[{name:a,data:b,tooltip:{valueDecimals:2}}]})}a.users=[],a.editRow="",a.dataMap={},a.dataArray=[],a.idSelectedRow=null,d(),a.setSelected=function(b){a.idSelectedRow=b,console.log(a.dataMap[b][3]),e(b,a.dataMap[b][3])}}]),angular.module("elsenApp").factory("DataService",["$q","Papa",function(a,b){function c(){var c=a.defer(),d={},e=!1;return b.parse("https://citrus7.github.io/Elsen-Demo/demo/timeseries.csv",{download:!0,worker:!0,step:function(a){if(e===!1)e=!0;else if(d.hasOwnProperty(a.data[0][0])){var b=[Date.parse(a.data[0][1]),parseFloat(a.data[0][2])];d[a.data[0][0]][3].push(b),d[a.data[0][0]][2]+=1,Date.parse(a.data[0][1])<Date.parse(d[a.data[0][0]][0])&&(d[a.data[0][0]][0]=a.data[0][1]),Date.parse(a.data[0][1])>Date.parse(d[a.data[0][0]][1])&&(d[a.data[0][0]][1]=a.data[0][1])}else{var b=[Date.parse(a.data[0][1]),parseFloat(a.data[0][2])];d[a.data[0][0]]=[a.data[0][1],a.data[0][1],1,[b]]}},complete:function(){console.log("All done!"),console.log(d),c.resolve(d)}}),c.promise}return console.log("data service started"),{loadData:c}}]),angular.module("ngPapaParse",[]),function(){angular.module("ngPapaParse").factory("Papa",function(){if("undefined"==typeof Papa)throw new Error("angular-PapaParse's JavaScript requires PapaParse");return Papa})}.call(this),angular.module("elsenApp").run(["$templateCache",function(a){a.put("views/main.html",'<div class="panel panel-default panel-custom"> <div class="panel-heading"> <h3 class="panel-title"><b>Elsen Demo</b></h3> </div> <div class="panel-body"> <div id="chartContainer" style="width:100%; height:400px"></div> <table st-table="displayedData" st-safe-src="dataArray" class="table table-striped"> <thead> <tr> <th colspan="5"><input st-search="" class="form-control" placeholder="Search..." type="text"></th> </tr> <tr> <th st-sort="identifier">Identifier</th> <th st-sort="startDate">Earliest</th> <th st-sort="endDate">Latest</th> <th st-sort="count">Points</th> </tr> </thead> <tbody> <tr ng-click="setSelected(row.identifier)" ng-class="{danger: row.identifier === idSelectedRow}" ng-repeat="row in displayedData"> <td>{{row.identifier}}</td> <td>{{row.startDate}}</td> <td>{{row.endDate}}</td> <td>{{row.count}}</td> </tr> </tbody> <tfoot> <tr> <td colspan="5" class="text-center"> <div st-pagination="" st-items-by-page="15" st-displayed-pages="7"></div> </td> </tr> </tfoot> </table> </div> </div>')}]);