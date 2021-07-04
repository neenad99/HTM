const name = document.querySelector('#signnameid');
const email = document.querySelector('#signemailid');
const mobile = document.querySelector('#signmobileid');
const password = document.querySelector('#signpasswordid');
const state = document.querySelector('#signstateid');
const city = document.querySelector('#signcityid');
const pincode = document.querySelector('#signpincodeid');
const loginemail = document.querySelector('#loginmail');
const loginpassword = document.querySelector('#loginpass');

const signupbtn = document.getElementById('signupbtn');
const loginbtn = document.getElementById('loginbtn');
const host = 'http://localhost:3000';

function errorlogging(message){

}


signupbtn.addEventListener('click',()=>{
  const request = new Request(`${host}/api/user/register`,{
    method:'POST',
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify({name:name.value,email:email.value,password:password.value,mobno:mobile.value,state:state.value,city:city.value,pincode:pincode.value})
  });
  
  fetch(request).then((resp)=>resp.json().then((res)=>{
    console.log(res);
    if(res.message=="signup successful" && res.token){
      localStorage.setItem('token',res.token);
      localStorage.setItem('name',res.data.name);
      localStorage.setItem('email',res.data.email);
      localStorage.setItem('mobno',res.data.mobno);
      setTimeout(() => {
        window.location.href = 'profile';
      }, 100);
    }
  })).catch((err)=>{console.log('unable to sign up')});
});

loginbtn.addEventListener('click',()=>{
  const request = new Request(`${host}/api/user/login`,{
    method:'POST',
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify({email:loginemail.value,password:loginpassword.value})
  });
  
  fetch(request).then((resp)=>resp.json().then((res)=>{
    console.log(res);
    if(res.message=="Login successful" && res.token){
      localStorage.setItem('token',res.token);
      localStorage.setItem('name',res.data.name);
      localStorage.setItem('email',res.data.email);
      localStorage.setItem('mobno',res.data.mobno);
      setTimeout(() => {
        window.location.href = 'profile';
      }, 100);
    }
  })).catch((err)=>{console.log('unable to sign up')});
});