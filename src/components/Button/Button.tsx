import { useState } from 'react'
import styles from './Button.module.css'

interface Props {
  children: string
  color?: 'primary' | 'secondary' | 'danger'
  onClick: () => void
}

const Button = ({ children, onClick, color = 'primary' }: Props) => {
  return (
    <button
      type="button"
      className={[styles.btn, styles['btn-' + color]].join(' ')}
      onClick={onClick}
    >
      Primary
    </button>
  )
}

export default Button
