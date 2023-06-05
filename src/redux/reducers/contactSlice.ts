import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Contact {
  id: string;
  firstname: string;
  lastname: string;
  status: string;
}

interface ContactState {
  contacts: Contact[];
}

const local: any = localStorage.getItem("contacts");

const storage: any = local ? JSON.parse(local) : [];

const initialState: ContactState = {
  contacts: storage,
};

const ContactsSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact: (
      state,
      action: PayloadAction<{
        firstname: string;
        lastname: string;
        status: string;
      }>
    ) => {
      state.contacts.push({
        id: state.contacts.length.toString(),
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        status: action.payload.status,
      });

      localStorage.setItem("contacts", JSON.stringify(state.contacts));
    },
    updateContact: (
      state,
      action: PayloadAction<{
        id: string;
        firstname: string;
        lastname: string;
        status: string;
      }>
    ) => {
      const { id, firstname, lastname, status } = action.payload;

      const existingContact = state.contacts.find(
        (contact) => contact.id === id
      );
      if (existingContact) {
        existingContact.firstname = firstname;
        existingContact.lastname = lastname;
        existingContact.status = status;

        localStorage.setItem("contacts", JSON.stringify(state.contacts));
      }
    },
    deleteContact: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      state.contacts = state.contacts.filter((contact) => contact.id !== id);

      localStorage.setItem("contacts", JSON.stringify(state.contacts));
    },
  },
});

export default ContactsSlice.reducer;
export const { addContact, updateContact, deleteContact } =
  ContactsSlice.actions;
