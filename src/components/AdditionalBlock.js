import {useState} from "react";

const AdditionalBlock = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'close' : 'open'} Additional block</button>
      {isOpen && (
        <div>
          <p>432fssssaSAfsdfewqeqe11111111111111111d</p>
          <p>432fd</p>
          <p>432fd1111111111111111111</p>
        </div>
      )}
    </div>
  )
};

export default AdditionalBlock;