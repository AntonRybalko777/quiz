import axios from 'axios';

axios.defaults.baseURL = 'https://6527e175931d71583df18ab3.mockapi.io';

export const fetchQuiz = async () => {
  const response = await axios.get('/myquiz');
  return response.data;
};

export const createQuiz = async quiz => {
  const response = await axios.post('/myquiz', quiz);
  return response.data;
};

export const deleteQuiz = async id => {
  const response = await axios.delete(`/myquiz/${id}`);
  return response.data;
};
