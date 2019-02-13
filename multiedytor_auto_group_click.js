$('.panel-default').eq(6).find('.row').each( (i,el) => {
	$(el).find('.form-group').find('.col-sm-5').each((it,elm) => {
		var element = $(elm).find('select')
		if(it === 2){
			$(element).val("yes").trigger('change')
		}else{
			$(element).val("no").trigger('change')
		}
	})
})
