import './App.css';
import {useEffect, useState} from "react";
import {top100Films} from "./utils/constants";
import Select from "./components/Select/Select";

function App() {

  const [allOptions, setAllOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setAllOptions(top100Films);
  }, []);

  const onChange = e => {
    setInputValue(e.target.value);
  }

  return (
    <div className="App">

      <Select
        options={allOptions}
        placeholder="Movie"
        inputValue={inputValue}
        setInputValue={setInputValue}
        onChange={onChange}
      />

    </div>
  );
}

export default App;
