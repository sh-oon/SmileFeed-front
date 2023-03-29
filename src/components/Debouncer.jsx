import { useState, useEffect } from 'react';
import { InputText } from '@/styled/common';

function Debouncer({ onChange, delay, placeholder, type }) {
  const [value, setValue] = useState('');
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }

    setTimer(setTimeout(() => {
      onChange(value);
    }, delay));

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <InputText type={type} placeholder={placeholder} value={value} onChange={handleChange} />
  );
}

export default Debouncer;