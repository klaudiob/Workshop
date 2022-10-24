/**
 * mocks a virtual catalog
 * @author ES Academy
 */
class CatalogDB {
  constructor() {
    this.data = [];
  }
  /**
   * generate some dummy data in DB
   */
  seed() {
    this.data = [
      {id:'6',name:'biondi santi deluxe',img:'p1.webp',category:'liquors'},
      {id:'1',name:'biondi santi',img:'p1.webp',category:'liquors'},
      {id:'4',name:'pen',img:'p4.webp',category:'accessories'},
      {id:'5',name:'expensive stuff',img:'p5.webp',category:'accessories'},
      {id:'3',name:'jacket',img:'p3.webp',category:'clothing'},
      {id:'2',name:'montblanc geosphere',img:'p2.webp',category:'accessories'}
    ];
  }
  /**
   * naive implementation of insert
   * @param {Product} product product to be inserted in DB
   * @returns {Product} product just added in DB
   */
  insert(product) {
    this.data.push(product);
    return product;
  }
  
  /** return the products of the same category */
  getCategoryProducts(products){
    const filteredProducts = this.data.filter(element => {
      return products == element.category;
    });
    return filteredProducts;
  }

  /**
   * return list of all products
   * @returns {[Product]} list of products
   */
  getAll() {
    return this.data;
  }
  /**
   * return the product of given id
   * @param {string} id id of product
   * @returns {Product | null} product if found, otherwise null
   */
  get(id) {
    return this.data.find(product => product.id === id) || null;
  }
  /**
   * update the product of given id
   * @param {string} id 
   * @param {Product} product 
   * @returns {Product | false} product if successfull, otherwise false
   */
  update(id, product) {
    const index = this.data.findIndex(product => product.id === id);
    if (index > -1) {
      this.data[index] = product;
      return product;
    }
    return false;
  }
  /**
   * remove the product of given id
   * @param {string} id id of product
   * @returns {boolean} true if found and deleted, otherwise false
   */
  remove(id) {
    const index = this.data.findIndex(product => product.id === id);
    if (index >= 0) {
      this.data.splice(index, 1);
      return true;
    }
    return false;
  }

  countProducts(){
    return this.data.length;
  }

  maxLength() {
    const longest = this.data.sort(
      function (a, b) {
        return b.name.length - a.name.length;
      }
    )[0];
    return longest;
  }


  /**
   * clean all the catalog
   */
  empty() {
    this.data = [];
  }
}

module.exports = CatalogDB;
