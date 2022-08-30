import React, { useState, useCallback } from 'react';
import { FaGithub, FaPlus, FaSpinner, FaBars } from "react-icons/fa"
import {Container, Form, SubmitButton, List} from "./styles";
import api from "../../service/api";

export function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    async function submit() {
      setLoading(true);
      try {
        const response = await api.get(`repos/${newRepo}`);

        const data = {
          name: response.data.full_name,
        }


        setRepositorios([...repositorios, data]);
        setNewRepo(""); 
        } catch(error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }

      submit();
  }, [newRepo, repositorios]);

  function handleinputChange(e) {
    setNewRepo(e.target.value);
  }

  return (
    <Container>
      <h1>
        <FaGithub size={25}/>
        Meus Repositórios
      </h1>

      <Form onSubmit={handleSubmit }>
        <input 
        type="text" 
        placeholder="Adicionar repositório"
        value={newRepo}
        onChange={handleinputChange}
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#fff" size={14}/>
          ) : (
            <FaPlus color="#fff" size={14}/>
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositorios.map(repo => (
          <li key={repo.name}>
            <span>{repo.name}</span>
            <a href=''>
              <FaBars size={20}/>
            </a>
          </li>
        ))}
      </List>

    </Container>
  )
}
