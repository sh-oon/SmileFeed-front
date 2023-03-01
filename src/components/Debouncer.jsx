import { useState, useEffect } from 'react';
import styles from './Debouncer.module.css';

function Debouncer({ onChange, delay, placeholder }) {
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
    <input type="text" placeholder={placeholder} className={styles.input} value={value} onChange={handleChange} />
  );
}

export default Debouncer;