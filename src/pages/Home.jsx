import { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const getContacts = async () => {
    const response = await fetch(
      "https://playground.4geeks.com/contact/agendas/JoshB/contacts",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      console.log("error: ", response.status, response.statusText);
      return;
    }
    const data = await response.json();
	dispatch({
		type: "update_contacts",
		payload: data.contacts
	})
    return data;
  };

  useEffect(()=>{
	getContacts()
  },[])



  return (
    <div className="text-center mt-5">
      <h1>Hello Rigo!!</h1>
      <p>
        <img src={rigoImageUrl} />
      </p>
	  {store.contacts.map((contact) => (
		<h1>{contact.name}</h1>
	  ))}
    </div>
  );
};
