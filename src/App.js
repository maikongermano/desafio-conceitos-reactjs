import React,{useState, useEffect} from "react";
import api from './services/api'
import "./styles.css";

function App() {

  const [ repository, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
    })
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories',{
      title:`new repository ${Date.now()}`,
      techs: "ReactJS",
      url:"https://github.com/maikongermano"
    });

    const repositoryes = response.data;
    setRepository([...repository, repositoryes]);
  };

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`/repositories/${id}`);

    const filterRepository = repository.filter(reposit => reposit.id !== id);

    setRepository(filterRepository);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map(reposit => {
          return (
          <li key={reposit.id}>{reposit.title}
            <button type="button" onClick={()=> handleRemoveRepository(reposit.id)}>
              Remover
            </button>
          </li>
          )
        })}
        </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
