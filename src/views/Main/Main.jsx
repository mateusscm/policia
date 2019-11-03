import React from "react";
import { Grid, Paper, Tabs, Tab, Typography, Box } from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../../assets/background.png";

import Quadrilhas from "../Quadrilhas";
import Bairros from "../Bairros";
import Criminosos from "../Criminosos";

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
  bolso: {
    height: 300,
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  back: {
    backgroundColor: "#455196",
    height: 200,
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
  let [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
              <Tab
                label="Cadastro e Listagem de Criminosos"
                {...a11yProps(0)}
              />
              <Tab
                label="Cadastro e Listagem de Quadrilhas"
                {...a11yProps(1)}
              />
              <Tab label="Cadastro e Listagem de Bairros" {...a11yProps(2)} />
              <Tab label="Cadastro e Listagem de Crimes" {...a11yProps(3)} />
              <Tab label="Mito" {...a11yProps(3)} />
            </Tabs>
            <div className={classes.content}>
              <TabPanel value={value} index={0}>
                <Criminosos />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Quadrilhas />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Bairros />
              </TabPanel>
              <TabPanel value={value} index={3}></TabPanel>
              <TabPanel value={value} index={4}>
                <Grid
                  container
                  justify="center"
                  className={classes.bolso}
                ></Grid>
              </TabPanel>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
