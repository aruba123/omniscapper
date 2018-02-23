$(document).ready (function() {
    $("button").click(function(e){
        $.getJSON( "/" + (this).val(), function(response){
            $("tbody").empty();
            response.forEach(function(article) {
                var newTr = "<tr>";
                newTr += "<td>"+ article.tilte + "</td>";
                newTr += "<td>"+ article.link + "</td>";
                newTr += "</tr>";
                $("tbody").append(newTr);



            });

        });
    });

    $( "nameButton").click(function(e){
        alert ("Clicked name")


    });

});