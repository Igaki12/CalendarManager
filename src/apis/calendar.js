import { Search2Icon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import ApiCalendar from "../../node_modules/react-google-calendar-api/src/ApiCalendar";
export function AppCalc() {
  console.log(ApiCalendar.sign);
  console.log(ApiCalendar);
  const getEvents = async () => {
    return new Promise(async (resolve, reject) => {
      //2.認証チェック
      if (ApiCalendar.sign) {
        //3.イベントの取得
        let end = new Date();
        end.setDate(end.getDate() + 10);
        console.log(end);
        ApiCalendar.listEvents({
          timeMin: new Date().toISOString(),
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
