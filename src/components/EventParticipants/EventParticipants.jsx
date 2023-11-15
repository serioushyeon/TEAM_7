import './EventParticipants.css'

//초대 링크 복사 및 노티스
const EventParticipants = (profileImgUrlList) => {
    const arr = [];
    const profile = ({profileImgUrlList}) => {
        const count = profileImgUrlList.length <= 6 ? profileImgUrlList.length-1 : 5;
        for(let i = 0; i <= count; i++){
            arr.push(
            <div className="box">
                <img className="profile" src = {profileImgUrlList[i]}/>
            </div>)
        }
        return (arr);
    }

    return (
        <>
            <div class="block">
                {profile({profileImgUrlList})}
                <div className='countbox'>
                    +{arr.length}
                </div>
            </div>
        </>
    );
};
export default EventParticipants;