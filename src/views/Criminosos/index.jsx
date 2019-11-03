import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Divider } from "@material-ui/core";
import { GetAllcriminosos, Addcriminoso } from "../../endpoints/criminoso";

// MAMA im in love with a criminal
const Criminosos = () => {
  const [criminosos, setCriminosos] = useState([]);
  const [isForm, setIsForm] = useState(false);
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [cpf, setCpf] = useState("");

  useEffect(() => {
    GetAllcriminosos().then(criminoso => {
      setCriminosos(criminoso);
    });
    //eslint-disable-next-line
  }, []);

  const handleClick = async () => {
    await Addcriminoso(nome, cpf, data);
    setIsForm(false);
    GetAllcriminosos().then(criminoso => {
      setCriminosos(criminoso);
    });
  };

  return (
    <Grid container justify="center">
      {isForm ? (
        <Grid item xs={11} sm={10} md={8}>
          <TextField
            style={{ display: "block" }}
            label="Nome"
            value={nome}
            onChange={e => {
              setNome(e.target.value);
            }}
          />
          <TextField
            style={{ display: "block" }}
            label="CPF"
            value={cpf}
            onChange={e => {
              setCpf(e.target.value);
            }}
          />
          <TextField
            style={{ display: "block" }}
            label="Data de Nascimento"
            value={data}
            onChange={e => {
              setData(e.target.value);
            }}
          />
          <Button
            onClick={() => {
              setIsForm(false);
            }}
          >
            Cancelar
          </Button>
          <Button onClick={handleClick}>Enviar</Button>
        </Grid>
      ) : (
        <Grid item xs={11} sm={10} md={8}>
          {criminosos.length > 0
            ? criminosos.map(c => (
                <Grid style={{ padding: 5 }}>
                  <div>CPF: {c.cpf}</div>
                  <div>Nome: {c.nome}</div>
                  <div>Data de nascimento: {c.dataDeNascimento}</div>
                  <Divider />
                </Grid>
              ))
            : null}
          <Button
            onClick={() => {
              setIsForm(true);
            }}
          >
            Adicionar criminoso
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default Criminosos;
