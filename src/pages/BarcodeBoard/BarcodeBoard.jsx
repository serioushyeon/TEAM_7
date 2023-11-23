import { GrCopy } from "react-icons/gr";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";
import QR from "qrcode.react";
import './BarcodeBoard.css'
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from 'react-modal';
import Toast from '../../components/EventToast/EventToast'
import html2canvas from 'html2canvas';
import saveAs from "file-saver";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTicket } from "../../redux/ticketSlice";
import { apiClient } from '../../api/ApiClient';

//일상일 때 갤러리
const DayG = ({imageInfoList}) => {
    console.log(imageInfoList[0].imageList)
    return (
        <>
        {imageInfoList.map((item)=>
            <>
                <div className="GalleryDate">
                    {item.date}
                </div>
                <div className="uploadBImgList">
                    {item.imageList.map((image)=>
                    <div className="uploadBImgBlock">
                        <img className="uploadBImg"src={image}/>
                    </div>)}
                <div className='uploadBImgBlock'></div>
                <div className='uploadBImgBlock'></div>
                <div className='uploadBImgBlock'></div>
                </div>
            </>
        )}
        </>
    )
}

//이벤트일 때 갤러리
const EventG = ({imageInfoList}) => {
    return (
        <>
        <div className="uploadBImgList">
        {imageInfoList.map((item)=><>
                    {item.imageList.map((image)=>
                    <div className="uploadBImgBlock">
                        <img className="uploadBImg"src={image}/>
                    </div>)}
                </>
        )}
            <div className='uploadBImgBlock'></div>
            <div className='uploadBImgBlock'></div>
            <div className='uploadBImgBlock'></div>
         </div>
        </>
    )
}

//바코드 게시판
const BarcodeBoard = () => {
    const ticket = useSelector((state)=>state.ticket.value);
    const dispatch = useDispatch();
    const {id} = useParams();

    const getAccessCookie = localStorage.getItem("accessCookie");
    const navigate = useNavigate();

    //나만의 무코 만들기 버튼 액션
    const goToBarcode = () => {
        console.log(getAccessCookie);
        if(!getAccessCookie){
            navigate("/");
        }
        else{
            navigate("/userinfo");
        }
    }

    //본인의 티켓 불러오기
    const fetchTicketData = async () => {
        try {
          const response = await apiClient.get(`/api/v1/barcode/${id}`,{
            headers: { Authorization: `Bearer ${getAccessCookie}` }
          });
          dispatch(setTicket(response.data));
        } catch (error) {
          console.error("Error fetching data", error);
          if(error.response.statusText === "NOT_OWNER_ACCESS"){
            alert("권한이 없습니다.");
            navigate(`/`);
          }
          if(error.response.statusText === "BARCODE_NOT_FOUND"){
            alert("해당 바코드가 없습니다.");
            navigate(`/`);
          }
          if(error.response.statusText === "USER_NOT_FOUND"){
            alert("다시 로그인 해주세요");
            //로그아웃
            navigate(`/`);
          }
        }
      };

      useEffect(() => {
        fetchTicketData();
    },[])

    //본인이면 링크, 저장 로드
    const isLoadBtn = () => {
            return (
            <div className="ticketBtnWrapper">
            <div>
                <GrCopy onClick={copyUrl} className="ticketIcon" size="24"/>
            </div>
            <div>
                <MdOutlineFileDownload  onClick={openModal}className="ticketIcon" size="28"/>
            </div>
        </div>)
    }

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [toast, setToast] = useState(false);

    //바코드 or 티켓 저장 모달 
    const openModal = () => {
        setModalIsOpen(true);
      };
    
      const closeModal = () => {
        setModalIsOpen(false);
      };

      //링크 복사
      const copyUrl = async () => {
        var textarea = document.createElement('textarea');
        textarea.value = `${location.href}/guest`;

        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, 9999);  // 추가

        document.execCommand('copy');
        document.body.removeChild(textarea);

        setToast(true);
    };

    //티켓 바코드 다운로드
    const divRef = useRef(null);

    const handleDownload = async () => {
        closeModal();
        if (!divRef.current) return;
    
        try {
          const div = divRef.current;
          const canvas = await html2canvas(div, { useCORS:true, scale: 4 });
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
    const barcodeurl = ticket.barcodeUrl
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
        display: "flex",
        alignItems: "center",
        borderStyle: "none",
        width: "70%",
        height: "8rem",
        zIndex: "150",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "4px",
        boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
        backgroundColor: "white",
        justifyContent: "center",
        overflow: "auto",
        },
      };
    return (
        <>
        {toast && <Toast setToast={setToast} text={"클립보드에 복사되었습니다."}/>}
            <div className="boardWrapper">
                <div className="boardTitle">
                    {ticket.nickname}&nbsp;님의&nbsp;<span style={{fontWeight:"bold"}}>티켓</span>
                </div>
                {isLoadBtn()}
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
                        <div className="ticketMiddle">
                        </div>
                        <div className="ticketMiddleMiddle">
                        </div>
                        <div className="ticketRight">
                            <div className="QRContainer">
                                <div className="QRTitle">
                                    QR 코드
                                </div>
                                <div className="QRCode">
                                    <QR
                                    className="QRQR"
                                    value={`${location.href}`}
                                    size={120}
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
                                <div className="barcodeImage"style={{backgroundImage: "url("+(ticket.barcodeUrl)+")"}}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="myMooco">
                    </div>
                <div className="boardTitle" style={{fontWeight:"bold"}}>
                    {ticket.nickname}님의 갤러리
                 </div>
                 <div className="GalleryWrapper">
                    {!ticket.imageInfoList[0].date ? <EventG imageInfoList = {ticket.imageInfoList}/> : <DayG imageInfoList = {ticket.imageInfoList} />}
                 </div>
            </div>
            <Modal style={customModalStyles}ariaHideApp={false} isOpen={modalIsOpen} shouldCloseOnOverlayClick={false}>
            <button className="modalCloseBtnB" onClick={closeModal}>X</button>
            <div className="modalWrapper">
                <div className='modalContentB'>무엇을 저장하시겠습니까?</div>
                <div className='notice'></div>
                <div className='modalBtnWrapperB'>
                    <button className='modalBtnB' onClick={()=>{handleDownload();}}>티켓 저장</button>
                    <button className='modalBtnB' onClick={()=>{downloadFile(ticket.barcodeUrl);}}>바코드 저장</button>
                </div>
            </div>
        </Modal>
        </>
    )
}
export default BarcodeBoard;