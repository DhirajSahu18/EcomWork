export function fetchAddresses(userId) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/address?user="+ userId)
    const data = await response.json()
    resolve({data});}
  );
}


