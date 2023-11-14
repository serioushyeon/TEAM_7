import { GrCopy } from "react-icons/gr";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";
import QR from "qrcode.react";
import './BarcodeBoard.css'
import Icon from '../../assets/images/MoodCloud/cloud1.png'
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
    return (
        <>
            <div className="boardWrapper">
                <div className="boardTitle">
                    {ticket.nickname}&nbsp;님의&nbsp;<span style={{color:"#FF7A45"}}>티켓</span>
                </div>
                <div className="ticketBtnWrapper">
                    <div>
                        <GrCopy  className="ticketIcon" size="24"/>
                    </div>
                    <div>
                        <MdOutlineFileDownload  className="ticketIcon" size="28"/>
                    </div>
                </div>
                <div className="tickerContainerWrapper">
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
                                    size={160}
                                    level={"H"}
                                    includeMargin={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="barcodeContainer">
                            <div className="barcodeTitle">무코</div>
                            <div className="barcode">
                                <img src={ticket.barcodeUrl}/>
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
        </>
    )
}
export default BarcodeBoard;