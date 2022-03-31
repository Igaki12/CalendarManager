import ApiCalendar from "react-google-calendar-api";

export const getEvents = async ({eventData,createNewEventList,deleteAllGroupItem,getStartDate,getRange}) => {
  let startDate = getStartDate();
  let range = getRange();
  console.log("startDate:",startDate , "range:",range);
  let TimeMinDate = new Date(parseInt(startDate.split("-")[0]),parseInt(startDate.split("-")[1] -1),parseInt(startDate.split("-")[2]));

  console.log(ApiCalendar.gapi.auth2.getAuthInstance());
  console.log(TimeMinDate);

  return new Promise(async (resolve, reject) => {
    //2.認証チェック
    if (ApiCalendar.sign) {
      //3.イベントの取得
      let end = new Date(parseInt(startDate.split("-")[0]),parseInt(startDate.split("-")[1] -1),parseInt(startDate.split("-")[2]));
      end.setDate(parseInt(end.getDate()) + parseInt(range));
      console.log(end.toISOString());

      console.log("gapi.client.calendar", ApiCalendar.gapi.client.calendar);

      ApiCalendar.listEvents({
        timeMin: (TimeMinDate).toISOString(),
        timeMax: end.toISOString(),
        showDeleted: false,
        // added column: singleEvents orderbyをstartTimeに変更するため
        singleEvents: true,
        maxResults: 100,
        // orderBy: 'updated'
        orderBy: 'startTime',
      }).then(({ result }) => {
        if (result.items) {
          console.log("Events From Calendar", result.items);
          console.log(result.items[0].start.dateTime);
          createNewEventList(result.items);
          console.log("eventList", eventData);
          deleteAllGroupItem();
        } else {
          console.log("No Events");
        }
        resolve(result);
      });
    } else {
      console.log('ApiCalendar.sign: false')
      //2'.認証していなければOAuth認証
      ApiCalendar.handleAuthClick();
      resolve(null);
    }
  });
};
