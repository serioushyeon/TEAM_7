import React, { useEffect, useState } from "react";
import * as S from "./style";

//사진 import
import EventIconBefore from "../../assets/images/EventPhoto/EventIconBefore.png";
import EventIconAfter from "../../assets/images/EventPhoto/EventIconAfter.png";

function EventPhoto() {
  const [images, setImages] = useState([]);
  //이미지 선택 상태 관리 (삭제위한코드)
  const [selectedImages, setSelectedImages] = useState(new Set());

  const [eventId, setEventId] = useState("이벤트 아이디");

  const handleImageChange = (e) => {
    // 선택된 파일 목록을 배열로 변환
    const files = Array.from(e.target.files);

    // 이미 업로드된 이미지와 새로 업로드하려는 이미지의 총 개수
    const totalImages = images.length + files.length;

    // 총 이미지 수가 130개를 넘지 않는 경우에만 이미지 처리
    if (totalImages <= 130) {
      const newImages = files.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target.result);
        });
      });

      Promise.all(newImages).then((newImages) => {
        setImages((prevImages) => [...prevImages, ...newImages]);
      });
    } else {
      alert("최대 130개의 이미지만 업로드할 수 있습니다.");
    }
  };

  // 이미지 드래그 앤 드롭 기능
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    processImages(files);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    // images 배열에 있는 각 파일에 대해 formData에 추가
    images.forEach((image, index) => {
      formData.append(`imageList[${index}]`, image);
    });

    try {
      const response = await fetch(`/api/v1/event/${eventId}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer [access_token]", //토큰 이후 변경해야 함.
        },
        body: formData,
      });

      if (response.ok) {
        alert("이미지가 저장되었습니다 :)");
      } else {
        alert("업로드에 실패했습니다.");
      }
    } catch (error) {
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  // 이미지 처리 함수
  const processImages = (files) => {
    // 이미 업로드된 이미지와 새로 업로드하려는 이미지의 총 개수 계산

    const totalImages = images.length + files.length;

    // 총 이미지 수가 130개를 넘지 않는 경우에만 이미지 처리
    if (totalImages <= 130) {
      const newImages = files.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target.result);
        });
      });

      Promise.all(newImages).then((newImages) => {
        setImages((prevImages) => [...prevImages, ...newImages]);
      });
    } else {
      alert("최대 130개의 이미지만 업로드할 수 있습니다.");
    }
  };

  // 이미지 선택/해제 처리
  const toggleImageSelection = (index) => {
    setSelectedImages((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(index)) {
        newSelected.delete(index);
      } else {
        newSelected.add(index);
      }
      return newSelected;
    });
  };

  // 선택된 이미지 삭제 처리
  const deleteSelectedImages = () => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => !selectedImages.has(index))
    );
    setSelectedImages(new Set()); // 선택 상태 초기화
  };

  return (
    <S.EventPhotoWrapper>
      <S.EventName>나의 이벤트명</S.EventName>
      <S.ImageUploadContainer onDragOver={handleDragOver} onDrop={handleDrop}>
        <S.UploadButton htmlFor="file-input" hasImages={images.length > 0}>
          <S.UploadIcon
            src={images.length > 0 ? EventIconAfter : EventIconBefore}
            alt={
              images.length > 0 ? "사진 선택 후 이미지" : "사진 선택 전 이미지"
            }
          />
          <S.UploadCount hasImages={images.length > 0}>
            {images.length}
          </S.UploadCount>
        </S.UploadButton>

        <input
          id="file-input"
          type="file"
          multiple
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        {images.map((image, index) => (
          <S.StyledImage
            key={index}
            src={image}
            alt={`Uploaded ${index}`}
            onClick={() => toggleImageSelection(index)}
            isSelected={selectedImages.has(index)}
          />
        ))}
      </S.ImageUploadContainer>
      <S.UploadChange>
        <S.UploadChangeItem
          onClick={deleteSelectedImages}
          isSelected={selectedImages.size > 0}
        >
          삭제
        </S.UploadChangeItem>
        <S.UploadChangeItem onClick={handleSubmit}>저장</S.UploadChangeItem>
      </S.UploadChange>
    </S.EventPhotoWrapper>
  );
}

export default EventPhoto;
