import { useEffect } from 'react';

const SettingsModal = ({settings}) => {
  useEffect(() => {
    console.log(settings);
  }, [settings]);
  return (
    <>
      <div className='w-full flex flex-col'>
        <span>{settings.backgroundColor}</span>
      </div>
    </>
  );
};

export default SettingsModal;
