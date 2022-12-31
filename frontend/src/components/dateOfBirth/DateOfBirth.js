import React from "react";
import Options from "../options/Options";

const DateOfBirth = ({user,setUser}) => {
  const dates = [];
  for (let index = 1; index < 32; index++) {
    const element = dates.push(index);
  }

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let index = currentYear; index > currentYear - 121; index--) {
    const element = years.push(index);
  }
  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({...user, [name]: value })
  };
  return (
    <div className="row name-input mt-2">
      <p className="text-start mb-2">Date of Birth:</p>
      <select
        placeholder={new Date().getDate()}
        name="date"
        onChange={onChange}
        // value={user.date}
        id="Date"
        defaultValue={new Date().getDate()}
        className="col mx-1 mt-0 form-control"
      >
        {dates.map((date, index) => (
          <Options date={date} key={index} />
        ))}
      </select>
      <select
        name="month"
        onChange={onChange}
        // value={user.month}
        defaultValue={months[new Date().getMonth()]}
        id="Month"
        className="col mx-1 mt-0 form-control"
      >
        {months.map((month, index) => (
          <Options date={month} key={index} />
        ))}
      </select>
      <select
        name="year"
        onChange={onChange}
        // value={user.year}
        id="Year"
        defaultValue={new Date().getFullYear()}
        className="col mx-1 mt-0 form-control"
      >
        {years.map((year, index) => (
          <Options date={year} key={index} />
        ))}
      </select>
    </div>
  );
};

export default DateOfBirth;
