define([
	"dojo/_base/declare", "esri/tasks/query", "esri/tasks/QueryTask"
],
function ( declare, Query, QueryTask ) {
        "use strict";

        return declare(null, {
			eventListeners: function(t){
				t.map.on("zoom-end", function(){
					console.log(t.map.getScale())
				})
				$("#" + t.id + "selectScale").chosen({allow_single_deselect:true, width:"280px"})
					.change(function(c){
						if (c.currentTarget.selectedIndex > 0){
							// set visible layers
							t.obj.selectedScale = c.target.value;
							t.obj.visibleLayers = [ t[t.obj.selectedScale] ];
							if (t.obj.selectedScale == "USLeaseBlock"){
								t.obj.visibleLayers.push(t.USProtractionArea)
							}	
							t.dynamicLayer.setVisibleLayers(t.obj.visibleLayers);
							// hide chart and table
							$("#" + t.id + "click-wrap").slideUp();
							$("#" + t.id + "click-map").html("Click Map for Species Info");
							
							$("#" + t.id + "symByWrap").slideDown();
							$("#" + t.id + "species-wrap").slideDown();	
							t.selFtr = -1;
							if (t.obj.selectedScale == "USLeaseBlock"){
								$("#" + t.id + "zoom-to-lease").slideDown();
							}else{
								$("#" + t.id + "zoom-to-lease").slideUp();
							}
							// trigger click on symbolizeBy select if it has a value
							if (t.obj.symbolizeBy.length > 0){
								$("#" + t.id + "symbolizeBy").val(t.obj.symbolizeBy).trigger("chosen:updated").trigger("change");
							}	
						}
						//hit deselect X
						else{
							// clear visible layers
							t.obj.visibleLayers = [-1];
							t.selFtr = -1;
							console.log(t.obj.visibleLayers)
							t.dynamicLayer.setVisibleLayers(t.obj.visibleLayers);
							// reset symbolize dropdown
							$("#" + t.id + "symbolizeBy").val("").trigger("chosen:updated").trigger("change")
							// hide table and graph
							$("#" + t.id + "symByWrap").slideUp();
							$("#" + t.id + "species-wrap").slideUp();
							$("#" + t.id + "zoom-to-lease").slideUp();
						}
					});
				$("#" + t.id + "symbolizeBy").chosen({allow_single_deselect:false, width:"240px"})
					.change(function(c){
						t.obj.symbolizeBy = c.target.value;
						t.sname = $(c.currentTarget).find(":selected").text()
						t.obj.visibleLayers = [ t.symLayers[t.obj.selectedScale][t.obj.symbolizeBy] ];
						if (t.obj.selectedScale == "USLeaseBlock"){
							t.obj.visibleLayers.push(t.USProtractionArea)
						}
						if (t.selFtr > -1){
							t.obj.visibleLayers.push(t.selFtr)
						}
						t.dynamicLayer.setVisibleLayers(t.obj.visibleLayers);
						t.esriapi.rowClicked(t);
					});	
				$("#" + t.id + "dataInfo").click(function(){
					$("#" + t.id + "explain-data-wrap").slideDown();
					$("#" + t.id + "dataInfo").hide();
					$("#" + t.id + "hideDataInfo").css("display", "inline");
				})						
				$("#" + t.id + "hideDataInfo").click(function(){
					$("#" + t.id + "explain-data-wrap").slideUp();
					$("#" + t.id + "dataInfo").show();
					$("#" + t.id + "hideDataInfo").hide();
				});		
				$("#" + t.id + "tableInfo").click(function(){
					$("#" + t.id + "explain-table-wrap").slideDown();
					$("#" + t.id + "tableInfo").hide();
					$("#" + t.id + "hideTableInfo").css("display", "inline");
				})						
				$("#" + t.id + "hideTableInfo").click(function(){
					$("#" + t.id + "explain-table-wrap").slideUp();
					$("#" + t.id + "tableInfo").show();
					$("#" + t.id + "hideTableInfo").hide();
				});	
			}
        });
    }
);
