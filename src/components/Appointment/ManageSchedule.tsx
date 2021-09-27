import { useQuery, useMutation } from "@apollo/client";
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
  Checkbox,
  FormControlLabel,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import moment from "moment";
import { useEffect, useState } from "react";
import { history } from "../../helper/history";
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
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      height: "80vh",
      width: "80vw",
      overflow: "auto",
    },
    line: {
      padding: "5%",
    },
  })
);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 12,
    },
    body: {
      fontSize: 10,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

function ManageSchedule({ open, setOpen }: ManageScheduleProps) {
  const classes = useStyles();
  const id = localStorage.getItem("_id");

  const {
    GET_ALL_GUIDESCHEDULE_BYGUIDE,
    CREATE_GUIDESCHEDULE,
    DELETE_GUIDESCHEDULE,
  } = useGuideApi();

  const { loading, error, data } = useQuery(GET_ALL_GUIDESCHEDULE_BYGUIDE, {
    variables: { getAllGuidescheduleByGuideGuideId: id },
  });

  const [guideSchedule, setGuideSchedule] = useState<GuideSchedule[]>(
    data !== undefined ? data.getAllGuidescheduleByGuide : []
  );

  const [submit, setSubmit] = useState<boolean>(false);
  const token = localStorage.getItem("accessToken");

  const [scheduleDate, setScheduleDate] = useState<Date[]>([]);
  const [scheduleForm, setScheduleForm] = useState<GuideScheduleForm[]>([]);
  const updateAvailable = (a: GuideScheduleForm | undefined, i: number) => {
    if (a !== undefined) {
      let arr = scheduleForm;
      arr[i] = {
        ScheduleDate: a.ScheduleDate,
        Period: a.Period,
        Guide: a.Guide,
        Available: !a.Available,
      };
      setScheduleForm(arr);
    }
  };

  useEffect(() => {
    setScheduleDate([]);
    for (let i = 1; i < 15; i++) {
      setScheduleDate((d) => [
        ...d,
        new Date(moment(new Date()).add(i, "days").format("DD MMMM yyyy")),
      ]);
    }
  }, [moment(new Date()).format("DD MMMM yyyy")]);

  const [success, setSuccess] = useState<boolean>(false);

  const [createGuideSchedule] = useMutation(CREATE_GUIDESCHEDULE, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const [deleteGuideSchedule] = useMutation(DELETE_GUIDESCHEDULE, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const onSubmit = () => {
    setSubmit(false);
    //waiting for add
    const createRequest = scheduleForm.filter((data) => {
      return data.Available === true;
    });
    const deleteRequest = scheduleForm.filter((data) =>{
      return data.Available === false;
    })
    console.log(createRequest);
    console.log(deleteRequest);
    setSuccess(true);
  };

  useEffect(() => {
    if (!loading && data) {
      console.log(data.getAllGuidescheduleByGuide)
      setGuideSchedule(data.getAllGuidescheduleByGuide);
      for (let i = 1; i < 15; i++) {
        let newSchMor: GuideScheduleForm = {
          ScheduleDate: new Date(
            moment(new Date()).add(i, "days").format("DD MMMM yyyy")
          ).toISOString(),
          Period: "Morning",
          Guide: id,
          Available: data.getAllGuidescheduleByGuide.find(
            (g: GuideSchedule) =>
              g.ScheduleDate ===
                new Date(
                  moment(new Date()).add(i, "days").format("DD MMMM yyyy")
                ).toISOString() && g.Period === "Morning"
          )
            ? data.getAllGuidescheduleByGuide.find(
                (g: GuideSchedule) =>
                  g.ScheduleDate ===
                    new Date(
                      moment(new Date()).add(i, "days").format("DD MMMM yyyy")
                    ).toISOString() && g.Period === "Morning"
              ).Available
            : false,
        };
        let newSchAft: GuideScheduleForm = {
          ScheduleDate: new Date(
            moment(new Date()).add(i, "days").format("DD MMMM yyyy")
          ).toISOString(),
          Period: "Afternoon",
          Guide: id,
          Available: data.getAllGuidescheduleByGuide.find(
            (g: GuideSchedule) =>
              g.ScheduleDate ===
                new Date(
                  moment(new Date()).add(i, "days").format("DD MMMM yyyy")
                ).toISOString() && g.Period === "Afternoon"
          )
            ? data.getAllGuidescheduleByGuide.find(
                (g: GuideSchedule) =>
                  g.ScheduleDate ===
                    new Date(
                      moment(new Date()).add(i, "days").format("DD MMMM yyyy")
                    ).toISOString() && g.Period === "Afternoon"
              ).Available
            : false,
        };
        setScheduleForm((s) => [...s, newSchMor, newSchAft]);
      }
    }
  }, [loading, data, moment(new Date()).format("DD MMMM yyyy")]);

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
          <Grid item xs={12} md={12} lg={12} className={classes.line}>
            <TableContainer>
              <Table>
                <colgroup>
                  <col style={{ width: "50%" }} />
                  <col style={{ width: "25%" }} />
                  <col style={{ width: "25%" }} />
                </colgroup>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>วันที่</StyledTableCell>
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
                                s.ScheduleDate === m.toISOString() &&
                                s.Period === "Morning"
                            )}
                            morIndex={scheduleForm.findIndex(
                              (s) =>
                                s.ScheduleDate === m.toISOString() &&
                                s.Period === "Morning"
                            )}
                            morWork={
                              guideSchedule.find(
                                (g) =>
                                  g.ScheduleDate === m.toISOString() &&
                                  g.Period === "Morning" &&
                                  g.WorkOnAppointment !== null &&
                                  g.WorkOnAppointment?.Status.Tag ===
                                    "Guide Confirm"
                              )
                                ? true
                                : false
                            }
                            afternoon={scheduleForm.find(
                              (s) =>
                                s.ScheduleDate === m.toISOString() &&
                                s.Period === "Afternoon"
                            )}
                            aftIndex={scheduleForm.findIndex(
                              (s) =>
                                s.ScheduleDate === m.toISOString() &&
                                s.Period === "Afternoon"
                            )}
                            aftWork={
                              guideSchedule.find(
                                (g) =>
                                  g.ScheduleDate === m.toISOString() &&
                                  g.Period === "Afternoon" &&
                                  g.WorkOnAppointment !== null &&
                                  g.WorkOnAppointment?.Status.Tag ===
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
                บันทึก
              </Button>
            </Typography>
          </Grid>
        </Grid>
        {submit && (
          <Submit
            submit={submit}
            title="จัดการตารางงาน"
            text="ยืนยันข้อมูลหรือไม่"
            denyText="ยกเลิก"
            submitText="ยืนยัน"
            denyAction={() => setSubmit(false)}
            submitAction={onSubmit}
          />
        )}
        {success && (
          <Alert
            closeAlert={() => setSuccess(false)}
            alert={success}
            title="สำเร็จ"
            text="จัดการตารางงานสำเร็จ"
            buttonText="ตกลง"
          />
        )}
      </Paper>
    </Modal>
  );
}

export default ManageSchedule;
