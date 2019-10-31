import React from "react";
import axios from "axios";
import { Grid, Paper, Tabs, Tab, Typography, Box } from "@material-ui/core";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { RouteWithSubRoutes, routes } from "../../Router/Routes";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  bigIndicator: {
    width: 5,
    backgroundColor: "#455196"
  },
  back: {
    width: "100vw",
    height: 250,
    backgroundColor: "#544ea2",
    position: "absolute",
    top: 0,
    zIndex: -1,
    [theme.breakpoints.down("sm")]: {
      height: 200
    },
    [theme.breakpoints.down("xs")]: {
      height: 150
    }
  },
  mainGrid: {
    zIndex: 1000,
    marginTop: 100,
    [theme.breakpoints.down("sm")]: {
      marginTop: 60
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: 30
    }
  },
  paper: {
    height: "calc(100vh - 130px)",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      height: "calc(100vh - 80px)"
    },
    [theme.breakpoints.down("xs")]: {
      height: "calc(100vh - 30px)"
    }
  },
  content: {
    width: "calc(100% - 160px)",
    [theme.breakpoints.down("xs")]: {
      width: "calc(100% - 48px)"
    }
  }
}));

const Main = props => {
  const classes = useStyles();
  let [nome, setNome] = React.useState("");
  let [cpf, setCpf] = React.useState("");
  let [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const chupacu = () => {
    var a = {
      nome,
      cpf
    };
    axios
      .post("http://localhost:8080/criminosos/", a, {
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(aaa => {
        console.log(aaa);
      });
  };

  return (
    <>
      <Grid container className={classes.back}></Grid>
      <Grid container justify="center" className={classes.mainGrid}>
        <Grid item xs={11} sm={10} md={8}>
          <Paper elevation={8} className={classes.paper}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              className={classes.tabs}
              classes={{ indicator: classes.bigIndicator }}
            >
              <Tab label="Tab1" {...a11yProps(0)} />
              <Tab label="Tab2" {...a11yProps(1)} />
              <Tab label="Tab3" {...a11yProps(2)} />
              <Tab label="Tab4" {...a11yProps(3)} />
            </Tabs>
            <div className={classes.content}>
              <TabPanel value={value} index={0}>
                <Grid container>
                  Cupidatat mollit fugiat consequat reprehenderit. Dolore
                  consequat duis ullamco quis ex culpa aliqua voluptate velit ut
                  irure. Ex quis excepteur consequat irure laborum elit
                  consectetur commodo amet sit quis sint minim. Ullamco
                  consequat officia ea excepteur ea dolor proident pariatur
                  adipisicing. Esse aute deserunt id tempor sit excepteur
                  consequat minim. Commodo aliqua fugiat qui sit dolore
                  voluptate officia dolore ea esse eu.
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid container>
                  Officia pariatur adipisicing non minim esse laboris est in
                  nulla enim consequat aute.
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Grid container>
                  Adipisicing ut quis ut esse laborum aute laboris dolor elit
                  exercitation.
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <Grid container>
                  Labore ad tempor tempor excepteur cupidatat. Reprehenderit et
                  voluptate laborum commodo magna minim laboris est ad irure
                  quis amet proident id. Sint pariatur fugiat labore nostrud
                  nisi dolore enim. Id non ea magna laborum est occaecat sunt
                  nostrud aliquip esse.r
                </Grid>
              </TabPanel>
            </div>
            {/* <form action="http://localhost:8080/criminosos" method="POST"> */}
            {/* <input
              value={nome}
              onChange={e => {
                setNome(e.target.value);
              }}
            ></input>
            <input
              value={cpf}
              onChange={e => {
                setCpf(e.target.value);
              }}
            ></input>
            <button onClick={chupacu} type="button">
              Testando
            </button> */}
            {/* </form> */}
            {/* <form
              action="http://localhost:8080/criminosos"
              method="POST"
              encType="application/json"
            >
              <input name="nome"></input>
              <input name="cpf"></input>
              <button type="submit">Testando</button>
            </form> */}
            {/* <Router> */}
            {/* <Switch>
              {routes.map((route, i) => {
                return <RouteWithSubRoutes key={i} {...route} />;
              })}
            </Switch> */}
            {/* </Router> */}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
