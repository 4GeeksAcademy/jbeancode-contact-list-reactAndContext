import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

export const ContactCard = ({name, phone, email, address, id}) => {

    const deleteContact = () => {
        console.log(id);
    }

    return(
        <div className="card">
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">
                    {email}
                    {address}
                    {phone}
                    </p>
                <Link href="#" className="btn btn-primary">Go somewhere</Link>
            </div>
        </div>
    )
}

