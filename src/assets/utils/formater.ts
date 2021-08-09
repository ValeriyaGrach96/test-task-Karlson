export function newPhoneByInput(userInput: string, phoneNumber: string): string {
  let newPhoneNumber = phoneNumber;

  if (["delete", "Backspace"].includes(userInput)) {
    newPhoneNumber = phoneNumber.slice(0, phoneNumber.length - 1);
  } else if (Number(userInput) >= 0 && newPhoneNumber.length <= 9) {
    newPhoneNumber = phoneNumber + userInput;
  }
  return newPhoneNumber;
}

export function formatPhoneNumber(phoneNumber: string): string {
  if (phoneNumber.length < 11) {
    for (let i = phoneNumber.length; i <= 10; i++) {
      phoneNumber += "_";
    }
  }
  return phoneNumber;
}
