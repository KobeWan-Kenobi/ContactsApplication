import axios from "axios";
const BASE_URL = "https://localhost:44341/api/Contacts";
const getAllContacts = async () => {
  const url = new URL(BASE_URL);


    const response = await axios.get(url).then(data=>{
      return data;
    })
    .catch((error)=>{
      console.log("Error", error);
      return -1;
    });
    //backend is contactId while frontend uses id
    // backend is fullName while frontend uses name
    return response.data.result.map(contact => {
      const {fullName, contactId, ...rest} = contact;
      return {...rest, name: fullName, id: contactId};
    })

};

export default getAllContacts;
