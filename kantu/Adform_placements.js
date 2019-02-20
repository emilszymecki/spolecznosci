{
  "Name": "Adform_placements",
  "CreationDate": "2019-2-20",
  "Commands": [
    {
      "Command": "open",
      "Target": "https://www.adform.com/DirectIntegrationsUI/#/placements",
      "Value": ""
    },
    {
      "Command": "prompt",
      "Target": "\"Podaj stronkę\"",
      "Value": "site"
    },
    {
      "Command": "click",
      "Target": "/html/body/div[4]/div/div[3]/section/div/publishers-list/common-search-2/div/div/input",
      "Value": ""
    },
    {
      "Command": "type",
      "Target": "/html/body/div[4]/div/div[3]/section/div/publishers-list/common-search-2/div/div/input",
      "Value": "${site}"
    },
    {
      "Command": "click",
      "Target": "/html/body/div[4]/div/div[3]/section/div/publishers-list/ul/li/div/div[contains(text(), '${site}')]",
      "Value": ""
    },
    {
      "Command": "storeEval",
      "Target": "$('tbody').find('tr').length",
      "Value": "tableLength"
    },
    {
      "Command": "store",
      "Target": "1",
      "Value": "tableIterator"
    },
    {
      "Command": "while",
      "Target": "(${tableIterator} <= ${tableLength})",
      "Value": ""
    },
    {
      "Command": "storeText",
      "Target": "/html/body/div[4]/div/div[3]/div/div/div/div/div/div[3]/table/tbody/tr[${tableIterator}]/td[2]",
      "Value": "tableRowId"
    },
    {
      "Command": "storeText",
      "Target": "/html/body/div[4]/div/div[3]/div/div/div/div/div/div[3]/table/tbody/tr[${tableIterator}]/td[3]",
      "Value": "tableRowName"
    },
    {
      "Command": "echo",
      "Target": "${tableIterator}/${tableLength} ${tableRowId} ${tableRowName}",
      "Value": ""
    },
    {
      "Command": "store",
      "Target": "${tableIterator}",
      "Value": "!csvLine"
    },
    {
      "Command": "store",
      "Target": "${tableRowId}",
      "Value": "!csvLine"
    },
    {
      "Command": "store",
      "Target": "${tableRowName}",
      "Value": "!csvLine"
    },
    {
      "Command": "storeEval",
      "Target": "${tableIterator} +1",
      "Value": "tableIterator"
    },
    {
      "Command": "csvSave",
      "Target": "testcsv",
      "Value": ""
    },
    {
      "Command": "endWhile",
      "Target": "",
      "Value": ""
    }
  ]
}
