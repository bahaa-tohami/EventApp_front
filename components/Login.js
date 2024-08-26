import axios from "axios"
import { useState } from "react"


const Login = () =>{
    
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleChange = (e) => {
        if(e.target.name === "email"){
            setEmail(e.target.value)
        }else if(e.target.name === "password"){
            setPassword(e.target.value)
        }
    

    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        let dataForm = {
            password: password,
            email: email
        }
        axios.post(`${process.env.REACT_APP_API}/login`, dataForm)
        .then((res)=>{
            window.location.reload()
            if(res.data.token){
                localStorage.setItem("user", JSON.stringify(res.data));
                window.location = '/';
               
            }
         
            return res.data

        })
    }

    return (
        <div className="login-container">
        <form method="post" onSubmit={handleSubmit} className="login-form">
        <h2 style={{paddingLeft: 1 + 'em'}}>Connectez-vous !</h2>

            <input type="text" placeholder="Email" name="email" onChange={handleChange} value={email}/>
            <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} value={password}/>
            <button>Connexion</button>

        </form>
        </div>

    )

}

export default Login