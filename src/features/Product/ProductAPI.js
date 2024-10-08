export function fetchAllProducts() {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/products")
    const data = await response.json()
    resolve({data});}
  );
}

export  function createProduct(productData) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/products" , {
      method : "POST",
      body : JSON.stringify(productData),
      headers : {'content-type' : 'application/json'}
    })
    const data = await response.json()
    resolve({data});}
  );
}

export  function UpdateProduct(productData) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/products/" , {
      method : "PATCH",
      body : JSON.stringify(productData),
      headers : {'content-type' : 'application/json'}
    })
    const data = await response.json()
    resolve({data});}
  );
}

export function fetchAllSelectedProduct(id) {
  return new Promise(async (resolve) =>{
    const response = await fetch(`http://localhost:8080/products/${id}`)
    const data = await response.json()
    resolve({data});}
  );
}

export function fetchAllBrands() {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/brands")
    const data = await response.json()
    resolve({data});}
  );
}

export function fetchAllCategories() {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/categories")
    const data = await response.json()
    resolve({data});}
  );
}

export function fetchProductsByFilters(filter , sort , pagination) {
  // filter = {"category":"smartphone"}
  // TODO : on server we will support multi values
  let queryString = '';
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }
  
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }
  
  for(let key in filter){
    let categoryValues = filter[key];
    if(categoryValues.length){
    let lastCat = categoryValues[categoryValues.length - 1]
    queryString += `${key}=${lastCat}&`}
  }
  
  
  console.log(queryString)
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/products?'+queryString) 
    const data = await response.json()
    const totalItems = await response.headers.get('X-Total-Count')
    resolve({data : {products : data , totalItems : +totalItems}})
  }
  );
}