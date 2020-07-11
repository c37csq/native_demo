const fs = require('fs')
const autoprefixer = require('autoprefixer')
const postcss = require('postcss')

fs.watch('./index.css', function(eventName) {
	fs.readFile('./index.css', function(err, css) {
		postcss([autoprefixer])
			.process(css)
			.then(result => {
                fs.writeFile('./dest.css',result.css,function(){
                    console.log(result.css);
                })
            })
	})
})
