export  function addItem(item) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/cart" , {
      method : "POST",
      body : JSON.stringify(item),
      headers : {'content-type' : 'application/json'}
    })
    const data = await response.json()
    resolve({data});}
  );
}

export  function updateItem(item) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/cart/" , {
      method : "PATCH",
      body : JSON.stringify(item),
      headers : {'content-type' : 'application/json'}
    })
    const data = await response.json()
    resolve({data});}
  );
}

export function fetchCardbyUserID(id) {
  return new Promise(async (resolve) =>{
    const response = await fetch(`http://localhost:8080/cart?user=${id}`)
    const data = await response.json()
    resolve({data});}
  );
}

export function deleteItem(productId) {
  return new Promise(async (resolve) => {

    let url;

    if (productId) {
      // Delete by product ID
      url = `http://localhost:8080/cart/${productId}`;
    }

    const response = await fetch(url, {
      method: "DELETE",
      headers: { 'content-type': 'application/json' }
    });
    
    const data = await response.json();
    resolve({ data : {id: productId} });
  });
}

export function deleteUserItem(userId) {
  return new Promise(async (resolve) => {

    let url;

    if (userId) {
      // Delete by product ID
      url = `http://localhost:8080/cart/user/${userId}`;
    }

    const response = await fetch(url, {
      method: "DELETE",
      headers: { 'content-type': 'application/json' }
    });
    
    const data = await response.json();
    resolve({ data : {uId: userId} });
  });
}

// export function deleteUserItem(userId) {
//   return new Promise(async (resolve) =>{
//     const response = await fetchCardbyUserID(userId);
//     const items = response.data;
//     console.log(items)
//     let i;
//     for(i=0;i<items.length;i++){
//       await deleteItem(items[i].id)
//     }
//     resolve({data : {uId : userId}});}
//   );
// }

