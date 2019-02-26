var fs = require("fs"),
  path = require("path"),
  papa = require("papaparse");
 

const vorpal = require('vorpal')();


function MakeCsv(fileName,label,fileResult,slogan){

  const file = fs.createReadStream(fileName);

  const name = [];
  const id = [];

  papa.parse(file, {
  worker: true, // Don't bog down the main thread if its a big file
  step: function(result) {
    id.push(result.data[0][1]);
    name.push(result.data[0][2]);
  },
  complete: function(results, file) {
    const fixName = CreatePlacement(id,name,label,slogan)
    fs.writeFile(`${fileResult}.csv`, fixName, function(err) {
      if (err) return console.log(err);
      console.log("Nazwy_placementów zrobione");
    });
  }
});

}


vorpal.command('make [numbers...]', 'Adds numbers together')
  .action(function (args, cb) {
    console.log(args.numbers)
    MakeCsv(args.numbers[0],args.numbers[1],args.numbers[2],args.numbers[3])
    //cb(undefined, sum);
  });

vorpal
  .delimiter('spolecznosci$')
  .show();


var files = [
  "Kwejk.pl_160X600_Galerie_RICH_Obrazek_Lewy",
  "Kwejk.pl_160X600_Galerie_RICH_Obrazek_Skyscraper2_Prawy",
  "Kwejk.pl_160x600_Galerie_STANDARD_Skyscraper_Lewy",
  "Kwejk.pl_160x600_Galerie_STANDARD_Skyscraper2_Prawy",
  "Kwejk.pl_160x600_Obrazki_Skyscraper",
  "Kwejk.pl_160x600_Obrazki_Skyscraper_2",
  "Kwejk.pl_160X600_RICH_Obrazek",
  "Kwejk.pl_160X600_RICH_Obrazek_Skyscraper2",
  "Kwejk.pl_160X600_RICH_SG",
  "Kwejk.pl_160X600_RICH_SG_Skyscraper2",
  "Kwejk.pl_160X600_RICH_Stronicowanie",
  "Kwejk.pl_160X600_RICH_Stronicowanie_Skyscraper2",
  "Kwejk.pl_160x600_SG_Skyscraper",
  "Kwejk.pl_160x600_SG_Skyscraper_2",
  "Kwejk.pl_160x600_Stronicowanie_Skyscraper",
  "Kwejk.pl_160x600_Stronicowanie_Skyscraper2",
  "Kwejk.pl_300X250_RICH_Galerie_Lewy",
  "Kwejk.pl_300X250_RICH_Galerie_Prawy_Rectangle2",
  "Kwejk.pl_300X250_RICH_Obrazek",
  "Kwejk.pl_300X250_RICH_Obrazek_Rectangle2",
  "Kwejk.pl_300X250_RICH_SG",
  "Kwejk.pl_300X250_RICH_SG_Rectangle2",
  "Kwejk.pl_300X250_RICH_SG_Rectangle3",
  "Kwejk.pl_300X250_RICH_SG_Rectangle4",
  "Kwejk.pl_300X250_RICH_Stronicowanie",
  "Kwejk.pl_300X250_RICH_Stronicowanie_Rectangle2",
  "Kwejk.pl_300X250_RICH_Stronicowanie_Rectangle3",
  "Kwejk.pl_300X250_RICH_Stronicowanie_Rectangle4",
  "Kwejk.pl_300X250_STANDARD_Galerie_Lewy",
  "Kwejk.pl_300X250_STANDARD_Galerie_Prawy_Rectangle2",
  "Kwejk.pl_300X250_STANDARD_Obrazki_Rectangle",
  "Kwejk.pl_300X250_STANDARD_Obrazki_Rectangle2",
  "Kwejk.pl_300X250_STANDARD_SG_Rectangle",
  "Kwejk.pl_300X250_STANDARD_SG_Rectangle_Rectangle4",
  "Kwejk.pl_300X250_STANDARD_SG_Rectangle2",
  "Kwejk.pl_300X250_STANDARD_SG_Rectangle3",
  "Kwejk.pl_300X250_STANDARD_Stronicowanie_Rectangle",
  "Kwejk.pl_300X250_STANDARD_Stronicowanie_Rectangle2",
  "Kwejk.pl_300X250_STANDARD_Stronicowanie_Rectangle3",
  "Kwejk.pl_300X250_STANDARD_Stronicowanie_Rectangle4",
  "Kwejk.pl_300X250_STANDARD_Stronicowanie_Rectangle4",
  "Kwejk.pl_300X600_RICH_Obrazek",
  "Kwejk.pl_300X600_RICH_Podstrony",
  "Kwejk.pl_300X600_RICH_ROS_Halfpage",
  "Kwejk.pl_300X600_RICH_SG",
  "Kwejk.pl_300X600_STANDARD_Obrazek",
  "Kwejk.pl_300X600_STANDARD_Podstrony",
  "Kwejk.pl_300X600_STANDARD_ROS_Halfpage",
  "Kwejk.pl_300X600_STANDARD_SG",
  "Kwejk.pl_750x200_Doublebillboard2_STANDARD_SG",
  "Kwejk.pl_750x200_Doublebillboard2_STANDARD_Stronicowanie",
  "Kwejk.pl_750x200_RICH_Galerie",
  "Kwejk.pl_750x200_RICH_Galerie_Doublebillboard2",
  "Kwejk.pl_750x200_RICH_Obrazki",
  "Kwejk.pl_750x200_RICH_SG",
  "Kwejk.pl_750x200_RICH_SG_Doublebillboard2",
  "Kwejk.pl_750x200_RICH_Stronicowanie",
  "Kwejk.pl_750x200_RICH_Stronicowanie_Doublebillboard2",
  "Kwejk.pl_750x200_STANDARD_Galerie",
  "Kwejk.pl_750x200_STANDARD_Galerie_Doublebillboard2",
  "Kwejk.pl_750x200_STANDARD_Obrazki",
  "Kwejk.pl_750x200_STANDARD_SG",
  "Kwejk.pl_750x200_STANDARD_Stronicowanie",
  "Kwejk.pl_Outstream_ROS",
  "Kwejk.pl_Preroll_Video",
  "Kwejk.pl_Screening_ROS"
];

