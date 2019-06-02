var template = $("#template").html();
var title = new RegExp("{{title}}", "g");
var collection = $("[data-collection]");
var mainRow = $("#mainRow");
collection.on('click', displayCollections);
display();
$(".back-to-top").click(function () {
    $("body, html").animate({
        scrollTop: 0
    }, 500);
});

function display() {
    $.ajax({
            url: "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
            method: 'get',
            dataType: "json"
        })
        .done(function (res) {
            console.log(res);
            var text = "";
            res.forEach(function (e) {
                text = template.replace("{{imgSrc}}", e.imgSrc)
                    .replace(title, e.productTitle)
                    .replace("{{model}}", e.model)
                    .replace("{{price}}", e.price)
                mainRow.append(text);
            })
        })
}

function displayCollections(e) {
    e.preventDefault();
    mainRow.html("");
    var col = $(this).data('collection');  
    $.ajax({
        url: "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
        method: 'get',
        dataType: "json"
    })
    .done(function (res) {
        if(col === 'male' || col === 'female') {
            var colFilter = res.filter(function(el){
                return el.colection === col;
            })
            var text = "";
            colFilter.forEach(function (e) {
                text = template.replace("{{imgSrc}}", e.imgSrc)
                    .replace(title, e.productTitle)
                    .replace("{{model}}", e.model)
                    .replace("{{price}}", e.price)
                mainRow.append(text);
            })
        } else if(col === 'newCol' || col === 'popular' || col === "action"){
            var colFilter = res.filter(function(el){
                return el[col];
            })
            var text = "";
            colFilter.forEach(function (e) {
                text = template.replace("{{imgSrc}}", e.imgSrc)
                    .replace(title, e.productTitle)
                    .replace("{{model}}", e.model)
                    .replace("{{price}}", e.price)
                mainRow.append(text);
            })
        }
       
    })
    
}