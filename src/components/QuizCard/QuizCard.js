import { useState } from 'react';
import {
  InfoWrapper,
  Card,
  Buttons,
  InfoTitle,
  InfoValue,
} from './QuizCard.styled';
import Modal from 'react-modal';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');

export const QuizCard = ({
  quiz: { id, topic, level, time, questions },
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Card $level={level}>
      <h2>{topic}</h2>
      <InfoWrapper>
        <p>
          <InfoTitle>Level</InfoTitle>
          <InfoValue> {level}</InfoValue>
        </p>
        <p>
          <InfoTitle>Time</InfoTitle>
          <InfoValue>{time} min</InfoValue>
        </p>
        <p>
          <InfoTitle>Questions</InfoTitle> <InfoValue>{questions}</InfoValue>
        </p>
      </InfoWrapper>
      <Buttons>
        <button onClick={() => onDelete(id)}>
          <AiOutlineDelete />
        </button>
        <button onClick={openModal}>
          <AiOutlineEye />
        </button>
      </Buttons>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <p>{topic} Card</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </Card>
  );
};
