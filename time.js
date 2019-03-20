//FUNZIONE PER OTTENERE IL MESE CORRENTE
function getMonth (month) {
  var mom = moment();
  mom.month(month);
  var monthName = mom.format("MMMM");
  return monthName;
}
//FUNZIONE PER SAPERE QUANTI GIORNI CI SONO NEL MESE
function getMonthDaysCount (year, month) {
  var mom = moment();
  mom.month(month);
  mom.year(year);
  var daysCount = mom.daysInMonth(month);
  return daysCount;
}
//FUNZIONE PER OTTTENERE UNA DATA IN FORMATO AMERICANO
function getMachineDate (year, month, day) {
  var mom = moment();
  mom.year(year);
  mom.month(month);
  mom.date(day);

  var date = mom.format("YYYY-MM-DD");
  return date;
}
//FUNZIONE PER STAMPARE MESE E GIORNI TOTALI PRESENTI IN ESSO
function printTitle (year , month) {
  var monthName = $("#month-name");
  monthName.text(getMonth(month) + ": 1 - " + getMonthDaysCount(month));
}
//FUNZIONE PER STAMPARE I GIORNI DEL MESE IN CORSO
function printDays (year, month) {
  var daysCount = getMonthDaysCount (year, month);
  var daysList = $("#days-list");
  var template = $("#date-template").html();
  var compiled = Handlebars.compile(template);

  var mom = moment();
  mom.year(year);
  mom.month(month);

  for (var day = 1; day <= daysCount; day++) {
    mom.date(day);
    var dateMoment = mom.format("DD MMMM YY")
    var data = {
      machineDate: getMachineDate(year, month, day),
      date: (dateMoment),
    }
    var liDate = compiled(data);
    daysList.append(liDate);
  }
}
//FUNZIONE PER CAMBIARE IL COLORE DEI GIORNI FESTIVI
function printHolidays (year, month) {
  $.ajax({
    url: "https://flynn.boolean.careers/exercises/api/holidays",
    method: "GET",
    data: {
      year: year,
      month: month
    },
    success: function (inData,state){
      if (inData.success==true) {
        var holidays = inData.response;
        addHolidays(holidays);
        // console.log(holidays);
      }
    },
    error: function (request, state, error){
      console.log("request",request);
      console.log("state",state);
      console.log("error", error);
    }

  });

}
//FUNZIONE PER CAPIRE QUALI SONO I GIORNI FESTIVI
function addHolidays(holidays) {
  for (var i = 0; i < holidays.length; i++) {
    var holiday = holidays[i];
    // console.log(holiday)
    var holidayMachineDate = holiday.date;
    var holidayName = holiday.name;
    var selector = "li[ data-date='" + holidayMachineDate + "']"
    var liHoliday = $(selector);
    console.log(selector);
    liHoliday.addClass("holiday");
  }
}







function init() {
  var year = 2018;
  var month = 0; //gen --> 0 , dic --> 11

  printTitle (year, month);
  printDays (year, month);
  printHolidays (year, month);
}

$(document).ready(init);
