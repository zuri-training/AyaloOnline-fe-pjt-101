const email = document.getElementById('email-recovery')
const form = document.getElementById('form')

const postData = (e) => {
    e.preventDefault();
    const emailValue = email.value;
    console.log(emailValue)
    const params = {
      email:emailValue
    };
    const options =  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    };
    fetch('https://ayalo-auth-api.herokuapp.com/password/change/', options)
    .then(response => response.json())  // convert to json
    .then(json => console.log(json))    //print data to console
    .catch(err => console.log('Request Failed', err))
  };
  
  form.addEventListener("submit", postData);