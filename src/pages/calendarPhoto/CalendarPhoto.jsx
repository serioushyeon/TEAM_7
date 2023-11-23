import React, { useState, useRef, useEffect } from "react";
import { S } from "./CPhtoStyle";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setCalendarData } from "../../redux/CalendarPhotoBoard";
import PhotoOption from "../../components/calendar/PhotoOption";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function CalendarPhoto() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const maxLength = 100;

  const { date } = useParams();
  const { dayOfWeek } = location.state || {}; // 요일데이터
  const dateRedux = useSelector((state) => state.dateDay); // redux의 dateDay 상태

  const [getAccessCookie, removeCookie] = useCookies(["access_cookie"]);

  // 받아올 state
  const [calendarPhotoData, setCalendarPhotoDate] = useState({
    dayImageList: [],
    memo: "",
  });

  // 컴포넌트 상태 초기화
  const [memo, setMemo] = useState(calendarPhotoData?.memo || "");
  const [images, setImages] = useState(calendarPhotoData?.images || []);

  const fileInputRef = useRef(null);

  // 대표 사진 상태
  const [representativeImageIndex, setRepresentativeImageIndex] =
    useState(null);

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

  useEffect(() => {
    const fetchDayData = async () => {
      try {
        const response = await axios.get("/api/v1/user/${date}", {
          headers: {
            Authorization: `Bearer ${getAccessCookie}`,
          },
        });
        const fetchedData = response.data;
        console.log("가져온 데이터: ", response.data);

        // 가져온 데이터로 상태 업데이트
        setMemo(fetchedData?.memo);
        setImages(
          fetchedData?.dayImageList.map((imageUrl, index) => ({
            id: index,
            file: new File([], imageUrl), // File 객체 생성 (또는 다른 방식 사용)
          }))
        );
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

    fetchDayData();
  }, [date]);

  // 메모 실시간 변경
  const handleMemoChange = (e) => {
    const value = e.target.value;
    setMemo(value);
  };

  // 파일 선택 핸들러 수정
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files)?.map((file) => ({
      id: Date.now() + file.name, // 고유 ID 생성
      file: file,
    }));

    if (files?.length + images?.length > 4) {
      alert("최대 4장의 사진만 업로드 가능합니다.");
      return;
    }

    setImages([...images, ...files]);
  };

  // CPhotoImage 클릭 핸들러
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // 이미지 삭제 핸들러
  const handleRemoveImage = (index) => {
    setImages(images.filter((_, imgIndex) => imgIndex !== index - 1));
  };

  // 대표 사진 설정 핸들러
  const handleSetRepresentative = (index) => {
    setRepresentativeImageIndex(index - 1);
  };

  //이미지 드래그 위치 조정
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newImages = reorder(
      images,
      result.source.index,
      result.destination.index
    );

    setImages(newImages);
  };

  const postCalendarData = async () => {
    try {
      // FormData 객체 생성
      const formData = new FormData();

      // 메모 추가
      formData.append("memo", memo);

      // 이미지 추가
      if (images?.length > 0) {
        // 첫 번째 이미지는 'thumbnail'로 추가
        formData.append("thumbnail", images[0].file);
      }
      // 나머지 이미지들은 'photo1', 'photo2', 'photo3'로 추가
      images.slice(1).forEach((image, index) => {
        formData.append(`photo${index + 1}`, image.file);
      });

      // FormData 객체 내용 확인을 위한 콘솔 로그
      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}: `, value);
      // }

      // API 요청
      const response = await axios.post(
        `/api/v1/user/${dateRedux.date}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getAccessCookie}`,
          },
        }
      );

      console.log("성공 :", response.data);
    } catch (error) {
      console.error("에러 : ", error);
      console.log(
        "데이터 전송 : ",
        images?.map((image) => image.file)
      );
    }
  };

  // 취소 버튼 클릭 시 캘린더로 이동
  function handleLocateCalendar() {
    navigate("/calendar");
  }

  const handleSave = () => {
    postCalendarData();
    navigate("/calendar");
  };

  const [previousDate, setPreviousDate] = useState(date); // 이전 날짜 상태

  useEffect(() => {
    // 날짜가 변경되었을 때 초기화 로직
    if (date !== previousDate) {
      setImages([]); // 이미지 초기화
      setMemo(""); // 메모 초기화
      setPreviousDate(date); // 이전 날짜 업데이트
    }
  }, [date, previousDate]);

  useEffect(() => {
    // 컴포넌트가 언마운트될 때 실행되는 로직
    return () => {
      setImages([]); // 이미지 초기화
      setMemo(""); // 메모 초기화
    };
  }, []);

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
          {Array.from({ length: 5 })?.map((_, index) => {
            const image = images[index - 1];
            // 첫 번째 줄과 두 번째 줄 구분
            const isSecondRow = index >= 3;

            return (
              <S.AddPhotoBox
                key={index}
                id={image ? image.id : `add-photo-box-${index}`} // 고유 ID 사용
                onClick={index === 0 ? handleImageClick : null}
                style={{
                  position: "relative",
                  marginBottom: isSecondRow ? "20px" : "0", // 두 번째 줄 사진 상자는 아래에 간격 추가
                }}
              >
                {/* X 아이콘 추가 및 클릭 핸들러 연결 */}
                {index !== 0 && image && (
                  <div
                    className="delete-icon"
                    onClick={() => handleRemoveImage(index)}
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      cursor: "pointer",
                      color: "white",
                    }}
                  >
                    X
                  </div>
                )}
                {index === 0 ? (
                  <>
                    <S.CPhotoImage />
                    <S.CPhotoText>{images?.length}/4</S.CPhotoText>
                  </>
                ) : (
                  <>
                    {images[(image, index - 1)] && (
                      <img
                        src={URL.createObjectURL(image.file)}
                        alt={`Uploaded ${index - 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    {index === 1 && (
                      <S.RepresentativePhotoText>
                        대표 사진
                      </S.RepresentativePhotoText>
                    )}
                  </>
                )}
              </S.AddPhotoBox>
            );
          })}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            multiple
            onChange={handleFileSelect}
          />
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
        <S.StyledMaxLength>{`${memo.length}/${maxLength}`}</S.StyledMaxLength>
      </S.SettingMemo>
      <S.UploadChange>
        <S.UploadChangeItem onClick={handleLocateCalendar}>
          취소
        </S.UploadChangeItem>
        <S.UploadChangeItem onClick={handleSave}>저장</S.UploadChangeItem>
      </S.UploadChange>
    </S.Container>
  );
}
