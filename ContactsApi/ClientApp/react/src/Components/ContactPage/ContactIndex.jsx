import { useState, useEffect } from "react";
import React from "react";
import Contact from "./Contact";
import FavoriteContact from "./FavoriteContact";
import GeneralContact from "./GeneralContact";
import AddContact from "./AddContact";
import AddRandomContact from "../AddRandomContact";
import * as contactsServices from "../../Utility/contactsServices";
import axios from "axios";
function ContactIndexNew() {
  const [contactList, setContactList] = useState(null);

  useEffect(() => {
    contactsServices.getAllContacts().then((list) => {
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
    const updateContactDTO = {
      contactId: favoriteContact.id,
      fullName: favoriteContact.name,
      phone: favoriteContact.phone,
      email: favoriteContact.email,
      isFavorite: !favoriteContact.isFavorite,
    };
    contactsServices.updateContact(updateContactDTO);
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
    const updateContactDTO = {
      contactId: contact.id,
      fullName: contact.name,
      phone: contact.phone,
      email: contact.email,
      isFavorite: contact.isFavorite,
    };
    contactsServices.updateContact(updateContactDTO);
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
    newContact.isFavorite = false;
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
    // push contact to database
    const contactCreateDTO = {
      fullName: newContact.name,
      phone: newContact.phone,
      email: newContact.email,
      isFavorite: false,
    };
    contactsServices.createContact(contactCreateDTO);

    setContactList((prevState) => {
      return prevState.concat(newContact);
    });
    console.log("contactList after adding a contact", contactList);
    return {
      status: "success",
      msg: "Contact was added successfully.",
    };
  }

  function handleAddRandomContact(newContact) {
    newContact.isFavorite = false;
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
    // push contact to database
    const contactCreateDTO = {
      fullName: newContact.name,
      phone: newContact.phone,
      email: newContact.email,
      isFavorite: false,
    };
    contactsServices.createContact(contactCreateDTO);

    setContactList((prevState) => {
      return prevState.concat(newContact);
    });
    return {
      status: "success",
      msg: "Contact was added successfully.",
    };
  }

  function handleDeleteContact(oldContact) {
    contactsServices.deleteContact(oldContact.id);
    setContactList((prevState) => {
      return prevState.filter((obj) => obj.id != oldContact.id);
    });
  }

  function handleCancelUpdateContact() {
    setSelectedContact(null);
    setIsUpdating(false);
  }
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
