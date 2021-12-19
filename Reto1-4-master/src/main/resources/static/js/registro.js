async function ProcesoRegistro(event){
  
    event.preventDefault();
    try{
        const nombreField= document.querySelector("#nombre")
        const emailField = document.getElementById("email");
        const password1Field = document.getElementById("password1");
        const password2Field = document.getElementById("password2");
            const nombrevalue= nombreField.value.trim();
            const emailValue = emailField.value.trim();
            const password1value = password1Field.value.trim();
            const password2value = password2Field.value.trim();
           

        if(password1value==password2value){
            document.getElementById("validacion").style.display='none';
           if(await verificarEmail(emailValue)==false){
            document.getElementById("objeto").style.display='none';
            await guardarRegistro(nombrevalue, emailValue, password1value);
            alert("Cuenta creada de forma correcta");
            
            document.getElementById("objeto").style.display='block';

           }else{
            alert("No fue posible crear la cuenta");
            document.getElementById("objeto").style.display='block';
            if(await verificarEmailPassword(emailValue, password1value)){
                document.getElementById("objeto").style.display='block';
                alert("tu email y contraseña ya estan vinculados a una cuenta inicia sesión");
            }
           }
        }else{
            document.getElementById("validacion").style.display='block';

        }
        

    } catch (error) {
      console.log(`se presentó un error inesperado`, error);
    }
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
      return convertedJson;
    } catch (error) {
      console.log(`se presentó un error: `, error);
    }
  }

async function guardarRegistro(nombre, email, password){
    try {
        // const url = `http://localhost:8080/api/user/new`;
        const url = `http://129.151.122.195:8080/api/user/new`;
        const fetchOptions = {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
              name: nombre,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          };
          const response = await fetch(url, fetchOptions);
    const responseConverted = await response.json();
    console.log(`responseConverted`, responseConverted);
    await limpiarregistro();
      } catch (error) {
        console.log(`se presentó un error: `, error);
      }
}
async function limpiarregistro(){
    document.getElementById("registroForm").reset();
}
   