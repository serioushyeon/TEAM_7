import React, { useEffect, useState } from "react";
import * as S from "./style";

//사진 import
import EventIconBefore from "../../assets/images/EventPhoto/EventIconBefore.png";
import EventIconAfter from "../../assets/images/EventPhoto/EventIconAfter.png";

function EventPhto() {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    // 선택된 파일 목록을 배열로 변환
    const files = Array.from(e.target.files);

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

  // 이미지 드래그 앤 드롭 기능
  const handleDragOver = (e) => {
    e.preventDefault(); // 기본 이벤트 방지
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    processImages(files);
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
          <S.StyledImage key={index} src={image} alt={`Uploaded ${index}`} />
        ))}
      </S.ImageUploadContainer>
    </S.EventPhotoWrapper>
  );
}

export default EventPhto;
