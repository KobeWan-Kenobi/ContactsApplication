import parsePhoneNumberFromString from "libphonenumber-js";
export function formatPhoneNumber(phone: string): undefined | string {
  // format contact w/ libphonenumber-js

  const phoneObject = parsePhoneNumberFromString(phone, "US");
  const isValidPhoneNumber = phoneObject?.isValid() ?? false;

  console.log("phone, phoneObject, isValidPhoneNumber");
  console.log(phone, phoneObject, isValidPhoneNumber);

  if (!isValidPhoneNumber) {
    return;
  } else {
   console.log("phoneObject?.formatNational(); ", phoneObject?.formatNational());
    return phoneObject?.formatNational();
  }
}
