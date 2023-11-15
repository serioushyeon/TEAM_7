import { GrCopy } from "react-icons/gr";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";
import QR from "qrcode.react";
import './BarcodeBoard.css'
import Icon from '../../assets/images/MoodCloud/cloud1.png'
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import Toast from '../../components/EventToast/EventToast'
import html2canvas from 'html2canvas';
import saveAs from "file-saver";
import barcode from "../../assets/images/Barcode/barcodebg.jpg"

//   const navigate = useNavigate();
  //   // 로그인 상태와 사용자 정보를 저장할 스테이트
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  //   const [userInfo, setUserInfo] = useState(null);

  //   useEffect(() => {
  //     // 여기에 로그인 상태를 확인하는 로직을 구현
  //     // 예를 들어, 로컬 스토리지나 세션 스토리지에서 토큰을 확인
  //     const token = localStorage.getItem("kakaoToken");
  //     if (!token) {
  //       // 토큰이 없으면 로그인 페이지로 리디렉션
  //       navigate("/");
  //     } else {
  //       // 토큰이 있으면 유저정보 페이지로 
  //       navigate("/userinfo");  
  //       });
  //     }
  //   }, []);

const EventG = () => {
    return (
        <>
        <div className="GalleryDate">
            2028-03-11
        </div>
        <div className="uploadBImgList">
            <div className="uploadBImgBlock">
                <img className="uploadBImg"src={Icon}/>
            </div>
            <div className='marginG'></div>
            <div className='marginG'></div>
            <div className='marginG'></div>
        </div>
        </>
    )
}
const DayG = () => {
    return (
        <>
        <div className="uploadBImgList">
            <div className="uploadBImgBlock">
                <img className="uploadBImg"src={Icon}/>
            </div>
            <div className='marginG'></div>
            <div className='marginG'></div>
            <div className='marginG'></div>
        </div>
        </>
    )
}

const BarcodeBoard = () => {
    const ticket = {
    nickname:"String",
	title:"String",
	barcodeUrl:"String",
	startDate:"2028-03-11", //2023-09-10  //////09-10,2023(보류)
	endDate:"2028-03-11",   //2023-09-10  //////09-10,2023(보류)
	createdAt:"2028-03-11", //2023.09.08
	memberCnt: 0
    }
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [toast, setToast] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
      };
    
      const closeModal = () => {
        setModalIsOpen(false);
      };

      const copyUrl = async () => {
        await navigator.clipboard.writeText(location.href); // 링크 복사 부분
        setToast(true);
      };

      const navigate = useNavigate();

      const goToUser = () => {
          navigate("/event")
      }
      const goToLogin = () => {
        navigate("/event")
    }

    const divRef = useRef(null);

    const handleDownload = async () => {
        if (!divRef.current) return;
    
        try {
          const div = divRef.current;
          const canvas = await html2canvas(div, { scale: 2 });
          canvas.toBlob((blob) => {
            if (blob !== null) {
              saveAs(blob, "ticket.png");
            }
          });
        } catch (error) {
          console.error("Error converting div to image:", error);
        }
      };
      const downloadFile = (url) => {
      
        fetch(url, { method: 'GET' })
            .then((res) => {
                return res.blob();
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = "MooCo.png";
                document.body.appendChild(a);
                a.click();
                setTimeout((_) => {
                    window.URL.revokeObjectURL(url);
                }, 60000);
                a.remove();
                setOpen(false);
            })
            .catch((err) => {
                console.error('err: ', err);
            });
    };
    const customModalStyles = {
        overlay: {
            backgroundColor: " rgba(0, 0, 0, 0.4)",
            maxWidth: "390px",
            width: "100vw",
            height: "100vh",
            zIndex: "10",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: " translate(-50%, -50%)"
        },
        content: {
        borderStyle: "none",
        width: "70%",
        height: "6.25rem",
        zIndex: "150",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "10px",
        boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
        backgroundColor: "rgba(0, 0, 0, 0.66)",
        justifyContent: "center",
        overflow: "auto",
        },
      };
    return (
        <>
            <div className="boardWrapper">
            {toast && <Toast setToast={setToast} text={"클립보드에 복사되었습니다."}/>}
                <div className="boardTitle">
                    {ticket.nickname}&nbsp;님의&nbsp;<span style={{color:"#FF7A45"}}>티켓</span>
                </div>
                <div className="ticketBtnWrapper">
                    <div>
                        <GrCopy onClick={copyUrl} className="ticketIcon" size="24"/>
                    </div>
                    <div>
                        <MdOutlineFileDownload  onClick={openModal}className="ticketIcon" size="28"/>
                    </div>
                </div>
                <div className="tickerContainerWrapper" ref = {divRef}>
                <div className="ticketContainer">
                    <div className="ticketTitle">
                        <div className="ticketCreateDate">{ticket.createdAt}</div>
                        <FaRegCircle size="24" color="#CBCBCB" className="ticketCircleIcon"/>
                    </div>
                    <div className="ticketContentContainer">
                        <div className="ticketLeft">
                            <div className="ticketContentTitle">
                                탑승자
                            </div>
                            <div className="ticketContentContent">
                                {ticket.nickname}
                            </div>
                            <div className="ticketContentTitle">
                                출발일
                            </div>
                            <div className="ticketContentContent">
                                {ticket.startDate}
                            </div>
                            <div className="ticketContentTitle">
                                도착일
                            </div>
                            <div className="ticketContentContent">
                                {ticket.endDate}
                            </div>
                            <div className="ticketContentTitle">
                                생성일
                            </div>
                            <div className="ticketContentContent">
                                {ticket.createdAt}
                            </div>

                        </div>
                        <div className="ticketRight">
                            <div className="QRContainer">
                                <div className="QRTitle">
                                    QR 코드
                                </div>
                                <div className="QRCode">
                                    <QR
                                    value={window.location.href}
                                    size={140}
                                    level={"L"}
                                    includeMargin={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="barcodeContainer">
                            <div className="barcodeTitle">무코</div>
                            <div className="barcode">
                                <div className="barcodeImage"style={{backgroundImage: "url("+(barcode)+")"}}>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="myMooco">
                        <button className="myMoocoBtn">나만의 바코드 만들기</button>
                    </div>
                <div className="boardTitle">
                    {ticket.nickname}님의 갤러리
                 </div>
                 <div className="GalleryWrapper">
                    <EventG/>
                 </div>
            </div>
            <Modal style={customModalStyles}ariaHideApp={false} isOpen={modalIsOpen} shouldCloseOnOverlayClick={false}>
            <button className="modalCloseBtn" onClick={closeModal}>X</button>
            <div className="modalWrapper">
                <div className='modalContent'>무엇을 저장하시겠습니까?</div>
                <div className='notice'></div>
                <div className='modalBtnWrapper'>
                    <button className='modalBtn' onClick={()=>{handleDownload();}}>티켓 저장</button>
                    <button className='modalBtn' onClick={()=>{downloadFile(barcode);}}>바코드 저장</button>
                </div>
            </div>
        </Modal>
        </>
    )
}
export default BarcodeBoard;