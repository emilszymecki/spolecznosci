const valid = ["src","href","attr"]

const checkHttps = (valid) => {
	const validComplete = valid.reduce( (agg,el) => {
		agg.push(el)
		agg.push(`valid-${el}`)
		return agg
	},[])

	const test = $('#creations').find('.CodeMirror-lines').toArray().map( x => {
	return $(x).find('.CodeMirror-line').toArray().map( y => {
		 const attrs = $(y).find('.cm-attribute').toArray().map( attr => $(attr).text() )
		 const strs = $(y).find('.cm-string').toArray().map( attr => $(attr).text() )
		 const obj = attrs.reduce( (agg,el,i) => {
			agg[el] = strs[i]
			agg[`valid-${el}`] = strs[i].match("https") !== null
			return agg
		 },{})
		 return obj
	})
	}).flatMap(x => x ).map( obj => {
	const copy = Object.assign({}, obj)
	for(i in copy){
		!validComplete.includes(i) && delete copy[i]
	}
	return copy
}).filter( x => Object.values(x).filter( el => el == false).length && x)

	return !test.length? "Wszystko OK" : test.forEach(x => console.log(x.src,"Chujnia"))
}

checkHttps(valid)
