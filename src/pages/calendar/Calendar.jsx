import React, { useState } from 'react';
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
    const selected = useSelector((state) => state.calendarUI.selected);

    // navigate 선언
    let navigate = useNavigate();
    const dispatch = useDispatch();

    // Date 객체로 변환함.
    const activeStartDate = new Date(activeStartDateString);
  
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
  
    // 월 선택 드롭다운에서 월을 변경했을 때 호출될 함수
    const handleMonthChange = (month) => {
      const year = activeStartDate.getFullYear();
      dispatch(setActiveStartDate(new Date(year, month).toISOString()));
    };
  
    // 옵션을 생성하는 함수
    const getMonthOptions = () => {
      const options = [];
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
  
      for (let i = -12; i <= 12; i++) {
        const date = new Date(currentYear, currentMonth + i, 1);
        options.push(
          <S.StyledOptionsList key={i} value={date.getMonth()}>
            <S.StyledOptions onClick={() => 
            { handleMonthChange(date.getMonth());
              handleButtonClick();}}>
              {date.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
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
        {getMonthOptions()}
        </S.StyledOptionsBox>
        <S.StyledLeftButton onClick={() => handleMonthChange(activeStartDate.getMonth() - 1)} />
        <S.StyledRightButton onClick={() => handleMonthChange(activeStartDate.getMonth() + 1)} />
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
          height: '6rem',
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
        height: '6rem',
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
  