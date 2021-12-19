async function loginProceso(event){
  
    event.preventDefault();
    try {
      const emailField = document.getElementById("email");
      const passwordField = document.querySelector("#password");
      if (emailField && passwordField) {
        const emailValue = emailField.value.trim();
        const passwordValue = passwordField.value.trim();
        if (emailValue != "") {
          console.log(`el email es válido`);
          if (passwordValue != "") {
            passwordField.style.backgroundColor = "inherit";
            console.log(`exitoso`);
            
            console.log(`emailValue`, emailValue);
            console.log(`passwordValue`, passwordValue);
            if(await verificarEmailPassword(emailValue, passwordValue)==false){
              if(await  verificarEmail(emailValue)){
                alert("Contraseña no valida");
                document.getElementById("objeto").style.display = 'block';
              }else{
                alert("No existe el usuario");
                document.getElementById("objeto").style.display = 'block';
              }

            }
            

          } else {
            console.log(`la contraseña no es válida`);
            passwordField.style.backgroundColor = "#F3B4B4";
          }
        } else {
          emailField.style.backgroundColor = "#F3B4B4";
          console.log(`el email no es válido`);
        }
        
      } else {
        alert("alguno de los campos esta vacio");
      }
    } catch (error) {
      console.log(`se presentó un error inesperado`, error);
    }
  
    console.log(`he sido enviado`);
  }

  async function verificarEmail(Email){
    try {
        // const url = `http://localhost:8080/api/user/${Email}`;
        const url = `http://129.151.122.195:8080/api/user/${Email}`;
        const response = await fetch(url);
        const convertedJson = await response.json();
        return convertedJson;
      } catch (error) {
        console.log(`se presentó un error: `, error);
      }
}

async function verificarEmailPassword(email, password) {
    try {
      // const url = `http://localhost:8080/api/user/${email}/${password}`;
      const url = `http://129.151.122.195:8080/api/user/${email}/${password}`;
      const response = await fetch(url);
      const convertedJson = await response.json();
      console.log(`convertedJson`, convertedJson);
      if (convertedJson.id!=null){
        alert("Bienvenido "+convertedJson.name);
        // document.getElementById("objeto").style.display = 'none';
        await limpiarformulario();
      }else{
        return false;
      }
    } catch (error) {
      console.log(`se presentó un error: `, error);
    }
  }
   
  async function limpiarformulario(){
    document.getElementById("loginForm").reset();
}
   