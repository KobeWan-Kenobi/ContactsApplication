function Contact(props) {
  return (
    <div
      className="row p-md-2 m-1"
      style={{ borderRadius: "20px", border: "1px solid #555" }}
    >
      <div className="col-2 pt-2">
        <img
          src={`https://ui-avatars.com/api/background=A8CBFE/?name=${props.contact.name}`}
        />
      </div>
      <div className="col-4 pt-2 text-dark">
        <h3>{props.contact.name}</h3>
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
export default Contact;
