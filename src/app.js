import { ui } from './ui'
import { http } from './http'

// Index for list items
let index = 0;

// Get items when page loaded
document.addEventListener('DOMContentLoaded', () => {
  // http.getList()
  //   .then(data => ui.getList(data))
  //   .catch(err => console.log(err));
})

// Listen for change genre
document.querySelector('#genre').addEventListener('click', e => ui.changeImage(e.target.value));

document.querySelector('#addBtn').addEventListener('click', e => {
  const title = ui.title.value;
  const genre = ui.genre.value;
  const user = ui.user.value;
  const imgSrc = ui.img.src;

  const data = {
    index,
    title,
    user,
    imgSrc
  };

  if(data.title && genre !== 'choose') {
    ui.addItem(data);
    ui.clearForm();

    // http.post('url' ,data);

  } else ui.validationError();

  index++;

  console.log('Item added');

  e.preventDefault();
})

document.querySelector('.library').addEventListener('click', e => {
  if(e.target.classList.contains('delete')) {
    
  }
})