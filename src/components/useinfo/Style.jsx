import styled from 'styled-components';
import InfoBarcord from "../../assets/images/userinfo/infoBarcord.svg";
import EditImoge from "../../assets/images/userinfo/editImoge.svg";
import Cloud from "../../assets/images/userinfo/cloud.svg";
import Profile from "../../assets/images/userinfo/profile.svg";

const BookContainer = styled.div`
display: flex;
position: absolute;
top: 12.5rem;
left: 0.9rem;
width: 22.5rem;
height: 15rem;
border-radius: 4px;
border-radius: 0px 4px 0px 0px;
background: linear-gradient(180deg, rgba(235, 237, 238, 0.74) 0%, rgba(253, 251, 251, 0.63) 100%);
box-shadow: 0px -1px 4px 0px rgba(0, 0, 0, 0.50);
`

const CloudImage = styled.div`
position: absolute;
width: 120px;
height: 100px;
background-image: url(${Cloud});
`

const BarcordImage =styled.div`
position: absolute;
width: 120px;
height: 100px;
`
// BarcordImage가 CloudImage 내부에 위치하도록

const FirstCloud = styled.div`
position: absolute;
top: 2.5rem;
left: 0.625rem;
background-image: url(${props => props.url}});
`

const SecondCloud = styled.div`
position: absolute;
top: 7.68rem;
left: 8.125rem;
background-image: url(${props => props.url}});
`

const ThirdCloud = styled.div`
position: absolute;
top: 1rem;
left: 14.5rem;
background-image: url(${props => props.url}});
`

const Book2Container = styled.div`
display: flex;
position: absolute;
top: 29.6rem;
left: 0.9rem;
width: 22.5rem;
height: 15rem;
border-radius: 4px;
border-radius: 0px 4px 0px 0px;
background: linear-gradient(180deg, rgba(235, 237, 238, 0.74) 0%, rgba(253, 251, 251, 0.63) 100%);
box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.50);
`

// 29.68rem 하면 기존 여백 있게

const EditButton = styled.div`
position:absolute;
top: 0.9rem;
right: 0.9rem;
width: 18px;
height: 18px;
background-image: url(${EditImoge});
opacity: ${props => props.confirm ? '0.5;' : '1;'} 
`

const ProfileBox = styled.div`
position: absolute;
top: 2rem;
left: 0.625rem;
width: 100px;
height: 140px;
background-image: url(${Profile});
`
// ${props => props.left}
// ${props => !props.editable && `display: none;`}

const Images = styled.img`
position: absolute;
height: 100%;    
width: 100%;     
objectFit: 'cover';
backgroundSize: 'contain';
`

const Question = styled.div`
color: #5E5E5E;
font-size: 8px;
font-style: normal;
font-weight: 400;
line-height: normal;
`

const Answer = styled.input`
color: #5E5E5E;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
color: #000;
width: 115px;
border: none;
background-color: transparent;
border-bottom: ${props => props.edit ? 'solid #DDD 1px;' : 'none;'}
outline: none;

::placeholder {
  color: #AAA; 
  font-size: 10px; 
}

`

const NickName = styled.div`
display: block;
position: absolute;
font-size: 12px;
top: 2.875rem;
left: 8.125rem;
width: auto;
height: 27px;
`

const Date = styled.div`
display: block;
position: absolute;
font-size: 12px;
top: 4.8125rem;
left: 8.125rem;
width: auto;
height: 27px;
`

const Sex = styled.div`
display: block;
position: absolute;
font-size: 12px;
top: 6.75rem;
left: 8.125rem;
width: auto;
height: 27px;
`

const DateOfIssue = styled.div`
display: block;
position: absolute;
font-size: 12px;
top: 8.75rem;
left: 8.125rem;
width: auto;
height: 27px;
color: #000;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: normal;
`

const NunberBarcord = styled.div`
display: block;
position: absolute;
font-size: 12px;
top: 8.75rem;
right: 1rem;
width: auto;
height: 27px;
color: #000;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: normal;
`

const UserBarcord = styled.div`
position: absolute;
width: 360px;
height: 50px;
top: 11.8rem;
left: 0;
`

const InputProfile = styled.input`
position: absolute;
width: 1px;
height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip:rect(0,0,0,0);
  border: 0;
`

const ProfileLabel = styled.label`
  position: absolute;
  display: flex;
  padding: 49px;
  text-align: center;
  align-items: center;  // 수직 중앙 정렬
  justify-content: center;  // 수평 중앙 정렬
  top: 2rem;
  left: 0.625rem;
  width: 99px;  
  height: 140px; 
  cursor: pointer;
  border-radius: 4px;  
  border: 1px solid var(--gray-scale-gray-300-border, #CBCBCB);
  background: rgba(94, 94, 94, 0.50);

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #FAFAFA;
  padding: 0;
`
// 위 padding: 49px만 있을 땐 글자가 같이 축소해서 수직 일렬로 섰는데,
// 아래 padding: 0을 추가하니 글자가 컨테이너 내부에서 완벽하게 중앙 정렬이 되었음.

const SendUserInfo = styled.button`
position: absolute;
left: 6.2rem;
top: 17.2rem;
width: 10rem;
height: 2.4rem;
border-radius: 4px;
border: 1px solid #CBCBCB;
background: transparent;
color: #CBCBCB;
text-align: center;
`;


export const S = {
    BookContainer,
    CloudImage,
    BarcordImage,
    FirstCloud,
    SecondCloud,
    ThirdCloud,
    Book2Container,
    EditButton,
    ProfileBox,
    Images,
    Question,
    Answer,
    NickName,
    Date,
    Sex,
    DateOfIssue,
    NunberBarcord,
    UserBarcord,
    InputProfile,
    ProfileLabel,
    SendUserInfo
}