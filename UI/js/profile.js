const name = document.querySelector('#name');
const email = document.querySelector('#mail');
const mobno = document.querySelector('#mobile');

window.onload  = () => {
    name.placeholder = localStorage.getItem('name');
    email.placeholder = localStorage.getItem('email');
    mobno.placeholder = localStorage.getItem('mobile');
}