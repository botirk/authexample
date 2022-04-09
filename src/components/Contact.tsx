// @ts-expect-error
import {ReactComponent as XIcon} from "bootstrap-icons/icons/x.svg";
// @ts-expect-error
import {ReactComponent as UploadIcon} from "bootstrap-icons/icons/cloud-arrow-up.svg";
// @ts-expect-error
import {ReactComponent as PlusIcon} from "bootstrap-icons/icons/plus.svg";

import React, { useEffect, useRef, useState } from 'react';

import { ContactInterface } from '../redux/slice';
import useBSTooltips from '../hooks/useBSTooltips';

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
  const tooltips = useBSTooltips<HTMLDivElement>();

  const localIsBusy = (isBusy || isSaving || isDeleting);

  return <div className='input-group mb-3' ref={tooltips.ref}>
    <span className="input-group-text">Phone number</span>
    <input type="text" className="form-control" value={phoneNumber} disabled={localIsBusy} placeholder="Enter phone number here" onChange={(e) => setPhoneNumber(e.currentTarget.value)}/>
    {contact ? <>

      <button className="btn btn-outline-secondary" type="button" disabled={localIsBusy ?? !phoneNumber} onClick={async () => {
        tooltips.tooltips.forEach(t => t.hide());
        setSaving(true);
        await onUpdate({ ...contact, phoneNumber });
        setSaving(false);
      }} data-bs-toggle="tooltip" data-bs-placement="top" title="Save">
        {!isSaving ? <UploadIcon /> : <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
      </button>

      <button className="btn btn-outline-secondary" type="button" disabled={localIsBusy} onClick={async () => {
        tooltips.tooltips.forEach(t => t.hide());
        setDeleting(true);
        await onDelete(contact);
        setDeleting(false);
      }} data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
        {!isDeleting ? <XIcon /> : <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
      </button>

    </> : <>

      <button className="btn btn-outline-secondary" type="button" disabled={localIsBusy || !(phoneNumber.trim())} onClick={async () => {
        tooltips.tooltips.forEach(t => t.hide());
        setSaving(true);
        if (await onCreate({ id: "", phoneNumber }))
          setPhoneNumber("");
        setSaving(false);
      }} data-bs-toggle="tooltip" data-bs-placement="top" title="Create">
        {!isSaving ? <PlusIcon /> : <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
      </button>

    </>}
  </div>;
};

export default Contact;