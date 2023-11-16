import './MoodCloud.css';
import Icon from '../../assets/images/MoodCloud/cloud1.png'
import { useNavigate } from 'react-router-dom';
const MoodCloudList = ({title, id}) => {
    const navigate = useNavigate();

    const goToTicket= () => {
        navigate(`/ticket/${id}`);
    }

    const fetchBarcodeListData = async () => {
        try {
          const response = await axios.get(`/api/v1/barcode/list`);
          const barcodeList = response.data;
        } catch (error) {
          console.error("Error fetching data", error);
        }
      };//useEffect

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
    const barcodeList = [
        {
            id: "123",
            imageUrl: "https://via.placeholder.com/150",
            title: "2023-10-20"
        },
        {
            id: "456",
            imageUrl: "https://via.placeholder.com/150",
            title: "2023-10-21"
        },
        {
            id: "789",
            imageUrl: "https://via.placeholder.com/150",
            title: "2023-10-22"
        }
    ];
    return (
        <>
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
        </>
    )
}

export default MoodCloud;