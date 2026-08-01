import { useState, useEffect } from "react";
import type { ContactModel } from "../../models/ContactModel";
import * as contactsServices from "../../Utility/contactsServices";
import { ButtonResponse } from "../../models/ButtonResponse";
import type { ContactCreateDTO } from "../../DTOs/ContactCreateDTO";

export function useContacts() {
  const [contactList, setContactList] = useState<ContactModel[]>([]);

  function fetchContacts(): void {
    contactsServices.getAllContacts().then((tempContactList) => {
      setContactList(tempContactList);
    });
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  //in: contact - out: Promise<boolean> isSuccess
  async function handleToggleFavorite(
    favoriteContact: ContactModel,
  ): Promise<ButtonResponse> {
    try {
      const updateContactDTO = {
        contactId: favoriteContact.contactId,
        fullName: favoriteContact.fullName,
        phone: favoriteContact.phone,
        email: favoriteContact.email,
        isFavorite: !favoriteContact.isFavorite,
      };
      const isSuccess = await contactsServices
        .updateContact(updateContactDTO)
        .then((responseIsSuccess: boolean) => {
          setContactList((prevState) => {
            return prevState.map((obj) => {
              if (obj.contactId == favoriteContact.contactId) {
                return { ...obj, isFavorite: !obj.isFavorite };
              }
              return obj;
            });
          });
          return responseIsSuccess;
        });
      const buttonResponse = new ButtonResponse(
        isSuccess,
        isSuccess ? "Favorite added." : "Error adding favorite",
      );

      return buttonResponse;
    } catch (error) {
      console.log(error);
      return { isSuccess: false, msg: `${error}` };
    }
  }

  async function handleDeleteContact(
    oldContact: ContactModel,
  ): Promise<ButtonResponse> {
    try {
      const isSuccess = await contactsServices.deleteContact(
        oldContact.contactId,
      );

      if (isSuccess) {
        setContactList((prevState) => {
          return prevState.filter(
            (obj) => obj.contactId != oldContact.contactId,
          );
        });
        return new ButtonResponse(true, "Contact deleted.");
      } else {
        return new ButtonResponse(false, "Error deleting contact");
      }
    } catch (error) {
      console.log(error);
      return new ButtonResponse(false, `${error}`);
    }
  }

  async function handleAddContact(
    newContact: ContactCreateDTO,
  ): Promise<ButtonResponse> {
    try {
      // validate input
      newContact.isFavorite = false;
      if (
        newContact.fullName == "" ||
        newContact.phone == "" ||
        newContact.email == ""
      ) {
        return new ButtonResponse(false, "One or more fields is empty!");
      }

      const duplicateContact = contactList.find((contact) => {
        if (
          (contact.fullName === newContact.fullName ||
            contact.phone === newContact.phone ||
            contact.email === newContact.email) &&
          newContact.email &&
          newContact.fullName &&
          newContact.phone
        ) {
          console.log(contact.fullName, newContact.fullName);
          return true;
        }
        return false;
      });
      if (duplicateContact) {
        return new ButtonResponse(false, "Duplicate record.");
      }
      // push contact to database

      const newContactId = await contactsServices
        .createContact(newContact)
        .then((id) => {
          return id;
        });
      // set up contact for state update
      const finalContact: ContactModel = {
        fullName: newContact.fullName,
        phone: newContact.phone,
        isFavorite: newContact.isFavorite,
        email: newContact.email,
        contactId: newContactId,
      };

      // check if contact was added correctly
      const isSuccess = newContactId == -1 ? false : true;

      if (isSuccess) {
        setContactList((prevState) => {
          return prevState.concat(finalContact);
        });
        return new ButtonResponse(isSuccess, "Contact added");
      } else {
        return new ButtonResponse(isSuccess, "Error adding contact");
      }
    } catch (error) {
      console.log(error);
      return new ButtonResponse(false, `${error}`);
    }
  }

  async function handleUpdateContact(
    contact: ContactModel,
  ): Promise<ButtonResponse> {
    try {
      const updateContactDTO = {
        contactId: contact.contactId,
        fullName: contact.fullName,
        phone: contact.phone,
        email: contact.email,
        isFavorite: contact.isFavorite,
      };
      const isSuccess = await contactsServices
        .updateContact(updateContactDTO)
        .then((updateWasSuccessful) => {
          return updateWasSuccessful;
        });
      if (isSuccess) {
        setContactList((prevState) => {
          // if id matches current obj, update it, else don't touch it
          return prevState.map((obj: ContactModel) => {
            if (obj.contactId == contact.contactId) {
              return {
                ...obj,
                fullName: contact.fullName,
                email: contact.email,
                phone: contact.phone,
              };
            }
            return obj;
          });
        });
        setSelectedContact(null);
        setIsUpdating(false);
      }
      return new ButtonResponse(
        isSuccess,
        isSuccess ? "Contact updated" : "Error updating contact",
      );
    } catch (error) {
      console.log(error);
      return new ButtonResponse(false, `${error}`);
    }
  }

  // the below states deal with updating user info
  const [selectedContact, setSelectedContact] = useState<ContactModel | null>(
    null,
  );
  const [isUpdating, setIsUpdating] = useState(false);

  // in: newSelectedContact out: response
  function handlePencilClick(newSelectedContact: ContactModel): ButtonResponse {
    try {
      setSelectedContact(newSelectedContact);
      setIsUpdating(true);
      const response: ButtonResponse = {
        isSuccess: true,
        msg: "Editing contact",
      };
      return response;
    } catch (error) {
      const response: ButtonResponse = {
        isSuccess: false,
        msg: "Error editing contact",
      };
      console.log(error);
      return response;
    }
  }

  function handleCancelUpdateContact(): ButtonResponse {
    try {
      setSelectedContact(null);
      setIsUpdating(false);
      return new ButtonResponse(true, "Cancelled");
    } catch (error) {
      console.log(error);
      return new ButtonResponse(false, "Error cancelling");
    }
  }

  return {
    contactList,
    selectedContact,
    isUpdating,
    fetchContacts,
    setSelectedContact,
    setIsUpdating,
    handleAddContact,
    handleToggleFavorite,
    handleUpdateContact,
    handleDeleteContact,
    handleCancelUpdateContact,
    handlePencilClick,
  };
}
