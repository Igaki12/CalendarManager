import { Group } from "./Group";

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
