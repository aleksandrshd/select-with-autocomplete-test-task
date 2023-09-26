import "./Select.css";
import {useEffect, useState} from "react";

export default function Select({options, placeholder, inputValue, setInputValue, onChange}) {

  const [filteredOptions, setFilteredOptions] = useState([]);
  const [displayOptions, setDisplayOptions] = useState(false);
  const [focusedOption, setFocusedOption] = useState(0);

  useEffect(() => {
    setFilteredOptions(options.filter(result => result.label.match(new RegExp(inputValue, 'gi'))));
  }, [inputValue, options]);

  const onFocus = () => {
    setDisplayOptions(true);
  }

  const onFocusOut = () => {
    setDisplayOptions(false);
  }

  const onKeyDown = e => {

    if (e.keyCode === 38) {
      setFocusedOption(focusedOption - 1);
    }

    if (e.keyCode === 40) {
      setFocusedOption(focusedOption + 1);
    }

    if (e.keyCode === 13) {
      setInputValue(filteredOptions[focusedOption].label);
      setDisplayOptions(false);
    }

  }

  const onOptionFocus = e => {
    const currentFocusedOption = +e.target.attributes.indexkey.value;
    setFocusedOption(currentFocusedOption);
  }

  const onOptionClick = e => {
    setInputValue(e.target.innerText);
    setDisplayOptions(false);
  }

  const onCloseBtnClick = () => {
    setInputValue('');
    setDisplayOptions(false);
  }

  return (
    <section className="select">
      <div
        className="select__container"
        /*onfocusout={onFocusOut}*/
      >
        <div className="select__container-input">
          <input
            className="select__input"
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onChange={onChange}
            onFocus={onFocus}
            onKeyDown={onKeyDown}/>
          <span
            className="select__close-btn"
            onClick={onCloseBtnClick}
          />
        </div>
        <ul className="select__list">
          {displayOptions && filteredOptions.map((item, index) => (
            <li
              key={index}
              indexkey={index}
              className={`select__item ${ index === focusedOption ? 'select__item_focused' : ''}`}
              onClick={onOptionClick}
              onMouseOver={onOptionFocus}
            >
              {item.label}
            </li>))}

        </ul>
      </div>
    </section>
  )
}