import './MoodCloud.css';
import Icon from '../../assets/images/MoodCloud/cloud1.png'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBarcodeList } from '../../redux/barcodeListSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';

const MoodCloudList = ({title, id}) => {
    const navigate = useNavigate();

    const goToTicket= () => {
        navigate(`/ticket/${id}`);
    }

    return (
        <>
            <div className="cloudWrapper" onClick={goToTicket}>
                <div className="cloudIconWrapper">
                    <img className="cloudIcon" src={Icon}/>
                </div>
                <div className="cloudTitleWrapper">
                    <div className="cloudTitle">{title}</div>
                </div>
            </div>
        </>
    );
}

const MoodCloud = () => {
    const dispatch = useDispatch();
    const barcodeList = useSelector((state) => state.barcodeList.barcodeList);
    const getAccessCookie = localStorage.getItem("accessCookie");
    
    const fetchBarcodeListData = async () => {
        try {
          const response = await axios.get(`/api/v1/barcode/list`,{
            headers: { Authorization: `Bearer ${getAccessCookie}` }
          });
          //리덕스
          const { barcodeList } = response.data;
          console.log(response.data);
          dispatch(setBarcodeList({barcodeList}));
        } catch (error) {
          console.error("Error fetching data", error);
          if(error.response.statusText === "USER_NOT_FOUND"){
            alert("다시 로그인해주세요");
            //로그아웃
            navigate(`/`);
          }
        }
      };

      useEffect(()=>{
        fetchBarcodeListData();
      })
      
    return (
        <>{
            barcodeList.length === 0 ? <></> :
            <div className='mCWrapper'>
                <div className='mCTitle'>
                    무드 클라우드
                </div>
                <div className="cloudList">
                    {barcodeList.map((item) => <MoodCloudList title={item.title} id = {item.id}></MoodCloudList> )}
                    <div className='marginB'></div>
                    <div className='marginB'></div>
                </div>
            </div>
            }
        </>
    )
}

export default MoodCloud;