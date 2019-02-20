//https://crm.spolecznosci.pl/campaings/advertisement/multi-copy

$('.form-group').toArray().forEach( (x,y) => {
	var empty = $(x).find('.select2-search-choice').children().length == 0? true: false
	if(empty){
		$(x).find('.el-delete').click()
	}
})
