import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { nanoid } from 'nanoid';
// import 'yup-phone';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastifyOptions } from 'utils/toastifyOptions';
import { addContact } from 'redux/contacts/contacts-slice';
import { getContacts } from 'redux/contacts/contacts-selectors';

import {
  Form,
  FormField,
  FieldFormik,
  ErrorMessage,
  StyledButton,
  LabelWrapper,
} from './ContactForm.styled';

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d`Artagnan'
    )
    .required(),
  number: yup
    .string()
    .trim()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

const initialValues = { name: '', number: '' };

export const ContactForm = () => {
   const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const isDublicate = ({ name, number }) => {
    const normalizedName = name.toLowerCase().trim();
    const normalizedNumber = number.trim();

    const dublicate = contacts.find(
      contact =>
        contact.name.toLowerCase().trim() === normalizedName ||
        contact.number.trim() === normalizedNumber
    );
    return Boolean(dublicate);    
};

const onAddContact = ({ name, number }) => {
    if (isDublicate({ name, number })) {
      return toast.error(
        `This contact is already in contacts`,
        toastifyOptions
      );
    }
    dispatch(addContact({ name, number }));
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        onAddContact({ id: nanoid(), ...values });
        resetForm();
      }}
      validationSchema={schema}
    >
      <Form autoComplete="off">
        <FormField>
          <LabelWrapper>
            Name
          </LabelWrapper>
          <FieldFormik type="text" name="name" placeholder="Name" />
          <ErrorMessage name="name" component="span" />
        </FormField>
        <FormField>
         <LabelWrapper>
            Number
          </LabelWrapper>
          <FieldFormik
            type="tel"
            name="number"
            placeholder="+38-050-123-45-67"
          />
          <ErrorMessage name="number" component="span" />
        </FormField>
        <StyledButton type="submit">
          Add contact
        </StyledButton>
      </Form>
    </Formik>
  );
};