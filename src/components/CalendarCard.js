import React from "react";
import "react-datepicker/dist/react-datepicker.css";
 
function CalendarCard({ date, fullDate, onClick, currentDate }) {

  return (
    <li
    id={fullDate}
      className= {`md:p-5 md:h-28 sm:h-20 h-16 border relative ${ currentDate === fullDate ? "bg-blue-500" : ""}`}
      onClick={onClick}
    >
      <p className="absolute top-1 right-1">{date}</p>
    </li>
  );
}

export default CalendarCard;
