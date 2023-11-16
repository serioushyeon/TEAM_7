import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { apiClient } from '../../api/ApiClient';
import { useCookies } from "react-cookie";

import { selectDate } from '../../redux/dateSlice';
import { setActiveStartDate } from '../../redux/CalendarUI';

import { S } from './CalendarStyle';
import './Calendar.css';
import CalendarOption from '../../components/calendar/CalendarOption';
import Lion from '../../assets/images/calendar/lion.png';
import Calendar1 from "../../assets/images/calendar/Calendar1.svg";
import Background from "../../assets/images/calendar/Background.svg";

// 서버에서 받은 images Data
const imageData = {
  thumbnailInfoList: [
    { date: "2023-11-01", url: Lion },
    { date: "2023-11-15", url: Lion },
    { date: "2023-11-03", url: Background },
    { date: "2023-11-13", url: Background },
    { date: "2023-11-02", url: Lion },
    { date: "2023-11-05", url: Lion },
    { date: "2023-11-06", url: Background },
    { date: "2023-11-07", url: Background },
    { date: "2023-11-08", url: Lion },
    { date: "2023-11-09", url: Lion },
    { date: "2023-11-10", url: Background },
    { date: "2023-11-11", url: Background },
  ],
  buttonStatus: false
}

  
  // 서버에서 데이터를 받아와 사진을 배치한다.
  export default function MyCalendar() {
    const [value, onChange] = useState(new Date());

    // 리듀서들
    const activeStartDateString = useSelector((state) => state.calendarUI.activeStartDate);
    const dateRange = useSelector(state => state.dateRange.dateRange);
    // 설정 해야함
    console.log('startDate: ', dateRange.startDate, 'endDate: ', dateRange.endDate);
    console.log('year:', dateRange.year, 'month: ', dateRange.month);

    const [accessCookie] = useCookies(["accessCookie"]);
    const [refreshCookie] = useCookies(["refreshCookie"]);
    
    const [calendarInfo, setCalendarInfo] = useState({
      thumbnailInfoList:
	[
		{
			thumbnailUrl: "",
			date: ""
		},
		{
			thumbnailUrl: "",
			date: ""
		}
    // 위 데이터를 startDate - endDate까지 반복한다.
	],
	buttonStatus: false 
    });

    // navigate 선언
    let navigate = useNavigate();
    const dispatch = useDispatch();
    // Date 객체로 변환함.
    const activeStartDate = new Date(activeStartDateString);

    // startDate, endDate가 변할 때마다..
    useEffect(() => {

      // 유저 정보 받아오기
  const getCalendarInfo = async () => {
    console.log('startDate: ', dateRange.startDate, 'endDate: ', dateRange.endDate);
    console.log('Rangeyear:', dateRange.year, 'Rangemonth: ', dateRange.month);
    try {
      // startDate, endDate 형식은 YYYY-MM-DD
      const response = await apiClient.get(`/api/v1/user/calender`, {
        // 서버에서 params 기준으로 값 가져옴.
        params: {
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            year: dateRange.year,
            month: dateRange.month
        }, headers: {
          // 나중에 토큰 수정 필요
          Authorization: `${Bearer [access_token]}`
        },
      });
      setCalendarInfo(response.data);
      console.log("성공, UserInfo : ", response.data);

    } catch(error) {
      console.error('전송 실패 : ', error);
    }
  };

  if(dateRange.startDate && dateRange.endDate) {
    getCalendarInfo();
  }
  // 실제 시작일, 끝일이 업데이트 된 이후 서버에 요청한다.
}, [dateRange.startDate, dateRange.endDate]);

// 사진 추가 / 삭제 할 때도 계속 get 보내야하나?

    const userinfo = {
      id: "",
      pw: ""
    }
  
    // 사진이 없는 경우, 사진 등록 창으로 이동
    function handleLocatePhoto(date) {
      navigate('/calendar-photo');
      dispatch(selectDate(moment(date).format('YYYY-MM-DD')));
      console.log("캘린더에서 보냄 : ", date);
    }

    // 사진이 있는 경우, 사진 표시 창으로 이동
    // toISOString과 moment(date) 두 가지 방법이 가능하다.
    function handleLocateDay(date) {
      navigate('/calendar-non-photo');
      dispatch(selectDate(date.toISOString().slice(0, 10)));
      console.log("캘린더에서 보냄 : ", date);
    }

    // 일요일, 토요일 색상 변경
    const tileClassName = ({ date, view }) => {
      // 달력의 'month' 뷰일 때만 클래스를 적용한다.
      if (view === 'month') {
        if (date.getDay() === 0) { // 일요일
          return 'sunday';
        } else if (date.getDay() === 6) { // 토요일
          return 'saturday';
        }
      }
    };

    // 바코드 생성 시
    function onClickBarcord() {

      // 서버로 연, 월 전송
      const postBarcordInfo = async () => {
        try {
          // startDate, endDate 형식은 YYYY-MM-DD
          const response = await apiClient.post(`/api/v1/user/new-barcode`, {
                year: dateRange.year,
                month: dateRange.month
            }, {
              headers: {
              // 나중에 토큰 수정 필요
              // Bearer 토근 앞에 공백 필요..?
              Authorization: `${ Bearer [access_token]}`
            }
          });
          console.log("성공, response : ", response.data);
    
        } catch(error) {
          console.error('실패 error : ', error);
        }
      };

      postBarcordInfo();
      navigate('/ticket');
    }
  
    // <S.StyledOptionsBox show={selected ? "true" : undefined}>
    /* 위 문장에서 selected로만 하면 boolean이 아닌 값으로 DOM에 접근할 수 없다는 에러가 발생했는데,
    undefined인 경우를 설정해주니 오류가 해결됌. */
    return (
        <S.Container>
          <S.BackImage>
          <S.CalendarImage src={Calendar1} alt="Calendar1"/>
          <S.CalendarText>Calendar</S.CalendarText>
       <CalendarOption />
        <Calendar
        local="en"
        onChange={onChange} 
        value={value} 
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
        tileClassName={tileClassName}
        next2Label={null}
        prev2Label={null}
        nextLabel={null}
        prevLabel={null}
        // 3글자 제한 영어로 설정
        formatShortWeekday={(local, date) => moment(date).format('ddd')}
        formatDay={(local, date) => moment(date).format('D')}
  
        // 날짜 칸에 보여지는 콘텐츠
        tileContent={({ date, view }) => {
      // 날짜에 해당하는 이미지 데이터를 찾는다.
      // moment로 date 내부 데이터에서 day만 빼옴.
      const imageEntry = imageData.thumbnailInfoList.find(entry =>
        moment(date).isSame(entry.date, 'day')
      );
  
      // width를 지정하고 height를 auto로 하면 안됌.
      // height를 지정하고 width를 auto로 해야함. 
      if (imageEntry) {
        // Inline style for dynamic background image
        const style = {
          width: 'auto',
          height: '4.5rem'
        };
  
      // 해당하는 이미지 데이터가 있다면 이미지 태그를 생성한다.
      return (
        <div 
        className="report-image" 
        style={style} 
        onClick={() => handleLocateDay(date)}
        ><S.DayImage src={imageEntry.url}/>
        </div>
      );
    }
    // 사진 파일이 없으면 기본으로
    else {
      const style = {
        width: 'auto',
        height: '4.5rem',
      };
  
      return (
        <div 
        className="no_image" 
        style={style} 
        onClick={() => handleLocatePhoto(date)}/>
      );
    }
  }}
  />
  
  <S.AddBarcord 
  onClick={onClickBarcord}
  >바코드 생성</S.AddBarcord>
  
  </S.BackImage>
        </S.Container>
    );
  }
  