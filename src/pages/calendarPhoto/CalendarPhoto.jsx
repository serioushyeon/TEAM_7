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

  console.log("memo : ", memo);
  const maxLength = 100;

  const getAccessCookie = localStorage.getItem("accessCookie");
  const removeCookie = localStorage.getItem("accessCookie");

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

  async function imageUrlsToFileStatus(imageUrls) {
    try {
      const filePromises = imageUrls.map(async (url, index) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const filename = `image_${index}.${blob.type.split("/")[1]}`; // 파일 이름 형식은 필요에 따라 조정
        const file = new File([blob], filename, { type: blob.type });
        return { id: Date.now() + filename, file: file };
      });

      return await Promise.all(filePromises);
    } catch (error) {
      console.error("Error converting image URLs to files:", error);
      return [];
    }
  }

  imageUrlsToFileStatus(images).then((fileStatus) => {
    console.log(fileStatus);
  });

  // 파일도 같이 받아와야할듯
  const getDayData = async () => {
    console.log("date : ", date);
    try {
      const response = await apiClient.get(`/api/v1/user/${date}`, {
        headers: {
          // 쿠키 보냄
          Authorization: `Bearer ${getAccessCookie}`,
        },
      });

      // 데이터는 useState에 세팅한다.
      console.log("받은 데이터 : ", response.data);

      imageUrlsToFileStatus(response.data.dayImageList).then((fileStatus) => {
        console.log(fileStatus);
      });

      // 나중에 받은 데이터 파일로 변경해야함.
      setImages(response.data.dayImageList);
      setMemo(response.data.memo);
      // getDayData 함수 내에서 다음과 같이 사용할 수 있습니다.
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
    setMemo(e.target.value);
    console.log("memo : ", memo);
  };

  // 파일 선택 핸들러
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files).map((file) => ({
      id: Date.now() + file.name, // 고유 ID 생성
      file: file,
    }));

    // 파일 개수 제한 확인
    if (fileStatus?.length > 4 || files.length > 4 || images.length > 4) {
      alert("최대 4장의 사진만 업로드 가능합니다.");
      return;
    }

    const newImages = files.map((item) => URL.createObjectURL(item.file));
    console.log(files);
    // fileStatus 업데이트
    setFileStatus((prevStatus) => [...prevStatus, ...files]);
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleDragStart = (index) => {
    setDraggedImage(index); // 드래그 시작한 이미지의 인덱스를 저장
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // 드래그 앤 드롭 동작을 가능하게 함
  };

  const handleDrop = (index) => {
    const updatedImages = [...images]; // 현재 이미지 배열을 복사
    const draggedImage = updatedImages[draggedImage]; // 드래그된 이미지
    updatedImages.splice(draggedImage, 1); // 원래 위치에서 이미지 제거
    updatedImages.splice(index, 0, draggedImage); // 새 위치에 이미지 삽입

    setImages(updatedImages); // 이미지 배열 업데이트
    setDraggedImage(null); // 드래그 상태 초기화
  };

  // 이미지 삭제 함수
  const handleDelete = (indexToDelete) => {
    setFileStatus((prevStatus) =>
      prevStatus.filter((_, index) => index !== indexToDelete)
    );

    // images에서 해당 인덱스의 이미지 삭제
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToDelete)
    );
  };

  const postCalendarData = async () => {
    console.log("cookie : ", getAccessCookie);
    try {
      // 아아아아ㅏ아아마잉크으으ㅡㅇ
      // FormData 객체 생성
      const formData = new FormData();
      // 메모 추가
      if (memo) {
        formData.append("memo", memo);
      } else {
        formData.append("memo", "");
      }
      // 이미지 추가
      // 첫 번째 이미지는 'thumbnail'로 추가
      // 첫 번째 이미지 추가 (thumbnail)
      if (fileStatus[0]) {
        formData.append("thumbnail", fileStatus[0].file);
      } else {
        formData.append("thumbnail", new File([], "", { type: "image/jpeg" }));
      }
      // 나머지 이미지들은 'photo1', 'photo2', 'photo3'로 추가
      if (fileStatus[1]) {
        formData.append("photo1", fileStatus[1].file);
      } else {
        formData.append("photo1", new File([], "", { type: "image/jpeg" }));
      }
      if (fileStatus[2]) {
        formData.append("photo2", fileStatus[2].file);
      } else {
        formData.append("photo2", new File([], "", { type: "image/jpeg" }));
      }
      if (fileStatus[3]) {
        formData.append("photo3", fileStatus[3].file);
      } else {
        formData.append("photo3", new File([], "", { type: "image/jpeg" }));
      }

      // API 요청
      const response = await apiClient.post(`/api/v1/user/${date}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAccessCookie}`,
        },
      });
      console.log("성공 :", response.data);

      // 캘린더로 이동
      navigate("/calendar");
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
            <S.CountText>{images.length}/4</S.CountText>
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
                {images && images[index] ? (
                  <>
                    <S.PhotoImage
                      src={images[index]}
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
        {!memo ? (
          <S.StyledMaxLength>{`0/${maxLength}`}</S.StyledMaxLength>
        ) : (
          <S.StyledMaxLength>{`${memo.length}/${maxLength}`}</S.StyledMaxLength>
        )}
      </S.SettingMemo>
      <S.UploadChange>
        <S.UploadChangeItem onClick={handleCancle}>취소</S.UploadChangeItem>
        <S.UploadChangeItem onClick={postCalendarData}>저장</S.UploadChangeItem>
      </S.UploadChange>
    </S.Container>
  );
}
