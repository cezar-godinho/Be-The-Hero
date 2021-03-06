import React, { useState, useEffect } from 'react';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiPower } from 'react-icons/fi'
import { FiTrash2 } from 'react-icons/fi'
import api from '../services/api';

export default function Profile() {

    const history = useHistory();

    const [incidents, setIncidents] = useState([]);

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    if (!ongId){
        localStorage.setItem('page', 'Profile')
        history.push('/');
    };

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId]);
    

    async function handleDeleteIncident(id, incident) {
        try {
            const response = await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));

            //alert(`Caso ${id}, com o nome ${incident}, foi deletado com sucesso!`);

        } catch (err) {
            alert(`Erro ao deletar caso, tente novamente.`);
        }
    };

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    };


    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vindo, {ongName}</span>
                <Link className="button" to="/incidents/new">
                    Cadastrar Novo Caso
                </Link>
                <button onClick={() => handleLogout()} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incidents => (
                    <li key={incidents.id}>
                        <strong>CASO: </strong>
                        <p>{incidents.title}</p>

                        <strong>DESCRIÇÃO: </strong>
                        <p>{incidents.description}</p>

                        <strong>VALOR: </strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incidents.value)}</p>

                        <button onClick={() => handleDeleteIncident(incidents.id, incidents.title)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>

                    </li>    
                ))}
                            
            </ul>
        </div>
    );
}