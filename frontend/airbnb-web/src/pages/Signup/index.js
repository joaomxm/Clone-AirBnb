import React, {Component} from "react";

import { Link, useNavigate} from "react-router-dom";

import { Container,Form } from "./styles";

import api from '../../services/api'

import logo from '../../assets/airbnb-logo.svg'


class SignUp extends Component{
    state = {
        username:"",
        email:"",
        password:"",
        error:""
    };
    
    
 

    handleSignUp = async (e)=>{
        e.preventDefault();
        const {username, email, password} = this.state;
        if(!username || !email || !password){
            this.setState({error:'Preencha todos os campos para se cadastrar!'})
        }
        else{
            try{
                await api.post("/users",{username,email,password})
                this.props.history('/');

            }catch(err){
                console.log(err)
                this.setState({error:'Ocorreu um erro ao registrar sua conta'})
            }
        }
    }

    render(){
        return(
            <Container>
                <Form onSubmit={this.handleSignUp}>
                    <img src={logo} alt="Logo AirBnb"/>
                    {this.state.error && <p>{this.state.error}</p>}

                    <input 
                        type="text" 
                        placeholder="Nome de usuário"
                        onChange={e=> this.setState({username:e.target.value})}
                        
                    />
                    <input
                        type="email"
                        placeholder="Endereço de E-mail"
                        onChange={e=> this.setState({email:e.target.value})}
                        
                    />
                    <input
                        type={"password"}
                        placeholder="Senha"
                        onChange={e=> this.setState({password:e.target.value})}
                        
                    />
                    
                    <button type="submit">Cadastrar grátis</button>
                    <hr/>
                    <Link to='/'>Fazer login</Link>
                </Form>

            </Container>
        )
    }
}



// export default SignUp

export default  (props) =>{
    return <SignUp history={useNavigate()} />


}

