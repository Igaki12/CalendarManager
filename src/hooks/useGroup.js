import {useState} from "react";
import {ulid} from "ulid";

export const useGroup = () => {
  const [groupData,setGroup] = useState([]);

  const addGroupItem = (type,title,eventList,weekendOnly,nightOnly) => {
    const newGroupItem = {
      id: ulid(),
      groupType: type,
      groupTitle: title,
      weekendOnly: weekendOnly,
      nightOnly: nightOnly,
      eventList: eventList,
      inVisibleEventId:[],
      additionalRowType: 'perHour',
      totalMoney: 0,
      totalHours: eventList.reduce((sum,event) => sum + event.time,0),
    };
    return (
      setGroup([newGroupItem, ...groupData])
    );
  }
  const deleteGroupItem = (id) => {
    return setGroup([...groupData].filter((group) => group.id !== id));
  };

  const toggleEventCheck = (groupId,eventId) => {
    let changedGroupData = [...groupData];
    // console.log(groupData.find(item => item.id === groupId).inVisibleEventId.indexOf(eventId));
    if(groupData.find(item => item.id === groupId).inVisibleEventId.indexOf(eventId) === -1){
        changedGroupData.find((item)=> item.id === groupId).inVisibleEventId.push(eventId);
        // changedGroupData.find((item)=> item.id === groupId).totalHours 
        // -= changedGroupData.find((item)=> item.id === groupId).eventList.find((event) => event.id === eventId).time;
    }else{
      changedGroupData.find((item)=> item.id === groupId).inVisibleEventId.pop(eventId);
      // changedGroupData.find((item)=> item.id === groupId).totalHours 
      //   += changedGroupData.find((item)=> item.id === groupId).eventList.find((event) => event.id === eventId).time;
    }
    // let changingGroup = groupData.find((item) => item.id === groupId);
    // console.log(changingGroup);
    // changingGroup.inVisibleEventId.push(eventId);
    // changingGroup.totalHours -= changingGroup.eventList.find((event) => event.id === eventId).time;
    // console.log(changedGroupData);
    return setGroup(changedGroupData);
  }
  // const showGroupList = () => {
  //   return groupData;
  // }
  const calculateTotalMoney = (groupId,inputWage) => {
    let changedGroupData = [...groupData];
    const group = changedGroupData.find((group)=> group.id === groupId);
    changedGroupData.find((group)=> group.id === groupId).totalMoney
    = group.eventList.filter(event => group.inVisibleEventId.indexOf(event.id) === -1).reduce((sum,event) => sum+event.time,0)
    * inputWage;
    return setGroup(changedGroupData);
  }
  const calculateTotalSalary = (groupId,inputSalary) => {
    let changedGroupData = [...groupData];
    const group = changedGroupData.find((group)=> group.id === groupId);
    changedGroupData.find((group)=> group.id === groupId).totalMoney
    = group.eventList.filter(event => group.inVisibleEventId.indexOf(event.id) === -1).length
    * inputSalary;
    return setGroup(changedGroupData);
  }
  const toggleAdditionalRowType = (groupId) => {
    let changedGroupData = [...groupData];
    if(groupData.find(group => group.id === groupId).additionalRowType === 'perHour'){
      changedGroupData.find(group => group.id === groupId).additionalRowType = 'perDay';
    }else{
      changedGroupData.find(group => group.id === groupId).additionalRowType = 'perHour';
    }
    return setGroup(changedGroupData);
  }
  const deleteAllGroupItem = () => {
    setGroup([]);
    return ;
  }

  return {
    toggleAdditionalRowType,
    calculateTotalSalary,
    calculateTotalMoney,
    toggleEventCheck,
    addGroupItem,
    deleteGroupItem,
    groupData,
    deleteAllGroupItem,
    }
};