var id = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "60",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
];


var hasService = new RegExp("\\.");
var resolutionREG = new RegExp(/^([0-9].*)(X|x)([1-8]?[0-9]?[0-9])$/);
var hasNumber = new RegExp("/d/");

var adsType = [
  "BannerMobile",
  "Rectangle",
  "Doublebillboard",
  "Outstream",
  "Skyscraper",
  "Halfpage",
  "Preroll",
  "BannerMobile",
  "Leaderboard",
  "Triplelboard",
  "Wideboard",
  "Roublebillboard"
];
var type = ["RICH", "STANDARD"];

var AdsForms = {
  banner: "Banner",
  billboard: "Billboard",
  dbb: "DoubleBillboard",
  doubebil: "DoubleBillboard",
  doublebi: "DoubleBillboard",
  doublebl: "DoubleBillboard",
  doubleil: "DoubleBillboard",
  dublebil: "DoubleBillboard",
  halfpage: "Halfpage",
  inters: "Interstitial",
  leaderboard: "Leaderboard",
  outstream: "Outstream",
  rect: "Rectangle",
  screen: "Screening",
  sky: "Skyscraper",
  sticky: "Sticky",
  triplelboard: "TripleBillboard",
  wideboard: "Wideboard",
  prerol: "Preroll"
};

var direcitions = {
  lew: "Lewy",
  praw: "Prawy",
  srod: "Srodek",
  gor: "gora",
  dol: "dol"
};

