import { Component } from 'react';
import { QuizList } from './QuizList/QuizList';
import { SearchBar } from './SearchBar/SearchBar';
import { QuizForm } from './QuizForm/QuizForm';
import { fetchQuiz, createQuiz, deleteQuiz } from 'api';
import toast, { Toaster } from 'react-hot-toast';
import { ErrMessage } from './ErrMessage';
import { ProgressBar } from 'react-loader-spinner';

export class App extends Component {
  state = {
    quizItems: [],
    loading: false,
    error: false,
    filters: {
      topic: '',
      level: 'all',
    },
  };

  async componentDidMount() {
    const savedFilters = localStorage.getItem('quiz-filters');
    if (savedFilters !== null) {
      this.setState({
        filters: JSON.parse(savedFilters),
      });
    }

    try {
      this.setState({ loading: true, error: false });
      const quizzes = await fetchQuiz();
      this.setState({ quizItems: quizzes });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  }

  componentDidUpdate(_, prevState) {
    if (
      prevState.filters.topic !== this.state.filters.topic ||
      prevState.filters.level !== this.state.filters.level
    ) {
      localStorage.setItem('quiz-filters', JSON.stringify(this.state.filters));
    }
  }

  addQuiz = async newQuiz => {
    try {
      this.setState({ loading: true, error: false });
      const quiz = await createQuiz(newQuiz);

      this.setState(prevState => ({
        quizItems: [...prevState.quizItems, quiz],
      }));
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
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

  deleteQuizCard = async quizId => {
    try {
      this.setState({ loading: true, error: false });
      const deleteQuizz = await deleteQuiz(quizId);
      this.setState(prevState => ({
        quizItems: prevState.quizItems.filter(
          item => item.id !== deleteQuizz.id
        ),
      }));
      toast('Quiz deleted!', {
        icon: '👏',
      });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { filters, loading, error } = this.state;
    const filteredItems = this.getFilteredItems();
    return (
      <div>
        <QuizForm onAdd={this.addQuiz} />
        <SearchBar
          filters={filters}
          onChangeFilter={this.changeFilter}
          onReset={this.resetFilters}
        />

        {error && (
          <ErrMessage>
            Whoops! Something went wrong... Please reload the page
          </ErrMessage>
        )}

        {loading && (
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="#51E5FF"
          />
        )}
        {filteredItems.length > 0 && (
          <QuizList items={filteredItems} onDelete={this.deleteQuizCard} />
        )}
        <Toaster />
      </div>
    );
  }
}
