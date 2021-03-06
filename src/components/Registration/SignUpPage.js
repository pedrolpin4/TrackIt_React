import { Link, useHistory} from "react-router-dom";
import { useState } from "react";
import {
    LoginButton,
    LoginInput,
    LoginSignInChanger,
    LoginForm,
    RegistrationContainer,
    WhiteBackground
} from "./RegistrationStyles";
import {postSignUpInfo} from "../../service/trackItService"
import Logo from "../../shared/Logo";
import Loader from "react-loader-spinner";

const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const userInfo = {
        email,
        password,
        name,
        image
    }
    const[isClicked, setIsClicked] = useState(false)
    const history = useHistory()

    const SigningUp = (object, event) => {
        event.preventDefault()
        setIsClicked(true)
        postSignUpInfo(object)
        .then(() => {
             history.push("/")
        })
        .catch(() => {
            alert(`${"Preencha os campos corretamente, atentando para os padrões de email e url"}`)
            setIsClicked(false)        
        })
    }

    return (
    <>
        <WhiteBackground />
        <RegistrationContainer>
            <Logo />
            <LoginForm onSubmit = {event => SigningUp(userInfo, event)}>
                <LoginInput isClicked = {isClicked} margin = "32px" placeholder = "email" type = "email"
                    value = {email} onChange = {isClicked ? null : e => setEmail(e.target.value)} 
                />
                <LoginInput isClicked = {isClicked} placeholder = "senha" type = "password"
                    value = {password} onChange = {isClicked ? null : e => setPassword(e.target.value)} 
                />
                <LoginInput isClicked = {isClicked} placeholder = "nome" type = "text"
                    value = {name} onChange = {isClicked ? null : e => setName(e.target.value)} 
                />
                <LoginInput isClicked = {isClicked} placeholder = "foto" type = "url"
                    value = {image} onChange = {isClicked ? null : e => setImage(e.target.value)} 
                />
                
                <LoginButton type = "submit"
                    opacity = {isClicked ? "0.7" : "1"}
                >
                    {
                    isClicked
                    ?
                    <Loader type="ThreeDots" color="#FFFFFF" height={60} width={60} />
                    :
                    "Cadastrar"
                    }
                </LoginButton>  
            </LoginForm>      
            <Link to = "/">
                <LoginSignInChanger>
                    Já tem uma conta? Faça login!
                </LoginSignInChanger>
            </Link>      
        </RegistrationContainer>
    </>
)}

export default SignUpPage
