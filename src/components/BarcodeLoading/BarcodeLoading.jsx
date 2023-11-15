import {Background, LoadingText} from './BarcodeLoadingStyle';
import Spinner from '../../assets/images/Event/spinner.gif';

const BarcodeLoading = () => {
    return (
    <Background>
        <LoadingText>잠시만 기다려 주세요</LoadingText>
        <img src={Spinner} alt="로딩중" width="10%" />
    </Background>

    );
};
    
export default BarcodeLoading;