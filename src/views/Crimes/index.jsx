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
  Chip,
  IconButton,
  Tooltip
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { FaPlus } from "react-icons/fa";
import MUIDataTable from "mui-datatables";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { GetAllCrimes, AddCrime, DelCrime } from "../../endpoints/crime";
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
          backgroundColor: "#000"
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
          backgroundColor: "#000",
          borderRadius: 0
        },
        title: {
          color: "white"
        }
      },
      MUIDataTableSearch: {
        main: {
          alignItems: "center"
        }
      },
      MuiIconButton: {
        root: {
          color: "white"
        }
      },
      MUIDataTablePagination: {
        root: {
          padding: "0 !important"
        }
      },
      MUIDataTableSearch: {
        searchText: {
          backgroundColor: "white !important",
          height: "50%"
        },
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
const Crimes = props => {
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
  const [error, setError] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(ex => {
      return !ex;
    });
  };

  const getInfo = () => {
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
            id: cri.id,
            data: cri.data,
            descricao: cri.descricao,
            bairro: cri.bairro.nome,
            criminosos: cri.criminosos.map(i => i.nome).toString(),
            quadrilhas: cri.quadrilhas.map(i => i.nome).toString()
          };
        })
      );
    });
  };

  useEffect(() => {
    getInfo();
    //eslint-disable-next-line
  }, [props.tr]);

  useEffect(() => {
    getInfo();
    //eslint-disable-next-line
  }, []);

  const handleClick = async () => {
    if (descricao === "" || data === "") {
      setError(true);
    } else if (descricao.trim().length === 0 || data.trim().length === 0) {
      setError(true);
    } else {
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
        setCrimes(
          Crime.map(cri => {
            return {
              id: cri.id,
              data: cri.data,
              descricao: cri.descricao,
              bairro: cri.bairro.nome,
              criminosos: cri.criminosos.map(i => i.nome).toString(),
              quadrilhas: cri.quadrilhas.map(i => i.nome).toString()
            };
          })
        );
      });
      props.update();
      setData("");
      setDescricao("");
      setQuaselected("");
      setBairroSelected("");
      setQuadrilha_list([]);
      setCriminosos_list([]);
      setError(false);
    }
  };

  const options = {
    responsive: "stacked",
    download: false,
    print: false,
    customToolbar: () => {
      console.log(expanded);
      return (
        <Tooltip title="Adicionar Crime">
          <IconButton
            color="primary"
            aria-label="add"
            onClick={handleExpandClick}
            style={{ color: "white", fontSize: 22 }}
            // style={{ position: "absolute", bottom: 10, right: 10 }}
            // className={clsx(classes.expand, {
            //   [classes.expandOpen]: expanded
            // })}
          >
            <FaPlus />
          </IconButton>
        </Tooltip>
        // <BtnExpand handleExpandClick={handleExpandClick} expanded={expanded} />
      );
    }
  };
  return (
    <Grid container justify="center" style={{ position: "relative" }}>
      <Collapse
        in={expanded}
        style={{ width: "100%" }}
        timeout="auto"
        unmountOnExit
      >
        <Grid item xs={12}>
          <Grid container style={{ padding: 10 }}>
            <TextField
              type="date"
              autoFocus
              InputLabelProps={{
                shrink: true
              }}
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
            <Grid container style={{ margin: "10px 0px" }}>
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
            </Grid>
            <Grid container alignItems="flex-end" style={{ marginTop: 12 }}>
              <Grid item xs={11} sm={11}>
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
              </Grid>
              <Grid item xs={1} sm={1}>
                <Grid container justify="flex-end">
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="add"
                    onClick={() => {
                      let vet = [...criminosos_list];
                      vet.push(CPFselected);
                      setCriminosos_list(vet);
                      setCPFselected("");
                    }}
                  >
                    <AddIcon />
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: 12 }}>
              <Grid item xs={12}>
                <Typography display="inline" style={{ color: "black" }}>
                  Valores:{" "}
                </Typography>
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
                  : "Nenhum criminoso adicionado até o momento"}
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end" style={{ marginTop: 12 }}>
              <Grid item xs={11} sm={11}>
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
              </Grid>
              <Grid item xs={1} sm={1}>
                <Grid container justify="flex-end">
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="add"
                    onClick={() => {
                      let vet = [...quadrilha_list];
                      vet.push(Quaselected);
                      setQuadrilha_list(vet);
                      setQuaselected("");
                    }}
                  >
                    <AddIcon />
                  </Fab>
                </Grid>
                {/* <Button
                  
                  color="primary"
                >
                  Adicionar quadrilha
                </Button> */}
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ marginTop: 12 }}>
              <Typography display="inline" style={{ color: "black" }}>
                Valores:{" "}
              </Typography>
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
                : "Nenhuma quadrilha adicionada até o momento"}
            </Grid>
            {error ? (
              <Typography variant="caption" style={{ color: "red" }}>
                Preencha todos os campos
              </Typography>
            ) : null}
            <Button
              style={{
                margin: "10px 0px",
                backgroundColor: "rgb(64, 64, 64)",
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
