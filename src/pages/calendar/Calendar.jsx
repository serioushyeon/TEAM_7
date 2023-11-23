import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { apiClient } from "../../api/ApiClient";
import formatDate from "../../components/calendar/FormatDate";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateDay } from "../../redux/dateDaySlice";
import Calendar1 from "../../assets/images/calendar/Calendar1.svg";
import axios from "axios";
import { S } from "./CalendarStyle";
import "./Calendar.css";
import CalendarOption from "../../components/calendar/CalendarOption";

export default function MyCalendar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getAccessCookie = localStorage.getItem("accessCookie");

  // 현재 선택한 일자
  const [value, onChange] = useState(new Date());
  const [isDisabled, setIsDisabed] = useState(false);
  const dateRedux = useSelector((state) => state.dateDay); // redux의 dateDay 상태
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 31개의 빈 데이터를 포함하는 thumbnailInfoList 초기화
  const initializeThumbnailInfoList = () =>
    Array.from({ length: 35 }, () => ({
      thumbnailUrl: "",
      date: "",
    }));

  // 초기 상태 정의
  const initialState = {
    thumbnailInfoList: initializeThumbnailInfoList(),
    buttonStatus: false,
  };
  console.log("날짜: ", formatDate(value));

  // 사진 저장
  const [dataList, setDataList] = useState(initialState);

  const getCalendarStartDate = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const newStartDay = new Date(firstDayOfMonth);
    // 한 주의 시작(월요일)까지 이동한다.
    newStartDay.setDate(
      newStartDay.getDate() -
        (newStartDay.getDay() === 0 ? 6 : newStartDay.getDay() - 1)
    );

    // 한 주의 끝(일요일)까지 이동한다.
    const newEndDay = new Date(lastDayOfMonth);
    newEndDay.setDate(
      newEndDay.getDate() +
        (newEndDay.getDay() === 0 ? 0 : 7 - newEndDay.getDay())
    );

    return { newStartDay, newEndDay };
  };

  const handleDateChange = (date) => {
    const days = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];

    onChange(date);
    // 리덕스에 일 저장
    dispatch(updateDay({ day: date.getDay() }));

    const formattedDate = formatDate(date);
    const dayOfWeek = days[date.getDay()];
    navigate(`/calendar-photo/${formattedDate}`, {
      state: { dayOfWeek },
    });
  };

  // 마운트
  useEffect(() => {
    const { newStartDay, newEndDay } = getCalendarStartDate(
      value.getFullYear(),
      // 1을 더해야 출력이 정확하다.
      value.getMonth() + 1
    );

    setStartDate(formatDate(newStartDay));
    setEndDate(formatDate(newEndDay));

    fetchCalendarInfo();
  }, [dateRedux.activeStartDate, value]);

  const fetchCalendarInfo = async () => {
    try {
      const response = await apiClient.get(`/api/v1/user/calender`, {
        params: {
          startDate: startDate,
          endDate: endDate,
          year: dateRedux.year,
          month: dateRedux.month,
        },
        headers: {
          Authorization: `Bearer ${getAccessCookie}`,
        },
      });
      console.log("data : ", response.data);
      setDataList(response.data);
    } catch (error) {
      console.error("Error fetching calendar info:", error);
    }
  };

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
              year: dateRedux.year,
              month: dateRedux.month,
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
        <CalendarOption value={value} setValue={onChange} />
        <Calendar
          local="en"
          onChange={handleDateChange}
          activeStartDate={value}
          tileClassName={tileClassName}
          value={value}
          next2Label={null}
          prev2Label={null}
          nextLabel={null}
          prevLabel={null}
          // 3글자 제한 영어로 설정
          formatShortWeekday={(local, date) => moment(date).format("ddd")}
          formatDay={(local, date) => moment(date).format("D")}
          // 날짜 칸에 보여지는 콘텐츠
          tileContent={({ date }) => {
            // 날짜에 해당하는 이미지 데이터를 찾는다.
            // moment로 date 내부 데이터에서 day만 빼옴.
            const imageEntry = dataList.thumbnailInfoList?.find((entry) =>
              moment(date).isSame(entry.date, "day")
            );
            // width를 지정하고 height를 auto로 하면 안됌.
            // height를 지정하고 width를 auto로 해야함.
            // 아야아아아아아
            //아
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
                <div className="report-image" style={style}>
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
              return <div className="no_image" style={style} />;
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
