import React, { useState, useRef } from "react";
import { S } from "./CPhtoStyle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { setCalendarData } from "../../redux/CalendarPhotoBoard";

export default function CalendarPhoto() {
  let navigate = useNavigate();
  // 취소 버튼 클릭 시 캘린더로 이동
  function handleLocateCalendar() {
    navigate("/calendar");
  }

  // 일자 데이터
  const dateInfo = useSelector((state) => state.date);

  // const calendarPhotoData = useSelector((state) => state.calendarPhotoBoard);
  // console.log("Calendar Photo Board State:", calendarPhotoData); // 상태 확인

  // Redux 스토어에서 데이터 가져오기
  const calendarPhotoData = useSelector((state) => state.CalendarPhotoBoard);

  // 컴포넌트 상태 초기화
  const [memo, setMemo] = useState(calendarPhotoData?.memo || "");
  const [images, setImages] = useState(calendarPhotoData?.images || []);

  // const [memo, setMemo] = useState("");
  const maxLength = 100;

  // 이미지 상태
  // const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  // 대표 사진 상태
  const [representativeImageIndex, setRepresentativeImageIndex] =
    useState(null);

  // 받은 데이터확인
  console.log(dateInfo);

  // 메모 실시간 변경
  const handleMemoChange = (e) => {
    const value = e.target.value;

    setMemo(value);
  };

  // 파일 선택 핸들러 수정
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files).map((file) => ({
      id: Date.now() + file.name, // 고유 ID 생성
      file: file,
    }));

    if (files.length + images.length > 4) {
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

  // API 요청 함수
  const postCalendarData = async () => {
    try {
      const response = await axios.post(`/api/v1/user/${dateInfo.date}`, {
        memo: memo,
        images: images.map((image) => image.file), // 이미지 파일 데이터
        // 필요한 추가 데이터
      });
      console.log(response.data);
      // 성공 메시지 또는 다른 처리
    } catch (error) {
      console.error("Error posting data", error);
      // 오류 처리
    }
  };

  const handleSave = () => {
    postCalendarData();
    // Redux 스토어 업데이트
    dispatch(setCalendarData({ memo, images }));
  };

  return (
    <S.Container>
      <S.DayWeek>{dateInfo.dayOfWeek}</S.DayWeek>
      <S.SmallText>
        <S.DateColor>{dateInfo.yearMonthDay}</S.DateColor>
      </S.SmallText>
      <S.SettingPhoto>
        <S.SettingText>사진 설정</S.SettingText>
      </S.SettingPhoto>
      <S.PhotoWrapper>
        <S.PhotoContainer>
          {Array.from({ length: 5 }).map((_, index) => {
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
                    <S.CPhotoText>{images.length}/4</S.CPhotoText>
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
