import React, { useEffect, useLayoutEffect, useState } from "react";
import { FiLink } from "react-icons/fi";
import * as S from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../../api/ApiClient";
import Toast from "../../components/EventToast/EventToast";
//사진 import
import EventIconBefore from "../../assets/images/EventPhoto/EventIconBefore.png";
import EventIconAfter from "../../assets/images/EventPhoto/EventIconAfter.png";
import BarcodeLoading from "../../components/BarcodeLoading/BarcodeLoading";
import axios from "axios";

function EventPhoto() {
  const [loading, setLoading] = useState(false);
  const { eventId } = useParams();
  const [images, setImages] = useState([]);
  const [eventName, setEventName] = useState();
  const [isGuest, setIsGuest] = useState(false);
  const [toast, setToast] = useState(false);
  const getAccessCookie = localStorage.getItem("accessCookie");
  console.log(eventId);
  useEffect(() => {
    if (location.pathname === `/eventphoto/${eventId}/guest`) setIsGuest(true);
  }, []);

  const copyUrl = async () => {
    var textarea = document.createElement("textarea");
    textarea.value = `${location.href}/guest`;

    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 9999); // 추가

    document.execCommand("copy");
    document.body.removeChild(textarea);

    setToast(true);
    alert("클립보드에 복사가 되었습니다. 다른 사람에게 공유해보세요 !");
  };

  useLayoutEffect(() => {
    const fetchEventBlockData = async () => {
      try {
        const response = await apiClient.get(
          `/api/v1/event/image-list/${eventId}`,
          {}
        );
        setEventName(response.data.title);
        setImages(response.data.imageUrlList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEventBlockData();
  }, []);

  //이미지 선택 상태 관리 (삭제위한코드)
  const [selectedImages, setSelectedImages] = useState(new Set());
  const navigate = useNavigate();

  //드래그 이미지 선택 상태 관리 (삭제 드래그)
  const [isDragging, setIsDragging] = useState(false);

  const handleImageChange = (e) => {
    // 선택된 파일 목록을 배열로 변환
    const files = Array.from(e.target.files);

    // 이미 업로드된 이미지와 새로 업로드하려는 이미지의 총 개수
    const totalImages = images.length + files.length;

    e.target.value = "";

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
    setLoading(true);
    for (const image of images) {
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: "image/jpeg" });
      formData.append("imageList[]", file);

      // 파일의 세부 정보 출력
      console.log(`File: ${file.name}, Type: ${file.type}, Size: ${file.size}`);
    }

    // FormData 내용 콘솔에 출력 (디버깅 목적)
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      // 서버에 POST 요청
      const response = await axios.post(
        `/api/v1/event/save-photo/${eventId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        alert("이미지가 저장되었습니다 :)");
        if (!isGuest) {
          navigate(`/event`);
        }
      } else {
        setLoading(false);
        alert("업로드에 실패했습니다.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error uploading images:", error);
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

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (index) => {
    if (isDragging) {
      toggleImageSelection(index);
    }
  };

  const handleClick = (index) => {
    if (!isDragging) {
      toggleImageSelection(index);
    }
  };
  const handleBarcodeGeneration = async () => {
    setLoading(true);
    try {
      const response = await apiClient
        .post(
          `/api/v1/event/${eventId}/result`,
          {
            eventId: eventId,
          },
          {
            headers: {
              Authorization: `Bearer ${getAccessCookie}`,
            },
          }
        )
        .then();
      setLoading(false);
      console.log("Barcode generated successfully:", response.data);
      navigate("/bcstore");
    } catch (error) {
      setLoading(false);
      alert("바코드 생성에 실패하였습니다.");
      console.error("Error in generating barcode:", error);
    }
  };
  return (
    <>
      {loading ? <BarcodeLoading /> : <></>}
      {isGuest ? <S.Navigation></S.Navigation> : <></>}
      <S.EventPhotoWrapper>
        {toast && (
          <Toast setToast={setToast} text={"클립보드에 복사되었습니다."} />
        )}
        {isGuest ? (
          <></>
        ) : (
          <S.LinkWrapper className="invite" onClick={copyUrl}>
            <FiLink size="22" color="grey" />
          </S.LinkWrapper>
        )}
        <S.EventName>{eventName}</S.EventName>
        <S.Notice>사진 등록 시 변경이 불가하니 신중하게 선택해주세요!</S.Notice>
        <S.ImageUploadContainer onDragOver={handleDragOver} onDrop={handleDrop}>
          <S.UploadButton htmlFor="file-input" hasImages={images.length > 0}>
            <S.UploadIcon
              src={images.length > 0 ? EventIconAfter : EventIconBefore}
              alt={
                images.length > 0
                  ? "사진 선택 후 이미지"
                  : "사진 선택 전 이미지"
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
              // onClick={() => toggleImageSelection(index)}
              isSelected={selectedImages.has(index)}
              onMouseDown={handleMouseDown}
              onMouseMove={() => handleMouseMove(index)}
              onMouseUp={handleMouseUp}
              onClick={() => handleClick(index)}
            />
          ))}
        </S.ImageUploadContainer>
        <S.UploadChange>
          {!isGuest ? (
            <S.makeBarcode onClick={handleBarcodeGeneration}>
              바코드 생성
            </S.makeBarcode>
          ) : (
            <></>
          )}
          <S.UploadChangeItem onClick={handleSubmit}>저장</S.UploadChangeItem>
        </S.UploadChange>
      </S.EventPhotoWrapper>
    </>
  );
}

export default EventPhoto;
