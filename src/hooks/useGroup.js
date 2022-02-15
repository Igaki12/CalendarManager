import {useState} from "react";

export const useGroup = () => {
  const [groupData,setGroup] = useState([]);

  const addGroupItem = (type,title,eventList) => {
    const newGroupItem = {
      id: groupData.length,
      groupType: type,
      groupTitle: title,
      eventList: eventList,
    };
    return (
      setGroup([newGroupItem, ...eventList])
    );
  }
  const deleteGroupItem = (id,eventList) => {
    return setGroup([...eventList].splice(id,1));
  };

  return {
    addGroupItem,
    deleteGroupItem,
  }
}