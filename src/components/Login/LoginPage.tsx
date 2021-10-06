import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
  Paper,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { history } from "../../helper/history";
import GoogleLogin from "react-google-login";
import Image from "material-ui-image";
import { useQuery } from "@apollo/client";
import useGuideApi from "../../hooks/guidehooks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
      backgroundColor: "#7DC4B2",
    },
    paper: {
      background: "white",
      width: "80vw",
    },
    login: {
      padding: "5%",
    },
    form: {
      paddingTop: "2%",
      paddingBottom: "2%",
    },
    margin: {
      margin: theme.spacing(1),
    },
    google: {
      padding: "2%",
    },
    name: {
      paddingLeft: "2%",
    },
  })
);

function LoginPage() {
  const classes = useStyles();

  const accessToken = localStorage.getItem("accessToken");
  const id = localStorage.getItem("_id")

  useEffect(() => {
    if (accessToken !== null && id !== null) {
      history.push(`/appointment&=${accessToken}`);
    }
  }, [accessToken, id]);

  const [res, setRes] = useState<any>();
  const [token, setToken] = useState<string>();

  const { LOGIN_GUIDE } = useGuideApi();

  const { loading, error, data } = useQuery(LOGIN_GUIDE, {
    variables: { loginGuideToken: token },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (!loading && res !== undefined && token !== undefined) {
      if (data) {
        localStorage.setItem("_id", data.loginGuide._id);
        localStorage.setItem("accessToken", res.accessToken);
        history.push(`/appointment&=${localStorage.getItem("accessToken")}`);
      } else {
        localStorage.setItem("token", res.tokenId);
        localStorage.setItem("gmail", res.profileObj.email);
        history.push("/register");
      }
    }
    if (error) console.log(error?.graphQLErrors);
  }, [loading, data, error, res, token]);

  const responseGoogle = async (response: any) => {
    console.log(response.tokenId);
    setRes(response);
    setToken(response.tokenId);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="space-between"
      className={classes.root}
    >
      <Grid item></Grid>

      <Grid item>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.login}
          >
            <Grid xs={12} md={12} lg={12}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="flex-start"
              >
                <Grid item xs={2} md={1} lg={1}>
                  <Image
                    src="./logo.png"
                    cover={true}
                    // style={{padding: 0}}
                  />
                </Grid>
                <Grid item xs={10} md={11} lg={11} className={classes.name}>
                  <Typography variant="h4">ลงชื่อเข้าระบบไกด์</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} md={12} lg={12} className={classes.form}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.google}
              >
                <GoogleLogin
                  clientId="907374215732-jc7l3sk84f05vlsf9e23ceo674ek0sbe.apps.googleusercontent.com"
                  buttonText="Sign in with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                  isSignedIn={true}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
}
export default LoginPage;
