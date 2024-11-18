import s from './ImageCard.module.css'

    function ImageCard({ image, onClick}) {
  return (
    <div className={s.imageCard} onClick={onClick}>
      <img src={image.urls.small} alt={image.alt_description} className={s.image} />
    </div>
  );
}

export default ImageCard;