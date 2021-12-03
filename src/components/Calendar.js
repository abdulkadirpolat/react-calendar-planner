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
    console.log(prop)
    console.log('event', selectedEvent)
    setSelectedEvent({ ...selectedEvent, ...prop });
  }

  useEffect(() => {
    if (selectedEvent?.uid) {
      setModalIsVisible(true)
    }
  }, [selectedEvent])

  const updateCalenderState = () => {


    if (selectedEvent?.id) {

      const newCalenderData = calenderData.map(item => {
        if (item.uid === selectedEvent.uid) {
          return selectedEvent;
        } else {
          return item;
        }
      });
      setCalenderData(newCalenderData);
      setModalIsVisible(false)
    }
  }
 // delete event from calender
  const handleDeleteClick = (e, d) => {
    e.stopPropagation()
    const filtered = calenderData.filter(item => {
      return item.uid !== d.uid
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
    console.log('e', e)
    const dateCheck = calenderData.filter(date => date.endDate === endDate || date.startDate === startDate);

    if (dateCheck.length > 0) {
      setWarn(true)
    } else {
      setWarn(false)
    }

    console.log("dateCheck", dateCheck);

    if (e !== undefined && dateCheck.length === 0) {
      setCalenderData([
        ...calenderData,
        {
          id: currentDate,
          content: e.content,
          startDate: startDate,
          endDate: endDate,
          uid: 'id' + new Date().getTime()
        },
      ]);
      setEndDate("")
      setStartDate("")
      setValue("content", "");
    }


  };

  const handleClickCalendar = (e) => {
    console.log(e);
    console.log(calenderData)
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
      {modalIsVisible && <div className="bg-white shadow-lg p-20">
        <input type="text" value={selectedEvent?.content} onChange={e => updateSelectedEvent({ content: e.target.value })} />
        <ReactDatePicker
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
        <ReactDatePicker
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

        <button onClick={() => updateCalenderState()}>update</button>
      </div >}
      <div className=" flex flex-col xl:max-w-6xl lg:max-w-5xl w-full mx-auto my-10 px-3 lg:flex-row">
        <div className="w-full lg:w-96 bg-gray-600 rounded-tl-lg rounded-tr-lg lg:rounded-tr-none lg:rounded-bl-lg px-2">
          <div className="text-white font-semibold text-2xl">{currentDate}</div>
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
              Add Event
            </button>
            {warn && <small className="text-white">Lütfen başka bir zaman aralığı seçin !!</small>}
          </form>

          <div className="flex justify-between items-center">
            <ul className="flex flex-col w-full max-h-96 overflow-auto">
              {calenderData.map((item, index) => {
                if (item.id !== currentDate) return null;

                return <li
                  id={item.id}
                  key={index}
                  onClick={() => setSelectedEvent(item)}
                  className="flex pr-10 items-center justify-between p-2 hover:bg-gray-400 bg-gray-500 my-1 relative opacity-70 text-white font-semibold text-lg"
                >
                  <span> {item.content} </span>
                  <div className="flex items-center">
                    <span> {moment(item.startDate).format('hh:mm')} </span>
                    -
                    <span> {moment(item.endDate).format('hh:mm')} </span>
                  </div>
                  <span
                    className="right-3 absolute hover:bg-gray-300 px-2 rounded-full cursor-pointer"
                    onClick={(e) => handleDeleteClick(e, item)}
                  >
                    X
                  </span>
                </li>
              })}
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
      </div></>
  );
}

export default Calendar;
