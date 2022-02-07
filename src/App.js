import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
// import './services/api';
import api from './services/api';
import './styles.css';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});


  async function handleSearch() {
    // alert("VALOR DO INPUT" + input) 01310930/json/
    if (input === '') {
      alert('Preencha algum cep!');
      return;
    }

    try {
      // console.log(input)
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput('');
    } catch {
      alert('Ops, erro ao buscar. Tente novamente..');
      setInput('');
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscar Cep</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        >
        </input>

        <button
          onClick={handleSearch}
          className="buttonSearch"
        >
          <FiSearch size={25} color='#fff' />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}


    </div>
  );
}

export default App;
