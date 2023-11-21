function makeDrinksService() {
  const baseUrl = '/api/drinks';
  const headers = {
    'Content-Type': 'application/json'
  };

  async function getDrinks(page, limit = 5) {
    let url = `${baseUrl}?page=${page}&limit=${limit}`;
    return await fetch(url).then((res) => res.json());
  }

  async function createDrink(drink) {
    return await fetch(baseUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(drink)
    }).then((res) => res.json());
  }

  async function deleteAllDrinks() {
    return await fetch(baseUrl, {
      method: 'DELETE'
    }).then((res) => res.json());
  }

  async function getDrink(id) {
    return await fetch(`${baseUrl}/${id}`).then((res) => res.json());
  }

  async function updateDrink(id, drink) {
    return await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(drink)
    }).then((res) => res.json());
  }

  async function deleteDrink(id) {
    return await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE'
    }).then((res) => res.json());
  }

  return {
    getDrinks,
    deleteAllDrinks,
    getDrink,
    createDrink,
    updateDrink,
    deleteDrink
  };
}

export default makeDrinksService();
