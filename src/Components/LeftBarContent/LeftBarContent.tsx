import Form from "../Form/Form";
import styles from "./LeftBarContent.module.css";

function LeftBarContent(): JSX.Element {
  return (
    <div className={styles.LeftBarContent}>
      <p>
        Введите ваш номер <br /> мобильного телефона
      </p>
      <Form />
    </div>
  );
}

export default LeftBarContent;
