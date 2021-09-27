import { useQuery } from "@apollo/client";
import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Typography,
  Button,
  Divider,
  Checkbox,
  CircularProgress,
} from "@material-ui/core";
import moment from "moment";
import { useEffect, useState } from "react";
import { history } from "../../helper/history";
import convertToThaiDate from "../../hooks/convertToThaiDate";
import useGuideApi from "../../hooks/guidehooks";
import Appointment from "../../models/Appointment";
import BottomBar from "../BottomBar/BottomBar";
import TopBar from "../TopBar/TopBar";
import AppointmentCard from "./AppointmentCard";
import ManageSchedule from "./ManageSchedule";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
    },
    sub: {
      minHeight: "15vh",
    },
    main: {
      minHeight: "70vh",
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

function AppointmentPage() {
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
    pollInterval: 3000,
  });

  const [appointment, setAppointment] = useState<any[]>(
    data !== undefined ? data.getAllAppointmentByGuide : []
  );

  const [manage, setManage] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && data) {
      console.log(data);
      setAppointment(data.getAllAppointmentByGuide);
    }
    console.log(error);
  }, [loading]);

  return (
    <Grid>
      <TopBar page="การนัดหมาย" />
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-between"
        className={classes.root}
      >
        <Grid item className={classes.sub}></Grid>
        <Grid item className={classes.main}>
          <Typography align="right">
            <Button type="button" onClick={() => setManage(true)}>
              การจัดการตารางงาน
            </Button>
          </Typography>

          {!loading ? (
            <>
              {appointment !== undefined &&
              appointment.find((a) => a.Status.Tag ==="Guide Confirm" && a.Status.Tag ==="In process") ? (
                appointment
                  ?.filter((a) => a.EndTime === null)
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
                            <AppointmentCard appointment={a} />
                          </Grid>
                        </Grid>
                      </>
                    );
                  })
              ) : (
                <Typography
                  align="center"
                  variant="subtitle1"
                  color="textSecondary"
                >
                  ไม่มีการนัดหมาย
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

        <Grid item className={classes.sub}></Grid>
      </Grid>
      <BottomBar page="Appointment" />
      <ManageSchedule open={manage} setOpen={setManage} />
    </Grid>
  );
}
export default AppointmentPage;
