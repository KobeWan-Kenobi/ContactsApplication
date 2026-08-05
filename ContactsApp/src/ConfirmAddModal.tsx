import React, { Children, type ReactNode } from 'react'
import ReactDom from 'react-dom'
import './confirmAddModal.css'

// handleYesClick = {handleYesClick}
//       onClose = {onClose}
//       modalIsOpen = {modalIsOpen}

interface ModalProps {
   children: ReactNode;
   handleYesClick: () => void;
   modalIsOpen: boolean;
   onClose : () => void;
}
function ConfirmAddModal(props: ModalProps) {
   return ( <>
   <div className="modal" >
      <h1>Confirm Add?</h1>
      {props.children}
      <button></button>
   </div>
   </> );
}

export default ConfirmAddModal;