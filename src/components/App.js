import { Group } from "./Group";
import { InputDate } from "./InputDate";
import {App_calc} from "../apis/calendar";

function App() {
  const eventList = [
    {
      title: "working in the cram school",
      time: 10
    },
    {
      title: "medical training",
      time: 4
    },
    {
      title: "sleep",
      time: 8
    }
  ];
  return (
    <>
      <InputDate />
      <App_calc />
      <InputDate />
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
