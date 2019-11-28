import React, {Component} from 'react';
import './Header.css';
import logo from './uca.png';

//Se crea la clase Header para guardar todo lo que se muestra en la parte del header de la pagina
class Header extends Component{
    render(){
        return(
            <div id = "head">
                <div id= "logo">
                    <Logo/>
                </div>

                <div id = "fecha">
                    <Fecha/>
                </div>

                <div id = "btnIr">
                    <BtnIr/>
                </div>

                <div id = "textS">
                    Search
                </div>

                <div id = "search">
                    <Search/>
                </div>

                <div id = "btnLogin">
                    <Login/>
                </div>

                <div id = "main">
                    <Menu/>
                </div>

                <div id = "agrupacion">
                    a ver
                </div>
            </div>
        );
    }
}

function Logo (){
    return (
        <img src={logo} alt="dia1.1" height="90px" width="125px"></img>
    )
}

function Fecha(){
    return(
        <input id="fecha1" type="date"></input>
    )
}

function BtnIr(){
    return(
        <button>ir</button>
    )
}

function Search(){
    return(
        <input id="Search" type="search"></input>
    )
}

function Login(){
    return(
        <p>Login</p>
    )
}

function Menu(){
    return(
        <div className="menu">
            <div className="li">
                <a href="#">Menu</a>
                <ul className="submenu">
                    <li> <a href="#">Ayuda</a></li>
                    <li> <a href="#">Salas</a></li>
                    <li> <a href="#">servicio</a></li>
                </ul>
            </div>
        </div>
    )
}


export default Header;