import {useState} from "react";
import {ulid} from "ulid";

export const useGroup = () => {
  const [groupData,setGroup] = useState([]);

  const countTotalMoney = () => {
    
  }
  const showGroupLists = () => {
    console.log(groupData);

  }
  const addGroupItem = (type,title,eventList) => {
    const newGroupItem = {
      id: ulid(),
      groupType: type,
      groupTitle: title,
      eventList: eventList,
      additionalRawType: 'none',
      totalMoney: 0,
    };
    console.log(`${type},${title},${eventList}`);
    setGroup([newGroupItem, ...groupData]);
    return (
      setGroup([newGroupItem, ...groupData])
    );
  }
  const deleteGroupItem = (id) => {
    return setGroup([...groupData].splice(id,1));
  };

  return {
    showGroupLists,
    addGroupItem,
    deleteGroupItem,
  }
};