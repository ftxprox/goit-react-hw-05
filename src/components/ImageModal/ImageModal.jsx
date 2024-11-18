import Modal from 'react-modal';
import s from './ImageModal.module.css'

Modal.setAppElement('#root');


function ImageModal({ isOpen, onRequestClose, largeImageURL, alt }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={s.modal}
      overlayClassName={s.overlay}
    >
      <img src={largeImageURL} alt={alt} className={s.largeImage} />
    </Modal>
  );
}

export default ImageModal;