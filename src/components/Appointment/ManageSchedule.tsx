import { useQuery } from "@apollo/client";
import {
  makeStyles,
  Theme,
  createStyles,
  Modal,
  Paper,
  Typography,
  IconButton,
  Grid,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  withStyles,
  TableBody,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Close, Save } from "@material-ui/icons";
import moment from "moment";
import { useEffect, useState } from "react";
import convertToThaiDate from "../../hooks/convertToThaiDate";
import useGuideApi from "../../hooks/guidehooks";
import GuideSchedule from "../../models/GuideSchedule";
import GuideScheduleForm from "../../models/GuideScheduleForm";
import Alert from "../Alert/Alert";
import Submit from "../Submit/Submit";
import ScheduleRow from "./ScheduleRow";

interface ManageScheduleProps {
  open: boolean;
  setOpen: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      // border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      height: "80vh",
      width: "80vw",
      overflow: "auto",
    },
    line: {
      padding: "2%",
    },
    table: {
      padding: 0,
      paddingTop: "2%",
      paddingBottom: "2%",
    },
  })
);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#508F7F",
      color: theme.palette.common.white,
      fontSize: 12,
      padding: "2%",
    },
  })
)(TableCell);

function ManageSchedule({ open, setOpen }: ManageScheduleProps) {
  const classes = useStyles();
  const id = localStorage.getItem("_id");

  const { GET_ALL_GUIDESCHEDULE_BYGUIDE } = useGuideApi();

  const { loading, error, data } = useQuery(GET_ALL_GUIDESCHEDULE_BYGUIDE, {
    variables: { getAllGuidescheduleByGuideGuideId: id },
  });

  const [guideSchedule, setGuideSchedule] = useState<GuideSchedule[]>(
    data !== undefined ? data.getAllGuidescheduleByGuide : []
  );

  const [submit, setSubmit] = useState<boolean>(false);

  const [scheduleDate, setScheduleDate] = useState<Date[]>([]);
  const [scheduleForm, setScheduleForm] = useState<GuideScheduleForm[]>([]);

  const updateAvailable = (
    a: GuideScheduleForm | undefined,
    i: number,
    period: string
  ) => {
    if (a !== undefined) {
      let arr = scheduleForm;
      if (period === "morning") {
        arr[i] = {
          AvailableMorning: !arr[i].AvailableMorning,
          AvailableAfternoon: arr[i].AvailableAfternoon,
          Createdby: a.Createdby,
          ScheduleDate: a.ScheduleDate,
        };
      } else {
        arr[i] = {
          AvailableMorning: arr[i].AvailableMorning,
          AvailableAfternoon: !arr[i].AvailableAfternoon,
          Createdby: a.Createdby,
          ScheduleDate: a.ScheduleDate,
        };
      }
      setScheduleForm(arr);
      console.log(arr);
    }
  };

  const [success, setSuccess] = useState<boolean>(false);

  const onSubmit = () => {
    setSubmit(false);
    scheduleForm.map((m, key) => {
      //waiting for add or update
      const exist = guideSchedule.find((s: any) => {
        return (
          moment(s.ScheduleDate).startOf("day").format() ===
          moment(m.ScheduleDate).startOf("day").format()
        );
      });

      // if (exist) {
      //   if (m.AvailableMorning && m.AvailableAfternoon) {
      //     updateGuideSchedule({
      //       variables: {
      //         updateGuideScheduleId: exist._id,
      //         updateGuideSchedulePeriod: "All-day",
      //         updateGuideScheduleAvailable: true
      //       },
      //     });
      //   } else if (m.AvailableAfternoon) {
      //     updateGuideSchedule({
      //       variables: {
      //         updateGuideScheduleId: exist._id,
      //         updateGuideSchedulePeriod: "Afternoon",
      //         updateGuideScheduleAvailable: true
      //       },
      //     });
      //     if (!m.AvailableMorning){
      //       updateGuideSchedule({
      //         variables: {
      //           updateGuideScheduleId: exist._id,
      //           updateGuideSchedulePeriod: "Morning",
      //           updateGuideScheduleAvailable: false
      //         },
      //       });
      //     }
      //   } else if (m.AvailableMorning) {
      //     updateGuideSchedule({
      //       variables: {
      //         updateGuideScheduleId: exist._id,
      //         updateGuideSchedulePeriod: "Morning",
      //         updateGuideScheduleAvailable: true
      //       },
      //     });
      //     if (!m.AvailableAfternoon){
      //       updateGuideSchedule({
      //         variables: {
      //           updateGuideScheduleId: exist._id,
      //           updateGuideSchedulePeriod: "Afternoon",
      //           updateGuideScheduleAvailable: false
      //         },
      //       });
      //     }
      //   } else {
      //     updateGuideSchedule({
      //       variables: {
      //         updateGuideScheduleId: exist._id,
      //         updateGuideSchedulePeriod: "All-day",
      //         updateGuideScheduleAvailable: false
      //       },
      //     });
      //   }
      // } else {
      //   if (m.AvailableMorning && m.AvailableAfternoon) {
      //     createGuideSchedule({
      //       variables: {
      //         createGuideScheduleInput: {
      //           ScheduleDate: m.ScheduleDate,
      //           Period: "All-day",
      //           Createdby: m.Createdby,
      //         },
      //       },
      //     });
      //   } else if (m.AvailableAfternoon) {
      //     createGuideSchedule({
      //       variables: {
      //         createGuideScheduleInput: {
      //           ScheduleDate: m.ScheduleDate,
      //           Period: "Afternoon",
      //           Createdby: m.Createdby,
      //         },
      //       },
      //     });
      //   } else if (m.AvailableMorning) {
      //     createGuideSchedule({
      //       variables: {
      //         createGuideScheduleInput: {
      //           ScheduleDate: m.ScheduleDate,
      //           Period: "Morning",
      //           Createdby: m.Createdby,
      //         },
      //       },
      //     });
      //   }
      // }

      // console.log(m, key);
      console.log(exist);
      return 0;
    });
    setSuccess(true);
  };

  useEffect(() => {
    if (!loading && data) {
      setScheduleDate([]);
      for (let i = 1; i < 15; i++) {
        setScheduleDate((d) => [
          ...d,
          new Date(moment(new Date()).add(i, "days").format("DD MMMM yyyy")),
        ]);
      }
      setGuideSchedule(data.getAllGuidescheduleByGuide);
      // if (
      //   scheduleForm.length === 0 ||
      //   scheduleForm.find(
      //     (e) =>
      //       moment(e.ScheduleDate).format("DD MMMM yyyy") ===
      //       moment(new Date()).format("DD MMMM yyyy")
      //   )
      // ) {
        setScheduleForm([]);
        for (let i = 1; i < 15; i++) {
          let newSch: GuideScheduleForm = {
            ScheduleDate: moment(new Date()).add(i, "days").format(),
            Createdby: id,
            AvailableMorning: data.getAllGuidescheduleByGuide.find(
              (g: GuideSchedule) => {
                return (
                  moment(g.ScheduleDate).format("DD MMMM yyyy") ===
                  moment(new Date()).add(i, "days").format("DD MMMM yyyy")
                );
              }
            )
              ? data.getAllGuidescheduleByGuide.find(
                  (g: GuideSchedule) =>
                    moment(g.ScheduleDate).format("DD MMMM yyyy") ===
                    moment(new Date()).add(i, "days").format("DD MMMM yyyy")
                ).AvailableMorning
              : true,
            AvailableAfternoon: data.getAllGuidescheduleByGuide.find(
              (g: GuideSchedule) =>
                moment(g.ScheduleDate).format("DD MMMM yyyy") ===
                moment(new Date()).add(i, "days").format("DD MMMM yyyy")
            )
              ? data.getAllGuidescheduleByGuide.find(
                  (g: GuideSchedule) =>
                    moment(g.ScheduleDate).format("DD MMMM yyyy") ===
                    moment(new Date()).add(i, "days").format("DD MMMM yyyy")
                ).AvailableAfternoon
              : true,
          };
          setScheduleForm((s) => [...s, newSch]);
        // }

        if (error) console.log(error?.graphQLErrors);
      }
    }
  }, [loading, data, error, id]);

  return (
    <Modal open={open} className={classes.modal}>
      <Paper className={classes.paper}>
        <Typography align="right">
          <IconButton onClick={() => setOpen(false)} style={{ padding: "0" }}>
            <Close />
          </IconButton>
        </Typography>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h4" className={classes.line}>
              ตารางงาน
              <Typography variant="subtitle2">
                (
                {convertToThaiDate(
                  new Date(
                    moment(new Date()).add(1, "days").format("DD MMMM yyyy")
                  )
                )}{" "}
                -{" "}
                {convertToThaiDate(
                  new Date(
                    moment(new Date()).add(14, "days").format("DD MMMM yyyy")
                  )
                )}
                )
              </Typography>
            </Typography>

            <Divider variant="middle" />
          </Grid>
          <Grid item xs={12} md={12} lg={12} className={classes.table}>
            <TableContainer>
              <Table>
                <colgroup>
                  <col style={{ width: "50%" }} />
                  <col style={{ width: "25%" }} />
                  <col style={{ width: "25%" }} />
                </colgroup>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">วันที่</StyledTableCell>
                    <StyledTableCell align="center">เช้า</StyledTableCell>
                    <StyledTableCell align="center">บ่าย</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!loading ? (
                    <>
                      {scheduleDate.map((m, key) => {
                        return (
                          <ScheduleRow
                            key={key}
                            morning={scheduleForm.find(
                              (s) =>
                                moment(s.ScheduleDate).format(
                                  "DD MMMM yyyy"
                                ) === moment(m).format("DD MMMM yyyy")
                            )}
                            morIndex={scheduleForm.findIndex(
                              (s) =>
                                moment(s.ScheduleDate).format(
                                  "DD MMMM yyyy"
                                ) === moment(m).format("DD MMMM yyyy")
                            )}
                            morWork={
                              guideSchedule.find(
                                (g) =>
                                  moment(g.ScheduleDate).format(
                                    "DD MMMM yyyy"
                                  ) === moment(m).format("DD MMMM yyyy") &&
                                  g.WorkOnMorningAppointment !== null &&
                                  g.WorkOnMorningAppointment?.Status.Tag ===
                                    "Guide Confirm"
                              )
                                ? true
                                : false
                            }
                            afternoon={scheduleForm.find(
                              (s) =>
                                moment(s.ScheduleDate).format(
                                  "DD MMMM yyyy"
                                ) === moment(m).format("DD MMMM yyyy")
                            )}
                            aftIndex={scheduleForm.findIndex(
                              (s) =>
                                moment(s.ScheduleDate).format(
                                  "DD MMMM yyyy"
                                ) === moment(m).format("DD MMMM yyyy")
                            )}
                            aftWork={
                              guideSchedule.find(
                                (g) =>
                                  moment(g.ScheduleDate).format(
                                    "DD MMMM yyyy"
                                  ) === moment(m).format("DD MMMM yyyy") &&
                                  g.WorkOnAfternoonAppointment !== null &&
                                  g.WorkOnAfternoonAppointment?.Status.Tag ===
                                    "Guide Confirm"
                              )
                                ? true
                                : false
                            }
                            check={updateAvailable}
                          />
                        );
                      })}
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
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Typography align="right">
              <Button
                // fullWidth={true}
                type="button"
                onClick={() => setSubmit(true)}
                variant="contained"
              >
                <Save />
                บันทึก
              </Button>
            </Typography>
          </Grid>
        </Grid>
        <Submit
          submit={submit}
          title="จัดการตารางงาน"
          text="ยืนยันข้อมูลหรือไม่"
          denyText="ยกเลิก"
          submitText="ยืนยัน"
          denyAction={() => setSubmit(false)}
          submitAction={onSubmit}
        />
        <Alert
          closeAlert={() => setSuccess(false)}
          alert={success}
          title="สำเร็จ"
          text="จัดการตารางงานสำเร็จ"
          buttonText="ตกลง"
        />
      </Paper>
    </Modal>
  );
}

export default ManageSchedule;
