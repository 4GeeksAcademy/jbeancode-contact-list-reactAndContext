import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useActions from "../hooks/useActions"

export const AddContact = () => {
  const{getContacts} = useActions();
  const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({
    nameInput: "",
    emailInput: "",
    addressInput: "",
    phoneInput: "",
  });

  const postContact = async(event) => {
    event.preventDefault();
    const response = await fetch(
        "https://playground.4geeks.com/contact/agendas/JoshB/contacts",
        {
        method: "POST",
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
        console.log("error :", respone.status, response.statusText);
    }
    const data = await response.json();
    getContacts()
    Navigate("/");
    return data;
  };
  return (
    <>
      <h1>Add Contact</h1>
      <form onSubmit={(e) => postContact(e)}>
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
        <div>
          <Link to="/">
            <button className="btn btn-danger">Back to Home</button>
          </Link>
          <button type="submit" className="btn btn-primary">
            Add Contact
          </button>
        </div>
      </form>
    </>
  );
};
