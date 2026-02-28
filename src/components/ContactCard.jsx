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
    <div className="card">
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          {email}
          {address}
          {phone}
        </p>
        <Link to={`/edit-contact/${id}`}>
          <button className="btn btn-warning">Edit</button>
        </Link>
        <button className="btn btn-danger" onClick={() => deleteContact()}>
          Delete Contact
        </button>
      </div>
    </div>
  );
};
