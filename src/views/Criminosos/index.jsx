import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Collapse,
  IconButton,
  Tooltip
} from "@material-ui/core";
import { FaPlus } from "react-icons/fa";
import MUIDataTable from "mui-datatables";
import clsx from "clsx";
import {
  GetAllcriminosos,
  Addcriminoso,
  DelCriminoso
} from "../../endpoints/criminoso";
import { makeStyles } from "@material-ui/core/styles";
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
const Criminosos = props => {
  const classes = useStyles();
  const [criminosos, setCriminosos] = useState([]);
  const [, setIsForm] = useState(false);
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [cpf, setCpf] = useState("");
  const [columns] = useState([
    { name: "cpf", label: "CPF" },
    { name: "nome", label: "Nome" },
    { name: "dataDeNascimento", label: "Nascimento" }
  ]);
  const [expanded, setExpanded] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(ex => {
      return !ex;
    });
  };

  useEffect(() => {
    GetAllcriminosos().then(criminoso => {
      setCriminosos(criminoso);
    });
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    GetAllcriminosos().then(criminoso => {
      setCriminosos(criminoso);
    });
    //eslint-disable-next-line
  }, [props.tr]);

  const handleClick = async () => {
    if (nome === "" || cpf === "" || data === "") {
      setError(true);
    } else if (
      nome.trim().length === 0 ||
      cpf.trim().length === 0 ||
      data.trim().length === 0
    ) {
      setError(true);
    } else {
      await Addcriminoso(nome, cpf, data);
      setIsForm(false);
      GetAllcriminosos().then(criminoso => {
        setCriminosos(criminoso);
      });
      props.update();
      setNome("");
      setData("");
      setCpf("");
    }
  };

  const options = {
    responsive: "stacked",
    download: false,
    print: false,
    customToolbar: () => {
      console.log(expanded);
      return (
        <Tooltip title="Adicionar Criminosos">
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
      i.data.forEach((crim, ind) => {
        let c = criminosos[crim.index];
        DelCriminoso(c.cpf);
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
              required
              fullWidth
              autoFocus
              label="Nome"
              value={nome}
              onChange={e => {
                setNome(e.target.value);
              }}
            />
            <TextField
              style={{ display: "block" }}
              required
              fullWidth
              label="CPF"
              value={cpf}
              onChange={e => {
                setCpf(e.target.value);
              }}
            />
            <TextField
              type="date"
              required
              InputLabelProps={{
                shrink: true
              }}
              style={{ display: "block" }}
              fullWidth
              label="Data de Nascimento"
              value={data}
              onChange={e => {
                setData(e.target.value);
              }}
            />
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
            title={"Lista de Criminosos"}
            data={criminosos}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
        {/* {criminosos.length > 0 ? (
          criminosos.map((c, i) => (
            <Grid key={i} style={{ padding: 5 }}>
              <div>CPF: {c.cpf}</div>
              <div>Nome: {c.nome}</div>
              <div>Data de nascimento: {c.dataDeNascimento}</div>
              <Divider />
            </Grid>
          ))
        ) : (
          <Typography>Nenhum indivíduo cadastrado até o momento</Typography>
        )} */}
      </Grid>
    </Grid>
  );
};

export default Criminosos;
