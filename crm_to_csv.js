var table = $('tbody').eq(2).find('tr').toArray().map( (el) => ({'link':$(el).find('td').eq(4).find('a').eq(0).attr('href'),
													  'nazwa':$(el).find('td').eq(4).find('a').eq(0).text(),
													  'start':$(el).find('td').eq(5).text(),
													  'koniec':$(el).find('td').eq(6).text()
}))

function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
	var arrData = typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;
	var CSV = "";
	CSV += ReportTitle + "\r\n\n";
	if (ShowLabel) {
		var row = "";
		for (var index in arrData[0]) {
			row += index + ",";
		}
		row = row.slice(0, -1);
		CSV += row + "\r\n";
	}
	for (var i = 0; i < arrData.length; i++) {
		var row = "";
		for (var index in arrData[i]) {
			row += '"' + arrData[i][index] + '",';
		}
		row.slice(0, row.length - 1);
		CSV += row + "\r\n";
	}
	if (CSV == "") {
		alert("Invalid data");
		return;
	}
	var fileName = "MyReport_";
	fileName += ReportTitle.replace(/ /g, "_");
	var uri = "data:text/csv;charset=utf-8," + escape(CSV);
	var link = document.createElement("a");
	link.href = uri;
	link.style = "visibility:hidden";
	link.download = fileName + ".csv";
	link.click();
}

JSONToCSVConvertor(JSON.stringify(table),"DUPA2",true)
