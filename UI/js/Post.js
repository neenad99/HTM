const formdata = document.getElementById('formdata');
const submitbtn = document.getElementById('submit');
const host = 'http://localhost:3000';
submitbtn.addEventListener('click',()=>{
    const Form = new FormData(formdata);

    const req = new Request(`${host}/api/user/action`,{
        method:'POST',
        headers:{
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiYzEyM0BnbWFpbC5jb20iLCJpZCI6IjYwZDdmMzU5NDQ1NDk2MjkyNDNhNDhlYiIsImlhdCI6MTYyNDc3MTM5OH0.Z9Pec6bKhpowGNaRcu-s632C--FrGoJeUi4UxndmzrU'
        },
        body:Form
    });

    fetch(req).then((resp)=>resp.json().then((res)=>{
        console.log('image uploaded check uploads folder');
        console.log(res);
    }));
})