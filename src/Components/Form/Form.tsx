import React, {
  useCallback,
  PointerEvent,
  useState,
  useMemo,
  useEffect,
  useContext,
} from "react";
import Keybord from "../Keybord/Keybord";
import "./Form.css";
import PageContext from "../../Context/PageContext";

function Form(): JSX.Element {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [visibleNumber, setVisibleNumber] = useState("+7(___)___-__-__");
  const [checkbox, setCheckbox] = useState(false);
  const [error, setError] = useState(false);

  const changeStep = useContext(PageContext);
  const classesForTel = useMemo((): string => {
    return `inputTel ${error ? 'error': ''}`;
  }, [error]);

  function handleKeyPress(event: KeyboardEvent) {
    handlePhoneNumber(event.key);
  }

  const isDisabled = useMemo(() => {
    return phoneNumber.length < 10 || !checkbox;
  }, [phoneNumber, checkbox]);

  const handlePhoneNumber = useCallback(
    (userInput: string) => {
      let newPhoneNumber = "";
      setError(false);

      if (userInput === "delete" || userInput === "Backspace") {
        newPhoneNumber = phoneNumber.slice(0, phoneNumber.length - 1);
      } else {
        if (Number(userInput) || Number(userInput) === 0) {
          const copyNewPhone = phoneNumber + userInput;
          newPhoneNumber = copyNewPhone;
          if (copyNewPhone.length > 10) {
            newPhoneNumber = copyNewPhone.slice(0, 10);
          }
        } else {
          newPhoneNumber = phoneNumber;
        }
      }
      setPhoneNumber(newPhoneNumber);
      const formatedPhone = formatPhoneNumber(newPhoneNumber);
      visiblePhoneNumber(formatedPhone);
    },
    [phoneNumber]
  );

  const validateNumber = async (number: number): Promise<boolean> => {
    const response =  await fetch(`https://apilayer.net/api/validate?access_key=b63d6b11c2871c38f0d17ff886cf438e&country_code=RU&number=${number}`)
    const json = await response.json();
    return Boolean(json.valid);
  }

  const formatPhoneNumber = (phoneNumber: string): string => {
    const phoneLength = phoneNumber.length;
    let newPhoneNumber = "";

    if (phoneLength < 11) {
      for (let i = phoneLength; i <= 10; i++) {
        phoneNumber += "_";
      }
      newPhoneNumber = phoneNumber;
    }
    return newPhoneNumber;
  };

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
    const isValid = await validateNumber(Number(phoneNumber));
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
    <form className="Form" onSubmit={(e) => e.preventDefault()}>
      <input type="tel" value={visibleNumber} className={classesForTel} readOnly />
      <p>
        и с Вами свяжется наш менеждер для
        <br /> дальнейшей консультации
      </p>
      <Keybord onClick={handleClick} />
      {!error ? (
        <div className="checkboxWrapper">
        <input
          type="checkbox"
          id="consentPerson"
          className="inputCheckbox"
          onChange={() => setCheckbox(!checkbox)}
        />
        <label htmlFor="consentPerson">
          Согласие на обработку персональных данных
        </label>
      </div>
      ) : (<p className="error">Неверно введен номер</p>)}
      <button
        type="submit"
        disabled={isDisabled}
        className="ButtonSubmit"
        onClick={onSubmit}
      >
        ПОДТВЕРДИТЬ НОМЕР
      </button>
    </form>
  );
}

export default Form;
