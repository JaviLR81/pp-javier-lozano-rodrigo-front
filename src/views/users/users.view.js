import angular from 'angular';
import template from './users.tpl.html';
import usersService from '../../services/users.service';

export default angular
  .module('users.view', [])
  .factory(usersService.name, usersService.factory)
  .component('users', {
    template,
    controller: [usersService.name, function (users) {
      const ctrl = this;      
      ctrl.usersData =[];

      ctrl.formScope = {name:"",gender:"male",email:"",phone:"",password:"",age:"",hobby:""};
      
      getUsersMethod();
                
      function getUsersMethod(){
        
        if(localStorage.getItem('token')!=null){
          users.getUsers()
          .then(result => {              
              ctrl.usersData = result.data;
          })
          .catch(error => {
            console.log(error);          
          });
        }else{
          ctrl.usersData=[];
        }        
      }
                 
      ctrl.registerUser=function(form){        
                        
        if(form.$valid){

          if(localStorage.getItem('token')!=null){                    
          users.registerUser(ctrl.formScope).then(result=>{          
          
            if(result.status==422){
              alert(result.data.data);
              return;
            }

            getUsersMethod();
            //Form valid reset all fields
            ctrl.formScope.name="";
            ctrl.formScope.gender="male";
            ctrl.formScope.email="";          
            ctrl.formScope.phone="";
            ctrl.formScope.password="";
            ctrl.formScope.age="";
            ctrl.formScope.hobby="";
          }).catch(err=>{
            console.log(err);            
          })  
          }else{
            alert("No token provided");
          }                        
        }else{          
          alert("Please check all fields");
        }                        
      }

      ctrl.filteredUsers=function(){        
        if(localStorage.getItem('token')!=null){   
          var name=ctrl.name;
          var hobby=ctrl.hobby;
          
          if(name==undefined || name=='' ){name=null;}
          if(hobby==undefined || hobby=='' ){hobby=null;}
          
          if(name==null && hobby==null){
            users.getUsers()
              .then(result => {                
                  ctrl.usersData = result.data;
              })
              .catch(error => {
                console.log(error);          
            });
          }else{          
            users.getFilteredUsers(name,hobby)
            .then(result => {              
                ctrl.usersData = result.data;
            })
            .catch(error => {
              console.log(error);          
            });
          } 
        }else{
          alert("No token provided");
        }                       
      }
      
      ctrl.deleteUser = function(index,id) {        
        if(localStorage.getItem('token')!=null){          
          users.deleteUser(id)
          .then(() => {                   
            //Don't getUsersMethod over again                           
            ctrl.usersData.splice(index,1);
          })
          .catch(error => {
            console.log(error);          
          });

        }else{
          alert("No token provided");
        }                
      };
          
      ctrl.login=function(){   

        const data={
          email: 'r.perez@gmail.com',
          password :'123456'
        }
        
        users.login(data).then(result=>{             
          if(result.status==404){
            alert(result.data.msg);
          }else if(result.status==200){
            localStorage.setItem("token",result.data.token);          
            getUsersMethod();          
          }          
        }).catch(err=>{                              
          console.log(err);          
        })

      }

      ctrl.logout=function(){                
        localStorage.removeItem("token"); 
        getUsersMethod();
      }

      ctrl.registerGenericUser=function(){                         
        users.registerGenericUser().then(result=>{            
          if(!result.data.created){
            alert(result.data.data);
          }else{
            alert("User correctly created");
          }                       
        }).catch(err=>{
          console.log(err);          
        })
      }
          
    }],
  })
  .name;

