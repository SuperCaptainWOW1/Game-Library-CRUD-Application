const ItemController = (function() {
  let data = [];
  let id = 1;

  return {
    getItems() {
      // Get data from item controller
      return data;
    },
    setItems(items) {
      // Set data to item controller
      data = items;
    },
    addItem(item) {
      item.id = id;
      // Add item to data
      data.push(item);
      id++;
    },
    deleteItem(index) {
      data = data.filter(item => {
        return item.id !== index;
      });
    },
    updateItem(item) {
      data.forEach(dataItem => {
        if(dataItem.id === item.id) {
          // updatedItem = dataItem;
          // Update all values of item
          [dataItem.title, dataItem.genre, dataItem.user] = [item.title, item.genre, item.user];
        }
      })
    }
  }
})();

export default ItemController;