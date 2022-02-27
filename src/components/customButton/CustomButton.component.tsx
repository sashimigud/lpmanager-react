import React from 'react';
import './customButton.styles.scss';

interface ICustomButtonProps {
  isDisabled: boolean;
  setWidth: boolean;
  onClick: () => void;
  text: string;
}

const CustomButton = (props: ICustomButtonProps) => {
  return (
    <div
      className={
        'custom-btn-container ' +
        (props.isDisabled ? 'custom-btn-disabled' : 'custom-btn-active') +
        (props.setWidth ? ' custom-btn-setWidth' : '')
      }
      onClick={props.onClick}>
      {props.text ? props.text : 'Klikk her'}
    </div>
  );
};

export default CustomButton;
