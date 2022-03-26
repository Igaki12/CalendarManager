import { Search2Icon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import ApiCalendar from "react-google-calendar-api";
export function AppCalc({eventData,createNewEventList,deleteAllGroupItem,startDate,range}) {
  const getEvents = async () => {
    console.log("startDate:",startDate , "range:",range);
    let TimeMinDate = new Date(parseInt(startDate.split("-")[0]),parseInt(startDate.split("-")[1] -1),parseInt(startDate.split("-")[2]));

    console.log(ApiCalendar.gapi.auth2.getAuthInstance());
    console.log("sign", ApiCalendar.sign);
    console.log(TimeMinDate);

    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: "998010121576-8kql3ee1hm9pgstdaen7kcnek5pui0di.apps.googleusercontent.com", //"clientID"は個人で取得する
        discoveryDocs : ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: "https://www.googleapis.com/auth/calendar.readonly"
      }).then(() => {
        const auth = window.gapi.auth2.getAuthInstance();
        console.log("auth", auth);
      }).then(() => {
        ApiCalendar.initClient();
        console.log("window.gapi.client",window.gapi.client);
      })
    });

    return new Promise(async (resolve, reject) => {
      //2.認証チェック
      if (ApiCalendar.sign) {
        //3.イベントの取得
        let end = TimeMinDate;
        end.setDate(end.getDate() + range);
        console.log(end);

        console.log("gapi.client.calendar", ApiCalendar.gapi.client.calendar);

        ApiCalendar.listEvents({
          timeMin: (TimeMinDate).toISOString(),
          timeMax: end.toISOString(),
          showDeleted: true,
          maxResults: 10,
          orderBy: 'updated'
        }).then(({ result }) => {
          if (result.items) {
            console.log("Events From Calendar", result.items);
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
  return (
      <Button fontSize={'2xl'} ml='2' colorScheme={'teal'} mt='-1' onClick={()=> getEvents()}>
        <Search2Icon />
      </Button>
  );
}
