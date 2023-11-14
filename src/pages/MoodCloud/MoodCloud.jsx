import './MoodCloud.css';
import Icon from '../../assets/images/MoodCloud/cloud1.png'
const MoodCloudList = ({title}) => {
    return (
        <>
            <div className="cloudWrapper">
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
    const title = ["2023-10-20", "2023-10-20", "2023-10-20", "2023-10-20","2023-10-20","2023-10-20","2023-10-20","2023-10-20","2023-10-20","2023-10-20","2023-10-20","2023-10-20"];
    return (
        <>
            <div className='mCWrapper'>
                <div className='mCTitle'>
                    <span className='highlight'>무드&nbsp;</span>클라우드
                </div>
                <div className="cloudList">
                    {title.map((item) => <MoodCloudList title={item}></MoodCloudList> )}
                    <div className='marginB'></div>
                    <div className='marginB'></div>
                </div>
            </div>
        </>
    )
}

export default MoodCloud;