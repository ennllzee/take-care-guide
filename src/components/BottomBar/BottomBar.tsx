import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Grid, IconButton, Typography } from "@material-ui/core";
import {
  // Business,
  Event,
  // Help,
  History,
  Person,
  Queue,
} from "@material-ui/icons";
import { history } from "../../helper/history";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    icon: {
      // marginRight: theme.spacing(2),
      padding: 0
    },
    title: {
      flexGrow: 1,
    },
    pos: {
      top: "auto",
      bottom: 0,
    },
    bar: {
      height: "7vh",
    },
    here: {
      backgroundColor: "#C785EB",
    },
    posGuide: {
      backgroundColor: "#508F7F",
      top: "auto",
      bottom: 0,
    },
  })
);

interface BottomBarProps {
  page: string;
}

function BottomBar({ page }: BottomBarProps) {
  const classes = useStyles();
  const accessToken = localStorage.getItem("accessToken");

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.posGuide}>
        <Toolbar className={classes.bar}>
          <Grid container direction="row" justify="space-around">
            <IconButton
              color="inherit"
              onClick={() => history.push(`/profile&=${accessToken}`)}
              className={classes.icon}
            >
              <Typography>
                <Person/>
                {page === "Profile" &&
                  <Typography style={{fontSize:8}}>profile</Typography>
                }
              </Typography>
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => history.push(`/customer&request&=${accessToken}`)}
              className={classes.icon}
            >
              <Typography>
                <Queue />
                {page === "Customer Request" &&
                  <Typography style={{fontSize:8}}>request</Typography>
                }
              </Typography>
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => history.push(`/appointment&=${accessToken}`)}
              className={classes.icon}
            >
              <Typography>
                <Event />
                {page === "Appointment" &&
                  <Typography style={{fontSize:8}}>appointment</Typography>
                }
              </Typography>
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => history.push(`/history&=${accessToken}`)}
              className={classes.icon}
            >
              <Typography>
                <History/>
                {page === "History" &&
                  <Typography style={{fontSize:8}}>history</Typography>
                }
              </Typography>
            </IconButton>
            {/* <IconButton
              color="inherit"
              onClick={() => history.push(`/hospital&information&=${accessToken}`)}
              className={classes.icon}
            >
              <Business />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => history.push(`/customer&service&=${accessToken}`)}
              className={classes.icon}
            >
              <Help />
            </IconButton> */}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default BottomBar;
