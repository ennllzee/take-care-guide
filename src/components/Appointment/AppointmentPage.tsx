import { useQuery } from "@apollo/client";
import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Typography,
  Divider,
  CircularProgress,
  Fab,
} from "@material-ui/core";
import { DateRange } from "@material-ui/icons";
import moment from "moment";
import { useEffect, useState } from "react";
import { history } from "../../helper/history";
import convertToThaiDate from "../../hooks/convertToThaiDate";
import useGuideApi from "../../hooks/guidehooks";
import BottomBar from "../BottomBar/BottomBar";
import TopBar from "../TopBar/TopBar";
import AppointmentCard from "./AppointmentCard";
import ManageSchedule from "./ManageSchedule";

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
    fab: {
      position: "fixed",
      bottom: theme.spacing(10),
      right: theme.spacing(2),
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
    pollInterval: 1000,
  });

  const [appointment, setAppointment] = useState<any[]>(
    data !== undefined ? data.getAllAppointmentByGuide : []
  );

  const [manage, setManage] = useState<boolean>(false);

  const [rangeDate, setRangeDate] = useState<string[]>([]);

  useEffect(() => {
    setRangeDate([]);
    for (let i = 0; i < 8; i++) {
      setRangeDate((d) => [
        ...d,
        moment(new Date()).add(i, "days").format("DD MMMM yyyy"),
      ]);
    }
    if (!loading && data) {
      setAppointment(data.getAllAppointmentByGuide);
    }
    if (error) console.log(error?.graphQLErrors);
  }, [loading, data, error]);

  return (
    <Grid>
      <TopBar page="การนัดหมาย" />
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="flex-start"
      >
        <Grid item className={classes.main}>
          <Fab
            className={classes.fab}
            onClick={() => setManage(true)}
            variant="extended"
          >
            <DateRange /> ตารางงาน
          </Fab>

          {!loading ? (
            <>
              {appointment !== undefined &&
              appointment.find(
                (a) =>
                  (a.Status.Tag === "Guide Confirm" ||
                    a.Status.Tag === "In process") &&
                  rangeDate.find(
                    (d) => d === moment(a.AppointTime).format("DD MMMM yyyy")
                  )
              ) ? (
                rangeDate.map((d, k) => {
                  return (
                    appointment !== undefined &&
                    appointment.find(
                      (a) =>
                        (a.Status.Tag === "Guide Confirm" ||
                          a.Status.Tag === "In process") &&
                        moment(a.AppointTime).format("DD MMMM yyyy") ===
                          moment(d).format("DD MMMM yyyy")
                    ) && (
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
                              {convertToThaiDate(new Date(d))}
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
                          {appointment
                            ?.filter(
                              (a) =>
                                (a.Status.Tag === "Guide Confirm" ||
                                  a.Status.Tag === "In process") &&
                                moment(a.AppointTime).format("DD MMMM yyyy") ===
                                  d
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
                                  <Grid item xs={12} md={10} lg={8} className={classes.card}>
                                    <AppointmentCard appointment={a} />
                                  </Grid>
                                </>
                              );
                            })}
                        </Grid>
                      </>
                    )
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
      </Grid>
      <BottomBar page="Appointment" />
      <ManageSchedule open={manage} setOpen={setManage} />
    </Grid>
  );
}
export default AppointmentPage;
