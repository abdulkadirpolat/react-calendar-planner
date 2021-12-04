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
  const [currentDate, setCurrentDate] = useState(
    moment().local("tr").format("YYYY-MM-DD")
  );
  const [calenderData, setCalenderData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [warn, setWarn] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const updateSelectedEvent = (prop) => {
    setSelectedEvent({ ...selectedEvent, ...prop });
  };

  useEffect(() => {
    if (selectedEvent?.uid) {
      setModalIsVisible(true);
    }
  }, [selectedEvent]);

  const updateCalenderState = (e) => {
    if (selectedEvent?.id) {
      const newCalenderData = calenderData.map((item) => {
        if (item.uid === selectedEvent.uid) {
          return selectedEvent;
        } else {
          return item;
        }
      });
      setCalenderData(newCalenderData);
      setModalIsVisible(false);
    }
  };
  // delete event from calender
  const handleDeleteClick = (e, d) => {
    e.stopPropagation();
    const filtered = calenderData.filter((item) => {
      return item.uid !== d.uid;
    });

    setCalenderData(filtered);
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
    const dateCheck = calenderData.filter(
      (date) => date.endDate === endDate || date.startDate === startDate
    );

    if (dateCheck.length > 0) {
      setWarn(true);
    } else {
      setWarn(false);
    }

    if (e !== undefined && dateCheck.length === 0) {
      setCalenderData([
        ...calenderData,
        {
          id: currentDate,
          content: e.content,
          startDate: startDate,
          endDate: endDate,
          uid: "id" + new Date().getTime(),
        },
      ]);
      setEndDate("");
      setStartDate("");
      setValue("content", "");
    }
  };

  const handleClickCalendar = (e) => {
    setCurrentDate(e);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      <div className="absolute z-20 top-1/4 right-auto left-auto px-10 w-full sm:w-auto">
        {modalIsVisible && (
          <div className="bg-white rounded-lg shadow-lg pt-20 pb-8 px-12 relative max-w-2xl w-full">
            <span
              onClick={() => setModalIsVisible(false)}
              className="absolute right-5 top-5 hover:bg-gray1 hover:text-white text-lg
         font-semibold px-3 py-1 rounded-full cursor-pointer"
            >
              X
            </span>
            <div className="flex flex-col sm:flex-row justify-between items-center w-full whitespace-nowrap">
              <span className="w-48">
                <label
                  htmlFor="updateContent"
                  className="text-gray-700 text-sm font-bold w-full"
                >
                  Update Content:
                </label>
              </span>
              <input
                id="updateContent"
                type="text"
                value={selectedEvent?.content}
                onChange={(e) =>
                  updateSelectedEvent({ content: e.target.value })
                }
                className="border py-2 bg-gray-200 w-full"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center w-full whitespace-nowrap">
              <span className="w-48">
                <label
                  htmlFor="updateStartDate"
                  className="text-gray-700 text-sm font-bold w-full"
                >
                  Update Start Date:
                </label>
              </span>
              <ReactDatePicker
                id="updateStartDate"
                className="text-gray-700 bg-gray-200 w-full p-2 mt-2 rounded-sm focus:outline-none"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                selected={selectedEvent?.startDate}
                onChange={(date) => updateSelectedEvent({ startDate: date })}
                placeholderText="end date"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center w-full whitespace-nowrap">
              <span className="w-48">
                <label
                  htmlFor="updateEndDate"
                  className="text-gray-700 text-sm font-bold w-full"
                >
                  Update End Date:
                </label>
              </span>
              <ReactDatePicker
                id="updateEndDate"
                className="text-gray-700 bg-gray-200 w-full p-2 mt-2 rounded-sm focus:outline-none"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                selected={selectedEvent?.endDate}
                onChange={(date) => updateSelectedEvent({ endDate: date })}
                placeholderText="end date"
              />
            </div>
            <span className="flex w-full">
              <button
                className="bg-primary hover:bg-blue-600 text-white font-medium px-12 py-2 my-4 rounded-lg mx-auto"
                onClick={() => updateCalenderState()}
              >
                update
              </button>
            </span>
          </div>
        )}
      </div>
      <div className=" flex flex-col xl:max-w-6xl lg:max-w-5xl w-full mx-auto my-16 px-3 lg:flex-row">
        <div className="w-full lg:w-96 bg-gray-400 rounded-tl-lg rounded-tr-lg lg:rounded-tr-none lg:rounded-bl-lg px-2">
          <div className="text-white font-semibold text-2xl">{currentDate}</div>
          <form
            className="flex lg:flex-col items-center"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className="flex flex-col items-center w-full">
              <div className="flex justify-between items-center w-full pt-2">
                <span className="text-gray-700 text-sm font-bold w-32 ">
                  <label
                    className="block text-gray-700 text-sm font-bold"
                    htmlFor="content"
                  >
                    content:
                  </label>
                </span>
                <input
                  id="content"
                  type="text"
                  className="text-gray-700 bg-gray-200 w-full p-2 rounded-sm focus:outline-none"
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
                <span className="text-gray-700 text-sm font-bold w-32 ">
                  <label
                    className="text-gray-700 text-sm font-bold w-full"
                    htmlFor="startDate"
                  >
                    startDate:
                  </label>
                </span>
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
              <div className="flex justify-between items-center w-full mb-2 lg:mb-0">
                <span className="text-gray-700 text-sm font-bold w-32 ">
                  <label className="w-full" htmlFor="endDate">
                    endDate:
                  </label>
                </span>
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
            <button className="mt-2 mb-1 lg:w-full w-1/4 lg:ml-0 ml-2 rounded-sm bg-indigo-500 py-3">
              Add Event
            </button>
            {warn && (
              <small className="text-white">
                Lütfen başka bir zaman aralığı seçin !!
              </small>
            )}
          </form>

          <div className="flex justify-between items-center">
            <ul className="flex flex-col w-full lg:max-h-96 max-h-48 overflow-y-auto overflow-x-hidden">
              {calenderData.map((item, index) => {
                if (item.id !== currentDate) return null;

                return (
                  <li
                    id={item.id}
                    key={index}
                    onClick={() => setSelectedEvent(item)}
                    className="flex flex-col pr-10 items-center justify-between p-2 hover:bg-gray-600
                     bg-gray-500 my-1 relative opacity-70 text-white font-semibold text-lg w-full"
                  >
                    <span>
                      {item.content.length > 20
                        ? item.content.slice(0, 20) + "..."
                        : item.content}{" "}
                    </span>
                    <div className="flex items-center">
                      <span> {moment(item.startDate).format("hh:mm")} </span>-
                      <span> {moment(item.endDate).format("hh:mm")} </span>
                    </div>
                    <span
                      className="right-3 top-1/4 absolute hover:bg-gray-300 px-2 rounded-full cursor-pointer"
                      onClick={(e) => handleDeleteClick(e, item)}
                    >
                      X
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-between w-full h-full lg:pl-4 ">
          <div className="flex w-full items-center font-bold text-2xl pb-4">
            <div className="flex self-start w-1/3 px-3 mr-4">
              <p
                onClick={() => prevMonth()}
                className="mr-3 hover:underline hover:text-gray1 cursor-pointer"
              >
                Prev
              </p>
              <p
                onClick={() => nextMonth()}
                className="hover:underline hover:text-gray1 cursor-pointer"
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
          <ul>
            {calendar.map((week, index) => {
              return (
                <div key={index} className="border-t-0 grid grid-cols-7 ">
                  {week.map((day, index) => {
                    return (
                      <CalendarCard
                        currentDate={currentDate}
                        key={index}
                        onClick={() =>
                          handleClickCalendar(day.format("YYYY-MM-DD"))
                        }
                        fullDate={day.format("YYYY-MM-DD")}
                        date={day.format("D")}
                      />
                    );
                  })}
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Calendar;
