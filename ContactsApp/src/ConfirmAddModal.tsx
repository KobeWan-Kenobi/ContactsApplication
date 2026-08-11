import React, { Children, type ReactNode } from 'react'
import ReactDom from 'react-dom'
import './confirmAddModal.css'
import './index.css'

// handleYesClick = {handleYesClick}
//       onClose = {onClose}
//       modalIsOpen = {modalIsOpen}



interface ModalProps {
   children: ReactNode;
   handleYesClick: () => void;
   handleNoClick: () => void;
   modalIsOpen: boolean;
   onClose : () => void;
}
function ConfirmAddModal(props: ModalProps) {
   if(!props.modalIsOpen){
      return null;
   }
   const wrapperElement = document.getElementById('portal')?? document.createElement('div');

   return ReactDom.createPortal( <>
   <div className="overlay"></div>
   <div className="confirm-add-modal rounded-edge">
      {props.children}
      <button 
      className={"btn btn-m m-1 btn-primary"}
      onClick={()=>props.handleYesClick()}>Add Anyway</button>
      <button 
      className={"btn btn-m m-1 btn-secondary"}
      onClick={()=>props.handleNoClick()}>Cancel</button>
   </div>
   </>,
   wrapperElement
);
}

export default ConfirmAddModal;