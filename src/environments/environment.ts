export const environment = {
  production: false,
  apiKey: '',
  apiUrl: 'https://api.themoviedb.org/3',
};

if (!environment.apiKey || environment.apiKey === '') {
  throw new Error('TMDB API key is missing! Please add it to move further.');
}
