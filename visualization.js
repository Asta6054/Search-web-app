// Java script for Visualization.html
$(document).ready(function(){
  $("#busy").hide();
  let hospChkd = '';
  $("#bm-chk").click(function() {
    hospChkd = 'bm-data';
    $("#busy").show();
    fillData(hospChkd);
    console.log("dm");
  });
  $("#dmc-chk").click(function() {
    hospChkd = 'dmc-data';
    $("#busy").show();
    fillData(hospChkd);
    console.log("dm");
  });
  $("#hf-chk").click(function() {
    hospChkd = 'hf-data';
    $("#busy").show();
    fillData(hospChkd);
    console.log("dm");
  });

  function fillData(hospChkd){
    $("#lChart").hide();
    $("#lChart1").hide();
    var couter=0;
    var healthrecords=[];
    $.getJSON("https://spark-rest-api.herokuapp.com/"+hospChkd, function(result){
      $.each(result, function(i, field){
        var rec={"Status":field["Status of aneurysm"],"Type":field["Type of Aneurysm"],"Location":field["Aneurysm 1 location"]}
        healthrecords[i]=rec
        couter=couter+1;
        $("#busy").hide();
        $("#lChart").show();
        $("#lChart1").show();
      });

      // Ruptured filters
      var Unrup_healthrecords = []
      var rup_healthrecords=[]
      // Location graph
      // 5 loations
      var Location_MCA=[]
      var Location_ICA=[]
      //Anterior Communicating Artery
      var Location_Ant=[]
      //Vertebral Artery
      var Location_Vert=[]
      //Carotid
      var Location_Car=[]
      // Regular expressions
      var reg_ICA=new RegExp("ICA");
      var reg_MCA=new RegExp("MCA");
      var reg_car=new RegExp("Carotid");
      var reg_ant=new RegExp("Anterior");
      var reg_vert=new RegExp("Vertebral");

      for(var i = 0; i < healthrecords.length; i++){
        if(healthrecords[i].Status=="Un-Ruptured"){
          Unrup_healthrecords.push(healthrecords[i]);
          if(reg_ICA.test(healthrecords[i].Location)){
            Location_ICA.push(healthrecords[i]);
          }
          else if(reg_MCA.test(healthrecords[i].Location)){
            Location_MCA.push(healthrecords[i]);
          }
          else if(reg_ant.test(healthrecords[i].Location)){
            Location_Ant.push(healthrecords[i]);
          }
          else if(reg_car.test(healthrecords[i].Location)){
            Location_Car.push(healthrecords[i]);
          }
          else if(reg_vert.test(healthrecords[i].Location)){
            Location_Vert.push(healthrecords[i]);
          }
        }
        else{
          rup_healthrecords.push(healthrecords[i]);
        }
      }
      console.log(healthrecords);
      console.log(Unrup_healthrecords.length,rup_healthrecords.length,healthrecords.length)
      //Ruptured vs un ruptured
      const CHART=document.getElementById("lChart");
      let lineChart=new Chart(CHART,{
        type:'bar',
        data: {
          labels: ["Un-Ruptured","Ruptured"],
          datasets: [{
            label: 'Status of Aneurysm',
            fill: true,
            backgroundColor:["#ff6384","#36a2eb"],
            data: [Unrup_healthrecords.length,rup_healthrecords.length]
          }]
        }
      });

      const CHART1=document.getElementById("lChart1");
      let lineChart1=new Chart(CHART1,{
        type:'bar',
        data: {
          labels: ["Artery","Carotid ","ICA","MCA","Vertebral"],
          datasets: [{
            label: 'Locations of Aneurysm',
            fill: true,
            responsive: false,
            width:100,
            height:100,
            backgroundColor:["#e8bab3","#b295c8","#e9a23b","#008080","#243065"],
            data: [Location_Ant.length,Location_Car.length,Location_ICA.length,Location_MCA.length,Location_Vert.length]
          }]
        }
      });
      console.log(healthrecords);
    });
  }
});
