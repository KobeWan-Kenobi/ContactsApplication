import { useState, useEffect } from "react";
import React from "react";
import Contact from "./Contact";
import FavoriteContact from "./FavoriteContact";
import GeneralContact from "./GeneralContact";
import AddContact from "./AddContact";
import AddRandomContact from "../AddRandomContact";
import getAllContacts from "../../Utility/ContactsServices";
import TestGetAllContactsApiCall from "./TestApiCall";
import axios from "axios";
function ContactIndexNew() {
  const [contactList, setContactList] = useState(null);
  useEffect(() => {
    getAllContacts().then((list) => {
      setContactList(list);
    });
  }, []);

  // the below states deal with updating user info
  const [selectedContact, setSelectedContact] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  function handlePencilClick(contact) {
    setSelectedContact(contact);
    setIsUpdating(true);
  }
  // The function that modifies a state must exist at the same file as the state definition!!!
  function handleToggleFavorite(favoriteContact) {
    setContactList((prevState) => {
      return prevState.map((obj) => {
        if (obj.id == favoriteContact.id) {
          return { ...obj, isFavorite: !obj.isFavorite };
        }
        return obj;
      });
    });
  }
  // update using similar pattern as handleToggleFavorite
  function handleUpdateContact(contact) {
    setContactList((prevState) => {
      return prevState.map((obj) => {
        if (obj.id == contact.id) {
          return {
            ...obj,
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
          };
        }
        return obj;
      });
    });
    setSelectedContact(null);
    setIsUpdating(false);
    return {
      status: "success",
      msg: "Contact was updated successfully.",
    };
  }

  // validates contacts and adds them to contactList with setContactList; returns message depending on success
  function handleAddContact(newContact) {
    if (
      newContact.name == "" ||
      newContact.phone == "" ||
      newContact.email == ""
    ) {
      return { status: "error", msg: "One or more fields is empty!" };
    }
    const duplicateContact = contactList.find((contact) => {
      if (
        contact.name === newContact.name ||
        contact.phone === newContact.phone ||
        contact.email === newContact.email
      ) {
        return true;
      }
      return false;
    });
    if (duplicateContact) {
      return { status: "error", msg: "Duplicate record." };
    }

    // if the contactList is empty the id should be zero, if not it should be the last element's id + 1
    const newFinalContactId =
      contactList.length == 0 ? 0 : contactList[contactList.length - 1].id + 1;

    const newFinalContact = {
      ...newContact,
      id:
        contactList.length > 0 ? contactList[contactList.length - 1].id + 1 : 0,
      isFavorite: false,
    };

    setContactList((prevState) => {
      return prevState.concat([newFinalContact]);
    });
    return {
      status: "success",
      msg: "Contact was added successfully.",
    };
  }

  function handleAddRandomContact(newContact) {
    const duplicateContact = contactList.find((contact) => {
      if (
        contact.name === newContact.name ||
        contact.phone === newContact.phone ||
        contact.email === newContact.email
      ) {
        return true;
      }
      return false;
    });
    if (duplicateContact) {
      return { status: "error", msg: "Duplicate record." };
    }

    // if the contactList is empty the id should be zero, if not it should be the last element's id + 1
    const newFinalContactId =
      contactList.length == 0 ? 0 : contactList[contactList.length - 1].id + 1;

    const newFinalContact = {
      ...newContact,
      id:
        contactList.length > 0 ? contactList[contactList.length - 1].id + 1 : 0,
      isFavorite: false,
    };

    setContactList((prevState) => {
      return prevState.concat([newFinalContact]);
    });
    return {
      status: "success",
      msg: "Contact was added successfully.",
    };
  }

  function handleDeleteContact(oldContact) {
    setContactList((prevState) => {
      return prevState.filter((obj) => obj.id != oldContact.id);
    });
  }

  function handleRemoveAllContacts() {
    setContactList([]);
  }
  function handleCancelUpdateContact() {
    setSelectedContact(null);
    setIsUpdating(false);
  }
  // verify the following functions when you Claude recharges
  // function handleAddContact(newContact){
  //   setContactList(prevState=>{
  //     return{
  //       ...prevState, newContact
  //     }
  //   })
  // }

  // function handleDeleteContact(oldContact){
  //   setContactList(prevState=>{
  //     prevState.filter(obj=>{
  //       obj.id != oldContact.id
  //     })
  //   })
  // }
  return (
    <div className="container" style={{ minHeight: "85vh" }}>
      <div className="py-3">
        <div className="row py-2"></div>
        <div className="py-2">
          <div className="col-12">
            <AddContact
              handleAddContact={handleAddContact}
              handleUpdateContact={handleUpdateContact}
              isUpdating={isUpdating}
              selectedContact={selectedContact}
              handleCancelUpdateContact={handleCancelUpdateContact}
              handleAddRandomContact={handleAddRandomContact}
            />
          </div>
          <div className="row py-2">
            <div className="col-5">
              <button
                className="btn btn-danger form-control"
                onClick={handleRemoveAllContacts}
              >
                Remove All Contacts
              </button>
            </div>
          </div>
          <TestGetAllContactsApiCall />
          <div className="col-12">
            {contactList && (
              <FavoriteContact
                favoriteClick={handleToggleFavorite}
                deleteContact={handleDeleteContact}
                updateClick={handlePencilClick}
                contacts={contactList.filter((u) => u.isFavorite == true)}
              />
            )}
            {contactList && (
              <GeneralContact
                favoriteClick={handleToggleFavorite}
                deleteContact={handleDeleteContact}
                updateClick={handlePencilClick}
                contacts={contactList.filter((u) => u.isFavorite == false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactIndexNew;
