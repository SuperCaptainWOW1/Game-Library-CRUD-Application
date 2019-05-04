class Http {
  constructor() {

  }

  // Make GET request
  async get(url) {
    const response = await fetch(url);
    const responseData = await response.json();
    
    return responseData;
  }

  // Make POST request
  async post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const responseData = response.json();
    
    return responseData;
  }

  // Make PUT request
  async put(url, data) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
		return responseData;
  }

  // Make DELETE request
  async delete(url) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
    const responseData = response.json();

    return 'Game successfully deleted';
  }
}

export default new Http;