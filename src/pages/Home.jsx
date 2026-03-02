import { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import useActions from "../hooks/useActions.jsx";
import { ContactCard } from "../components/ContactCard.jsx";
import { EditContact } from "./EditContacts.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const { getContacts } = useActions();

  const createUser = async () => {
    const response = await fetch(
      "https://playground.4geeks.com/contact/agendas/JoshB",
      {
        method: "POST",
      },
    );
    if (!response.ok) {
      console.log("error: ", response.status, response.statusText);
      getContacts();
      return;
    }
    const data = await response.json();
    console.log(data);
    return data;
  };

  useEffect(() => {
    createUser();
  }, []);

  return (
    <div className="mt-5">
      <h1 className="text-center">Contacts</h1>
      {store.contacts.map((contact) => (
        <ContactCard
          name={contact.name}
          phone={contact.phone}
          email={contact.email}
          address={contact.address}
          id={contact.id}
          key={contact.id}
        />
      ))}
    </div>
  );
};
