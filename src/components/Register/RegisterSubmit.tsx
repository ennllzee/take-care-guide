import {
  Button,
  CardMedia,
  createStyles,
  Fab,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import {
  Person,
  Wc,
  Cake,
  Healing,
  Email,
  Phone,
  PhoneAndroid,
  Home,
  Book,
  School,
  Language,
  Work,
} from "@material-ui/icons";
import moment from "moment";
import { useState } from "react";
import GuideForm from "../../models/GuideForm";
import Submit from "../Submit/Submit";

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
      minWidth: "80vw",
      maxWidth: "100vw",
    },
    form: {
      paddingTop: "5%",
    },
    margin: {
      margin: theme.spacing(1),
    },
    box: {
      padding: "5%",
      marginBottom: "5%",
    },
    end: {
      minHeight: "5vh",
    },
    img: {
      height: "20vh",
      weight: "80%",
      border: "2px solid #000",
    },
    card: {
      padding: "2%",
    },
    button: {
      padding: "5%",
    },
  })
);

interface RegisterSubmitProps {
  user: GuideForm;
  setUser: any;
  setStep: any;
  setSubmit: any;
}

function RegisterSubmit({
  user,
  setUser,
  setStep,
  setSubmit,
}: RegisterSubmitProps) {
  const classes = useStyles();

  const back = (step: number) => {
    setStep(step);
  };

  return (
    <Grid>
      <form className={classes.form}>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justify="space-between"
        >
          <Grid item xs={8}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justify="flex-start"
            >
              <Grid item>
                <Fab
                  variant="extended"
                  style={{ background: "#6DB8A5", color: "white" }}
                  disabled={true}
                >
                  5
                </Fab>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h4">Submit</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  ยืนยันการลงทะเบียน
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* <Typography variant="h4">ยืนยันการลงทะเบียน</Typography> */}
        <div className={classes.margin}>
          <Grid
            container
            spacing={1}
            justify="center"
            alignItems="center"
            className={classes.card}
          >
            <Grid item xs={4}>
              <CardMedia image={user.Avatar} className={classes.img} />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Person />
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="input-with-icon-grid"
                label="ชื่อ"
                fullWidth={true}
                value={user.FirstName}
                type="text"
                disabled={true}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="input-with-icon-grid"
                label="นามสกุล"
                fullWidth={true}
                value={user.LastName}
                type="text"
                disabled={true}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Wc />
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth={true}>
                <InputLabel id="gender-label" shrink={true}>
                  เพศ
                </InputLabel>
                <Select
                  labelId="gender-label"
                  value={user.Gender}
                  fullWidth={true}
                  disabled={true}
                >
                  <MenuItem value={undefined} disabled>
                    เพศ
                  </MenuItem>
                  <MenuItem value="male">ชาย</MenuItem>
                  <MenuItem value="female">หญิง</MenuItem>
                  <MenuItem value="others">อื่น ๆ</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Cake />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="date"
                label="วันเกิด"
                type="date"
                defaultValue={moment(user.DOB).format("YYYY-MM-DD")}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth={true}
                disabled={true}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Home />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="ที่อยู่"
                fullWidth={true}
                value={user.Address}
                type="text"
                disabled={true}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Book />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="วุฒิการศึกษา"
                fullWidth={true}
                value={user.Education?.Degree}
                type="text"
                disabled={true}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <School />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="สถาบันการศึกษา"
                fullWidth={true}
                value={user.Education?.Acadamy}
                type="text"
                disabled={true}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={1} justify="center" alignItems="center">
            <Grid item>
              <Language />
            </Grid>
            <Grid item xs={10}>
              <FormLabel component="legend">ทักษะทางด้านภาษา</FormLabel>
            </Grid>
          </Grid>
          <Grid container spacing={1} justify="center" alignItems="center">
            {user.LangSkill?.map((m) => {
              return (
                <>
                  <Grid item xs={5}>
                    <TextField
                      id="input-with-icon-grid"
                      label="ชื่อภาษา"
                      fullWidth={true}
                      value={m.Language}
                      disabled={true}
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      id="input-with-icon-grid"
                      label="ระดับความชำนาญ"
                      fullWidth={true}
                      value={"ระดับ " + m.Level}
                      disabled={true}
                      type="text"
                    />
                  </Grid>
                </>
              );
            })}
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={1} justify="center" alignItems="center">
            <Grid item>
              <Work />
            </Grid>
            <Grid item xs={10}>
              <FormLabel component="legend">ประสบการณ์การทำงาน</FormLabel>
            </Grid>
          </Grid>
          <Grid container spacing={1} justify="center" alignItems="center">
            {user.WorkExp?.length !== 0 ? (user.WorkExp?.map((m) => {
              return (
                <>
                  <Grid item xs={5}>
                    <TextField
                      id="input-with-icon-grid"
                      label="ตำแหน่งงาน"
                      fullWidth={true}
                      value={m.JobTitle}
                      disabled={true}
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      id="input-with-icon-grid"
                      label="สถานที่ทำงาน"
                      fullWidth={true}
                      value={m.WorkPlace}
                      disabled={true}
                      type="text"
                    />
                  </Grid>
                </>
              );
            })) : (
              <Typography variant="body2">
                ไม่มีประสบการณ์การทำงาน
              </Typography>
            )}
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Home />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="ที่อยู่ที่ติดต่อได้"
                fullWidth={true}
                value={user.ContactAddress}
                type="text"
                disabled={true}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <PhoneAndroid />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="เบอร์โทรศัพท์มือถือ"
                fullWidth={true}
                value={user.PhoneNumber}
                type="text"
                disabled={true}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Email />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="อีเมล์"
                fullWidth={true}
                value={user.Email}
                type="text"
                disabled={true}
              />
            </Grid>
          </Grid>
        </div>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.button}
        >
          <Grid item xs={4} md={3} lg={2}>
            <Button
              fullWidth={true}
              type="button"
              onClick={() => back(4)}
              // color="primary"
              variant="contained"
            >
              ก่อนหน้า
            </Button>
          </Grid>
          <Grid item xs={4} md={3} lg={2}>
            <Button
              fullWidth={true}
              type="button"
              onClick={() => setSubmit(true)}
              // color="primary"
              variant="contained"
            >
              ยืนยัน
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default RegisterSubmit;
