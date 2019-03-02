import React from 'react';
import classes from './Input.css';

const input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  const valid = props.valid || !props.edited;
  if (!valid) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.handleChange}
        />
      );
      break;
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.handleChange}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.handleChange}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.handleChange}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>
        {props.label} {props.valid || !props.edited ? '' : 'INVALID'}
      </label>
      {inputElement}
    </div>
  );
};

export default input;
