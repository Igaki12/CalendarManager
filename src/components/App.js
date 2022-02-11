import { Group } from "./Group";
import { InputDate } from "./InputDate";
// import { App_calc } from "../apis/calendar.js";

function App() {

  return (
    <>
      <InputDate />
      {/* <App_calc /> */}
      <Group
        id="1"
        groupType="search"
        groupTitle="Work"
        eventList={eventList}
        additionalRowType=""
      />
    </>
  );
}

export default App;
