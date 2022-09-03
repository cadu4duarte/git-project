import React, { useState, useCallback, useEffect } from 'react';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa"
import {Container, Form, SubmitButton, List, DeleteButton} from "./styles";
import api from "../../service/api";

export function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  //buscando repositórios salvos
  useEffect(() => {
    const repoStorage = localStorage.getItem("repos");

    if (repoStorage) {
      setRepositorios(JSON.parse(repoStorage));
    }
  }, []);
  
  //salvando repositorios
  useEffect(() => {
    localStorage.setItem("repos", JSON.stringify(repositorios));
  }, [repositorios]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    async function submit() {
      setLoading(true);
      setAlert(null);
      try {
        if(newRepo === "") {
          throw new Error("precisa digitar algo para fazer a busca");
        }

        const response = await api.get(`repos/${newRepo}`);

        //evitando que seja salvo repositórios iguais
        const hasRepo = repositorios.find(repo => repo.name === newRepo);

        if(hasRepo) {
          throw new Error("Repositório duplicado");
        }

        const data = {
          name: response.data.full_name,
        }


        setRepositorios([...repositorios, data]);
        setNewRepo(""); 
        } catch(error) {
          setAlert(true);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }

      submit();
  }, [newRepo, repositorios]);

  function handleinputChange(e) {
    setNewRepo(e.target.value);
    setAlert(null);
  }

  //usando use callback por estar manipulando um state
  const handleDelete = useCallback((repo) => {
    //filtrando todos os repositorios menos o deletado
    const find = repositorios.filter(r=> r.name !== repo);
    setRepositorios(find);
  }, [repositorios])

  return (
    <Container>
      <h1>
        <FaGithub size={25}/>
        Meus Repositórios
      </h1>

      <Form onSubmit={handleSubmit } error={alert}>
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
            <span>
              <DeleteButton onClick={()=> handleDelete(repo.name)}>
                <FaTrash size={14}/>
              </DeleteButton>
              {repo.name}
            </span>
            <a href=''>
              <FaBars size={20}/>
            </a>
          </li>
        ))}
      </List>

    </Container>
  )
}
