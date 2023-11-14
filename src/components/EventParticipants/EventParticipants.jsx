import './EventParticipants.css'

//초대 링크 복사 및 노티스
const EventParticipants = ({users}) => {

    const profile = ({users}) => {
        const count = users.length <= 6 ? users.length-1 : 5;
        const arr = [];
        for(let i = 0; i <= count; i++){
            arr.push(
            <div className="box">
                <img className="profile" src = {users[i]}/>
            </div>)
        }
        return (arr);
    }

    return (
        <>
            <div class="block">
                {profile({users})}
                <div className='countbox'>
                    +{users.length}
                </div>
            </div>
        </>
    );
};
export default EventParticipants;