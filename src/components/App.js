import { Group } from "./Group";
import { InputDate } from "./InputDate";
import { Text } from '@chakra-ui/react';
// import { App_calc } from "../apis/calendar.js";

function App() {

  return (
    <>
      <Text fontSize='6xl' color='red'>React</Text>
      <InputDate />
      {/* <App_calc /> */}
      <Group
        id="1"
        groupType="search"
        groupTitle="Work"
        // eventList={eventList}
        additionalRowType="perHour"
      />
    </>
  );
}

export default App;
