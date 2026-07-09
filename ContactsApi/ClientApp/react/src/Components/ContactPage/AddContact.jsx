import { useState, useEffect } from "react";
import AddRandomContact from "../AddRandomContact";
function AddContact(props) {
  const [messages, setMessages] = useState({
    ErrorMessage: "",
    SuccessMessage: "",
  });
  // The below state stores the form's fields into a React state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    if (props.isUpdating && props.selectedContact) {
      setFormData({
        name: props.selectedContact.name,
        email: props.selectedContact.email,
        phone: props.selectedContact.phone,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
      });
    }
  }, [props.isUpdating, props.selectedContact]);
  function handleFormInputChange(userEvent) {
    //console.log(userEvent); // this logs the data to console, but doesn't actually display the change on the form
    setFormData({
      ...formData, // ignore the rest of the formData
      [userEvent.target.name]: userEvent.target.value, // update whatever the user has changed
    });
  }
  function handleAddContactButton(formData) {
    const contactData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    };

    try {
      let response = undefined;
      if (props.isUpdating && props.selectedContact) {
        response = props.handleUpdateContact({
          id: props.selectedContact.id, // need to pass id to prevent creating new contact
          isFavorite: props.selectedContact.isFavorite,
          ...contactData,
        });
      } else {
        response = props.handleAddContact(contactData);
      }
      if (response.status == "success") {
        setMessages({ errorMessages: undefined, successMessage: response.msg });
        if (!props.isUpdating) {
          setFormData({ name: "", phone: "", email: "" });
        }
      } else {
        setMessages({ errorMessage: response.msg, successMessage: undefined });
      }
    } catch (error) {
      console.log(error);
      setMessages({
        errorMessage: "Error encountered!",
        successMessage: undefined,
      });
    }
  }
  return (
    <div
      className="col-12 text-black p-2 bg-secondary-subtle"
      style={{ borderRadius: "20px", maxWidth: "30vw" }}
    >
      <form action={handleAddContactButton}>
        <div className="row p-2 justify-content-center text-black-50">
          {props.isUpdating ? "Update Contact" : "Add Contact"}
        </div>
        <div className="row p-2">
          <div className="col-12">
            <input
              placeholder="Name"
              name="name"
              onChange={handleFormInputChange} // explicitly tells react what to do when each letter is typed into the field; allows React to see each change
              value={formData.name} // binds the field to the formData variable
              className="form-control form-control-sm"
            />
          </div>
        </div>
        <div className="row p-2">
          <div className="col-12">
            <input
              placeholder="Phone"
              name="phone"
              onChange={handleFormInputChange}
              value={formData.phone}
              className="form-control form-control-sm"
            />
          </div>
        </div>
        <div className="row p-2">
          <div className="col-12">
            <input
              placeholder="Email"
              name="email"
              onChange={handleFormInputChange}
              value={formData.email}
              className="form-control form-control-sm"
            />
          </div>
        </div>
        <div className="row p-2 justify-content-center">
          <div className="p-2 col-6">
            <button // change btn color if updating contact
              type="submit"
              className={`btn btn-primary btn-sm m-1 ${props.isUpdating ? "btn-info" : "btn-success"} form-control`}
            >
              {props.isUpdating ? "UPDATE CONTACT" : "ADD CONTACT"}
            </button>
          </div>
          <div className="p-2 col-6">
            <AddRandomContact handleAddRandomContact={props.handleAddRandomContact} />
          </div>
          {props.isUpdating && (
            <div className="p-2 col-6">
              <button
                type="reset"
                onClick={() =>
                  props.handleCancelUpdateContact(props.selectedContact)
                }
                className="btn m-1 btn-danger btn-sm form-control"
              >
                CANCEL
              </button>
            </div>
          )}

          {messages.successMessage && (
            <div className="col-12 text-center text-success">
              {messages.successMessage}
            </div>
          )}
          {messages.errorMessage && (
            <div className="col-12 text-center text-danger">
              {messages.errorMessage}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddContact;
