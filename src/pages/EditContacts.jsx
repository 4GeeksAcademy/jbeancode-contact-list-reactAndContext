import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useActions from "../hooks/useActions";
import { useParams } from "react-router-dom";

export const EditContact = () => {
  const {store, dispatch} = useGlobalReducer();
  const{getContacts} = useActions();
  const navigate = useNavigate();
  const {contactId} = useParams();
    const [inputValues, setInputValues] = useState({
    //need to likely add useParams here - and put in the ID that your reference also - (store.contacts.find)
    nameInput: "",
    emailInput: "",
    addressInput: "",
    phoneInput: "",
  });

  useEffect(() => {
    const foundContact = store?.contacts.find((contact) => contact.id === parseInt(contactId))
    if (foundContact) {
        setInputValues({
        nameInput: foundContact.name || "",
        emailInput: foundContact.email || "",
        addressInput: foundContact.address || "",
        phoneInput: foundContact.phone || ""
    });
    }
  },[]);

  const putContact = async(event) => {
    event.preventDefault();
    const response = await fetch(
        "https://playground.4geeks.com/contact/agendas/JoshB/contacts/" + contactId,
        {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
    },
        body: JSON.stringify({
        "name": inputValues.nameInput,
        "phone": inputValues.phoneInput,
        "address": inputValues.addressInput,
        "email": inputValues.emailInput
    }),
  },
);
    if(!response.ok) {
        console.log("error :", response.status, response.statusText);
    }
    const data = await response.json();
    getContacts()
    navigate("/");
    return data;
  };
  return (
    <div className="p-3">
      <h1>Edit Contact</h1>
      <form onSubmit={(e) => putContact(e)}>
        <fieldset>
          <label htmlFor="nameInput">Name</label>
          <input
            type="text"
            id="nameInput"
            value={inputValues.nameInput}
            className="form-control"
            onChange={(event) =>
              setInputValues({ ...inputValues, nameInput: event.target.value })
            }
          />
        </fieldset>
        <fieldset>
          <label htmlFor="nameInput">Address</label>
          <input
            type="text"
            id="nameInput"
            value={inputValues.addressInput}
            className="form-control"
            onChange={(event) =>
              setInputValues({
                ...inputValues,
                addressInput: event.target.value,
              })
            }
          />
        </fieldset>
        <fieldset>
          <label htmlFor="nameInput">Email</label>
          <input
            type="text"
            id="nameInput"
            value={inputValues.emailInput}
            className="form-control"
            onChange={(event) =>
              setInputValues({ ...inputValues, emailInput: event.target.value })
            }
          />
        </fieldset>
        <fieldset>
          <label htmlFor="nameInput">Phone</label>
          <input
            type="text"
            id="nameInput"
            value={inputValues.phoneInput}
            className="form-control"
            onChange={(event) =>
              setInputValues({ ...inputValues, phoneInput: event.target.value })
            }
          />
        </fieldset>
        <div className="mt-2">
          <Link to="/">
            <button className="btn btn-danger me-2" type="button" >Back to Home</button>
          </Link>
          <button type="submit" className="btn btn-warning">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
