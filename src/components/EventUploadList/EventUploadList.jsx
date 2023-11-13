//본인이 올린 것이어야 삭제 가능
//->현재 접속 닉네임과 리스트의 닉네임이 일치해야 삭제 버튼 활성화
//닉네임을 몇자까지 표시할 것인지
//완료버튼 추가하기
import './EventUploadList.css'
import { IoIosAddCircleOutline } from "react-icons/io";
import { LiaTrashAltSolid } from "react-icons/lia"
const EventUploadBlock = ({users, onRemove}) => {
    return (
        <div className='list'>
            <div className="uploadlist">
                <div className='done'>
                    <input type="checkbox" id="check_btn"/>
                </div>
                <div className='nicknameBox'>나는 <span className='nickname'>{users.name}</span>이야!</div>
                <div className='count'>+{users.img.length}</div>
                <div className='btn'>
                    <button className="deleteBtn" onClick={() => onRemove(users.name)}>
                        <LiaTrashAltSolid size="24" color='white'/>
                    </button>
                </div>
            </div>
        </div>
    )
}
const EventUploadList = ({users, onRemove, isRoomMaker}) => {   
    return (
        <>
            <div className='eventUploadList'>
                {users.map((users) => (
                    <EventUploadBlock users = {users} key = {users.name} onRemove = {onRemove}/>
                ))}
                <div className="addList">
                    <button className="addListBtn">
                        <IoIosAddCircleOutline size="40" color="#F28B50"/>
                    </button>
                </div>
                {isRoomMaker ? 
                <div className='makeBarcode'>
                    <button className='makeBarcodeBtn'>
                        무코 생성
                    </button>
                </div>
                : <></>}
            </div>
        </>
    );
};
export default EventUploadList;