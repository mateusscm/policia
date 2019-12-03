import React, { useState, useEffect } from "react";
import {
  Typography,
  Chip,
  Grid,
  TextField,
  Button,
  Fab,
  Collapse,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  Tooltip
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { FaPlus } from "react-icons/fa";
import MUIDataTable from "mui-datatables";
import clsx from "clsx";
import {
  GetAllQuadrilhas,
  AddQuadrilha,
  DelQuadrilha
} from "../../endpoints/quadrilha";
import { makeStyles } from "@material-ui/core/styles";
import { GetAllcriminosos } from "../../endpoints/criminoso";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

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

// MAMA im in love with a criminal
const Quadrilhas = props => {
  const classes = useStyles();
  const [Quadrilhas, setQuadrilhas] = useState([]);
  const [, setIsForm] = useState(false);
  const [CPFselected, setCPFselected] = useState("");
  const [criminosos_list, setCriminosos_list] = useState([]);
  const [nome, setNome] = useState("");
  const [data] = useState("");
  const [criminosos, setCriminosos] = useState([]);
  const [cpf, setCpf] = useState("");
  const [columns] = useState([
    { name: "cpfs", label: "CPF dos integrantes" },
    { name: "nomes", label: "Nome dos integrantes" },
    { name: "nome", label: "Nome" }
  ]);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(ex => {
      return !ex;
    });
  };

  const handleClick = async () => {
    await AddQuadrilha(criminosos_list, [0], nome);
    setIsForm(false);
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
    props.update();
  };

  const getInfo = () => {
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
  };

  useEffect(() => {
    getInfo();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    getInfo();
    //eslint-disable-next-line
  }, [props.tr]);

  const options = {
    responsive: "stacked",
    download: false,
    print: false,
    customToolbar: () => {
      console.log(expanded);
      return (
        <Tooltip title="Adicionar Quadrilha">
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
    },
    onRowsDelete: i => {
      i.data.forEach((b, ind) => {
        let c = Quadrilhas[b.index];
        debugger;
        DelQuadrilha(c.id);
      });
    }
  };
  return (
    <Grid container justify="center" style={{ position: "relative" }}>
      {/* {isForm ? ( */}

      {/* ) : ( */}
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
              label="Nome"
              value={nome}
              onChange={e => {
                setNome(e.target.value);
              }}
            />
            <Grid container style={{ marginTop: 12 }}>
              <Grid item xs={11} sm={11}>
                <InputLabel>Criminoso</InputLabel>
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
                {/* <Button
                  
                  color="primary"
                  variant="outlined"
                >
                  Adicionar cpf
                </Button> */}
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: 12 }}>
              <Typography display="inline" style={{ color: "black" }}>
                Valores:&nbsp;{" "}
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
                : "Nenhum CPF adicionado até o momento"}
            </Grid>

            <Button
              style={{
                margin: "10px 0px",
                backgroundColor: "rgb(64, 64, 64)",
                color: "white"
              }}
              variant="contained"
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
            title={"Lista de Quadrilhas"}
            data={Quadrilhas}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
      </Grid>
    </Grid>
  );
};

export default Quadrilhas;
