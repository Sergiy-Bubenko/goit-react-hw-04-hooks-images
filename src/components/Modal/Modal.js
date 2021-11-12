import { useEffect } from 'react'
import { createPortal } from 'react-dom'

const modalRoot = document.querySelector('#modal-root')

export default function Modal({ onClose, children }) {
  const handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      onClose()
    }
    console.log('esc')
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose()
    }
  }

  return createPortal(
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">{children}</div>
    </div>,
    modalRoot,
  )
}

// ***********************

// import { Component } from "react";
// import { createPortal } from "react-dom";

// const modalRoot = document.querySelector("#modal-root");

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener("keydown", this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.handleKeyDown);
//   }

//   handleKeyDown = (e) => {
//     if (e.code === "Escape") {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = (evt) => {
//     if (evt.currentTarget === evt.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className="Overlay" onClick={this.handleBackdropClick}>
//         <div className="Modal">{this.props.children}</div>
//       </div>,
//       modalRoot
//     );
//   }
// }

// export default Modal;
