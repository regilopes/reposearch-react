import React, { useState } from 'react';
import axios from 'axios';
import * as S from './styled';
import { useNavigate } from 'react-router-dom';


export default function App() {
   const navigate = useNavigate();
   const [usuario, setUsuario] = useState('');
   const [erro, setErro] = useState(false);

   function handlePesquisa() {
      axios.get(`https://api.github.com/users/${usuario}/repos`)
         .then(response => {
            const repositories = response.data;
            const repositoriesName = [];

            repositories.forEach((item) => repositoriesName.push(item.name))

            localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName))

            setErro(false);

            navigate('/repositories');
         })
         .catch (err => {
         setErro(true);
         });
   }


   return (
      <S.HomeContainer>
         <S.Content>
            <S.Input className='usuarioInput' placeholder='Usuário'
               //atualizando valor do state de acordo com o valor atual do input
               onChange={e => setUsuario(e.target.value)}
               //atualizando valor do input com o valor atual do state
               value={usuario}
               onKeyDown={(ev) => { //executa a pesquisa ao apertar Enter
                  if (ev.key === 'Enter') {
                     handlePesquisa();
                  }
               }}
            />
            <S.Button type='button' onClick={handlePesquisa}>Pesquisar</S.Button>
         </S.Content>
         {erro ? <S.ErrorMsg>Ocorreu um erro. Tente novamente.</S.ErrorMsg> : ''}
      </S.HomeContainer>
   );
} 