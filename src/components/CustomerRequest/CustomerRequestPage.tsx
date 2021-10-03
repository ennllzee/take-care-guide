import { useQuery } from "@apollo/client";
import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  CircularProgress,
  Divider,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import { useEffect, useState } from "react";
import { history } from "../../helper/history";
import convertToThaiDate from "../../hooks/convertToThaiDate";
import useGuideApi from "../../hooks/guidehooks";
import BottomBar from "../BottomBar/BottomBar";
import TopBar from "../TopBar/TopBar";
import RequestCard from "./RequestCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
      paddingRight: "5%",
      paddingLeft: "5%",
      minWidth: "100vw",
    },
    line: {
      padding: "1%",
    },
    card: {
      padding: "2%",
    },
  })
);

function CustomerRequestPage() {
  const classes = useStyles();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken === null) {
      history.push("/");
    }
  }, [accessToken]);

  const { GET_ALL_APPOINTMENT_BY_GUIDE } = useGuideApi();
  const id = localStorage.getItem("_id");

  const { loading, error, data } = useQuery(GET_ALL_APPOINTMENT_BY_GUIDE, {
    variables: { getAllAppointmentByGuideGuideId: id },
    pollInterval: 1000,
  });

  const [appointment, setAppointment] = useState<any[]>(
    data !== undefined ? data.getAllAppointmentByGuide : []
  );

  useEffect(() => {
    if (!loading && data) {
      setAppointment(data.getAllAppointmentByGuide);
    }
    console.log(error);
  }, [loading]);

  return (
    <Grid>
      <TopBar page="คำขอรับบริการ" />
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-between"
      >
        <Grid item className={classes.main}>
          {!loading ? (
            <>
              {appointment !== undefined &&
              appointment.find(
                (a) =>
                  a.Status.Tag === "Wait for Guide to Confirm" &&
                  new Date(moment(a.AppointTime).format("DD MMMM yyyy")) >=
                    new Date(moment(new Date()).format("DD MMMM yyyy")) &&
                  new Date(moment(a.AppointTime).format("DD MMMM yyyy")) <=
                    new Date(
                      moment(new Date()).add(7, "days").format("DD MMMM yyyy")
                    )
              ) ? (
                appointment
                  ?.filter(
                    (a) =>
                      new Date(moment(a.AppointTime).format("DD MMMM yyyy")) >=
                        new Date(moment(new Date()).format("DD MMMM yyyy")) &&
                      new Date(moment(a.AppointTime).format("DD MMMM yyyy")) <=
                        new Date(
                          moment(new Date())
                            .add(7, "days")
                            .format("DD MMMM yyyy")
                        )
                  )
                  .slice()
                  .sort((a, b) => {
                    return (
                      new Date(a.AppointTime).getTime() -
                      new Date(b.AppointTime).getTime()
                    );
                  })
                  .map((a) => {
                    return (
                      <>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="flex-start"
                          className={classes.line}
                        >
                          <Grid item xs={10} md={11} lg={11}>
                            <Typography variant="h5">
                              {convertToThaiDate(new Date(a.AppointTime))}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider variant="middle" />
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="center"
                          className={classes.card}
                        >
                          <Grid item xs={12} md={10} lg={8}>
                            <RequestCard appointment={a} />
                          </Grid>
                        </Grid>
                      </>
                    );
                  })
              ) : (
                <Typography align="center" variant="h6" color="textSecondary">
                  ไม่มีคำขอรับบริการ
                </Typography>
              )}
            </>
          ) : (
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <CircularProgress disableShrink />
            </Grid>
          )}
        </Grid>
      </Grid>
      <BottomBar page="Customer Request" />
    </Grid>
  );
}
export default CustomerRequestPage;
