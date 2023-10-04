import "./Select.css";
import {useEffect, useRef, useState} from "react";

export default function Select({options, selectedOption, onChange, placeholder}) {

  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [displayOptions, setDisplayOptions] = useState(false);
  const [focusedOption, setFocusedOption] = useState(0);

  const optionsRef = useRef([]);

  useEffect(() => {
    setFilteredOptions(options.filter(result => result.label.match(new RegExp(inputValue, 'gi'))));
  }, [inputValue, options]);

  useEffect(() => {
    setInputValue(selectedOption);
  }, [selectedOption])

  const onInputChange = e => {
    setInputValue(e.target.value);
  }

  const onFocus = () => {
    setDisplayOptions(true);
  }

  const onBlur = () => {
    setDisplayOptions(false);
  }

  const onKeyDown =  e => {

    let newFocusedOption = focusedOption;

    if (e.keyCode === 38) {
      if (focusedOption >= 1) {
        newFocusedOption = focusedOption - 1;
      } else {
        newFocusedOption = filteredOptions.length - 1;
      }
    }

    if (e.keyCode === 40) {
      if (focusedOption < filteredOptions.length - 1) {
        newFocusedOption = focusedOption + 1;
      } else {
        newFocusedOption = 0;
      }
    }

    if (e.keyCode === 46) {
      setInputValue('');
    }

    if (e.keyCode === 13) {
      if (optionsRef.current[focusedOption]) {
        onChange(filteredOptions[focusedOption].label);
        setDisplayOptions(false);
        return;
      }
    }

    setDisplayOptions(true);

    setFocusedOption(newFocusedOption);

    if (optionsRef.current[newFocusedOption]) {
      optionsRef.current[newFocusedOption].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }

  }

  const onOptionFocus = e => {
    const currentFocusedOption = +e.target.attributes.indexkey.value;
    setFocusedOption(currentFocusedOption);
  }

  const onOptionClick = e => {
    onChange(e.target.innerText);
    setDisplayOptions(false);
  }

  const onCloseBtnClick = () => {
    setInputValue('');
    setDisplayOptions(false);
  }

  return (
    <section className="select">
      <div className="select__container">
        <div className="select__container-input">
          <input
            className="select__input"
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onChange={onInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}/>
          <button
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
              ref={el => optionsRef.current[index] = el}
              onMouseDown={onOptionClick}
              onMouseOver={onOptionFocus}
            >
              {item.label}
            </li>))}

        </ul>
      </div>
    </section>
  )
}