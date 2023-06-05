import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { deleteContact } from "../../redux/reducers/contactSlice";

const ContactsList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const contactsList = useAppSelector((state) => state.contact.contacts);

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold">Contact List</h1>
      <Link to="/add-contact">
        <button className="mt-2 p-0.5 px-3 border-2 border-black bg-black text-white rounded-lg">
          Add Contact
        </button>
      </Link>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    First Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Last Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {contactsList && contactsList.length > 0 ? (
                  contactsList.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b dark:border-neutral-500"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {item.firstname}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.lastname}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.status}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <button
                          onClick={() => navigate(`/edit-contact/${item.id}`)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            dispatch(deleteContact({ id: item.id }))
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="text-center">
                    No Data Found
                    {/* <td className="text-center"></td> */}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactsList;
