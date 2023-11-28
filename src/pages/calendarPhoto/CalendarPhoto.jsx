import React, { useState, useRef, useEffect } from "react";
import { S } from "./CPhtoStyle";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateMonth, updateYear } from "../../redux/dateDaySlice";
import PhotoOption from "../../components/calendar/PhotoOption";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { apiClient } from "../../api/ApiClient";
export default function CalendarPhoto() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { date } = useParams();

  // 요일 데이터
  const { dayOfWeek } = location.state || {};
  const dateRedux = useSelector((state) => state.dateDay); // redux의 dateDay 상태

  const [fileStatus, setFileStatus] = useState([]);
  const [memo, setMemo] = useState("");
  const [images, setImages] = useState([]);
  const [draggedImage, setDraggedImage] = useState(null);

  console.log("file : ", fileStatus);
  console.log("memo : ", memo);

  const maxLength = 100;

  const getAccessCookie = localStorage.getItem("accessCookie");

  // 로그아웃 처리 함수
  const handleLogout = () => {
    // 쿠키 삭제
    removeCookie("accessCookie", { path: "/" });
    removeCookie("refreshCookie", { path: "/" });
    // 로컬 스토리지에서 토큰 삭제
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // 로그인 페이지로 리다이렉트
    navigate("/");
  };

  // 파일도 같이 받아와야할듯
  const getDayData = async () => {
    console.log("date : ", date);
    try {
      const response = await apiClient.get(`/api/v1/user/${date}`);

      // 데이터는 useState에 세팅한다.
      console.log("받은 데이터 : ", response.data);

      // 나중에 받은 데이터 파일로 변경해야함.
      setImages(response.data.dayImageList);
      setMemo(response.data.memo);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        if (error.response.data.code === "DAY_NOT_FOUND") {
          // 'DAY_NOT_FOUND' 에러 처리
          alert("정상적이지 않은 경로입니다. 캘린더 페이지로 이동합니다.");
          navigate("/calendar");
        } else if (error.response.data.code === "USER_NOT_FOUND") {
          // 'USER_NOT_FOUND' 에러 처리
          alert(
            "로그인한 사용자가 존재하지 않습니다. 로그인 페이지로 이동합니다."
          );
          handleLogout();
        } else {
          console.error("Error fetching day data", error);
        }
      } else {
        console.error("Error fetching day data", error);
      }
    }
  };

  // 초기 렌더링 시 데이터를 불러온다.
  useEffect(() => {
    getDayData();
  }, [date]);

  // 메모 실시간 변경
  const handleMemoChange = (e) => {
    setMemo(e.value.target);
    console.log("memo : ", memo);
  };

  // 파일 선택 핸들러
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files).map((file) => ({
      id: Date.now() + file.name, // 고유 ID 생성
      file: file,
    }));

    // 파일 개수 제한 확인
    if (fileStatus?.length > 4 || files.length > 4) {
      alert("최대 4장의 사진만 업로드 가능합니다.");
      return;
    }

    // fileStatus 업데이트
    setFileStatus((prevStatus) => [...prevStatus, ...files]);
  };

  const handleDragStart = (index) => {
    setDraggedImage(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // 드래그 앤 드롭 동작을 가능하게 함
  };

  const handleDrop = (index) => {
    const updatedFiles = [...fileStatus];
    const draggedFile = updatedFiles[draggedImage];
    updatedFiles.splice(draggedImage, 1);
    updatedFiles.splice(index, 0, draggedFile);

    setFileStatus(updatedFiles);
    setDraggedImage(null);
  };

  // 이미지 삭제 함수
  const handleDelete = (indexToDelete) => {
    setFileStatus((prevStatus) =>
      prevStatus.filter((_, index) => index !== indexToDelete)
    );
  };

  const postCalendarData = async () => {
    try {
      // FormData 객체 생성
      const formData = new FormData();
      // 메모 추가
      formData.append("memo", memo);
      // 이미지 추가
      if (fileStatus?.length > 0) {
        // 첫 번째 이미지는 'thumbnail'로 추가
        formData.append("thumbnail", fileStatus[0].file);
      }

      // 나머지 이미지들은 'photo1', 'photo2', 'photo3'로 추가
      fileStatus.slice(1).forEach((file, index) => {
        formData.append(`photo${index + 1}`, file.file);
      });

      console.log("formData : ", formData);

      // API 요청
      const response = await apiClient.post(`/api/v1/user/${date}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccessCookie}`,
        },
      });
      console.log("성공 :", response.data);
    } catch (error) {
      console.error("에러 : ", error);
    }
  };

  const handleDateChange = () => {
    const newDate = new Date(); // 현재 날짜

    dispatch(updateYear({ year: newDate.getFullYear() })); // 현재 연도로 업데이트
    dispatch(updateMonth({ month: newDate.getMonth() })); // 현재 월로 업데이트
  };

  // 취소 버튼 클릭 시 현재 날짜로 이동
  function handleCancle() {
    handleDateChange();
    navigate("/calendar");
  }

  // 저장 버튼 클릭 시 저장한 날짜로 이동
  const handleSave = () => {
    postCalendarData();
    navigate("/calendar");
  };

  /*const [previousDate, setPreviousDate] = useState(date); // 이전 날짜 상태
  useEffect(() => {
    // 날짜가 변경되었을 때 초기화 로직
    if (date !== previousDate) {
      setImages([]); // 이미지 초기화
      setMemo(""); // 메모 초기화
      setPreviousDate(date); // 이전 날짜 업데이트
    }
  }, [date, previousDate]);
  */

  return (
    <S.Container>
      <PhotoOption date={date} />
      <S.DayWeek>{dayOfWeek}</S.DayWeek>
      <S.SmallText>
        <S.DateColor>{date}</S.DateColor>
      </S.SmallText>
      <S.SettingPhoto>
        <S.SettingText>사진 설정</S.SettingText>
      </S.SettingPhoto>
      <S.PhotoWrapper>
        <S.PhotoContainer>
          <S.AddPhotoBox>
            <S.AddPhotoLabel htmlFor="fileStatus">
              <S.AddPhotoImage />
            </S.AddPhotoLabel>
            <S.CountText>{fileStatus.length}/4</S.CountText>
            <S.AddPhoto
              type="file"
              id="fileStatus"
              name="fileStatus"
              multiple
              onChange={handleFileSelect}
            />
          </S.AddPhotoBox>
          {
            // 길이가 4인 배열을 생성하고, 각 요소에 대해 반복
            new Array(4).fill().map((_, index) => (
              <S.PhotoBox key={index}>
                {fileStatus && fileStatus[index] ? (
                  <>
                    <S.PhotoImage
                      src={URL.createObjectURL(fileStatus[index].file)}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(index)}
                    />
                    <S.DeleteText onClick={() => handleDelete(index)}>
                      x
                    </S.DeleteText>
                  </>
                ) : (
                  <></>
                )}
                {index === 0 && (
                  <S.RepresentativePhotoText>
                    대표사진
                  </S.RepresentativePhotoText>
                )}
              </S.PhotoBox>
            ))
          }
        </S.PhotoContainer>
      </S.PhotoWrapper>
      <S.SettingMemo>
        <S.SettingText>메모</S.SettingText>
        <S.MemoBox
          placeholder="아직 작성된 일상 메모가 없습니다."
          name="memo"
          value={memo}
          onChange={handleMemoChange}
          maxLength={100}
        />
        <S.StyledMaxLength>{`${memo?.length}/${maxLength}`}</S.StyledMaxLength>
      </S.SettingMemo>
      <S.UploadChange>
        <S.UploadChangeItem onClick={handleCancle}>취소</S.UploadChangeItem>
        <S.UploadChangeItem type="submit" onClick={handleSave}>
          저장
        </S.UploadChangeItem>
      </S.UploadChange>
    </S.Container>
  );
}
