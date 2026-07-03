import getRandomUser from "../Utility/api";
function AddRandomContact(props) {
  const getRandomContact = async () => {
    const response = await getRandomUser();
    if (response && response.results && response.results.length > 0) {
      const user = response.results[0];
      const formattedUser = {
        name: `${user.name.first} ${user.name.last}`,
        phone: user.phone,
        email: user.email,
      };
      props.handleAddRandomContact(formattedUser);
    }
  };

  return (
    <button className="btn btn-success form-control btn-primary btn-sm m-1" onClick={getRandomContact} type="button">
      ADD RANDOM CONTACT
    </button>
  );
}

export default AddRandomContact;
