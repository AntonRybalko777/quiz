import { Component } from 'react';
import { InfoWrapper, Card, Buttons } from './QuizCard.styled';
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

export class QuizCard extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { isModalOpen } = this.state;
    const {
      quiz: { id, topic, level, time, questions },
      onDelete,
    } = this.props;
    return (
      <Card $level={level}>
        <h2>{topic}</h2>
        <InfoWrapper>
          <p>Level: {level}</p>
          <p>Time: {time} min</p>
          <p>Questions: {questions}</p>
        </InfoWrapper>
        <Buttons>
          <button onClick={() => onDelete(id)}>
            <AiOutlineDelete />
          </button>
          <button onClick={this.openModal}>
            <AiOutlineEye />
          </button>
        </Buttons>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <p>{topic} Card</p>
          <button onClick={this.closeModal}>Close</button>
        </Modal>
      </Card>
    );
  }
}
