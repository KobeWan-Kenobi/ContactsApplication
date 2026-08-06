import { useState, useEffect, type ChangeEvent } from "react";
import { getRandomContactFromApi } from "../Utility/randomUserApi";
import type { RandomContactFromApi } from "../Utility/randomUserApi";
import { ButtonResponse } from "../models/ButtonResponse";
import type { ContactModel } from "../models/ContactModel";
import type { ContactCreateDTO } from "../DTOs/ContactCreateDTO";
import type { ContactDTO } from "../DTOs/ContactDTO";
import ConfirmAddModal from "./ConfirmAddModal";
import {
  isFilledForm,
  isUnique,
  formatPhoneNumber,
} from "../Utility/inputValidation";
interface AddContactProps {
  handleAddContact: (newContact: ContactCreateDTO) => Promise<ButtonResponse>;
  handleUpdateContact: (contact: ContactModel) => Promise<ButtonResponse>;
  isUpdating: boolean;
  selectedContact: ContactModel | null;
  handleCancelUpdateContact: () => ButtonResponse;
  contactList: ContactModel[]
}

function AddContact(props: AddContactProps) {
  const [buttonResponse, setButtonResponse] = useState<ButtonResponse>({
    isSuccess: false,
    msg: "",
  });
  // modal props:
  const [modalIsOpen, setModalIsOpen] = useState(false);
  function onClose(): void {
    setModalIsOpen(false);
  }
  function handleYesClick(): void {
    setModalIsOpen(false);
  }

  // The below state stores the form's fields into a React state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    if (props.isUpdating && props.selectedContact) {
      setFormData({
        fullName: props.selectedContact.fullName,
        email: props.selectedContact.email,
        phone: props.selectedContact.phone,
      });
    } else {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
      });
    }
  }, [props.isUpdating, props.selectedContact]);
  function handleFormInputChange(userEvent: ChangeEvent<HTMLInputElement>) {
    //console.log(userEvent); // this logs the data to console, but doesn't actually display the change on the form
    setFormData({
      ...formData, // ignore the rest of the formData
      [userEvent.target.name]: userEvent.target.value, // update whatever the user has changed
    });
  }
  const handleAddRandomContactButton = async (): Promise<void> => {
    // get from api
    const randomContactApiResponse: RandomContactFromApi =
      await getRandomContactFromApi();

    // format user for database
    const user = randomContactApiResponse.results[0];
    const formattedUser: ContactCreateDTO = {
      isFavorite: false,
      fullName: `${user.name.first} ${user.name.last}`,
      phone: user.phone,
      email: user.email,
    };
    // add to database
    const randomContactButtonResponse =
      await props.handleAddContact(formattedUser);

    // reset if not updating - it's possible update window is open when user presses add random contact
    if (randomContactButtonResponse.isSuccess && !props.isUpdating) {
      setFormData({ fullName: "", phone: "", email: "" });
    }
    setButtonResponse(randomContactButtonResponse);
  };

  async function submitContact(dto: ContactCreateDTO): Promise<boolean> {
    // validate request
    if (!isFilledForm(dto)) {
      setButtonResponse({ isSuccess: false, msg: "Form is not filled!" });
      return false;
    } else if (!isUnique(dto, props.contactList)) {
      setButtonResponse({ isSuccess: false, msg: "Duplicate contact!" });
      return false;
    }
    // format and verify phone number
    const formattedPhoneNumber = formatPhoneNumber(dto.phone);
    if (!formattedPhoneNumber) {
      setButtonResponse({ isSuccess: false, msg: "Invalid phone number!" });
      return false;
    }
    // check if updating
    if (props.selectedContact && props.isUpdating) {
      const contactUpdateDto: ContactDTO = {
        contactId: props.selectedContact.contactId,
        fullName: dto.fullName,
        email: dto.email,
        phone: formattedPhoneNumber,
        isFavorite: dto.isFavorite,
      };
      const updateResponse = await props.handleUpdateContact(contactUpdateDto);
      setButtonResponse(updateResponse);
      return updateResponse.isSuccess;
    } else {const contactCreateDto: ContactCreateDTO = {
        fullName: dto.fullName,
        email: dto.email,
        phone: formattedPhoneNumber,
        isFavorite: dto.isFavorite,
      };
      const createResponse = await props.handleAddContact(contactCreateDto);
      setButtonResponse(createResponse);
      return createResponse.isSuccess;
    }
  }
  async function handleAddContactButton(formData: FormData): Promise<void> {
    try {
      const contactDTO: ContactCreateDTO = {
        isFavorite: false,
        email: String(formData.get("email")),
        phone: String(formData.get("phone")),
        fullName: String(formData.get("fullName")),
      };

      // submit contact
      // add to database
      const isSuccess = await submitContact(contactDTO);

      if (isSuccess) {
        setFormData({ fullName: "", phone: "", email: "" });
      }
    } catch (error) {
      console.log(error);
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
              name="fullName"
              onChange={handleFormInputChange} // explicitly tells react what to do when each letter is typed into the field; allows React to see each change
              value={formData.fullName} // binds the field to the formData variable
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
            <button
              className="btn btn-success form-control btn-primary btn-sm m-1"
              onClick={handleAddRandomContactButton}
              type="button"
            >
              ADD RANDOM CONTACT
            </button>
          </div>
          {props.isUpdating && (
            <div className="p-2 col-6">
              <button
                type="reset"
                onClick={() => props.handleCancelUpdateContact()}
                className="btn m-1 btn-danger btn-sm form-control"
              >
                CANCEL
              </button>
            </div>
          )}

          {buttonResponse.isSuccess && (
            <div className="col-12 text-center text-success">
              {buttonResponse.msg}
            </div>
          )}
          {!buttonResponse.isSuccess && (
            <div className="col-12 text-center text-danger">
              {buttonResponse.msg}
            </div>
          )}
        </div>
      </form>
      {modalIsOpen && (
        <ConfirmAddModal
          handleYesClick={handleYesClick}
          onClose={onClose}
          modalIsOpen={modalIsOpen}
        >
          <h3>Confirm Add?</h3>
          <p>The contact you are attempting to add is a duplicate. </p>
        </ConfirmAddModal>
      )}
    </div>
  );
}

export default AddContact;
