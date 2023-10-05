import { Component } from 'react';
import { QuizList } from './QuizList/QuizList';
import initialQuizItems from '../data.json';
import { SearchBar } from './SearchBar/SearchBar';
import { QuizForm } from './QuizForm/QuizForm';

export class App extends Component {
  state = {
    quizItems: initialQuizItems,
    filters: {
      topic: '',
      level: 'all',
    },
  };

  changeFilter = (key, value) => {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [key]: value,
      },
    }));
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
        <QuizForm />
        <SearchBar filters={filters} onChangeFilter={this.changeFilter} />
        <QuizList items={filteredItems} onDelete={this.deleteQuizCard} />
      </div>
    );
  }
}
