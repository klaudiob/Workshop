console.groupEnd();
console.group('product creation page');

/**
 * retrieve data from form and return it as object
 * @returns {Product} product
 */
const getDataFromForm = () => {
  return {
    id: document.getElementById('id').value || new Date().valueOf().toString(),
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    img: document.getElementById('image').value,
    category: document.getElementById('category').value
  };
};

/**
 * set the html block for the dropdown
 * @param {[string]} data list of dropdown items
 * @param {string} elementId id of the html container
 */
const setDropdownContent = (data, elementId) => {
  const dropdownContent = data.map(item => {
    return `
    <option value="${item}">${item}</option>`;
  }).join('');

  document.getElementById(elementId).innerHTML = dropdownContent;
};

/**
 * fetch the categories and set them into the dropdown
 */
const getCategories = () => {
  fetch('/api/categories', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.text())
    .then(response => {
      const parsedResponse = JSON.parse(response);
      if (parsedResponse.success) {
        setDropdownContent(parsedResponse.data, 'category');
      } else {
        console.warn('error');
      }
    })
    .catch(console.warn);
};

/**
 * fetch the images and set them into the dropdown
 */
const getImages = () => {
  fetch('/api/images', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.text())
    .then(response => {
      const parsedResponse = JSON.parse(response);
      if (parsedResponse.success) {
        setDropdownContent(parsedResponse.data, 'image');
      } else {
        console.warn('error');
      }
    })
    .catch(console.warn);
};

/**
 * retrieve data from form and send them to server
 */
const createProduct = () => {
  let product = getDataFromForm();
  if(product.name != null && product.name != ''){
    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(response => response.text())
      .then(response => {
        const parsedResponse = JSON.parse(response);
        if (parsedResponse.success) {
          console.log(parsedResponse.data);
        } else {
          console.warn('error');
        }
      })
      .catch(console.warn);
  }
  else{
    // eslint-disable-next-line no-undef
    alert('Please input name!');
  }
};



/**
 * function handling the click event for submit
 * @param {MouseEvent} event 
 */
const submitHandler = event => {
  event.preventDefault();
  createProduct();
};

getCategories();
getImages();

document.getElementById('submit').addEventListener('click', submitHandler);
