import './MoodCloud.css';
import Icon from '../../assets/images/MoodCloud/cloud1.png'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBarcodeList } from '../../redux/barcodeListSlice';
import { useSelector } from 'react-redux';
import { apiClient } from '../../api/ApiClient';
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
    //const dispatch = useDispatch();
    //const barcodeList = useSelector((state) => state.barcodeList.value);
    const [barcodeList, setBarcodeList] = useState();
    const getAccessCookie = localStorage.getItem("accessCookie");
    console.log(barcodeList);
    const fetchBarcodeListData = async () => {
        try {
          const response = await apiClient.get(`/api/v1/barcode/list`,{
            headers: { Authorization: `Bearer ${getAccessCookie}` }
          });
          //리덕스
          console.log(response.data);
          setBarcodeList(response.data);
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
      },[]);
    
    if(!barcodeList)
        return (null);

    return (
        <>{
            barcodeList.length === 0 ? 
            <div className='mCWrapper'>
            <div className='mCTitle'>
                무드 클라우드
            </div> 
            </div>:
            <div className='mCWrapper'>
                <div className='mCTitle'>
                    무드 클라우드
                </div>
                <div className="cloudList">
                    {barcodeList.barcodeList.map((item) => <MoodCloudList title={item.title} id = {item.id}></MoodCloudList> )}
                    <div className='marginB'></div>
                    <div className='marginB'></div>
                </div>
            </div>
            }
        </>
    )
}

export default MoodCloud;