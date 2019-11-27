import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Fab,
  Collapse,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Chip
} from "@material-ui/core";
import { FaPlus } from "react-icons/fa";
import MUIDataTable from "mui-datatables";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { GetAllCrimes, AddCrime } from "../../endpoints/crime";
import { GetAllcriminosos } from "../../endpoints/criminoso";
import { GetAllQuadrilhas } from "../../endpoints/quadrilha";
import { GetAllbairros } from "../../endpoints/bairro";

const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MUIDataTable: {
        paper: {
          boxShadow: "none",
          backgroundColor: "transparent"
        }
      },
      MUIDataTableHeadCell: {
        root: {
          padding: "0px 8px 0px"
        }
      },
      MUIDataTableCell: {
        root: {
          padding: "0px 16px 0px 0px"
        }
      },
      MUIDataTableBodyRow: {
        root: {
          padding: "4px"
        }
      },
      MUIDataTableBodyCell: {
        root: {
          fontSize: "2vmin",
          padding: "0 8px 0",
          textAlign: "left"
        }
        // #f0fdf4
      },
      MuiToolbar: {
        root: {
          backgroundColor: "#8fbc8f"
        },
        regular: {
          minHeight: "0px !important"
        }
      },
      MuiTablePagination: {
        toolbar: {
          backgroundColor: "white !important"
        }
      },
      MuiTypography: {
        h6: {
          color: "white",
          fontWeight: "bold",
          paddingLeft: 20
        }
      },
      MuiTableCell: {
        head: {
          color: "black",
          fontSize: "0.80rem",
          fontWeight: "bold"
        }
      },
      MuiTableRow: {
        root: {
          "&:nth-of-type(odd)": {
            backgroundColor: "#f2f2f2"
          }
        }
      },
      MUIDataTableToolbarSelect: {
        root: {
          padding: "0px !important",
          boxShadow: "none",
          backgroundColor: "#8fbc8f",
          borderRadius: 0
        }
      },
      MUIDataTableSearch: {
        main: {
          alignItems: "center"
        }
      }
    }
  });

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    width: 36,
    height: 36,
    transition: theme.transitions.create(
      "transform",
      {
        duration: theme.transitions.duration.shortest
      },
      "width 1s",
      "height: 1s"
    )
  },
  expandOpen: {
    transform: "rotate(135deg)",
    backgroundColor: "red",
    width: 36,
    height: 36
  }
}));

// function BtnExpand(props) {
//   const classes = useStyles();
//   console.log(props.expanded);
//   return (
//     <IconButton
//       aria-label="Add"
//       style={{ fontSize: "1rem" }}
//       onClick={() => props.handleExpandClick()}
//       className={clsx(classes.expand, {
//         [classes.expandOpen]: props.expanded
//       })}
//     >
//       <FaPlus />
//     </IconButton>
//   );
// }

