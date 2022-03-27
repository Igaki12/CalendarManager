import { useState } from "react";
export const useEvent = () => {
  const [eventData,setEvent] = useState([
    {
      id:1,
      summary: "予定を取得しよう",
      start:{
        dateTime: '2021-01-01T00:00:00+09:00',
        timeZone: 'Asia/Tokyo'
      },
      end:{
        dateTime: '2021-01-01T05:00:00+09:00',
        timeZone: 'Asia/Tokyo'
      },
      time:5,
    },
  ]);

  // const toggleEventCheck = (id) => {
  //   console.log("eventData:");
  //   console.log(eventData);
  //   const changingEvent = eventData.find((item) => item.id === id);
  //   console.log(changingEvent);
  //   changingEvent.check = !(changingEvent.check);
  //   const elseEvent = eventData.find((item) => item.id !== id);
  //   return setEvent([ ...elseEvent ,changingEvent])
  // }
  const createNewEventList = (eventList) => {
    let newEventList = eventList.map((event)=> {
      let startDate = new Date(event.start.dateTime.split("-")[0]
      , parseInt(event.start.dateTime.split("-")[1]) - 1
      , parseInt(event.start.dateTime.split("-")[2].split("T")[0])
      , parseInt(event.start.dateTime.split("T")[1].split(":")[0])
      , parseInt(event.start.dateTime.split(":")[1])
      , parseInt(event.start.dateTime.split(":")[2].split("+")));
      let endDate = new Date(event.end.dateTime.split("-")[0]
      , parseInt(event.end.dateTime.split("-")[1]) - 1
      , parseInt(event.end.dateTime.split("-")[2].split("T")[0])
      , parseInt(event.end.dateTime.split("T")[1].split(":")[0])
      , parseInt(event.end.dateTime.split(":")[1])
      , parseInt(event.end.dateTime.split(":")[2].split("+")));
      event.StartDateTime = startDate;
      event.endDateTime = endDate;
      event.time = (endDate.getTime() - startDate.getTime())/(60*60*1000);
      return event;
    });
    console.log(newEventList);
    // setEvent([...eventList]);
    setEvent([...newEventList]);
  }
  const showEventList = () => {
    // console.log(eventData);
    return eventData;
  }
  return {
    showEventList,
    // toggleEventCheck,
    createNewEventList,
    eventData,
  };
};