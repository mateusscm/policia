import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Divider } from "@material-ui/core";
import { GetAllbairros, Addbairro } from "../../endpoints/bairro";

const Bairros = () => {
  const [bairro, setbairro] = useState([]);
  const [isForm, setIsForm] = useState(false);
  const [nome, setNome] = useState("");

  useEffect(() => {
    GetAllbairros().then(bairro => {
      setbairro(bairro);
    });
    //eslint-disable-next-line
  }, []);

  const handleClick = async () => {
    await Addbairro(nome);
    setIsForm(false);
    GetAllbairros().then(bairro => {
      setbairro(bairro);
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
          {bairro.length > 0
            ? bairro.map(c => (
                <Grid style={{ padding: 5 }}>
                  <div>ID: {c.id}</div>
                  <div>Nome: {c.nome}</div>
                  <Divider />
                </Grid>
              ))
            : null}
          <Button
            onClick={() => {
              setIsForm(true);
            }}
          >
            Adicionar bairro
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default Bairros;
