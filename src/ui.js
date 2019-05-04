class UI {
  constructor() {
    // Inputs
    this.title = document.querySelector('#title');
    this.genre = document.querySelector('#genre');
    this.user = document.querySelector('#user');
    this.id = document.querySelector('#id');

    // Image section
    this.img = document.querySelector('.genre-image');
    this.formImageSection = document.querySelector('.form-image-section');

    // Library of all items
    this.library = document.querySelector('.library');
  }

  // Show items in UI
  showItems(items) {
    let out = '';

    items.forEach(item => {
      out += `
        <div class="library-item id-${item.index}">
          <div class="library-item__desc">
            <span class="library-item__desc_title">${item.title} | </span> <span class="library-item__desc_genre 
            ${item.genre == 'Action' ? 'action' : 
            item.genre == 'Simulator' ? 'simulator' : 
            item.genre == 'RPG' ? 'rpg' : 
            item.genre == 'Racing' ? 'racing' : 
            item.genre == 'Shooter' ? 'shooter' : 
            item.genre == 'Adventure' ? 'adventure' : 
            item.genre == 'Strategy' ? 'strategy' : 
            item.genre == 'Sport' ? 'sport' : ''}">${item.genre}</span>
            <p>added by <span class="username">${item.user}</span></p>
          </div>
          <div class="library-item__controls">
            <i class="edit fa fa-edit"></i>
            <i class="delete fa fa-times"></i>
          </div>
        </div>
      `;
    })
    this.library,innerHTML = out;
  }

  // Change displayed image depending on the selected genre
  changeImage(genre) {
    // Check if element exist
    if(!document.querySelector('.genre-image')) {
      // Create image
      const img = document.createElement('img');
      img.src = `assets/img/${genre}.png`;
      img.className = 'genre-image';

      // Insert image on page
      this.formImageSection.insertAdjacentElement('beforeend', img);
    } else {
      // Change source of image
      document.querySelector('.genre-image').src = `assets/img/${genre.toLowerCase()}.png`;
    }
  }

  // Add item to list
  addItem(item) {
    // Create and append item
    this.library.innerHTML += `
      <div class="library-item id-${item.index}">
        <div class="library-item__desc">
          <span class="library-item__desc_title">${item.title} | </span> <span class="library-item__desc_genre 
          ${item.genre == 'Action' ? 'action' : 
          item.genre == 'Simulator' ? 'simulator' : 
          item.genre == 'RPG' ? 'rpg' : 
          item.genre == 'Racing' ? 'racing' : 
          item.genre == 'Shooter' ? 'shooter' : 
          item.genre == 'Adventure' ? 'adventure' : 
          item.genre == 'Strategy' ? 'strategy' : 
          item.genre == 'Sport' ? 'sport' : ''}">${item.genre}</span>
          <p>added by <span class="username">${item.user}</span></p>
        </div>
        <div class="library-item__controls">
          <i class="edit fa fa-edit"></i>
          <i class="delete fa fa-times"></i>
        </div>
      </div>
    `;

    // Clear form
    this.clearForm();
  }

  // Return an initial view of form
  clearForm() {
    this.title.value = '';
    this.genre.value = 'Choose';
    this.user.value = '';
    this.img.src = 'assets/img/choose.png'
  }

  // Incorrect form filling 
  validationError() {
    // Change input's border color
    this.title.style.borderColor = '#dc3545';
    this.genre.style.borderColor = '#dc3545';
    this.user.style.borderColor = '#dc3545';

    // Show alert
    this.showAlert('Please fill in all blanks', 'danger');

    // Return back input's border color
    setTimeout(() => {
      this.title.style.borderColor = '#bdbdbd';
      this.genre.style.borderColor = '#bdbdbd';
      this.user.style.borderColor = '#bdbdbd';
    }, 3000);
  }

  clearAll() {
    this.library.innerHTML = '';
  }

  showAlert(msg, type) {
    this.clearAlert();

    // Create alert
    const warn = document.createElement('div');
    warn.innerText = msg;
    warn.className = `alert alert-${type}`;

    // Insert alert
    document.querySelector('main').insertAdjacentElement('afterend', warn);

    // Remove alert in 3 seconds
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if(currentAlert) currentAlert.remove();
  }

  isEmpty() {
    console.log(this.library.hasChildNodes() ? 'not empty' : 'empty');
    return this.library.hasChildNodes();
  }
}

export default new UI;