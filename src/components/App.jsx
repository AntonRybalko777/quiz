import { Component } from 'react';
import { QuizList } from './QuizList/QuizList';
import initialQuizItems from '../data.json';
import { SearchBar } from './SearchBar/SearchBar';
import { QuizForm } from './QuizForm/QuizForm';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    quizItems: initialQuizItems,
    filters: {
      topic: '',
      level: 'all',
    },
  };

  componentDidMount() {
    const savedFilters = localStorage.getItem('quiz-filters');
    if (savedFilters !== null) {
      this.setState({
        filters: JSON.parse(savedFilters),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.filters.topic !== this.state.filters.topic ||
      prevState.filters.level !== this.state.filters.level
    ) {
      localStorage.setItem('quiz-filters', JSON.stringify(this.state.filters));
    }
  }

  addQuiz = newQuiz => {
    this.setState(prevState => ({
      quizItems: [...prevState.quizItems, { ...newQuiz, id: nanoid() }],
    }));
  };

  changeFilter = (key, value) => {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [key]: value,
      },
    }));
  };

  resetFilters = () => {
    this.setState({
      filters: { topic: '', level: 'all' },
    });
  };

  getFilteredItems = () => {
    const { quizItems, filters } = this.state;
    return quizItems.filter(item => {
      const topicFilter = item.topic
        .toLowerCase()
        .includes(filters.topic.toLowerCase());
      if (filters.level === 'all') {
        return topicFilter;
      }
      return item.level === filters.level && topicFilter;
    });
  };

  deleteQuizCard = quizId => {
    this.setState(prevState => ({
      quizItems: prevState.quizItems.filter(item => item.id !== quizId),
    }));
  };

  render() {
    const { filters } = this.state;
    const filteredItems = this.getFilteredItems();
    return (
      <div>
        <QuizForm onAdd={this.addQuiz} />
        <SearchBar
          filters={filters}
          onChangeFilter={this.changeFilter}
          onReset={this.resetFilters}
        />
        <QuizList items={filteredItems} onDelete={this.deleteQuizCard} />
      </div>
    );
  }
}