// MAMA im in love with a criminal
const Crimes = () => {
  const classes = useStyles();
  const [Crimes, setCrimes] = useState([]);
  const [Quadrilhas, setQuadrilhas] = useState([]);
  const [Quaselected, setQuaselected] = useState("");
  const [quadrilha_list, setQuadrilha_list] = useState([]);
  const [criminosos, setCriminosos] = useState([]);
  const [bairro, setbairro] = useState([]);
  const [bairroSelected, setBairroSelected] = useState("");
  const [, setIsForm] = useState(false);
  const [nome, setNome] = useState("");
  const [CPFselected, setCPFselected] = useState("");
  const [data, setData] = useState("");
  const [criminosos_list, setCriminosos_list] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [columns] = useState([
    { name: "data", label: "Data" },
    { name: "descricao", label: "Descricao" },
    { name: "bairro", label: "Bairro" },
    { name: "quadrilhas", label: "Quadrilhas" },
    { name: "criminosos", label: "Criminosos" }
  ]);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(ex => {
      return !ex;
    });
  };

  useEffect(() => {
    GetAllbairros().then(bairro => {
      setbairro(bairro);
    });
    GetAllQuadrilhas().then(Quadrilha => {
      setQuadrilhas(
        Quadrilha.map(qua => {
          return {
            id: qua.id,
            nome: qua.nome,
            cpfs: qua.integrantes.map(i => i.cpf).toString(),
            nomes: qua.integrantes.map(i => i.nome).toString()
          };
        })
      );
    });
    GetAllcriminosos().then(criminoso => {
      setCriminosos(criminoso);
    });
    GetAllCrimes().then(Crime => {
      setCrimes(
        Crime.map(cri => {
          return {
            data: cri.data,
            descricao: cri.descricao,
            bairro: cri.bairro.nome,
            criminosos: cri.criminosos.map(i => i.nome).toString(),
            quadrilhas: cri.quadrilhas.map(i => i.nome).toString()
          };
        })
      );
    });
    //eslint-disable-next-line
  }, []);

  const handleClick = async () => {
    await AddCrime(
      data,
      descricao,
      bairroSelected,
      criminosos_list,
      quadrilha_list
    );
    setExpanded(ex => {
      return !ex;
    });
    GetAllCrimes().then(Crime => {
      setCrimes(Crime);
    });
  };

  const options = {
    responsive: "stacked",
    download: false,
    print: false,
    customToolbar: () => {
      console.log(expanded);
      return (
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleExpandClick}
          // style={{ position: "absolute", bottom: 10, right: 10 }}
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
        >
          <FaPlus />
        </Fab>
        // <BtnExpand handleExpandClick={handleExpandClick} expanded={expanded} />
      );
    }
  };
  return (
    <Grid
      container
      justify="center"
      style={{ height: "100%", position: "relative" }}
    >
      <Collapse
        in={expanded}
        style={{ width: "100%" }}
        timeout="auto"
        unmountOnExit
      >
        <Grid item xs={12}>
          <Grid container style={{ padding: 10 }}>
            <TextField
              style={{ display: "block" }}
              fullWidth
              label="Data"
              value={data}
              onChange={e => {
                setData(e.target.value);
              }}
            />
            <TextField
              style={{ display: "block" }}
              fullWidth
              label="Descricao"
              value={descricao}
              onChange={e => {
                setDescricao(e.target.value);
              }}
            />
            <Grid item xs={12} sm={6} style={{ marginTop: 12 }}>
              <InputLabel>Criminosos</InputLabel>
              <Select
                value={CPFselected}
                onChange={e => {
                  setCPFselected(e.target.value);
                }}
                style={{ width: "100%" }}
                inputProps={{
                  name: "CPF",
                  id: "cpf-simple"
                }}
              >
                <MenuItem disabled key={"i"} value={""}>
                  Selecione um criminoso
                </MenuItem>
                {criminosos.length > 0
                  ? criminosos.map((c, i) => (
                      <MenuItem key={i} value={c.cpf}>
                        {c.nome}
                      </MenuItem>
                    ))
                  : null}
              </Select>
              <Button
                onClick={() => {
                  let vet = [...criminosos_list];
                  vet.push(CPFselected);
                  setCriminosos_list(vet);
                  setCPFselected("");
                }}
                color="primary"
              >
                Adicionar cpf
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" display="inline">
                Valores:{" "}
                {criminosos_list.length > 0
                  ? criminosos_list.map((data, i) => (
                      <Chip
                        onDelete={() => {
                          let n = [...criminosos_list];
                          n.splice(n.indexOf(data), 1);
                          setCriminosos_list(n);
                        }}
                        color="primary"
                        key={i}
                        label={data}
                        className={classes.chip}
                      />
                    ))
                  : null}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} style={{ marginTop: 12 }}>
              <InputLabel>Quadrilhas</InputLabel>
              <Select
                value={Quaselected}
                onChange={e => {
                  setQuaselected(e.target.value);
                }}
                style={{ width: "100%" }}
                inputProps={{
                  name: "qua",
                  id: "qua-simple"
                }}
              >
                <MenuItem disabled key={"i"} value={""}>
                  Selecione uma quadrilha
                </MenuItem>
                {Quadrilhas.length > 0
                  ? Quadrilhas.map((c, i) => (
                      <MenuItem key={i} value={c.id}>
                        {c.nome}
                      </MenuItem>
                    ))
                  : null}
              </Select>
              <Button
                onClick={() => {
                  let vet = [...quadrilha_list];
                  vet.push(Quaselected);
                  setQuadrilha_list(vet);
                  setQuaselected("");
                }}
                color="primary"
              >
                Adicionar quadrilha
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" display="inline">
                Valores:{" "}
                {quadrilha_list.length > 0
                  ? quadrilha_list.map((data, i) => (
                      <Chip
                        onDelete={() => {
                          let n = [...quadrilha_list];
                          n.splice(n.indexOf(data), 1);
                          setQuadrilha_list(n);
                        }}
                        color="primary"
                        key={i}
                        label={data}
                        className={classes.chip}
                      />
                    ))
                  : null}
              </Typography>
            </Grid>
            <InputLabel>Bairro</InputLabel>
            <Select
              value={bairroSelected}
              onChange={e => {
                setBairroSelected(e.target.value);
              }}
              style={{ width: "100%" }}
              inputProps={{
                name: "vairro",
                id: "vairro-simple"
              }}
            >
              <MenuItem disabled key={"i"} value={""}>
                Selecione um bairro
              </MenuItem>
              {bairro.length > 0
                ? bairro.map((c, i) => (
                    <MenuItem key={i} value={c.id}>
                      {c.nome}
                    </MenuItem>
                  ))
                : null}
            </Select>
            <Button
              style={{
                margin: "10px 0px",
                backgroundColor: "#45f000",
                color: "white"
              }}
              fullWidth
              color="primary"
              onClick={handleClick}
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </Collapse>
      <Grid item xs={12}>
        <MuiThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title={"Lista de Crimes"}
            data={Crimes}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
      </Grid>
    </Grid>
  );
};

export default Crimes;
