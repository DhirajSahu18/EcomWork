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

export  function fetchUserOrder(userId) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/orders?user="+userId)
    const data = await response.json()
    resolve({data});}
  );
}