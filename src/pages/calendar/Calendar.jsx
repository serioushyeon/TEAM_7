import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { apiClient } from "../../api/ApiClient";
import { useCookies } from "react-cookie";

import Calendar1 from "../../assets/images/calendar/Calendar1.svg";

import { selectDate } from "../../redux/dateSlice";
import { setActiveStartDate } from "../../redux/CalendarUI";
import { updateDay, updateMonth, updateYear } from "../../redux/dateDaySlice";
import {
  setThumbnailInfoList,
  setButtonStatus,
} from "../../redux/calendarSlice";
import { updateDateRange } from "../../redux/dateRangeSlice";
import axios from "axios";

import { S } from "./CalendarStyle";
import "./Calendar.css";
import CalendarOption from "../../components/calendar/CalendarOption";
// import {
//   selectDate,
//   setActiveStartDate,
//   updateDay,
//   updateMonth,
//   updateYear,
//   setThumbnailInfoList,
//   setButtonStatus,
//   updateDateRange,
// } from "../../redux";

export default function MyCalendar() {
  const [activeStartDate, setActiveStartDateState] = useState(new Date());
  const [value, onChange] = useState(new Date());
  const [isDisabled, setIsDisabed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accessCookie] = useCookies(["accessCookie"]);
  const getAccessCookie = localStorage.getItem("accessCookie");
  const { startDate, endDate, year, month, thumbnailInfoList, buttonStatus } =
    useSelector((state) => ({
      startDate: state.dateRange.startDate,
      endDate: state.dateRange.endDate,
      year: state.dateRange.year,
      month: state.dateRange.month,
      thumbnailInfoList: state.photoList.thumbnailInfoList,
      buttonStatus: state.photoList.buttonStatus,
    }));


    
    const fetchCalendarInfo = async () => {
      try {
        const response = await axios.get("/api/v1/user/calender", {
          params: {
            startDate: moment(activeStartDate).format("YYYY-MM-DD"),
            endDate: moment(activeStartDate).endOf("month").format("YYYY-MM-DD"),
            year: moment().format("YYYY"),
            month: moment().format("MM"),
          },
          headers: {
            Authorization: `Bearer ${getAccessCookie}`,
          },
        });

        console.log('data : ', response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching calendar info:", error);
      }
    };
// 변경하는 값들 의존성으로 넣기

  // redux와 user 동기화
  useEffect(() => {
    (async () => {
      const { data } = await fetchCalendarInfo();
// 데이터를 메서드로 따로 받은 후 세팅한다.
      dispatch(setThumbnailInfoList(data.thumbnailInfoList));
      dispatch(setButtonStatus(data.buttonStatus));
    })()
  }, [ startDate, endDate, thumbnailInfoList ]);


  // 날짜 변경 핸들러
  const updateActiveStartDate = (year, month) => {
    dispatch(setActiveStartDate(new Date(year, month).toISOString()));
  };

  // getCalendarInfo 함수를 useEffect 밖으로 이동
  // const getCalendarInfo = async (startDate, endDate, year, month) => {
  //   try {
  //     // 더미 데이터를 생성합니다.
  //     const dummyResponseData = {
  //       thumbnailInfoList: [
  //         {
  //           thumbnailUrl: "https://ifh.cc/g/qjT3Cg.png",
  //           date: "2023-11-15",
  //         },
  //         {
  //           thumbnailUrl: "https://ifh.cc/g/qjT3Cg.png",
  //           date: "2023-11-20",
  //         },
  //         // 여기에 더 많은 더미 이미지 및 날짜를 추가할 수 있습니다.
  //       ],
  //       buttonStatus: "ACTIVE",
  //     };

  //     // Redux 스토어에 더미 데이터를 설정합니다.
  //     dispatch(setThumbnailInfoList(dummyResponseData.thumbnailInfoList));
  //     dispatch(setButtonStatus(dummyResponseData.buttonStatus));
  //     setIsDisabed(dummyResponseData.buttonStatus !== "INACTIVE");
  //   } catch (error) {
  //     console.error("Error fetching calendar info:", error);
  //   }
  // };

  // useEffect(() => {
  //   // getCalendarInfo 함수 호출
  //   const newActiveStartDate = new Date(year, month, 1);
  //   const startDate2 = moment(newActiveStartDate).format("YYYY-MM-DD");
  //   const endDate2 = moment(newActiveStartDate)
  //     .endOf("month")
  //     .format("YYYY-MM-DD");
  //   getCalendarInfo(startDate2, endDate2, year, month);
  // }, [year, month, dispatch, accessCookie]);

  // const tileContent = ({ date, view }) => {
  //   if (view === "month") {
  //     const dateString = moment(date).format("YYYY-MM-DD");
  //     const imageEntry = thumbnailInfoList.find(
  //       (entry) => entry.date === dateString
  //     );
  //     if (imageEntry) {
  //       return (
  //         <S.DayWrapper>
  //           <div className="report-image" onClick={() => handleLocateDay(date)}>
  //             <S.DayImage src={imageEntry.thumbnailUrl} />
  //           </div>
  //         </S.DayWrapper>
  //       );
  //     }
  //   }
  // };

  // getCalendarInfo 함수를 useEffect 밖으로 이동
  /* const getCalendarInfo = async (startDate, endDate, year, month) => {
    try {
      const response = await axios.get("/api/v1/user/calender", {
        params: { startDate, endDate, year, month },
        headers: {
          Authorization: `Bearer ${getAccessCookie}`,
        },
      });
      dispatch(setThumbnailInfoList(response.data.thumbnailInfoList));
      dispatch(setButtonStatus(response.data.buttonStatus));
      console.log(response.data);
      setIsDisabed(response.data.buttonStatus !== "INACTIVE");
    } catch (error) {
      console.error("Error fetching calendar info:", error);
    }
  };

  useEffect(() => {
    // getCalendarInfo 함수 호출
    const newActiveStartDate = new Date(year, month, 1);
    const startDate2 = moment(newActiveStartDate).format("YYYY-MM-DD");
    const endDate2 = moment(newActiveStartDate)
      .endOf("month")
      .format("YYYY-MM-DD");
    getCalendarInfo(startDate2, endDate2, year, month);
  }, [year, month, dispatch, accessCookie]);
  */

/*  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = moment(date).format("YYYY-MM-DD");
      const imageEntry = thumbnailInfoList.find(
        (entry) => entry.date === dateString
      );
      if (imageEntry) {
        return (
          <div className="report-image" onClick={() => handleLocateDay(date)}>
            <S.DayImage src={imageEntry.thumbnailUrl} />
          </div>
        );
      }
    }
  };
  */

  // 사진이 없는 경우, 사진 등록 창으로 이동하는 함수
  function handleLocatePhoto(date) {
    // 날짜 형식을 'YYYY-MM-DD'로 변환
    const formattedDate = moment(date).format("YYYY-MM-DD");
    navigate(`/calendar-photo/${formattedDate}`);
    dispatch(selectDate(formattedDate));
    dispatch(updateDay({ day: moment(date).date() }));
    dispatch(updateMonth({ month: moment(date).month() }));
    dispatch(updateYear({ year: moment(date).year() }));
  }

  // 사진이 있는 경우, 사진 표시 창으로 이동하는 함수
  function handleLocateDay(date) {
    // 날짜 형식을 'YYYY-MM-DD'로 변환
    const formattedDate = moment(date).format("YYYY-MM-DD");
    navigate(`/calendar-non-photo/${formattedDate}`);
    dispatch(selectDate(formattedDate));
    dispatch(updateDay({ day: moment(date).date() }));
    dispatch(updateMonth({ month: moment(date).month() }));
    dispatch(updateYear({ year: moment(date).year() }));
  }

  // 일요일, 토요일 색상 변경
  const tileClassName = ({ date, view }) => {
    // 달력의 'month' 뷰일 때만 클래스를 적용한다.
    if (view === "month") {
      if (date.getDay() === 0) {
        // 일요일
        return "sunday";
      } else if (date.getDay() === 6) {
        // 토요일
        return "saturday";
      }
    }
  };

  // 바코드 생성 시
  function onClickBarcord() {
    // 사진 개수가 30 ~ 130개라면
    if (isDisabled != false) {
      // 서버로 바코드 연, 월 전송
      const postBarcordInfo = async () => {
        try {
          // startDate, endDate 형식은 YYYY-MM-DD
          const response = await axios.post(
            `${import.meta.env.VITE_APP_SERVER_HOST}/api/v1/user/new-barcode`,
            {
              year: dateRange.year,
              month: dateRange.month,
            },
            {
              headers: {
                // 나중에 토큰 수정 필요
                // Bearer 토근 앞에 공백 필요..?
                Authorization: `Bearer ${getAccessCookie}`,
              },
            }
          );
          console.log("성공, response : ", response.data);
        } catch (error) {
          console.error("실패 error : ", error);
        }
      };

      postBarcordInfo();
      navigate("/ticket");
    }
    // 아니라면
    else {
      alert("30개와 130개 사이의 사진만 가능합니다. ");
    }
  }

  // <S.StyledOptionsBox show={selected ? "true" : undefined}>
  /* 위 문장에서 selected로만 하면 boolean이 아닌 값으로 DOM에 접근할 수 없다는 에러가 발생했는데,
    undefined인 경우를 설정해주니 오류가 해결됌. */
  return (
    <S.Container>
      <S.BackImage>
        <S.CalendarImage src={Calendar1} alt="Calendar1" />
        <S.CalendarText>Calendar</S.CalendarText>
        <CalendarOption />
        <Calendar
          local="en"
          onChange={onChange}
          value={value}
          activeStartDate={activeStartDate}
          onActiveStartDateChange={({ activeStartDate }) =>
            setActiveStartDate(activeStartDate)
          }
          tileClassName={tileClassName}
          next2Label={null}
          prev2Label={null}
          nextLabel={null}
          prevLabel={null}
          // 3글자 제한 영어로 설정
          formatShortWeekday={(local, date) => moment(date).format("ddd")}
          formatDay={(local, date) => moment(date).format("D")}
          // 날짜 칸에 보여지는 콘텐츠
          tileContent={({ date, view }) => {
            // 날짜에 해당하는 이미지 데이터를 찾는다.
            // moment로 date 내부 데이터에서 day만 빼옴.
            const imageEntry = thumbnailInfoList.find((entry) =>
              moment(date).isSame(entry.date, "day")
            );

            // width를 지정하고 height를 auto로 하면 안됌.
            // height를 지정하고 width를 auto로 해야함.
            if (imageEntry) {
              // Inline style for dynamic background image
              const style = {
                width: "auto",
                height: "4.5rem",
                // border: "1px solid blue",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "3px",
              };

              // 해당하는 이미지 데이터가 있다면 이미지 태그를 생성한다.
              return (
                <div
                  className="report-image"
                  style={style}
                  onClick={() => handleLocateDay(date)}
                >
                  <S.DayImage src={imageEntry.thumbnailUrl} />
                </div>
              );
            }
            // 사진 파일이 없으면 기본으로
            else {
              const style = {
                width: "auto",
                height: "4.5rem",
              };

              return (
                <div
                  className="no_image"
                  style={style}
                  onClick={() => handleLocatePhoto(date)}
                />
              );
            }
          }}
        />

        <S.AddBarcord onClick={onClickBarcord} disabled={isDisabled}>
          바코드 생성
        </S.AddBarcord>
      </S.BackImage>
    </S.Container>
  );
}
