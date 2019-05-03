class UI {
  constructor() {
    this.title = document.querySelector('#title');
    this.genre = document.querySelector('#genre');
    this.user = document.querySelector('#user');
    this.img = document.querySelector('.genre-image');
    this.addBtn = document.querySelector('#addbtn');
    this.formImageSection = document.querySelector('.form-image-section');
    this.library = document.querySelector('.library');
  }

  changeImage(genre) {
    // Check if element exist
    if(!document.querySelector('.genre-image')) {
      // Create image
      const img = document.createElement('img');
      img.src = `assets/img/${genre}.png`;
      img.className = 'genre-image';

      this.formImageSection.insertAdjacentElement('beforeend', img);
    } else {
      document.querySelector('.genre-image').src = `assets/img/${genre}.png`;
    }
  }

  addItem(item) {
    // Create item
    this.library.innerHTML += `
      <div class="library-item index-${item.index}">
        <div class="library-item__desc">
          <p>
            added by:<br><em>${item.user}</em>
          </p>
          <h3>${item.title}</h3>
        </div>
        <img class="library-item__image" src="${item.imgSrc}" alt="">
        <div class="library-item__controls">
          <i class="delete fa fa-times"></i>
          <i class="edit fa fa-edit"></i>
        </div>
      </div>
    `;
  }

  clearForm() {
    this.title.value = '';
    this.genre.value = 'choose';
    this.user.value = '';
    this.img.src = 'assets/img/choose.png'
  }

  validationError() {
    this.title.style.borderColor = '#dc3545';
    this.genre.style.borderColor = '#dc3545';
    this.user.style.borderColor = '#dc3545';

    this.createAlert('Please fill in all blanks')

    setTimeout(() => {
      this.title.style.borderColor = '#bdbdbd';
      this.genre.style.borderColor = '#bdbdbd';
      this.user.style.borderColor = '#bdbdbd';
    }, 3000);
  }

  createAlert(msg) {
    // Check if already exist
    document.querySelector('.alert') ? document.querySelector('.alert').remove() : null;

    // Create alert
    const warn = document.createElement('div');
    warn.innerText = msg;
    warn.className = 'alert alert-danger';

    // Insert alert
    document.querySelector('main').insertAdjacentElement('afterend', warn);

    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000);
  }
}

export const ui = new UI;