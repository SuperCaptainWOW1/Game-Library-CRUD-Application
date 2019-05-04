import http from './http'
import ui from './ui'

// index for list items
// let index = 1;

// Get items when page loaded
document.addEventListener('DOMContentLoaded', getData);

// Listen for change genre
document.querySelector('#genre').addEventListener('click', changeGenreImage);

// Listen for add button click
document.querySelector('#addBtn').addEventListener('click', submitItem);

// Listen for delete
document.querySelector('.library').addEventListener('click', deleteItem);

// Listen for edit
document.querySelector('.library').addEventListener('click', enableEdit);

// Listen for cancel edit
document.querySelector('.library').addEventListener('click', cancelEdit);

// Listen for clear all
document.querySelector('#clearAllBtn').addEventListener('click', clearAll);

function getData() {
  // Get items from server
  http.get('http://localhost:3000/games')
    .then(data => ui.showItems(data))
    .catch(err => console.log(err));
}

function submitItem(e) {
  // Collect data
  const title = ui.title.value;
  const genre = ui.genre.value;
  const user = ui.user.value || 'Anonim';

  const data = {
    index,
    title,
    genre,
    user
  };

  // Check if form was filled in correctly
  if(data.title && genre !== 'Choose') {

    // Add item to UI
    ui.addItem(data);
    console.log('do');
    console.log(data);

    // Add item to server
    http.post('http://localhost:3000/games', data)
      .then(data => {
        ui.showAlert('Game successfully added', 'success');
        // Increase index for the next items    
        index++;
        console.log('posle');
        console.log(data);
      })
      .catch(err => console.log(err));

      
    ui.clearForm();

  } else ui.validationError();

  e.preventDefault();
}

function deleteItem(e) {
  if(e.target.classList.contains('delete')) {
    const item = e.target.parentElement.parentElement;
    const indexForDelete = item.className[item.className.length - 1]

    // Remove from page
    item.remove();

    // Remove from server
    http.delete(`http://localhost:3000/games/${indexForDelete}`)
      .then(msg => {
        // Show alert
        ui.showAlert(msg, 'success');
        // Check if library is empty
        if(ui.isEmpty()) index = 1; // Reload index count
        console.log('Deleted');
      })
      .catch(err => console.log(err))
  }
}

function changeGenreImage(e) {
  ui.changeImage(e.target.value);
}

function clearAll() {
  // Delete all from UI
  ui.clearAll();

  const items = document.querySelectorAll('.library-item');
  items.forEach(item => {
    // Delete all from server
    http.delete(`http://localhost:3000/games/${item.className[item.className.length - 1]}`)
    .then(msg => {
      // Reload index count
      index = 1;
      console.log(msg);
    })
    .catch(err => console.log(err))
  })
}