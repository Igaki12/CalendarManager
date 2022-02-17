import { useState } from "react";
export const useCheckedEvent = () => {
  const [checkedEventData,setCheckedEvent] = useState(
    [{
      groupId:1,
      checked:[true,false,true,false,true]
  }]);
  const createNewCheckedEventItem = ({groupId,eventList}) => {
    let newCheckedEventItem = {
      groupId:groupId,
      checked:[]
    }
    eventList.forEach(() => {
      newCheckedEventItem.checked.push('true');
    });
    console.log(newCheckedEventItem);
    return setCheckedEvent([newCheckedEventItem, ...checkedEventData])
  }
  const toggleCheckedEventItem = ({groupId,index}) => {
    let changingCheckedEventItem = checkedEventData.find((item)=> item.groupId === groupId);
    changingCheckedEventItem.checked[index] = !(changingCheckedEventItem.checked[index]);
    console.log(changingCheckedEventItem);
    let elseCheckedEventItem = checkedEventData.find((item)=> item.groupId !== groupId);
    return setCheckedEvent([changingCheckedEventItem,elseCheckedEventItem]);
  }
  return {
    createNewCheckedEventItem,
    toggleCheckedEventItem,
  };
};