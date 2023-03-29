import { useEffect } from 'react';
import { Container } from '@/styled/common';

const PostDiaryModal = ({settings}) => {
  useEffect(() => {
    console.log(settings);
  }, [settings]);
  return (
    <>
      <Container className='p-4'>
        <div className='border w-full h-14'>
          하이
        </div>
      </Container>
    </>
  );
};

export default PostDiaryModal;
