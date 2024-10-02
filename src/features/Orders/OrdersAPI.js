export  function createOrder(orderData) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/orders" , {
      method : "POST",
      body : JSON.stringify(orderData),
      headers : {'content-type' : 'application/json'}
    })
    const data = await response.json()
    resolve({data});}
  );
}

export  function UpdateOrder(orderData) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/orders/", {
      method : "PATCH",
      body : JSON.stringify(orderData),
      headers : {'content-type' : 'application/json'}
    })
    const data = await response.json()
    resolve({data});}
  );
}

export  function fetchUserOrder(userId) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/orders/user?user="+userId)
    const data = await response.json()
    resolve({data});}
  );
}

export  function fetchAllOrders({sort , pagination}) {
  return new Promise(async (resolve) =>{
    let queryString = '';
    for(let key in sort){
      queryString += `${key}=${sort[key]}&`
    }

    for(let key in pagination){
      queryString += `${key}=${pagination[key]}&`
    }

    const response = await fetch("http://localhost:8080/orders?"+queryString)
    const data = await response.json()
    const totalItems = await response.headers.get('X-Total-Count')
    resolve({data : {orders : data , totalItems : +totalItems}});
  }
  );
}