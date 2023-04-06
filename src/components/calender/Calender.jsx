import { useEffect, useState } from "react";
import styled from "styled-components";

import { Virtual } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import styles from "./Calender.module.css";

import { Mousewheel } from "swiper";
import { apiRequest } from "../../services/common";
import { loadingState } from "../../store/menu-store";
import { useRecoilState } from "recoil";

import Loading from "../portal/Loading";

const Calendar = () => {
  const [feeds, setFeeds] = useState([]);
  const [loadState, setLoadingState] = useRecoilState(loadingState);
  const swiper = useSwiper();

  useEffect(() => {
    async function getFeeds() {
      setLoadingState(true);
      const res = await apiRequest("GET", "v1/api/feed/diary");

      if (res.status === 200) {
        const data = res.data.data;
        // const feeds = [data.prevMonthFeeds, data.currentMonthFeeds, data.nextMonthFeeds];
        const result = [];
        // feed를 월별로 나누기
        data.forEach((feed) => {
          const month = feed.date.split("-")[1];
          const index = result.findIndex((feed) => feed.month === month);
          if (index === -1) {
            result.push({ month: month, data: [feed] });
          } else {
            result[index].data.push(feed);
          }
        });
        result.sort((a, b) => a.month - b.month);
        setFeeds(result);
      } else {
        console.log("error");
      }
      setLoadingState(false);
    }

    getFeeds();
  }, [swiper]);

  return (
    <>
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={0}
        modules={[Mousewheel, Virtual]}
        className={styles.mySwiper}
        virtual
        onSlideChange={(e) => {
          console.log("slide change");
        }}
      >
        {feeds.map((feed, index) => {
          return (
            <SwiperSlide key={index} virtualIndex={index}>
              <CalendarWrapper>
                <div className={styles.month}>{feed.month}월</div>
                <div className={styles.days}>
                  {feed.data.map((feed, index) => {
                    return (
                      <div className={styles.day} key={index}>
                        <div className={styles.date}>
                          {feed.date.split("-")[2]}
                        </div>
                        <div className={styles.emotion}>{feed.emotion}</div>
                        <div className={styles.content}>{feed.content}</div>
                      </div>
                    );
                  })}
                </div>
              </CalendarWrapper>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Loading />
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
