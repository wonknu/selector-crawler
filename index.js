// http://www.lci.fr/sitemap.xml

let Crawler = require("crawler")
let url = require('url')
let config = require('./config.json')

var selector = process.argv.slice(2)[0]

let c = new Crawler({
  maxConnections : 10,
  callback : function (error, result, $) {
    if($(selector).length) {
    	console.log(result.uri)
    }
  }
})

let index = 0

let getSubSitemap = function (error, result, $) {
	$('loc').each(function(index, loc) {
		c.queue(loc.children[0].data)
  })
}

let getSitemap = function (error, result, $) {
	$('loc').each(function(index, loc) {
		c.queue({
	    uri: loc.children[0].data,
	    callback: getSubSitemap
	  })
	})
}

c.queue([{uri: config.sitemap, callback: getSitemap}]);

