import React from 'react'
import './styles.css'

interface ButtonProps {
  label: string
}

const Button: React.FC<ButtonProps> = ({ label }) => {
  return (
    <div data-testid="button" className="button_style">
      {label}
    </div>
  )
}

export default Button
