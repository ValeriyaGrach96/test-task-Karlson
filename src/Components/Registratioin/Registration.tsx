import React, { useEffect, useMemo, useState } from "react";
import { Page } from "../../App";
import QRcode from "../../assets/images/QRcode.svg";
import styles from "./Registration.module.css";
interface Props {
  goBack: (newPage: Page) => void;
}

function Registration({ goBack }: Props): JSX.Element {
  const [isLanding, setLanding] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setLanding(true);
    }, 5000);
    return () => {
      clearTimeout(timeOut);
    }
  });

  const classesRegistration: string = useMemo(() => {
    return `${styles.Registration} ${isLanding ? styles.Active : ''}`;
  }, [isLanding]);

  return (
    <article className={classesRegistration} >
      <h3>
        ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША!
        <br /> ПОДАРИТЕ ЕМУ СОБАКУ!
      </h3>
      <img src={QRcode} alt="QR код" />
      <p>
        Сканируйте QR-код
        <br /> или нажмите ОК
      </p>
      <button
        type="button"
        className={styles.ButtonRegistration}
        onClick={() => goBack("registration")}
      >
        ок
      </button>
    </article>
  );
}

export default Registration;
