/* eslint-disable no-unused-vars */
console.groupEnd();
console.group('products listing page');

/**
 * set the html block for the listing
 * @param {[Product]} data list of products
 * @param {string} elementId id of the html container
 */
const setContent = (data, elementId) => {
  const carouselContent = data.map(prod => {
    return `
      <div class="col-md-3 col-12 mb-4"> 
        <div class="card h-100">
          <img class="card-img-top" src="images/products/${prod.img}" alt="${prod.name}">
          <div class="card-body">
            <h5 class="card-title">${prod.name}</h5>
            <a href="/product?id=${prod.id}" class="btn btn-primary">Details</a>
          </div>
        </div>
      </div>`;
  }).join('');

  document.getElementById(elementId).innerHTML = carouselContent;
};

const setDropdownContent = (data, elementId) => {
  const dropdownContent = data.map(item => {
    return `
    <option value="${item}">${item}</option>`;
  }).join('');

  document.getElementById(elementId).innerHTML += dropdownContent;
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

function selectedCategory() {
  let category = document.getElementById('category').value;
  // console.log(item);
  fetch('/api/products') 
    .then(response => response.text())
    .then(response => {
      const parsedResponse = JSON.parse(response);
      if (parsedResponse.success) {
        console.log('parsedResponse: ', parsedResponse.data);
        if(category === 'allProducts'){
          setContent(parsedResponse.data, 'products-list');
        } else {
          const filteredProducts = parsedResponse.data.filter(element => element.category === category);
          // console.log('parsedResponse: ', filteredProducts);
          setContent(filteredProducts, 'products-list');
        }
        
      } else {
        console.warn('error');
      }
    })
    .catch(console.warn);
}

// document.getElementById('category').addEventListener('change',()=>{
//   getCategoriesProducts();
// });

function getSortOrder() {
  const sort = document.getElementById('inputState').value;
  let category = document.getElementById('category').value;
  console.log(sort);
  fetch('/api/products') 
    .then(response => response.text())
    .then(response => {
      const parsedResponse = JSON.parse(response);
      if (parsedResponse.success) {
        let list;
        if(category === 'allProducts'){
          list = parsedResponse.data;
        } else {
          list = parsedResponse.data.filter(element => element.category === category);
        }
        if(sort === 'asc'){
          list.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
          setContent(list, 'products-list');
        } else {
          list.sort((a, b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0));
          setContent(list, 'products-list');
        }
      } else {
        console.warn('error');
      }
    })
    .catch(console.warn);
}

// document.getElementById('inputState').addEventListener('change',()=>{
//   getSortOrder();
// });





/**
 *
 * @param {string} key key of property to sort by
 */
const sortAscByProp = key => {
  return (item1, item2) => {
    if (item1[key] < item2[key]) {
      return -1;
    }
    if (item1[key] > item2[key]) {
      return 1;
    }
    return 0;
  };
};

fetch('/api/products')
  .then(response => response.text())
  .then(response => {
    const parsedResponse = JSON.parse(response);
    if (parsedResponse.success) {
      const orderedList = parsedResponse.data.sort(sortAscByProp('id'));
      setContent(orderedList, 'products-list');
    } else {
      console.warn('error');
    }
  })
  .catch(console.warn);


getCategories();
