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
      setGroup([newGroupItem, ...groupData])
    );
  }
  const deleteGroupItem = (id) => {
    return setGroup([...groupData].splice(id,1));
  };

  return {
    addGroupItem,
    deleteGroupItem,
  }
}