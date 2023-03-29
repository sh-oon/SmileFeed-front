import { useState } from "react";
import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
// import "./Calender.module.css";
import styles from "./Calender.module.css";

import { Mousewheel } from "swiper";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date().getDate());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();
  const startDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();
  const endDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    daysInMonth
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const prevMonthDays = Array.from(
    { length: startDayOfMonth },
    (_, i) => -i - 1
  ).reverse();
  const nextMonthDays = Array.from(
    { length: 6 - endDayOfMonth },
    (_, i) => i + 1
  );

  const allDays = [...prevMonthDays, ...days, ...nextMonthDays];

  const handlePrevMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
    );
    console.log(selectedDate);
  };

  const handleNextMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
    );
    console.log(selectedDate);
  };

  return (
    <>
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={30}
        modules={[Mousewheel]}
        className={styles.mySwiper}
        onSlideChange={() => {
          console.log("slide change");
        }}
      >
        {daysOfWeek.map((day) => (
          <SwiperSlide key={day}>
            <CalendarWrapper>
              <div className="flex justify-between items-center mb-4 w-full">
                <button onClick={handlePrevMonth}>Prev</button>
                <h2>
                  {selectedDate.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </h2>
                <button onClick={handleNextMonth}>Next</button>
              </div>
              <div className="grid grid-cols-7 gap-8">
                {daysOfWeek.map((day) => (
                  <div key={day}>{day}</div>
                ))}
                {allDays.map((day, i) => (
                  <div
                    key={i}
                    className={`text-center ${
                      day === currentDate
                        ? "bg-blue-500 text-white rounded-full"
                        : ""
                    }`}
                  >
                    {day > 0 ? day : ""}
                  </div>
                ))}
              </div>
            </CalendarWrapper>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

const CalendarWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Calendar;
