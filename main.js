
function getData(url){
  $("#search1").ready(function(){
    url = url + "?s=" + $('#search').val();
    $.getJSON(url, function(data){
      var sorted = data.sort(function (a, b) {
        if (a[ 'Status of aneurysm'] > b[ 'Status of aneurysm'] || a['Type of Aneurysm'] > b['Type of Aneurysm'] ) {
          return 1;
        }
        if (a[ 'Status of aneurysm'] < b[ 'Status of aneurysm'] || a['Type of Aneurysm'] > b['Type of Aneurysm']) {
          return -1;
        }
        if (a['Aneurysm 1 location'] > b['Aneurysm 1 location'] || a['Size of Aneurysm 1'] > b['Size of Aneurysm 1'] ) {
          return 1;
        }
        if (a['Aneurysm 1 location'] < b['Aneurysm 1 location'] || a['Type of Aneurysm'] > b['Size of Aneurysm 1']) {
          return -1;
        }

        return 0;
      });
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
          $("#busy").hide();
          console.log(employee_data);
        }
      });
      $('#tableid').empty();
      $('#mytable').append(employee_data);
    });
  });
}
$("#btn3").click(function() {
  document.getElementById('mytable').style.display="";
  getData("https://spark-rest-api.herokuapp.com/bm-data/");
  $("#busy").show();
});

$("document").ready(function() {
  $('#page-title').text($('#aneurysm').text());
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
  $("#start").hide();
  $("#types").hide();
  $("#LS").hide();
});

$("#aneurysm").click(function() {
  $('#page-title').text($('#aneurysm').text());
  console.log("aneurysm");
  $("#start").show();
  $("#details").hide();
  $("#types").hide();
  $("#LS").hide();
  $("#content").hide();
});


$("#de").click(function() {
  $('#page-title').text($('#de').text());
  console.log("de");
  $("#details").show();
  $("#LS").show();
  $("#start").hide();
  $("#busy").hide();
  $("#content").hide();
  $("#types").hide();
});
