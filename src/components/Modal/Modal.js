import { useEffect } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";

const modal = document.querySelector("#modal-root");

export default function Modal({ onClose, clearModal, children }) {
  useEffect(() => {
    window.addEventListener("keydown", onEscClick);
    return () => {
      window.removeEventListener("keydown", onEscClick);
    };
  });

  const onEscClick = (e) => {
    if (e.code === "Escape") {
      onClose();
      clearModal();
    }
  };

  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
      clearModal();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={onBackdropClick}>
      <div className={s.Modal}>{children}</div>
    </div>,
    modal
  );
}

//Классы
// import { Component } from 'react';
// import { createPortal } from 'react-dom';
// import s from './Modal.module.css';

// const modal = document.querySelector('#modal-root');
// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.onEscClick);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.onEscClick);
//   }

//   onEscClick = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//       this.props.clearModal();
//     }
//   };

//   onBackdropClick = e => {
//     if (e.target === e.currentTarget) {
//       this.props.onClose();
//       this.props.clearModal();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={s.Overlay} onClick={this.onBackdropClick}>
//         <div className={s.Modal}>{this.props.children}</div>
//       </div>,
//       modal,
//     );
//   }
// }
