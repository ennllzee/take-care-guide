import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, Grid } from "@material-ui/core";
import moment from "moment";
import Appointment from "../../models/Appointment";
import Image from "material-ui-image";

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
    below: {
      paddingTop: 0,
    },
  })
);

interface RequestCardProps {
  appointment: Appointment;
}

function RequestCard({ appointment }: RequestCardProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log(appointment.Customer.CongenitalDisorders !== undefined)

  return (
    <Card>
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
        </Grid>
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
        <CardContent className={classes.below}>
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            justify="center"
          >
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
                        {appointment.Customer.Gender === "male" ? "ชาย" : appointment.Customer.Gender === "female" ? "หญิง" : "อื่น ๆ"}
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
                      <Typography variant="body1">
                        โรคประจำตัว:
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body1">
                        {appointment.Customer.CongenitalDisorders !== undefined && appointment.Customer.CongenitalDisorders !== "" && appointment.Customer.CongenitalDisorders !== "nope" ? 
                          <>{appointment.Customer.CongenitalDisorders} wtf</>
                        :
                          "ไม่มี"
                        }
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <br/>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              alignItems="flex-end"
              justify="space-between"
            >
              <Grid item xs={4}>
                <Button fullWidth={true} type="submit" variant="contained">
                  ปฏิเสธ
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button fullWidth={true} type="submit" variant="contained">
                  ตอบรับ
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xs={5}>
              <Typography variant="body1" align="left">
                เวลาเริ่ม:
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="body1" align="left">
                {moment(appointment.BeginTime).format("HH.mm น.")}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body1" align="left">
                เวลาสิ้นสุด:
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="body1" align="left">
                {moment(appointment.EndTime).format("HH.mm น.")}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body1" align="left">
                ระดับความพึงพอใจ:
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="body1" align="left">
                {appointment.Review?.Star !== null ? (
                  <>{appointment.Review?.Star}</>
                ) : (
                  "ยังไม่ได้รับการประเมิน"
                )}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body1" align="left">
                ความคิดเห็น:
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="body1" align="left">
                {appointment.Review?.Comment !== null ? (
                  <>{appointment.Review?.Comment}</>
                ) : (
                  "-"
                )}
              </Typography>
            </Grid> */}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default RequestCard;
