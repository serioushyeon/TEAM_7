import Modal from 'react-modal';
import './EventModal.css';
const EventModal = ({modalIsOpen, closeModal, mainContent, highlight, end ,notice, action}) => {
    const customModalStyles = {
        overlay: {
          backgroundColor: " rgba(0, 0, 0, 0.4)",
          width: "100%",
          height: "100vh",
          zIndex: "10",
          position: "absolute",
          top: "0",
          left: "0",
        },
        content: {
        borderStyle: "none",
        width: "70%",
        height: "6.25rem",
        zIndex: "150",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "10px",
        boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
        backgroundColor: "rgba(0, 0, 0, 0.66)",
        justifyContent: "center",
        overflow: "auto",
        },
      };

    return(
        <Modal style={customModalStyles}ariaHideApp={false} isOpen={modalIsOpen} shouldCloseOnOverlayClick={false}>
            <div className="modalWrapper">
                <div className='modalContent'>{mainContent} <span className='highlight'>{highlight}</span>{end}</div>
                <div className='notice'>{notice}</div>
                <div className='modalBtnWrapper'>
                    <button className='modalBtn' onClick={closeModal}>아니오</button>
                    <button className='modalBtn'>예</button>
                </div>
            </div>
        </Modal>
    );
}
export default EventModal;