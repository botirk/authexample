// @ts-expect-error
import {ReactComponent as XIcon} from "bootstrap-icons/icons/x.svg";
// @ts-expect-error
import {ReactComponent as UploadIcon} from "bootstrap-icons/icons/cloud-arrow-up.svg";
// @ts-expect-error
import {ReactComponent as PlusIcon} from "bootstrap-icons/icons/plus.svg";

import React, { useState } from 'react';
import { ContactInterface } from '../redux/slice';

interface ContactComponentInterface {
  contact?: ContactInterface,
  isBusy: boolean,
  onUpdate(contact: ContactInterface): Promise<void>,
  onDelete(contact: ContactInterface): Promise<void>,
  onCreate(contact: ContactInterface): Promise<boolean>
}
const Contact = ({contact, isBusy, onUpdate, onDelete, onCreate}: ContactComponentInterface) => {
  const [phoneNumber, setPhoneNumber] = useState(contact?.phoneNumber ?? "");
  const [isSaving, setSaving] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const localIsBusy = (isBusy || isSaving || isDeleting);

  return <div className='input-group mb-3'>
    <span className="input-group-text">Phone number</span>
    <input type="text" className="form-control" value={phoneNumber} disabled={localIsBusy} placeholder="Enter phone number here" onChange={(e) => setPhoneNumber(e.currentTarget.value)}/>
    {contact ? <>
      <button className="btn btn-outline-secondary" type="button" disabled={localIsBusy ?? !phoneNumber} onClick={async () => {
        setSaving(true);
        await onUpdate({ ...contact, phoneNumber });
        setSaving(false);
      }}>
        {!isSaving ? <UploadIcon /> : <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
      </button>
      <button className="btn btn-outline-secondary" type="button" disabled={localIsBusy} onClick={async () => {
        setDeleting(true);
        await onDelete(contact);
        setPhoneNumber("");
        setDeleting(false);
      }}>
        {!isDeleting ? <XIcon /> : <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
      </button>
    </> : <>
      <button className="btn btn-outline-secondary" type="button" disabled={localIsBusy || !(phoneNumber.trim())} onClick={async () => {
        setSaving(true);
        if (await onCreate({ id: "", phoneNumber }))
          setPhoneNumber("");
        setSaving(false);
      }}>
        {!isSaving ? <PlusIcon /> : <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
      </button>
    </>}
  </div>;
};

export default Contact;