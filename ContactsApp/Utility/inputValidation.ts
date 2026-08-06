import type { ContactDTO } from "../DTOs/ContactDTO"
import parsePhoneNumberFromString from "libphonenumber-js";
export function isUnique(
  newContact: Pick<ContactDTO,'fullName' | 'phone' | 'email'>,
  contactList: Pick<ContactDTO,'fullName' | 'phone' | 'email'>[],
): boolean {
  const duplicateContact = contactList.find((contact) => {
    if (
      (contact.fullName === newContact.fullName ||
        contact.phone === newContact.phone ||
        contact.email === newContact.email) &&
      newContact.email &&
      newContact.fullName &&
      newContact.phone
    ) {
      return true;
    }
    return false;
  });

  console.log("duplicateContact: ", duplicateContact);
  if (duplicateContact) {
    return false;
  } else {
    return true;
  }
}

export function isFilledForm(newContact: Pick<ContactDTO,'fullName' | 'phone' | 'email'>,): boolean {
  if (
    newContact.fullName == "" ||
    newContact.phone == "" ||
    newContact.email == ""
  ) {
    return false;
  } else return true;
}

export function formatPhoneNumber(phone: string): undefined | string {
  // format contact w/ libphonenumber-js

  const phoneObject = parsePhoneNumberFromString(phone, "US");
  const isValidPhoneNumber = phoneObject?.isValid() ?? false;


  if (!isValidPhoneNumber) {
    return;
  } else {
    return phoneObject?.formatNational();
  }
}
