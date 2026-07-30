import ContactComponent from "./ContactComponent";
import type { ContactModel } from "../models/ContactModel";
import { ButtonResponse } from "../models/ButtonResponse";

interface FavoriteContactProps {
  favoriteClick: (favoriteContact: ContactModel) => Promise<ButtonResponse>;
  deleteContact: (oldContact: ContactModel) => Promise<ButtonResponse>;
  updateClick: (handlePencilClick: ContactModel) => ButtonResponse;
  contacts: ContactModel[];
}
function FavoriteContact(props: FavoriteContactProps) {
  if (props.contacts.length != 0) {
    return (
      <div
        className="col-12 p-1 bg-secondary-subtle"
        style={{ borderRadius: "20px" }}
      >
        <div className="text-center text-black">
          <h4>Favorites</h4>
        </div>

        {/* The following is an IMPORTANT KEY CONCEPT:
          1) filtering an array from a parent component 
          2) rendering the child component several times for each match from array*/}
        {props.contacts.map((contact) => (
          <ContactComponent
            favoriteClick={props.favoriteClick}
            deleteContact={props.deleteContact}
            updateClick={props.updateClick}
            contact={contact}
            key={contact.contactId}
          />
        ))}
      </div>
    );
  }
}

export default FavoriteContact;
