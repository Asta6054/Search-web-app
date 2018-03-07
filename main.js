
function getData(url){
  $("#search1").ready(function(){
    url = url + "?s=" + $('#search').val();
    $.getJSON(url, function(data){
      var employee_data = '';
      var searchField = $('#search1').val();
      var expression = new RegExp(searchField, "i");
      console.log(searchField);
      $.each(data, function(key, value){
        if (value['Aneurysm 1 location'].search(expression) != -1 || value['Type of Aneurysm'].search(expression) != -1){
          employee_data += '<tr>';
          employee_data += '<td>'+value[ 'Status of aneurysm']+'</td>';
          employee_data += '<td>'+value['Type of Aneurysm']+'</td>';
          employee_data += '<td>'+value['Aneurysm 1 location']+'</td>';
          employee_data += '<td>'+value['Size of Aneurysm 1']+'</td>';
          employee_data += '</tr>';
          console.log(employee_data);
        }
      });
      $('#tableid').empty();
      $('#employee_table').append(employee_data);
    });
  });
}
$("#btn3").click(function() {
  document.getElementById('employee_table').style.display="";
  getData("https://spark-rest-api.herokuapp.com/bm-data/");
  document.getElementById('progressBar').style.display="";
  document.getElementById('status').style.display="";
  progressBarSim(0);

});

$("document").ready(function() {
  $('#page-title').text($('#home').text());
  $("#content").hide();
  $("#details").hide();
  $("#types").hide();
  $("#LS").hide();
});

$("#ta").click(function() {
  $('#page-title').text($('#ta').text());
  console.log("types");
  $("#content").hide();
  $("#start").hide();
  $("#details").hide();
  $("#LS").hide();
  $("#types").show();
});

$("#home").click(function() {
  $('#page-title').text($('#home').text());
  console.log("home");
  $("#content").show();
  $("#details").hide();
  $("#types").hide();
  $("#LS").hide();
});

$("#de").click(function() {
  $('#page-title').text($('#de').text());
  console.log("de");
  $("#details").show();
  $("#LS").show();
  $("#start").hide();
  $("#content").hide();
  $("#types").hide();
});
function progressBarSim(al) {
  var bar = document.getElementById('progressBar');
  var status = document.getElementById('status');
  status.innerHTML = al+"%";
  bar.value = al;
  al++;
  var sim = setTimeout("progressBarSim("+al+")",100);
  if(al == 100){
    status.innerHTML = "100%";
    bar.value = 100;
    clearTimeout(sim);
    var finalMessage = document.getElementById('finalMessage');
    finalMessage.innerHTML = "";
  }
}
var amountLoaded = 0;
progressBarSim(amountLoaded);
