import app from './app';

app.listen(app.get('PORT'), app.get('HOST'), () => {
  console.log(`Server running on ${app.get('HOST')}:${app.get('PORT')}`);
});
