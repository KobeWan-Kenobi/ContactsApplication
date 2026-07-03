import Contact from "./Contact";
function GeneralContact(props) {
  if (props.contacts.length != 0) {
    return (
      <div
        className="col-12 p-1 bg-secondary-subtle"
        style={{ borderRadius: "20px" }}
      >
        <div className="text-center text-black-50">Contacts</div>
        {/* The following is an IMPORTANT KEY CONCEPT:
          1) filtering an array from a parent component 
          2) rendering the child component several times for each match from array*/}
        {props.contacts.map((contact, index) => (
          <Contact
            favoriteClick={props.favoriteClick}
            updateClick={props.updateClick}
            contact={contact}
            key={index}
            deleteContact={props.deleteContact}
          />
        ))}
      </div>
    );
  }
}

export default GeneralContact;
