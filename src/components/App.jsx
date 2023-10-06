import { useSelector } from 'react-redux';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactList } from './ContactList/ContactList';
import { Title } from './Title/Title';
import Filter from './Filter/Filter';
import { getContacts } from 'redux/contacts/contacts-selectors';

export const App = () => {
  const contacts = useSelector(getContacts);
  return (
    <Layout>
      <Section title="PhoneBook">
        <ContactForm />
        {contacts.length > 0 && (
          <>
            <Title title="Contacts" />
            <Filter />
            <ContactList />
          </>
        )}
      </Section>
      <ToastContainer />
      <GlobalStyle />
    </Layout>
  );
};

export default App;