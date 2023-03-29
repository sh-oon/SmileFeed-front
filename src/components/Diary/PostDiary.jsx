import { useEffect } from 'react';

const PostDiaryModal = ({settings}) => {
  useEffect(() => {
    console.log(settings);
  }, [settings]);
  return (
    <>
      <div className='w-full flex flex-col'>
        <span>일기 등록</span>
      </div>
    </>
  );
};

export default PostDiaryModal;
