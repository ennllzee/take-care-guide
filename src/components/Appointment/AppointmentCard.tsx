import React, { useState } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  CardHeader,
  Fab,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import moment from "moment";
import Appointment from "../../models/Appointment";
import Image from "material-ui-image";
import RecordRow from "./RecordRow";
import { AddCircle } from "@material-ui/icons";
import AddRecord from "./AddRecord";
import Alert from "../Alert/Alert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "4%",
      paddingBottom: 0,
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
      padding: 0,
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
    add: {
      padding: "1%",
    },
    monday: {
      backgroundColor: "#FFD68F",
      padding: "1%",
    },
    tuesday: {
      backgroundColor: "#FF8FD4",
      padding: "1%",
    },
    wednesday: {
      backgroundColor: "#94E18A",
      padding: "1%",
    },
    thursday: {
      backgroundColor: "#F3BE95",
      padding: "1%",
    },
    friday: {
      backgroundColor: "#9FBFF2",
      padding: "1%",
    },
    saturday: {
      backgroundColor: "#C78FDC",
      padding: "1%",
    },
    sunday: {
      backgroundColor: "#EA7C7C",
      padding: "1%",
    },
  })
);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      fontSize: 10,
      padding: 0,
      paddingTop: "1%",
    },
    body: {
      fontSize: 10,
      padding: "1%",
    },
  })
)(TableCell);

interface AppointmentCardProps {
  appointment: Appointment;
}

function AppointmentCard({ appointment }: AppointmentCardProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [addRecord, setAddRecord] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);

  return (
    <Card>
      <CardHeader
        className={
          new Date(appointment.AppointTime).getDay() === 0
            ? classes.sunday
            : new Date(appointment.AppointTime).getDay() === 1
            ? classes.monday
            : new Date(appointment.AppointTime).getDay() === 2
            ? classes.tuesday
            : new Date(appointment.AppointTime).getDay() === 3
            ? classes.wednesday
            : new Date(appointment.AppointTime).getDay() === 4
            ? classes.thursday
            : new Date(appointment.AppointTime).getDay() === 5
            ? classes.friday
            : classes.saturday
        }
      />
      <CardContent className={classes.root}>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justify="center"
        >
          <Grid item xs={5}>
            <Typography variant="body1" align="left">
              เวลานัดหมาย:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" align="left">
              {moment(appointment.AppointTime).format("HH.mm น.")}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="body1" align="left">
              โรงพยาบาล:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" align="left">
              {appointment.Hospital.Name}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="body1" align="left">
              แผนก:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" align="left">
              {appointment.Department.Name}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="body1" align="left">
              ข้อมูลเพิ่มเติม:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" align="left">
              {appointment.Note !== null ? appointment.Note : "-"}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="body1" align="left">
              สถานะ:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1" align="left">
              {appointment.Status.Tag}
            </Typography>
          </Grid>
        </Grid>
        {appointment.Status.Tag === "In process" && (
          <>
            <Grid item xs={12} md={12} lg={12}>
              <TableContainer>
                <Table>
                  <colgroup>
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "30%" }} />
                    <col style={{ width: "50%" }} />
                  </colgroup>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">เวลา</StyledTableCell>
                      <StyledTableCell align="center">กิจกรรม</StyledTableCell>
                      <StyledTableCell align="center">บันทึก</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {appointment?.Record?.map((r, key) => {
                      return <RecordRow key={key} record={r} />;
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Grid container justify="center" alignItems="center">
                <IconButton
                  className={classes.add}
                  onClick={() => setAddRecord(true)}
                >
                  <AddCircle fontSize="small" />
                  <Typography variant="body2">เพิ่มบันทึก</Typography>
                </IconButton>
              </Grid>
            </Grid>
          </>
        )}
        <AddRecord
          appointment={appointment}
          add={addRecord}
          setAdd={setAddRecord}
          setAlert={setAlert}
        />
        <Alert
          closeAlert={() => setAlert(false)}
          alert={alert}
          title="สำเร็จ"
          text="เพิ่มบันทึกสำเร็จ"
          buttonText="ตกลง"
        />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="แสดงข้อมูลเพิ่มเติม"
        >
          {!expanded && (
            <Typography variant="button">แสดงข้อมูลลูกค้า</Typography>
          )}

          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            justify="center"
          >
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  justify="space-between"
                >
                  <Grid item xs={4}>
                    <Image
                      src={"https://pbs.twimg.com/media/D42rqfjU0AA0CBZ.jpg"}
                      // src={appointment.Customer.Avatar}
                      cover={true}
                      // style={{padding: 0}}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Grid
                      container
                      direction="row"
                      alignItems="flex-start"
                      justify="flex-start"
                    >
                      <Grid item xs={5}>
                        <Typography variant="body1">ชื่อ:</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body1">
                          {appointment.Customer.FirstName}{" "}
                          {appointment.Customer.LastName}
                        </Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <Typography variant="body1">เพศ:</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body1">
                          {appointment.Customer.Gender === "male"
                            ? "ชาย"
                            : appointment.Customer.Gender === "female"
                            ? "หญิง"
                            : "อื่น ๆ"}
                        </Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <Typography variant="body1">อายุ:</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body1">
                          {moment().diff(
                            appointment.Customer.DOB,
                            "years",
                            false
                          )}{" "}
                          ปี
                        </Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <Typography variant="body1">โรคประจำตัว:</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body1">
                          {appointment.Customer.CongenitalDisorders !==
                            undefined &&
                          appointment.Customer.CongenitalDisorders !== "" &&
                          appointment.Customer.CongenitalDisorders !==
                            "nope" ? (
                            <>{appointment.Customer.CongenitalDisorders} wtf</>
                          ) : (
                            "ไม่มี"
                          )}
                        </Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <Typography variant="body1">เบอร์โทร:</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="body1">
                          {appointment.Customer.PhoneNumber}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default AppointmentCard;
