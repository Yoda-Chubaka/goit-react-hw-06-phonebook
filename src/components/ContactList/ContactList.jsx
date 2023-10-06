import { useDispatch, useSelector } from 'react-redux';
import { ContactItem } from "components/ContactItem/ContactItem"
import { ContactListStyle } from "./ContactsList.styled"

import { deleteContact } from 'redux/contacts/contacts-slice';
import { getFilteredContacts } from 'redux/contacts/contacts-selectors';

export const ContactList = () => {
  const filteredContacts = useSelector(getFilteredContacts);

  const dispatch = useDispatch();

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

   return (
    <ContactListStyle>
            {filteredContacts.map(contact => (
              <ContactItem key={contact.id} name={contact.name} number={contact.number} id={contact.id} onDeleteContact={onDeleteContact} />
            ))}
        </ContactListStyle>
  );
};