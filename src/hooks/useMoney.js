import {useState} from "react";

export const useMoney = () => {
  const [money,setMoney] = useState(0);

  const calMoneyPerHour = (wage,hours) => setMoney((prevMoney) => prevMoney + wage*hours);
  const calMoneyPerDay = (wage,days) => setMoney((prevMoney) => prevMoney + wage*days);
  const calculateTotalMoney = () => {};
}