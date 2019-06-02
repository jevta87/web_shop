$.ajax({
    url:"https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
    method: 'get',
    dataType: "json" 
})
.done(function(res){
    console.log(res);
})