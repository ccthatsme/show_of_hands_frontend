const username = document.getElementById('username');
const password = document.getElementById('password');

function login(){
    
    console.log('logging in');
    console.log(username.value);
    console.log(password.value);

    let login = {
        userName: username.value,
        password: password.value
    };

    console.log(JSON.stringify(login))
    console.log(login);

    fetch('http://localhost:8080/authenticate', {
           method: 'POST',
           headers: {
               
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Methods': 'POST',
                // 'Access-Control-Allow-Headers': 'Content-Type',
                // 'Access-Control-Allow-Origin': 'http://localhost:8000'

           },
           body: JSON.stringify(login)
       }).then( function(response) {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('Server response wasn\'t OK');
        }
        return response
    }).then( function(loginToken){
            console.log(loginToken);
        return loginToken;
    })};
