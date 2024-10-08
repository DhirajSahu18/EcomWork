export  function createUser(userData) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/auth" , {
      method : "POST",
      body : JSON.stringify(userData),
      headers : {'content-type' : 'application/json'}
    })
    const data = await response.json()
    resolve({data});}
  );
}

export  function UpdateUser(userData) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/auth" , {
      method : "PATCH",
      body : JSON.stringify(userData),
      headers : {'content-type' : 'application/json'}
    })
    const data = await response.json()
    resolve({data});}
  );
}

export  function checkUser(userData) {
  return new Promise(async (resolve , reject ) =>{
    const email = userData.email;
    const password = userData.password;
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method : "POST",
        body : JSON.stringify(userData),
        headers : {'content-type' : 'application/json'}
      })
      if (response.ok) {
        const data = await response.json()
        resolve({data})
      }else{
        const error = await response.json()
        reject(error)
      }
    } catch (error) {
      reject(error)
    }
  }
  );
}

export  function SignOut() {
  return new Promise(async (resolve) =>{
    resolve({data : "Success"});}
  );
}
