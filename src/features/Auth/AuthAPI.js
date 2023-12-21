export  function createUser(userData) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/users" , {
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
    const response = await fetch("http://localhost:8080/users/" + userData.id , {
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
    const response = await fetch("http://localhost:8080/users/")
    const data = await response.json()
    const user = data.find(u => u.email === email);
    if(user){
      if(user.password === password){
        resolve({data : user})
      }
      else{
        reject({message : "Invalid credentials"})
      }
    }else{
      reject({message : "User not found"})
    }
  }
  );
}



export  function SignOut() {
  return new Promise(async (resolve) =>{
    resolve({data : "Success"});}
  );
}
