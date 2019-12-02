import React from "react";
import {
  Grid,
  Paper,
  Tabs,
  Tab,
  Typography,
  Box,
  Fab
} from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../../assets/background.png";
import { MdMenu } from "react-icons/md";
import clsx from "clsx";
import Quadrilhas from "../Quadrilhas";
import Bairros from "../Bairros";
import Criminosos from "../Criminosos";
import Crimes from "../Crimes";

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
      <Box p={3} style={{ height: "100%", padding: 0 }}>
        {children}
      </Box>
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
    borderRight: `1px solid ${theme.palette.divider}`,
    width: 200,
    whiteSpace: "nowrap",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      backgroundColor: "white",
      zIndex: 10,
      height: "100%",
      width: "100%"
    }
  },
  noneWidth: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: 0,
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing.unit * 0,
      marginLeft: theme.spacing.unit * 0
    }
  },
  bigIndicator: {
    width: 5,
    backgroundColor: "black"
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
    minHeight: "calc(100vh - 130px)",
    height: "auto",
    display: "flex",
    marginBottom: 30,
    [theme.breakpoints.down("sm")]: {
      minHeight: "calc(100vh - 80px)"
    },
    [theme.breakpoints.down("xs")]: {
      minHeight: "calc(100vh - 30px)"
    }
  },
  content: {
    width: "calc(100% - 160px)",
    zIndex: 1,
    [theme.breakpoints.down("xs")]: {
      width: "calc(100% - 48px)"
    }
  },
  contentClose: {
    width: "100%",
    zIndex: 1
  },
  individualTab: {
    minWidth: 0,
    maxWidth: "100%"
  }
}));

const Main = props => {
  const classes = useStyles();
  let [tr, setTr] = React.useState(0);
  let [value, setValue] = React.useState(0);
  let [expanded, setExpanded] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid container className={classes.back}></Grid>
      <Grid container justify="center" className={classes.mainGrid}>
        <Grid item xs={11} sm={10} md={8}>
          <Paper
            elevation={8}
            className={clsx(classes.paper)}
            style={{ position: "relative" }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              className={clsx(classes.tabs, !expanded && classes.noneWidth)}
              classes={{ indicator: classes.bigIndicator }}
            >
              <Tab
                style={{ marginTop: 48 }}
                className={classes.individualTab}
                label="Criminosos"
                {...a11yProps(0)}
              />
              <Tab
                className={classes.individualTab}
                label="Quadrilhas"
                {...a11yProps(1)}
              />
              <Tab
                className={classes.individualTab}
                label="Bairros"
                {...a11yProps(2)}
              />
              <Tab
                className={classes.individualTab}
                label="Crimes"
                {...a11yProps(3)}
              />
              {/* <Tab
                className={classes.individualTab}
                label="Mito"
                {...a11yProps(3)}
              />*/}
            </Tabs>
            <div
              className={clsx(
                classes.contentClose,
                !expanded && classes.content
              )}
            >
              <TabPanel value={value} index={0} style={{ height: "100%" }}>
                <Criminosos
                  tr={tr}
                  update={() => {
                    let a = tr + 1;
                    setTr(a++);
                  }}
                />
              </TabPanel>
              <TabPanel value={value} index={1} style={{ height: "100%" }}>
                <Quadrilhas
                  tr={tr}
                  update={() => {
                    let a = tr + 1;
                    setTr(a++);
                  }}
                />
              </TabPanel>
              <TabPanel value={value} index={2} style={{ height: "100%" }}>
                <Bairros
                  tr={tr}
                  update={() => {
                    let a = tr + 1;
                    setTr(a++);
                  }}
                />
              </TabPanel>
              <TabPanel value={value} index={3} style={{ height: "100%" }}>
                <Crimes
                  tr={tr}
                  update={() => {
                    let a = tr + 1;
                    setTr(a++);
                  }}
                />
              </TabPanel>
              {/* <TabPanel value={value} index={4} style={{ height: "100%" }}>
                <Grid
                  container
                  justify="center"
                  className={classes.bolso}
                ></Grid>
              </TabPanel> */}
            </div>
            <Fab
              color="primary"
              aria-label="add"
              onClick={handleExpandClick}
              style={{
                position: "absolute",
                top: -30,
                left: -10,
                fontSize: "1.5rem",
                zIndex: 100,
                backgroundColor: "rgb(64, 64, 64)"
              }}
              // className={clsx(classes.expand, {
              //   [classes.expandOpen]: expanded
              // })}
            >
              <MdMenu />
            </Fab>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
