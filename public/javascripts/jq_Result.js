$(function() {
    $("#tmpl").tmpl(result).appendTo("#mainTable");
    
    for(var i = 0; i < 26; i++) {
        var opt = "<option>"+ String.fromCharCode(65+i)+"</option>";
        $("select[name=filter]").append(opt);
    }

    $("select[name=filter]").change(function() {
        $("#mainTable tbody").empty();

        if($("select[name=filter] option:selected").val() == "") $("#tmpl").tmpl(result).appendTo("#mainTable");

        var char = $("select[name=filter] option:selected").text(); 
        for(var i = 0; i < result.length; i++) {
            if(result[i]['obj1'].includes(char)) {
                $("#tmpl").tmpl(result[i]).appendTo("#mainTable tbody");
            }
        }
    });
  });