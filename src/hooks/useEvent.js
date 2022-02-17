import { useState } from "react";
export const useEvent = () => {
  const [eventData,setEvent] = useState([
    {
      id:1,
      title: "work at the cram school",
      day: '12/10',
      time:5,
    },
    {
      id:2,
      title: "medical training",
      day: '12/11',
      time:4,
    },
    {
      id:3,
      title: "sleep",
      day: '12/12',
      time:8,
    },
    {
      id:4,
      title: "home work",
      day: '12/13',
      time:2,
    },
    {
      id:5,
      title: "交通整理",
      day: '12/14',
      time:7,
    },
    {
      id:6,
      title: "garden work",
      day: '12/13',
      time:6,
    },
    {
      id:7,
      title: "sleep",
      day: '12/13',
      time:5,
    },
    {
      id:8,
      title: "sleep",
      day: '12/13',
      time:4,
    },
    {
      id:9,
      title: "sleep",
      day: '12/13',
      time:3,
    }
  ]);

  const toggleEventCheck = (id) => {
    console.log("eventData:");
    console.log(eventData);
    const changingEvent = eventData.find((item) => item.id === id);
    console.log(changingEvent);
    changingEvent.check = !(changingEvent.check);
    const elseEvent = eventData.find((item) => item.id !== id);
    return setEvent([ ...elseEvent ,changingEvent])
  }
  const createNewEventList = (eventList) => {
    setEvent([...eventList]);
  }
  const showEventList = () => {
    console.log(eventData);
    return eventData;
  }
  return {
    showEventList,
    // toggleEventCheck,
    createNewEventList,
  };
};