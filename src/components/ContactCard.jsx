import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import useActions from "../hooks/useActions";

export const ContactCard = ({ name, phone, email, address, id }) => {
  const { getContacts } = useActions();
  const deleteContact = async () => {
    const response = await fetch(
      "https://playground.4geeks.com/contact/agendas/JoshB/contacts/" + id,
      { method: "DELETE" },
    );
    if (!response.ok) {
      console.log("error :", response.status, response.statusText);
      return;
    }
    getContacts();
    return;
  };

  return (
    <div className="row d-flex bg-secondary-subtle w-75 mb-2 mx-auto my-auto rounded">
      <div className="d-flex col-3 p-0 my-auto">
        {/* {<img className= "" src="https://play-lh.googleusercontent.com/yCnT7efge9GD_v3ceGDg7juMnEVOFgKkI69gky4sCQF3HDzQjzgu7q2OlXVR6E86g-N2" alt="..." />} */}
        <h1 className="mb-0">IMAGE HERE</h1>
      </div>
      <div className=" contactName d-flex col-3 my-auto justify-content-center">
        <h5 className="name mb-0">{name}</h5>
      </div>
      <div className="contactInfo col-4">
        <p className="contactInfo mb-0">{email} </p>
        <p className="address mb-0 "> {address} </p>
        <p className="address mb-0"> {phone} </p>
      </div>
      <div className="contactButtons col-2 p-0 my-auto">
        < Link to={`/edit-contact/${id}`}>
          <button className="btn btn-warning w-100">Edit</button>
        </Link>
        <button className="btn btn-danger w-100" onClick={() => deleteContact()}>
          Delete Contact
        </button>
      </div>
    </div>
  );
};
