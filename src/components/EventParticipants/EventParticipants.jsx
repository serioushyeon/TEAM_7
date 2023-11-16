import './EventParticipants.css'
import { useSelector } from 'react-redux';

//초대 링크 복사 및 노티스
const EventParticipants = () => {
    const users = useSelector((state) => state.eventList);

    const arr = [];
    const profile = () => {
        const count = users.userCount < 6 ? users.userCount-1 : 6;
        for(let i = 0; i <= count; i++){
            console.log(users.profileImgUrlList[i]);
            arr.push(
            <div className="box">
                <img className="profile" src = {users.profileImgUrlList[i]}/>
            </div>)
        }
        return (arr);
    }

    return (
        <>
            <div class="block">
                {profile()}
                <div className='countbox'>
                    +{arr.length}
                </div>
            </div>
        </>
    );
};
export default EventParticipants;