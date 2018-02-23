$(document).ready (function() {
    $("button").click(function(e){
        $.getJSON( "/scrape" + (this).val(), function(response){
            $("tbody").empty();


        });

    });

});


$("getItems").click(function(e){
    $.getJSON( "/" + (this).val(), function(response){
        $("tbody").empty();
        response.forEach(function(article) {
            var newTr = "<tr>";
            newTr += "<td>"+ article.title + "</td>";
            newTr += "<td>"+ article.link + "</td>";
            newTr += "</tr>";
            $("tbody").append(newTr);
        
            var newTextForm = '<form action="/ submit/' + scrapeData_id + ' " method= "post">'
            newTextForm += '< input type= "text" name="title" placeholder="Title"> '
            newTextForm+= '<textarea type="text"  name= "body"> Comments Here Please! </textarea> '
            newTextForm += '</form>'
            $("tbody").append(newTextForm);
            var newButton2 = '<button type = "button" name = "button" class = "DeleteItem" id="deleteItem'
            $("tbody").append(newButton2);


        })

        })


})

$("#deleteAll").click(function(e){

$.getJSON("deleteAll", function(){

    $("tbody").empty();

});



 $(document).on ('click' , 'deleteItem',function(e){

    var selected = $(this);
    console.log(selected);
    console.log(selected.data('id'));

    $.getJSON("/delete/" + selected.data('id'), function(){

    })

    })
   
    $(document).ready (function() {
        $("button").click(function(e){
            $.getJSON( "/" + (this).val(), function(response){
                $("tbody").empty();
                response.forEach(function(article) {
                    var newTr = "<tr>";
                    newTr += "<td>"+ article.title + "</td>";
                    newTr += "<td>"+ article.link + "</td>";
                    newTr += "</tr>";
                    $("tbody").append(newTr);
                    var newTextForm = '<form action="/ submit/' + scrapeData_id + ' " method= "post">'
                    newTextForm += '< input type= "text" name="title" placeholder="Title"> '
                    newTextForm+= '<textarea type="text"  name= "body"> Comments Here Please! </textarea> '
                    newTextForm += '</form>'
                    $("tbody").append(newTextForm);
                    var newButton2 = '<button type = "button" name = "button" class = "DeleteItem" id="deleteItem'
                    $("tbody").append(newButton2);
        
                });        
    
    

 });




});

    