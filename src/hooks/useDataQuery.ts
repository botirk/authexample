import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useUser from '../hooks/useUser';
import { dataArrival, logout, ContactInterface, ContactsInterface, dataRefresh, dataDelete, dataAdd } from '../redux/slice';
import { RootState } from '../redux/store';

const convertContacts = (contacts: ContactInterface[]) => 
  contacts.reduce((acc, v) => {
    acc[v.id] = v;
    return acc;
  }, {} as ContactsInterface);

const useDataQuery = () => {
  const dispatch = useDispatch();
  const user = useUser();
  const [isLoading, setLoading] = useState(false);
  const data = useSelector((state: RootState) => state.state.contactData);

  const request = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 5000));
      const result = await fetch("http://localhost:3001/contact-data", {headers: {Authorization: `Bearer ${user.loginData?.token as string}`}});
      
      if (result.ok) 
        dispatch(dataArrival(convertContacts((await result.json()) as ContactInterface[])));
      else if (result.status == 401)
        dispatch(logout());
    } catch {
      // later handle
    }
    setLoading(false);
  }

  const deleteContact = async (contact: ContactInterface) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const result = await fetch(`http://localhost:3001/contact-data/${contact.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.loginData?.token as string}` }
      });
      
      if (result.ok)
        dispatch(dataDelete(contact));
      else {
        if (result.status == 401) 
          dispatch(logout());
        throw new Error();
      }
    } catch {
      alert(`Failed to delete contact: ${contact.phoneNumber}!`)
    }
  };

  const createContact = async (contact: ContactInterface) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const result = await fetch(`http://localhost:3001/contact-data`, {
        method: "POST",
        headers: { Authorization: `Bearer ${user.loginData?.token as string}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
      });
      
      if (result.ok) {
        dispatch(dataAdd((await result.json()) as ContactInterface));
        return true;
      } else {
        if (result.status == 401)
          dispatch(logout());
        throw new Error();
      }
    } catch {
      alert(`Failed to update contact: ${contact.phoneNumber}!`)
      return false;
    }
  }

  const updateContact = async (contact: ContactInterface) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const result = await fetch(`http://localhost:3001/contact-data/${contact.id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${user.loginData?.token as string}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
      });
      
      if (result.ok) 
        dispatch(dataRefresh(contact))
      else {
        if (result.status == 401)
          dispatch(logout());
        throw new Error();
      }
    } catch {
      alert(`Failed to update contact: ${contact.phoneNumber}!`)
    }
  };

  const effect = () => {
    if (!user.isLoggedIn || isLoading) return;
    request();
  };

  useEffect(effect, [user.isLoggedIn]);

  return {
    isLoading,
    isLoggedIn: user.isLoggedIn,
    data,
    createContact,
    deleteContact,
    updateContact,
    refresh: effect,
    update: (contact: ContactInterface) => dispatch(dataRefresh(contact)),
  }
};

export default useDataQuery;