const email = document.getElementById('email')
const password = document.getElementById('password')
const form = document.getElementById('form')

function ShowError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerText = message;
  }
  
  //Show input success
  function ShowSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
  }
  
  function CheckEmail(input) {
    const char =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (char.test(input.value.trim())) {
      ShowSuccess(input);
    } else {
      ShowError(input, "Email is not valid");
    }
  }
  
  function CheckRequired(inputErr) {
    inputErr.forEach(function (input) {
      if (input.value.trim() === "") {
        ShowError(input, `${getFieldName(input)} is required`);
      } else {
        ShowSuccess(input);
      }
    });
  }
  
  function CheckLenght(input, min, max) {
    if (input.value.length < min) {
      ShowError(
        input,
        `${getFieldName(input)} must be at least ${min} characters`
      );
    } else if (input.value.length > max) {
      ShowError(
        input,
        `${getFieldName(input)} must be less then ${max} characters`
      );
    } else {
      ShowSuccess(input);
    }
  }
  
  function CheckPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
      ShowError(input2, "Password do not match");
    }
  }
  
  function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }
  
  // form.addEventListener("submit", function (e) {
  //   e.preventDefault();
  //   CheckRequired([email, password]);
  //   CheckLenght(password, 8, 25);
  //   CheckEmail(email);
  // });

const postData = async (e) => {
    e.preventDefault();
    const emailValue = email.value;
    const password1Value = password.value;
  
    const params = {
        email:emailValue,
        password: password1Value
    };
    const options =  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    };
    try {
      const resp = await fetch('https://ayalo-auth-api.herokuapp.com/login/', options)
      if(resp.status >= 300) {
        throw Error(resp.statusText)
      }
      const data = await resp.json()
      console.log(data);
      console.log(resp.status); 
      window.location.href = "./explore-page.html";     
    } catch (error) {
      throw new Error(error)
    }
    // fetch('https://ayalo-auth-api.herokuapp.com/login/', options)
    // .then(response => response.json())  // convert to json
    // .then(json => console.log(json))    //print data to console
    // .catch(err => console.log('Request Failed', err))
      // .then(
      //   function(response) {
      //     if (response.status == 201) {
      //       console.log('Looks like there was no problem. Status Code: ' +
      //         response.status);
      //         window.location.href = "explore-page.html";
      //     }
      //     else{
      //       window.location.href = "error404.html";
      //     }
      //     // Examine the text in the response
      //     response.json().then(function(data) {
      //       console.log(data);
      //     });
      //   }
      // )
      // .catch(function(err) {
      //   console.log('Fetch Error :-S', err);
      // });
  };
  
form.addEventListener("submit", postData);

function togglePasswordFieldClicked() {
  const passwordField = document.getElementById('password');
  var value = passwordField.value;
  if(passwordField.type == 'password') {
    passwordField.type = 'text';
  }
  else {
    passwordField.type = 'password';
  }
  passwordField.value = value;

} 