var slogans = [
  "adblock",
  "artyku",
  "desktop",
  "forum",
  "galer",
  "inne",
  "kategorie",
  "komentarze",
  "konto",
  "layer",
  "link",
  "listing",
  "logowanie",
  "mobile",
  "najnowsze",
  "obraz",
  "online",
  "paginacja",
  "pig",
  "pin",
  "poczekalnia",
  "podmenu",
  "podstron",
  "powiadomienia",
  "pozosta",
  "prebid",
  "produkt",
  "profil",
  "przejsciowka",
  "przekierowanie",
  "pw",
  "quiz",
  "ranking",
  "ros",
  "rozgrywki",
  "rtb",
  "sg",
  "spolecznosci",
  "stronaglowna",
  "stronicowanie",
  "supermem",
  "szukaj",
  "tablice",
  "tag",
  "test",
  "video",
  "watek",
  "wpis",
  "wtekscie",
  "wyszukaj",
  "wyznanie",
  "zdjecie",
  "zobaczwiecej",
  "zrodlo",
  "zszywka",
  "źródło"
];

const CreatePlacement = (id,files,newLabel,newSlogan = "") => 
files.reduce((agregator,x,iterator) => {
  const element = x.split("_").slice(1); // bez sita

  const resolution = element
    .filter(x => resolutionREG.test(x))
    .map(x => x.toUpperCase());

  const AdForma = element
    .reduce((agg, x) => {
      const arrKeys = Object.keys(AdsForms);
      const name = x
        .trim()
        .toLowerCase()
        .replace(/\d+/g, "");
      const flt = arrKeys
        .filter(x => name.indexOf(x) > -1)
        .map(x => AdsForms[x])
        .sort((a, b) => b.length - a.length)
        .slice(0, 1);
      if (flt.length > 0) {
        flt.push(x);
      }
      return agg.concat(flt);
    }, [])
    .filter((x, i, arr) => arr.indexOf(x) === i);

  const adType = element.filter(x => type.includes(x));

  const direct = element
    .reduce((agg, x) => {
      const arrKeys = Object.keys(direcitions);
      const name = x
        .trim()
        .toLowerCase()
        .replace(/\d+/g, "");
      const flt = arrKeys
        .filter(x => name.indexOf(x) > -1)
        .map(x => direcitions[x])
        .sort((a, b) => b.length - a.length)
        .slice(0, 1);
      return agg.concat(flt);
    }, [])
    .filter((x, i, arr) => arr.indexOf(x) === i);

  const slogan = element
    .reduce((agg, el) => {
      var name = el
        .trim()
        .toLowerCase()
        .replace(/\d+/g, "");
      var test = slogans.filter(flt => name.indexOf(flt) > -1);
      if (test.length > 0) {
        agg.push(el);
      }
      return agg;
    }, [])
    .sort((a, b) => b - a);


    const writeSlogan = `${slogan.length ? "_" + slogan.join("_") : ""}`
    const writeAdforma = `${AdForma.length ? "_" + AdForma[0] : ""}`
    const writeAdformaOR =  `${AdForma.length > 1 ? "_" + AdForma[1] : AdForma.length == 1 ? "_" + AdForma[0] : ""}`
    const writeDirect = `${direct.length ? "_" + direct[0] : ""}`
    const writeAdType = `${adType.length ? "_" + adType : ""}`
    const writeResolution = `${resolution.length ? "_" + resolution[0] : ""}`

    const ExistNewSlogan = newSlogan.length !== 0 ?`_${newSlogan}`:writeSlogan


  const group = `${newLabel}${ExistNewSlogan}${writeAdforma}${writeDirect}`;


  const groupNB = `${newLabel}${ExistNewSlogan}${writeAdType}${writeAdformaOR}${writeDirect}`;

  const placementNew = `${newLabel}${ExistNewSlogan}${writeResolution}${writeAdType}${writeAdformaOR}${writeDirect}`;

  const placementGroup = `${newLabel}${ExistNewSlogan}${writeResolution}${writeAdType}${writeAdforma}${writeDirect}`;

  return agregator += `${id[iterator]},${placementNew},${placementGroup},${group},${groupNB}\n`;
},"");

//console.log(CreatePlacement(id,files,"CHUJ"));
