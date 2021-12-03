import React, { useState } from "react";
// import db, { auth } from "../firebase";
 
import "react-datepicker/dist/react-datepicker.css";
 
function CalendarCard({ date, fullDate, onClick }) {
 

  return (
    <li
    id={fullDate}
      className="bg-gray-100 p-5 h-28 border relative"
      onClick={onClick}
    >
      <p className="absolute top-1 right-1">{date}</p>

    </li>
  );
}

export default CalendarCard;
