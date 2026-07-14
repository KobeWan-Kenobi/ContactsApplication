import getAllContacts from "../../Utility/ContactsServices";
function TestGetAllContactsApiCall() {
  const getContactList = async () => {
    const response = await getAllContacts();

    console.log(response);
  };

  return (
   <div><button
      className="btn btn-success form-control btn-primary btn-sm m-1"
      onClick={getContactList}
      type="button"
    >
      GET ALL CONTACTS
    </button></div>
  );
}

export default TestGetAllContactsApiCall;
