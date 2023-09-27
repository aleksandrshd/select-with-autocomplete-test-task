import './App.css';
import {useEffect, useState} from "react";
import {top100Films} from "./utils/constants";
import Select from "./components/Select/Select";

function App() {

  const [allOptions, setAllOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    setAllOptions(top100Films);
  }, []);

  const onChange = option => {
    setSelectedOption(option);
    console.log('selectedOption changed to', selectedOption);
  }

  return (
    <div className="App">

      <Select
        options={allOptions}
        selectedOption={selectedOption}
        onChange={onChange}
        placeholder="Movie"
      />

    </div>
  );
}

export default App;
