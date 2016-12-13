nunjucks.configure({
    autoescape: false,  
    web: {
      async: false 
    }
});

$(document).ready(function() {
	
	$.getJSON( "./mock/article.json", function(data) {
		for (item in data.articles) {
					nunjucks.render('./article.html', data.articles[item], function (err, res) {
          			$('.js-articles').append(res);
        		});
      	}
	}); 
	
});