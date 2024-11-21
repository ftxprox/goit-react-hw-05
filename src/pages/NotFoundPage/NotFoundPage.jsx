import s from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>404</h1>
      <p className={s.message}>The page does not exist.</p>
    </div>
  );
};

export default NotFoundPage;