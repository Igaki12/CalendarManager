import { useState } from "react";
export const useEvent = () => {
  const [eventData,setEvent] = useState([]);

  const toggleEventItem = (id) => {
    const changingEvent = eventData.find((item) => item.id === id);
    changingEvent.check = !(changingEvent.check);
    const elseEvent = eventData.find((item) => item.id !== id);
    return setEvent([...elseEvent,changingEvent])
  }
  return {
    toggleEventItem,
  }
}