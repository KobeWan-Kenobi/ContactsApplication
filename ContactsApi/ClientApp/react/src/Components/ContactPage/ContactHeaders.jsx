function ContactHeaders() {
  return (
    <div
      className="row p-md-2 m-1"
      style={{ borderRadius: "20px", backgroundColor: "lightgray" }}
    >
      <div className="row">
        <div className="col-2 ps-3 pt-1"><h5>Initials</h5></div>
        <div className="col-4 ps-3 pt-1"><h5>Full name and email</h5></div>
        <div className="col-3 ps-3 pt-1"><h5>Phone number</h5></div>
        <div className="col-3 ps-3 pt-1"><h5>Add/Modify/Delete</h5></div>
      </div>
    </div>
  );
}

export default ContactHeaders;
