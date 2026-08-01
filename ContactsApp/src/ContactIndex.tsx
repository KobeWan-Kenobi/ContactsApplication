
import FavoriteContact from "./FavoriteContact";
import GeneralContact from "./GeneralContact";
import AddContact from "./AddContact";
import ContactHeaders from "./ContactHeaders";
import { useContacts } from "./hooks/useContacts";
function ContactIndexNew() {
  const {
    contactList,
    selectedContact,
    isUpdating,
    handleAddContact,
    handleToggleFavorite,
    handleUpdateContact,
    handleDeleteContact,
    handleCancelUpdateContact,
    handlePencilClick,
  } = useContacts();

  return (
    <div className="container" style={{ minHeight: "85vh", outline:"none", border: "none" }}>
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
            />
          </div>
          <div className="col-12">
            <ContactHeaders />
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
            <div className="m-3"></div>
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
