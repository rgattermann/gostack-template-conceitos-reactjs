import React, {useState, useEffect} from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
      api.get('repositories').then(response => {
        setRepositories(response.data);
      });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Front-end com React Native',
      url: 'https://github.com/rgattermann/gostack-template-conceitos-reactjs',
      techs: ['Nodejs', 'ReactJS', 'PHP']
    });

    const repo = response.data;
    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    console.log(response.status);

    if (response.status === 204) {
        const repoIndex = repositories.findIndex(repo => repo.id === id);

        if (repoIndex >= 0) {
          repositories.splice(repoIndex, 1);

          setRepositories([...repositories]);
        }
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repo => (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
