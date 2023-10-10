import { Component } from 'react';
import { InfoWrapper, Container } from './QuizCard.styled';
import Modal from 'react-modal';

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
      <Container $level={level}>
        <h2>{topic}</h2>
        <InfoWrapper>
          <p>Level: {level}</p>
          <p>Time: {time} min</p>
          <p>Questions: {questions}</p>
        </InfoWrapper>
        <button onClick={() => onDelete(id)}>Delete</button>
        <button onClick={this.openModal}>Open Modal</button>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <p>{topic} Card</p>
          <button onClick={this.closeModal}>Close</button>
        </Modal>
      </Container>
    );
  }
}
