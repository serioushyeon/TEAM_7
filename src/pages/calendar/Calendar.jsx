import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { selectDate } from '../../redux/dateSlice';
import { setActiveStartDate, toggleSelected } from '../../redux/CalendarUI';

import { S } from './CalendarStyle';
import './Calendar.css';
import Lion from '../../assets/images/calendar/lion.png';
import Calendar1 from "../../assets/images/calendar/Calendar1.svg";
import Background from "../../assets/images/calendar/Background.svg";

// 서버에서 받은 images Data
const imageData = [
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
  ];
  
  export default function MyCalendar() {
    const [value, onChange] = useState(new Date());
    const activeStartDateString = useSelector((state) => state.calendarUI.activeStartDate);
    const [selectedYear, setSelectedYear] = useState(moment().year());
    const [selectedMonth, setSelectedMonth] = useState(moment().month());
    const selected = useSelector((state) => state.calendarUI.selected);
    
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
    try {
      // startDate, endDate 형식은 YYYY-MM-DD
      const response = await apiClient.get(`/api/v1/user/calender/{startDate}/{endDate}`, {
        headers: {
          // 나중에 토큰 수정 필요
          Authorization: `${Bearer [access_token]}`
        },
      });
      setCalendarInfo(response.data);
      console.log("성공, UserInfo : ", response.data);

    } catch (error) {
      console.log(error);
    }
  }
    }, [])
  
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
  
    // 월 버튼 클릭 핸들러
    const handleButtonClick = () => {
      dispatch(toggleSelected());
    }

     // 년도 변경 핸들러
  const handleYearChange = (year) => {
    setSelectedYear(year);
    updateActiveStartDate(year, selectedMonth);
  };

  // 월 변경 핸들러
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    updateActiveStartDate(selectedYear, month);
  };
  
    // 날짜 변경 핸들러
    const updateActiveStartDate = (year, month) => {
      dispatch(setActiveStartDate(new Date(year, month).toISOString()));
    };
  
    // 월 선택 드롭다운
    const getMonthOptions = () => {
      const options = [];
  
      for (let month = 0; month < 12; month++) {
        const date = new Date(selectedYear, month, 1);
        options.push(
          <S.StyledOptionsList key={month} value={month}>
            <S.StyledOptions onClick={() => 
            { handleMonthChange(month);
              handleButtonClick();}}>
              {date.toLocaleDateString('default', { month: 'long' })}
              </S.StyledOptions>
          </S.StyledOptionsList>
        );
      }
      return options;
    };
  
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
  
    // <S.StyledOptionsBox show={selected ? "true" : undefined}>
    /* 위 문장에서 selected로만 하면 boolean이 아닌 값으로 DOM에 접근할 수 없다는 에러가 발생했는데,
    undefined인 경우를 설정해주니 오류가 해결됌. */
    return (
        <S.Container>
          <S.BackImage>
          <S.CalendarImage src={Calendar1} alt="Calendar1"/>
          <S.CalendarText>Calendar</S.CalendarText>
        <S.StyledSelect onChange={handleMonthChange} onClick={handleButtonClick}>Month</S.StyledSelect>
          <S.StyledOptionsBox show={selected ? "true" : undefined}>
            <S.StyledYear>
            <S.YearText
            top="0.6rem"
            left="6.3rem"
            >{selectedYear}</S.YearText>
          <S.StyledLeftButton 
          onClick={() => handleYearChange(selectedYear - 1)}
          top="1rem"
          left="4.5rem" />
          <S.StyledRightButton 
          onClick={() => handleYearChange(selectedYear + 1)}
          top="1rem"
          left="9.8rem" />
          </S.StyledYear>
          <S.StyledMonth>
        {getMonthOptions()}
        </S.StyledMonth>
        </S.StyledOptionsBox>
        <S.YearText
            top="8rem"
            left="18rem"
            >{selectedYear}.{selectedMonth + 1}</S.YearText>
        <S.StyledLeftButton 
        onClick={() => handleMonthChange(selectedMonth - 1)}
        top="8.5rem"
        left="14.8rem" />
        <S.StyledRightButton 
        onClick={() => handleMonthChange(selectedMonth + 1)}
        top="8.5rem"
        left="16rem" />
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
      const imageEntry = imageData.find(entry =>
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
  
  <S.AddBarcord>바코드 생성</S.AddBarcord>
  
  </S.BackImage>
        </S.Container>
    );
  }
  