const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const accountType = document.getElementById("account-type");

//Show input error message
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

form.addEventListener("submit", function (e) {
  e.preventDefault();
  CheckRequired([username, email, password, password2]);
  CheckLenght(username, 3, 15);
  CheckLenght(password, 8, 25);
  CheckEmail(email);
  CheckPasswordsMatch(password, password2);
});

// var firebaseConfig = {
//   apiKey: "AIzaSyCt55zMcKEtrjHVoGxthdjW3M8QPJcstVc",
//   authDomain: "ayalo-online.firebaseapp.com",
//   projectId: "ayalo-online",
//   storageBucket: "ayalo-online.appspot.com",
//   messagingSenderId: "1093844772115",
//   appId: "1:1093844772115:web:23320ae20a419e3d5626e6",
//   measurementId: "G-QZP1WZCWSN",
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// function signup() {
//   const email = document.getElementById("signup");
// // }
// async function postFormDataAsJson({ url='ayalo-auth-api.herokuapp.com/signup/', formData }) {
//     const plainFormData = Object.fromEntries(formData.entries());
//     const formDataJsonString = JSON.stringify(plainFormData);

//     const fetchOptions = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: formDataJsonString,
//     };

//     const response = await fetch(url='ayalo-auth-api.herokuapp.com/signup/', fetchOptions);

//     if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(errorMessage);
//     }

//     return response.json();
// }

// async function handleFormSubmit(e){
//     e.preventDefault();
//     const form = e.currentTarget;
//     const url = form.action;
//     try{
//         const formData = new FormData(form);
//         const responseData = await postFormDataAsJson({url:'ayalo-auth-api.herokuapp.com/signup/', formData });
//         console.log({ responseData });
//     } catch(error){
//         console.log(error)
//     }
// }

// const myForm = document.getElementById('form')

const postData = (e) => {
  e.preventDefault();
  const usernameValue = username.value;
  const emailValue = email.value;
  const password1Value = password.value;
  const password2Value = password2.value,
  accountTypeValue = accountType.value;
 

  const params = {
    AccountType: accountTypeValue,
    password: password1Value,
    username: usernameValue,
    email:emailValue
  };
  const options =  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  };
  fetch('https://ayalo-auth-api.herokuapp.com/signup/', options)
  .then(
    function(response) {
      if (response.status >= 200 && response.status < 300) {
        console.log('Looks like there was no problem. Status Code: ' +
          response.status);
          window.location.href = "login-page.html";
      }
      else{
        window.location.href = "error404.html";
      }
      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    }
  )                                                                                                                                                                                                                                                                                                                                                                               
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
  
  // .then((resp) =>{
    //   if (resp.status == 200) {
    //     console.log(`Status: ${resp.status}`);
    //     return
    //   } 
    // })
    // .then((json) => console.log(json))
    
    // .catch((err) => console.log(err));
    
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
