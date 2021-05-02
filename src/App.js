import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

  const apiUrl = 'https://argaunautes.herokuapp.com/api/list';
  const [list, setList] = useState([]);
  const nameFormValue = {};

  const loadList = () => { 
    axios.get(apiUrl)
    .then((response) => {
      setList(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const nameData = (event) => {
    const nameFormData = new FormData(event.currentTarget);
    nameFormValue.name = nameFormData.get('name');
    sendName(nameFormValue);
  };

  const sendName = (name) => {
    axios.post( apiUrl, name)
    .then()
    .catch((error) => {
      console.log(error.response);
    })
    .finally(() => {
      loadList();
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    nameData(event);
  };

  useEffect(() => {
    loadList();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>
          <img src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png" alt="Wild Code School logo" />
          Les Argonautes
        </h1>
      </header>      
      <main>
      
        <h2>Ajouter un(e) Argonaute</h2>
          <form onSubmit={handleSubmit} className="new-member-form">
            <label htmlFor="name">Nom de l&apos;Argonaute</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Entrez le nom du membre"
            />
            <button type="submit">Envoyer</button>
          </form>
      
        <h2>Membres de l'équipage</h2>
          <section className="member-list">
            {list.map( member => {
              return(
                <div className="member-item">{member.name}</div>
              )
            })}
          </section>
      </main>
      
      <footer>
        <p>Réalisé par Jason en Anthestérion de l'an 515 avant JC</p>
      </footer>
    </div>
  );
}

export default App;
