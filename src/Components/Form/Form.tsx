import React, {
  useCallback,
  PointerEvent,
  useState,
  useRef,
  // useMemo,
  // ChangeEvent,
} from "react";
import Keybord from "../Keybord/Keybord";
import "./Form.css";

function Form(): JSX.Element {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [visibleNumber, setVisibleNumber] = useState("+7(___)___-__-__");
  const refCheckbox = useRef(null);

  // const isDisabled = useMemo(() => {
  //   return phoneNumber.length < 10 || !refCheckbox.current?.['checked'];
  // }, [phoneNumber.length]);

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

  const handleClick = useCallback((event: PointerEvent<HTMLButtonElement>): void => {
    const target = event.target as HTMLButtonElement;

    let newPhoneNumber = "";

    if (target.value === "delete") {
      newPhoneNumber = phoneNumber.slice(0, phoneNumber.length - 1);
    } else {
      const copyNewPhone = phoneNumber + target.value;
      newPhoneNumber = copyNewPhone;
      if (copyNewPhone.length > 10) {
        newPhoneNumber = copyNewPhone.slice(0, 10);
      }
    }
    setPhoneNumber(newPhoneNumber);
    const formatedPhone = formatPhoneNumber(newPhoneNumber);
    visiblePhoneNumber(formatedPhone);
  }, [phoneNumber]);

  // const onInput = (event: ChangeEvent<HTMLInputElement>) => {
  //   console.dir(event);
  // }

  return (
    <form className="Form" onSubmit={() => alert('Submit')}>
      <input
        type="tel"
        value={visibleNumber}
        className="inputTel"
        readOnly
        // onChange={onInput}
      />
      <p>
        и с Вами свяжется наш менеждер для
        <br /> дальнейшей консультации
      </p>
      <Keybord onClick={handleClick} />
      <div className="checkboxWrapper">
        <input
          type="checkbox"
          id="consentPerson"
          className="inputCheckbox"
          ref={refCheckbox}
        />
        <label htmlFor="consentPerson">
          Согласие на обработку персональных данных
        </label>
      </div>
      <button
        type="submit"
        // disabled={isDisabled}
        className="ButtonSubmit"
      >
        ПОДТВЕРДИТЬ НОМЕР
      </button>
    </form>
  );
}

export default Form;
