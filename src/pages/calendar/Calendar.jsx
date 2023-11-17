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
import { updateDay, updateMonth, updateYear } from '../../redux/dateDaySlice';
import {setThumbnailInfoList} from '../../redux/calendarSlice';

import { S } from './CalendarStyle';
import './Calendar.css';
import CalendarOption from '../../components/calendar/CalendarOption';
import Lion from '../../assets/images/calendar/lion.png';
import Calendar1 from "../../assets/images/calendar/Calendar1.svg";
import Background from "../../assets/images/calendar/Background.svg";
  
  // 서버에서 데이터를 받아와 사진을 배치한다.
  export default function MyCalendar() {
    const [value, onChange] = useState(new Date());
    const [isDisabled, setIsDisabed] = useState(false); 
    const dateDay = useSelector((state) => state.dateDay.dateDay);
    const dateInfo = useSelector((state) => state.date);

    // 시작 페이지 날짜 지정
    const activeStartDateString = useSelector((state) => state.calendarUI.activeStartDate);

    // 날짜 범위(시작일, 끝일, 월, 년)
    const dateRange = useSelector(state => state.dateRange.dateRange);

    // 달력 내 사진
    const thumbnailInfoList = useSelector(state => state.photoList.thumbnailInfoList);
    const buttonStatus = useSelector(state => state.photoList.buttonStatus);

    const [accessCookie] = useCookies(["accessCookie"]);
    const [refreshCookie] = useCookies(["refreshCookie"]);

    const getAccessCookie = localStorage.getItem("accessCookie");
   const getRefreshCookie = localStorage.getItem("refreshCookie");

   console.log('startDate2: ', dateRange.startDate, 'endDate2: ', dateRange.endDate);
   console.log('Rangeyear:', dateRange.year, 'Rangemonth: ', dateRange.month);
   console.log('disabled', isDisabled);
    
    // navigate 선언
    let navigate = useNavigate();
    const dispatch = useDispatch();
    // Date 객체로 변환함.
    const activeStartDate = new Date(activeStartDateString);

         // 서버에서 사진 정보 받아오기
  const getCalendarInfo = async () => {
    console.log('startDate: ', dateRange.startDate, 'endDate: ', dateRange.endDate);
    console.log('Rangeyear:', dateRange.year, 'Rangemonth: ', dateRange.month);
    console.log(thumbnailInfoList);
    try {
      // startDate, endDate 형식은 YYYY-MM-DD
      const response = await axios.get(`/api/v1/user/calender`, {
        // 서버에서 params 기준으로 값 가져옴.
        params: {
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            year: dateRange.year,
            month: dateRange.month
        }, headers: {
          Authorization: `Bearer ${getAccessCookie}`
        },
      });

      // 사진 리덕스에 저장
      dispatch(setThumbnailInfoList(response.data));

      if(response.data.buttonStatus === "ACTIVE") {
        setIsDisabed(true);
      }else if(response.data.buttonStatus === "ACTIVE_WITH_MODAL") {
        setIsDisabed(true);
        alert("바코드 생성 가능");
      } else if(response.date.buttonStatus === "INACTIVE") {
        setIsDisabed(false);
      } else {
        console.log("이상한 값이 들어왔습니다. ");
      }
      console.log("성공, UserInfo : ", response.data);
      console.log("바코드 생성 : ", response.data.buttonStatus);

    } catch(error) {
      console.error('전송 실패 : ', error);
    }
  };

    useEffect(() => {

    getCalendarInfo();

}, []);

    // 사진이 없는 경우, 사진 등록 창으로 이동
    function handleLocatePhoto(date) {
      navigate('/calendar-photo');
      dispatch(selectDate(moment(date).format('YYYY-MM-DD')));
      dispatch(updateDay({ day: moment(date).date() }));
      dispatch(updateMonth({ month: moment(date).month() }));
      dispatch(updateYear({ year: moment(date).year() }));
    }

    // 사진이 있는 경우, 사진 표시 창으로 이동
    // toISOString과 moment(date) 두 가지 방법이 가능하다.
    function handleLocateDay(date) {
      navigate('/calendar-non-photo');
      dispatch(selectDate(moment(date).format('YYYY-MM-DD')));
      dispatch(updateDay({ day: moment(date).date() }));
      dispatch(updateMonth({ month: moment(date).month() }));
      dispatch(updateYear({ year: moment(date).year() }));
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

      // 사진 개수가 30 ~ 130개라면
      if(isDisabled != false) {
          // 서버로 바코드 연, 월 전송
      const postBarcordInfo = async () => {
        try {
          // startDate, endDate 형식은 YYYY-MM-DD
          const response = await axios.post(`/api/v1/user/new-barcode`, {
                year: dateRange.year,
                month: dateRange.month
            }, {
              headers: {
              // 나중에 토큰 수정 필요
              // Bearer 토근 앞에 공백 필요..?
              Authorization: `Bearer ${getAccessCookie}`
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
      const imageEntry = thumbnailInfoList.find(entry =>
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
        ><S.DayImage src={imageEntry.thumbnailUrl}/>
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
  disabled = {isDisabled}
  >바코드 생성</S.AddBarcord>
  
  </S.BackImage>
        </S.Container>
    );
  }
  