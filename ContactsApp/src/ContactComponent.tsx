
import type { ButtonResponse } from "../models/ButtonResponse";
import type { ContactModel } from "../models/ContactModel";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
interface ContactProp{
  favoriteClick: (favoriteContact: ContactModel) => Promise<ButtonResponse>;
  updateClick: (handlePencilClick: ContactModel) => ButtonResponse;
  deleteContact: (oldContact: ContactModel) => Promise<ButtonResponse>
  contact: ContactModel;
  key: number;

}

function ContactComponent(props: ContactProp) {
  return (
    <div
      className="row p-md-2 m-1 rounded-edge"
      // style={{ borderRadius: "20px", border: "1px solid #555" }}
    >
      <div className="col-2 pt-2">
        <img
          src={`https://ui-avatars.com/api/background=A8CBFE/?name=${props.contact.fullName}`}
        />
      </div>
      <div className="col-4 pt-2 text-dark">
        <h3>{props.contact.fullName}</h3>
        <p className="mb-1 text-muted">{props.contact.email}</p>
      </div>
      <div className="col-3 pt-4">
        <h5 className="text-primary mb-0">{props.contact.phone}</h5>
      </div>
      <div className="col-3">
        <button
          onClick={()=>props.favoriteClick(props.contact)}
          className={"btn btn-sm m-1 btn-warning"}
        >
          <i className={`bi ${props.contact.isFavorite? "bi-star-fill" : "bi-star"}`}></i>
        </button>
        <button 
        onClick={()=>props.updateClick(props.contact)}
        className="btn btn-info btn-sm m-1">
          <i className="bi bi-pencil-square"></i>
        </button>
        <button 
        onClick={()=>props.deleteContact(props.contact)}
        className="btn btn-danger btn-sm m-1">
          <i className="bi bi-trash-fill"></i>
        </button>
      </div>
    </div>
  );
}
export default ContactComponent;
