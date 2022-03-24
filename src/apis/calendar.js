import { Search2Icon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import ApiCalendar from "react-google-calendar-api";
export function AppCalc() {
  
  
  const getEvents = async () => {

    console.log(ApiCalendar.gapi.auth2.getAuthInstance());
    console.log("sign", ApiCalendar.sign);

    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: "998010121576-8kql3ee1hm9pgstdaen7kcnek5pui0di.apps.googleusercontent.com", //"clientID"は個人で取得する
        scope: "https://www.googleapis.com/auth/calendar.readonly"
      }).then(() => {
        const auth = window.gapi.auth2.getAuthInstance();
        console.log("auth", auth);
      }).then(() => {
        ApiCalendar.initClient();
      })
    });

    return new Promise(async (resolve, reject) => {
      //2.認証チェック
      if (ApiCalendar.sign) {
        //3.イベントの取得
        let end = new Date();
        end.setDate(end.getDate() + 10);
        console.log(end);
        ApiCalendar.listEvents({
          timeMin: (new Date()).toISOString(),
          timeMax: end.toISOString(),
          showDeleted: true,
          maxResults: 10,
          orderBy: 'updated'
        }).then(({ result }) => {
          if (result.items) {
            console.log("Events From Calendar", result.items);
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
