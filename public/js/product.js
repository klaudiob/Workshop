console.groupEnd();
console.group('product details page');

let product;
// let productLoaded = false;

/**
 * return query parameters of current page as object
 * @returns {object} query parameters
 */
const getQueryParams = () => {
  const urlSearchParams = new URLSearchParams(location.search);
  return Object.fromEntries(urlSearchParams.entries());
};

/**
 * fetch the product data and set them in the html
 */
const setProductData = () => {
  const queryParams = getQueryParams();

  fetch(`/api/products/${queryParams.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.text())
    .then(response => {
      const parsedResponse = JSON.parse(response);
      if (parsedResponse.success) {
        product = parsedResponse.data;
        document.getElementById('name').innerText = product.name;
        document.getElementById('category').innerText = product.category;
        document.getElementById('description').innerText = product.description ? product.description : '';
        document.getElementById('image').src = 'images/products/' + product.img; 
        document.title=product.name.toUpperCase();  
      } else {
        console.warn('error getting product:', queryParams.id);
      }
    })
    .catch(console.warn);
};

const deleteProduct = () => {
  const queryParams = getQueryParams();

  fetch(`/api/products/${queryParams.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.text())
    .then(response => {
      const parsedResponse = JSON.parse(response);
      console.log(parsedResponse);
      location.href = '/catalog'; 
    })
    .catch(console.warn);
};

const updatedProduct = () => {
  product.description = document.getElementById('description').value;
  fetch(`/api/products/${product.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  })
    .then(response => response.text())
    .then(response => {
      const parsedResponse = JSON.parse(response);
      console.log(parsedResponse);
    })
    .catch(console.warn);
};

const deleteClickHandler = event => {
  event.preventDefault();
  deleteProduct();
};

const saveClickHandler = event => {
  event.preventDefault();
  updatedProduct();
};

document.getElementById('delete').addEventListener('click', deleteClickHandler);
document.getElementById('save').addEventListener('click', saveClickHandler);

setProductData();
