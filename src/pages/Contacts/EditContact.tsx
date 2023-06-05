import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateContact } from "../../redux/reducers/contactSlice";

const EditContact = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const contactList = useAppSelector((state) => state.contact.contacts);
  const contactData = contactList.filter((contact) => contact.id === id)[0];
  const [firstName, setFirstName] = useState(contactData.firstname);
  const [lastName, setLastName] = useState(contactData.lastname);
  const [status, setStatus] = useState(contactData.status);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: any
  ) => {
    setState(e.target.value);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      updateContact({
        id: contactData.id,
        firstname: firstName,
        lastname: lastName,
        status: status,
      })
    );

    navigate("/contacts");
  };

  return (
    <div>
      <Link to="/contacts">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          id="back-arrow"
        >
          <path fill="none" d="M0 0h24v24H0V0z" opacity=".87"></path>
          <path d="M16.62 2.99c-.49-.49-1.28-.49-1.77 0L6.54 11.3c-.39.39-.39 1.02 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z"></path>
        </svg>
      </Link>

      <form className="max-w-md mx-auto">
        <h1 className="text-4xl font-semibold">Edit Contact</h1>
        <div className="mb-4">
          <label htmlFor="firstName" className="block mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => handleChange(e, setFirstName)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => handleChange(e, setLastName)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Status</label>
          <div>
            <label htmlFor="active" className="mr-4">
              <input
                type="radio"
                id="active"
                value="active"
                checked={status === "active"}
                onChange={(e) => handleChange(e, setStatus)}
                className="mr-1"
              />
              Active
            </label>
            <label htmlFor="inactive">
              <input
                type="radio"
                id="inactive"
                value="inactive"
                checked={status === "inactive"}
                onChange={(e) => handleChange(e, setStatus)}
                className="mr-1"
              />
              Inactive
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={handleUpdate}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default EditContact;
