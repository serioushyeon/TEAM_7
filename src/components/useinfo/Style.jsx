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
background-color: #DE684F;
box-shadow: 8px 4px 4px 0px rgba(0, 0, 0, 0.50);
`

const CloudImage = styled.div`
position: absolute;
width: 120px;
height: 100px;
background-image: url(${Cloud});
`

const FirstCloud = styled.div`
position: absolute;
top: 2.5rem;
left: 0.625rem;
`

const SecondCloud = styled.div`
position: absolute;
top: 7.68rem;
left: 8.125rem;
`

const ThirdCloud = styled.div`
position: absolute;
top: 1rem;
left: 14.5rem;
`

const Book2Container = styled.div`
display: flex;
position: absolute;
top: 27.6rem;
left: 0.9rem;
width: 22.5rem;
height: 15rem;
border-radius: 4px;
background-color: #DE684F;
box-shadow: 8px 4px 4px 0px rgba(0, 0, 0, 0.50);
`

// 29.68rem 하면 기존 여백 있게

const EditButton = styled.div`
position:absolute;
top: 0.9rem;
right: 0.9rem;
width: 18px;
height: 18px;
background-image: url(${EditImoge});
`

const ProfileImage = styled.div`
position: absolute;
top: 2rem;
left: 0.625rem;
width: 100px;
height: 140px;
background-image: url(${Profile});
`
// ${props => !props.editable && `display: none;`}

const Question = styled.div`
color: #5E5E5E;
font-size: 8px;
font-style: normal;
font-weight: 400;
line-height: normal;
`

const Answer = styled.input`
color: #000;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: normal;
background-color: transparent;
border: none;
outline: none;
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
top: 12.8rem;
left: 0;
background-image: url(${InfoBarcord});
`

const InputProfile = styled.input`
position: absolute;
top: 2rem;
left: 0.625rem;
width: 100px;
height: 140px;
padding: 0;
margin: -1px;
overflow: hidden;

border: 0;
`

export const S = {
    BookContainer,
    CloudImage,
    FirstCloud,
    SecondCloud,
    ThirdCloud,
    Book2Container,
    EditButton,
    ProfileImage,
    Question,
    Answer,
    NickName,
    Date,
    Sex,
    DateOfIssue,
    NunberBarcord,
    UserBarcord,
    InputProfile
}