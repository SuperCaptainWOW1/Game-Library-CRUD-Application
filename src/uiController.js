const UIController = (function() {
  // UI selectors
  const select = {
    firstBtn: document.querySelector('#firstBtn'),
    secondBtn: document.querySelector('#secondBtn'),
    library: document.querySelector('.library'),
    titleInput: document.querySelector('#title'),
    genreInput: document.querySelector('#genre'),
    userInput: document.querySelector('#user'),
    idInput: document.querySelector('#id'),
    genreImage: document.querySelector('.genre-image'),
    cardTitle: document.querySelector('.title-section h2')
  }

  let state = 'add';
  let currentEditElementID = '';
  
  return {
    getUISelectors() {
      return select;
    },
    changeGenreImage(genre) {
      select.genreImage.src = `assets/img/${genre}.png`;
    },
    fillForm(data) {
      if(data.user === 'Anonim') data.user = '';
      [select.titleInput.value, select.genreInput.value, select.userInput.value] = [data.title, data.genre, data.user];
    },
    showItem(item) {
      const div = document.createElement('div');
      div.className = 'library-item';
      div.dataset.id = item.id;
      // Create item
      div.innerHTML =  `
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
      `;  
      // Append item
      select.library.appendChild(div);
      // Clear fields
      this.clearFields();
      
      return div;
    },
    deleteItem(id) {
      document.querySelector(`[data-id="${id}"]`).remove();
    },
    updateItem(newItem) {
      // Select item to replace
      const updatedChild = document.querySelector(`[data-id='${newItem.id}']`);
      // Select item for replace
      const newChild = this.showItem(newItem);
      // Replace items
      select.library.replaceChild(newChild, updatedChild);
    },
    changeState(type, genre) {
      if(type === 'add') {
        state = 'add';
        // Change card title
        select.cardTitle.innerText = 'Add new game';
        // Change first button innertext
        select.firstBtn.innerHTML = 'Add Game';
        // Change first button background
        select.firstBtn.style.backgroundColor = '#3f51b5';
        // Change second button innertext
        select.secondBtn.innerHTML = 'Clear All';
      } else if (type === 'edit') {
        state = 'edit';
        // Change card title
        select.cardTitle.innerText = 'Edit game';
        // Change first button innertext
        select.firstBtn.innerHTML = 'Apply';
        // Change first button background
        select.firstBtn.style.backgroundColor = '#ffa726';
        // Change second button innertext
        select.secondBtn.innerHTML = 'Cancel';
        // Open selected genre image
        select.genreImage.src = `assets/img/${genre}.png`;
      }
    },
    checkForState() {
      return state;
    },
    getCurrentEditElementID() {
      return currentEditElementID;
    },
    setCurrentEditElementID(elem) {
      currentEditElementID = elem;
    },
    showAlert(msg, type) {
      // Remove if already exist
      if(document.querySelector('.alert')) document.querySelector('.alert').remove();

      // Create alert
      const alert = document.createElement('div');
      alert.innerText = msg;
      alert.className = `alert ${type}`;

      // Append alert
      document.body.appendChild(alert);

      setTimeout(() => {
        // Remove only if exist
        if(document.querySelector('.alert')) document.querySelector('.alert').remove();
      }, 3000);
    },
    clearFields() {
      // Reload all inputs
      select.titleInput.value = '';
      select.genreInput.value = 'Choose';
      select.userInput.value = '';
      select.genreImage.src = `assets/img/choose.png`;
    },
    inputsIsEmpty() {
      return select.titleInput.value && select.genreInput.value !== 'Choose' ? false : true;
    }
  }
})()

export default UIController;