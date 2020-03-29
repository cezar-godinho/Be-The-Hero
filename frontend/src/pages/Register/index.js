import React from 'react';
import './style.css';
import logoImg from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function Register() {
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro,e ntre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Já tenho cadastro
                    </Link>
                </section>
                <form>
                    <input type="text" placeholder="Nome da ONG" />
                    <input type="email" placeholder="E-mail" />
                    <input type="text" placeholder="Whatsapp" />
                    <div className="input-group">
                        <input type="text" placeholder="Cidade" />
                        <input type="text" placeholder="UF" style={{ width: 80 }} />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}