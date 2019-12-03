import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Collapse,
  IconButton,
  Tooltip
} from "@material-ui/core";
import { GetAllbairros, Addbairro, DelBairro } from "../../endpoints/bairro";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { FaPlus } from "react-icons/fa";
import MUIDataTable from "mui-datatables";
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
      // MUIDataTableToolbarSelect: {
      //   title: {
      //     color: "white"
      //   }
      // }
    }
  });

const useStyles = makeStyles(theme => ({
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

const Bairros = props => {
  const classes = useStyles();
  const [bairro, setbairro] = useState([]);
  const [isForm, setIsForm] = useState(false);
  const [nome, setNome] = useState("");
  const [columns, setColumns] = useState([
    { name: "id", label: "ID" },
    { name: "nome", label: "Nome" }
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
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    GetAllbairros().then(bairro => {
      setbairro(bairro);
    });
    //eslint-disable-next-line
  }, [props.tr]);

  const handleClick = async () => {
    await Addbairro(nome);
    setIsForm(false);
    GetAllbairros().then(bairro => {
      setbairro(bairro);
    });
    props.update();
  };

  const options = {
    responsive: "stacked",
    download: false,
    print: false,
    customToolbar: () => {
      console.log(expanded);
      return (
        <Tooltip title="Adicionar Bairros">
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
        let c = bairro[b.index];
        DelBairro(c.id);
      });
    },
    textLabels: {
      pagination: {
        rowsPerPage: "Linhas por página:"
      },
      selectedRows: {
        text: "linha(s) selecionada(s)"
      }
    }
  };

  return (
    <Grid container justify="center">
      <Collapse
        in={expanded}
        style={{ width: "100%" }}
        timeout="auto"
        unmountOnExit
      >
        <Grid item xs={12}>
          <Grid container style={{ padding: 10 }}>
            <TextField
              label="Nome"
              style={{ display: "block" }}
              fullWidth
              value={nome}
              onChange={e => {
                setNome(e.target.value);
              }}
            />
            {/* <Button
              onClick={() => {
                setIsForm(false);
              }}
            >
              Cancelar
            </Button> */}
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
            title={"Lista de Bairros"}
            data={bairro}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
        {/* {bairro.length > 0
          ? bairro.map((c, i) => (
              <Grid key={i} style={{ padding: 5 }}>
                <div>ID: {c.id}</div>
                <div>Nome: {c.nome}</div>
                <Divider />
              </Grid>
            ))
          : null} */}
        {/* <Button
          onClick={() => {
            setIsForm(true);
          }}
        >
          Adicionar bairro
        </Button> */}
      </Grid>
    </Grid>
  );
};

export default Bairros;
