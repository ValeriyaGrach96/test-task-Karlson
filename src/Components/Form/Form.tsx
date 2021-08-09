import React, {
  useCallback,
  PointerEvent,
  useState,
  useMemo,
  useEffect,
  useContext,
} from "react";
import Keybord from "../Keybord/Keybord";
import styles from "./Form.module.css";
import PageContext from "../../Context/PageContext";
import api from "../../assets/API/API";
import { newPhoneByInput, formatPhoneNumber } from "../../assets/utils/formater";


function Form(): JSX.Element {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [visibleNumber, setVisibleNumber] = useState("+7(___)___-__-__");
  const [checkbox, setCheckbox] = useState(false);
  const [error, setError] = useState(false);

  const changeStep = useContext(PageContext);
  const classesForTel = useMemo((): string => {
    return `${styles.inputTel} ${error ? styles.error : ''}`;
  }, [error]);

  function handleKeyPress(event: KeyboardEvent) {
    handlePhoneNumber(event.key);
  }

  const isDisabled = useMemo(() => {
    return phoneNumber.length < 10 || !checkbox;
  }, [phoneNumber, checkbox]);

  const handlePhoneNumber = useCallback(
    (userInput: string) => {
      setError(false);
      const newPhoneNumber = newPhoneByInput(userInput, phoneNumber);
      setPhoneNumber(newPhoneNumber);
      visiblePhoneNumber(formatPhoneNumber(newPhoneNumber));
    },
    [phoneNumber]
  );

  const visiblePhoneNumber = (phoneNumber: string) => {
    const newPhone = `+7(${phoneNumber.slice(0, 3)})${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 8)}-${phoneNumber.slice(8, 10)}`;
    setVisibleNumber(newPhone);
  };

  const handleClick = useCallback(
    (event: PointerEvent<HTMLButtonElement>) => {
      const target = event.target as HTMLButtonElement;

      handlePhoneNumber(target.value);
    },
    [handlePhoneNumber]
  );

  const onSubmit = async () => {
    const isValid = await api.validateNumber(Number(phoneNumber));
    if(isValid) {
      changeStep('finish');
    } else {
      setCheckbox(false);
      setError(true);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <form className={styles.Form} onSubmit={(e) => e.preventDefault()}>
      <input type="tel" value={visibleNumber} className={classesForTel} readOnly />
      <p>
        и с Вами свяжется наш менеждер для
        <br /> дальнейшей консультации
      </p>
      <Keybord onClick={handleClick} />
      {!error ? (
        <div className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          id="consentPerson"
          className={styles.inputCheckbox}
          onChange={() => setCheckbox(!checkbox)}
        />
        <label htmlFor="consentPerson">
          Согласие на обработку персональных данных
        </label>
      </div>
      ) : (<p className={styles.error}>Неверно введен номер</p>)}
      <button
        type="submit"
        disabled={isDisabled}
        className={styles.ButtonSubmit}
        onClick={onSubmit}
      >
        ПОДТВЕРДИТЬ НОМЕР
      </button>
    </form>
  );
}

export default Form;
