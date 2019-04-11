$('.mb-0').toArray().forEach( x => {
  if($(x).text().startsWith('Rectangle'))
  $(x).click()
})

$( "input[id$='-sizes']:visible" ).val("[[300,250],[320,100],[320,50],[300,100],[300,50],[250,250]]").trigger("change")
$( "input[id$='iframe_w']:visible" ).val("300").trigger("change")
$( "input[id$='iframe_h']:visible" ).val("250").trigger("change")
