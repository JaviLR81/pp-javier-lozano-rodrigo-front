

export default {  
  name: 'usersService',
  factory: ['$http', ($http) => {
    
    function getUsers() {     
      var header = {        
        headers: {          
          'x-access-token': localStorage.getItem('token')          
        }        
      };
     
      let url="http://localhost:5000/getUsers";  
      
      return $http.get(url,header)
        .then(result => {          
          return result;          
        })
        .catch(error => {
          return error;
        });            
    }

    function getFilteredUsers(name,hobby) {     

      var header = {        
        headers: {          
          'x-access-token': localStorage.getItem('token')          
        }        
      };
     
      let url="http://localhost:5000/getFilteredUsers/"+name+"/"+hobby;  
      
      return $http.get(url,header)
        .then(result => {          
          return result;          
        })
        .catch(error => {
          return error;
        });            
    }
    
    function registerUser(data) {      
      var header = {        
        headers: {          
          'x-access-token': localStorage.getItem('token')          
        }        
      };

      let url="http://localhost:5000/registerUser";
      
      return $http.post(url,data,header)
        .then(result => {          
          console.log(result);
          return result;
        })
        .catch(error => {
          console.log(error);
          return error;
      });            
    }

    function registerGenericUser(){                    
      let url="http://localhost:5000/registerGenericUser";

      return $http.post(url)
        .then(result => {          
          console.log(result);
          return result;
        })
        .catch(error => {          
          return error;
      });
    }

    function deleteUser(id) {      
      var header = {        
        headers: {          
          'x-access-token': localStorage.getItem('token')          
        }        
      };
         
      let url="http://localhost:5000/deleteUser/"+id;
      
      return $http.delete(url,header)
        .then(result => {                    
          return result;
        })
        .catch(error => {          
          return error;
      });            
    }

    function login(data){      
      let url="http://localhost:5000/login";      
      return $http.post(url,data)
        .then(result => {                    
          return result;
        })
        .catch(error => {          
          return error;
      });
    }
    
    return {
      getUsers,
      getFilteredUsers,
      registerUser,
      registerGenericUser,
      deleteUser,
      login
    };
  }]
}