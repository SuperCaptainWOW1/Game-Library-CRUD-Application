// Import all modules and libraries
import http from './httpLibrary'
import itemController from './itemController'
import UIController from './uiController'

// Main module of app
const App = (function() {
  // Set up database url
  const dbURL = 'http://localhost:3000/games';
  // Get DOM selectors
  const select = UIController.getUISelectors();

  return {
    init() {
      // Listeners <\

      // Listen for page load
      document.addEventListener('DOMContentLoaded', this.onLoad);
      // Listen for genre change
      select.genreInput.addEventListener('click', this.changeGenreImage)
      // Listen for add
      select.firstBtn.addEventListener('click', this.submitItem);
      // Listen for delete
      select.library.addEventListener('click', this.deleteItem);
      // Listen for edit
      select.library.addEventListener('click', this.enableEdit);
      // Listen for cancel edit and clear all fields
      select.secondBtn.addEventListener('click', this.cancelEdit);

      // /> Listeners
    },
    onLoad() {
      http.get(dbURL)
        // If data is recieved return data
        .then(data => {
          // Add items to item controller
          itemController.setItems(data);
          // Get items
          const items = itemController.getItems()
          // Add items to UI
          items.forEach(item => {
            UIController.showItem(item)
          })
        })
        // If data hasn't recieved return error
        .catch(err => {
          // Show error
          UIController.showAlert("Can't recieve data from server", 'alert-danger');
          console.log(err);
        })
      
    },
    changeGenreImage(e) {
      const genre = e.target.value.toLowerCase();
      UIController.changeGenreImage(genre);
    },
    submitItem() {
      // Check the state and add or update item
      if(UIController.checkForState() === 'add' && !UIController.inputsIsEmpty()) {
        // Create a container for new item
        const item = {
          title: select.titleInput.value,
          genre: select.genreInput.value,
          user: select.userInput.value || 'Anonim'
        };
        
        // Add item to item controller
        itemController.addItem(item);
        // Add item to database
        http.post(dbURL, item);
        // Add item to UI
        UIController.showItem(item);

        // Show success alert
        UIController.showAlert('Item successfully added', 'alert-success');
      } else if (UIController.checkForState() === 'edit' && !UIController.inputsIsEmpty()) {
        // Create a container for new item
        const newItem = {
          id: UIController.getCurrentEditElementID(),
          title: select.titleInput.value,
          genre: select.genreInput.value,
          user: select.userInput.value || 'Anonim'
        };

        // Update item in item controller
        itemController.updateItem(newItem);
        // Update item in database
        http.put(dbURL + '/' + newItem.id, newItem);
        // Update item in UI
        UIController.updateItem(newItem);

        // Show success alert
        UIController.showAlert('Item successfully updated', 'alert-success');

        // Change to initial view
        UIController.changeState('add');
      } else {
        // Show warning
        UIController.showAlert('Please fill in all blanks', 'alert-danger'); 
      }
    },
    deleteItem(e) {
      if(e.target.classList.contains('delete')) {
        // Select id of item
        const id = parseInt(e.target.parentElement.parentElement.dataset.id);
        // Get all items
        const items = itemController.getItems();

        items.forEach(item => {
          if(item.id == id) {

            // Delete from item controller
            itemController.deleteItem(id);

            // Delete from UI
            UIController.deleteItem(id);
            // Delete from database
            http.delete(`${dbURL}/${id}`);
          }
        })

        // Change state
        UIController.changeState('add');

        // Show success alert
        UIController.showAlert('Item successfully deleted', 'alert-success');
      }
    },
    enableEdit(e) {
      if(e.target.classList.contains('edit')) {
        const gameGenre = e.target.parentElement.parentElement.children[0].children[1].textContent.toLowerCase();
        // Change state
        UIController.changeState('edit', gameGenre);
        // Get items
        const items = itemController.getItems();
        
        // Find item to edit
        let editedItem;
        items.forEach(item => {
          if(item.id == e.target.parentElement.parentElement.dataset.id) {
            editedItem = item;
            UIController.setCurrentEditElementID(item.id);
          }
        });

        // Fill form with item's data
        UIController.fillForm(editedItem);
      }
    },
    cancelEdit() {
      // Clear fields
      UIController.clearFields();
      // Change to initial view
      UIController.changeState('add');
    }
  }
})(itemController, UIController, http);

App.init();