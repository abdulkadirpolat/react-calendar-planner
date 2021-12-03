import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CalendarCard from "./CalendarCard";
import moment from "moment";
import ReactDatePicker from "react-datepicker";

function Calendar() {

  const [calendar, setCalendar] = useState([]);
  const [date, setDate] = useState(moment().local("tr"));
  const startDay = date.clone().startOf("month").startOf("week");
  const endDay = date.clone().endOf("month").endOf("week");
  const [ currentDate, setCurrentDate ] = useState( moment().local("tr").format("YYYY-MM-DD") );
 
  const [calenderData, setCalenderData] = useState( 
    [
      {
        id: "2022-04-11",
        content: "planlama toplantısı",
        startDate: "",
        endDate: "",
      }
    ]
   );
 console.log(calenderData);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const handleDeleteClick = (id) => {
    setCalenderData((prevState) => {
      return {
        ...prevState,
        contentData: prevState.contentData.filter((item) => item.id !== id),
      };
    });
  };

  //add react state 1 month with moment js
  const nextMonth = () => {
    setDate(moment(date).add(1, "month"));
  };
  //subtract react state 1 month with moment js
  const prevMonth = () => {
    setDate(moment(date).subtract(1, "month"));
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const submitForm = (e) => {
    if (e !== undefined) {
      setCalenderData( 
        [
         ...calenderData,
          {
            id: currentDate  ,
            content: e.content,
            startDate: startDate,
            endDate: endDate,
          },
        ]
      );
    }

    setValue("content", "");
  };
 
  const handleClickCalendar = (e) => {
    setCurrentDate(e)
  };

  useEffect(() => {
    const day = startDay.clone().subtract(1, "day");
    const a = [];

    while (day.isBefore(endDay, "day")) {
      a.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, "day").clone())
      );
    }
    setCalendar(a);
  }, [date]);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  return (
    <div className=" flex flex-col xl:max-w-6xl lg:max-w-5xl w-full mx-auto my-10 px-3 lg:flex-row">
      <div className="w-full lg:w-96 bg-gray-600 rounded-tl-lg rounded-tr-lg lg:rounded-tr-none lg:rounded-bl-lg px-2">
        <div className="text-white font-semibold text-2xl">
          {
            currentDate
          }
        </div>
        <form
          className="flex lg:flex-col items-center"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="flex flex-col items-center w-full">
            <div className="flex justify-between items-center w-full pt-2">
              <label
                className="block text-gray-700 text-sm font-bold"
                htmlFor="content"
              >
                content
              </label>
              <input
                id="content"
                type="text"
                className="text-gray-700 bg-gray-200 w-2/3 p-2 rounded-smm focus:outline-none"
                placeholder="content"
                onChange={(event, { name, value }) => {
                  setValue(name, value);
                }}
                {...register("content", {
                  required: true,
                  maxLength: 60,
                  minLength: 4,
                })}
              />
            </div>
            {errors.content?.type && (
              <span className="text-red-500 "> {errors.content.type}</span>
            )}
            <div className="flex justify-between items-center w-full ">
              <label
                className="text-gray-700 text-sm font-bold w-2/3"
                htmlFor="startDate"
              >
                startDate
              </label>
              <ReactDatePicker
                className="text-gray-700 bg-gray-200 w-full p-2 mt-2 rounded-sm focus:outline-none"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                name="startDate"
                id="startDate"
                placeholderText="start date"
              />
            </div>
            <div className="flex justify-between items-center w-full">
              <label
                className="text-gray-700 text-sm font-bold mt-5 w-2/3"
                htmlFor="endDate"
              >
                endDate
              </label>
              <ReactDatePicker
                className="text-gray-700 bg-gray-200 w-full p-2 mt-2 rounded-sm focus:outline-none"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                name=" endDate"
                id="endDate"
                placeholderText="end date"
              />
            </div>
          </div>
          <button className="mt-2 mb-1 lg:w-full w-1/4 lg:ml-0 ml-2 bg-indigo-500 py-3">
            Add
          </button>
        </form>

        <div className="flex justify-between items-center">
          <ul className="flex flex-col w-full max-h-96 overflow-auto">
            {calenderData.map((item) => (
              <li           
                key={item.id}
                className=" p-2 hover:bg-gray-400 bg-gray-500 my-1 relative opacity-70 text-white font-semibold text-lg"
              >
                <span> {item.content} </span>
                <span
                  className="right-3 absolute hover:bg-gray-300 px-2 rounded-full cursor-pointer"
                  onClick={() => handleDeleteClick(item.id)}
                >
                  X
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-between w-full h-full lg:pl-4 ">
        <div className="flex w-full items-center font-bold text-2xl pb-4">
          <div className="flex self-start w-1/3 px-3">
            <p
              onClick={() => prevMonth()}
              className="mr-3 hover:underline cursor-pointer"
            >
              Prev
            </p>
            <p
              onClick={() => nextMonth()}
              className="hover:underlin cursor-pointer"
            >
              Next
            </p>
          </div>
          <div>{date.format("MMMM YYYY")}</div>
        </div>
        <div className="flex justify-around font-semibold text-lg mb-2 border-gray-500 ">
          {weekdays.map((day, index) => {
            return <div key={index}>{day}</div>;
          })}
        </div>
        <ul className="border-t-0 grid grid-cols-7">
          {calendar.map((week) => {
            return (
              <>
                {week.map((day, index) => {
                  return (
                    <CalendarCard
                      key={index}
                      onClick= {() => handleClickCalendar(day.format("YYYY-MM-DD"))}
                      fullDate= {day.format("YYYY-MM-DD")}
                      date={day.format("D")}
                    />
                  );
                })}
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Calendar;
