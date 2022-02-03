import ApiCalendar from "react-google-calendar-api";
import "./App.css";
export function App_calc() {
  const getEvents = async () => {
    return new Promise(async (resolve, reject) => {
      if (ApiCalendar.sign) {
        ApiCalendar.listEvents({
          timeMin: new Date().toISOString(),
          timeMax: new Date().addDays(10).toISOString(),
          showDeleted: true,
          maxResults: 10,
          orderBy: "updated"
        }).then(({ result }) => {
          if (result.items) {
            console.log("Events From Calendar", result.items);
          } else {
            console.log("No Events");
          }
          resolve(result);
        });
      } else {
        ApiCalendar.handleAuthClick();
        resolve(null);
      }
      console.log(getEvents);
    });
  };
  return (
    <div className="App_calc">
      <button onClick="()=> getEvents()">Get Events</button>
    </div>
  );
};
