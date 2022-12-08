import React from 'react'
import s from './styles.module.css'
import closeIcon from '../../assets/close_icon.svg'

interface ModalProps {
  active: boolean
  setActive: (active: boolean) => void
  children: any
}

const Modal = ({ active, setActive, children }: ModalProps) => {
  return (
    <div
      className={active ? `${s.modal} ${s.active}` : s.modal}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? `${s.modalContent} ${s.active}` : s.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={s.closeIcon} onClick={() => setActive(false)}>
          <img src={closeIcon} alt="close-icon" />
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
