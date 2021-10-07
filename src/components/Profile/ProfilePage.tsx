import {
  makeStyles,
  Theme,
  createStyles,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  TextFieldProps,
  Typography,
  Divider,
} from "@material-ui/core";
import {
  Person,
  Wc,
  Cake,
  PhoneAndroid,
  Email,
  Edit,
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import { history } from "../../helper/history";
import BottomBar from "../BottomBar/BottomBar";
import TopBar from "../TopBar/TopBar";
import ProfileCard from "./ProfileCard";
import { useQuery } from "@apollo/client";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import convertToThaiDate from "../../hooks/convertToThaiDate";
import Alert from "../Alert/Alert";
import Submit from "../Submit/Submit";
import moment from "moment";
import Guide from "../../models/Guide";
import useGuideApi from "../../hooks/guidehooks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
      paddingRight: "5%",
      paddingLeft: "5%",
      minWidth: "80vw",
      maxWidth: "100vw",
    },
    form: {
      paddingTop: "5%",
      paddingBottom: "3%",
    },
    margin: {
      margin: theme.spacing(1),
    },
  })
);

function ProfilePage() {
  const classes = useStyles();
  const accessToken = localStorage.getItem("accessToken");
  const id = localStorage.getItem("_id");

  const { GET_SINGLE_GUIDE } = useGuideApi();

  const { loading, error, data } = useQuery(GET_SINGLE_GUIDE, {
    variables: { getGuideId: id },
  });

  const [user, setUser] = useState<Guide | undefined>(
    data !== undefined ? data.getGuide : undefined
  );

  const renderInput = (props: TextFieldProps): any => (
    <TextField
      onClick={edit ? props.onClick : undefined}
      label="วันเกิด"
      fullWidth={true}
      value={dob !== undefined ? convertToThaiDate(new Date(dob)) : null}
      onChange={props.onChange}
      required
      type="text"
      InputProps={{
        readOnly: true,
      }}
    />
  );

  useEffect(() => {
    if (!loading && data) {
      setUser(data.getGuide);
      setFirstName(data.getGuide?.FirstName);
      setLastName(data.getGuide?.LastName);
      setDOB(data.getGuide?.DOB);
      setPhoneNum(data.getGuide?.PhoneNumber);
      setEmail(data.getGuide?.Email);
      setGender(data.getGuide?.Gender);
      setAvatar(
        data.getGuide.Avatar !== null
          ? `data:${data.getGuide?.Avatar?.mimetype};base64,${data.getGuide?.Avatar?.data}`
          : undefined
      );
    }
    if (error) console.log(error?.graphQLErrors);
  }, [loading, data, error]);

  const [firstName, setFirstName] = useState<string | undefined>(
    user?.FirstName
  );
  const [lastName, setLastName] = useState<string | undefined>(user?.LastName);
  const [dob, setDOB] = useState<string | undefined>(user?.DOB);
  const [phoneNum, setPhoneNum] = useState<string | undefined>(
    user?.PhoneNumber
  );
  const [email, setEmail] = useState<string | undefined>(user?.Email);
  const [gender, setGender] = useState<string | undefined>(user?.Gender);
  const [avatar, setAvatar] = useState<any | undefined>(
    user?.Avatar !== null
      ? `data:${user?.Avatar?.mimetype};base64,${user?.Avatar?.data}`
      : undefined
  );
  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    if (accessToken === null || id === null) {
      history.push("/");
    }
  }, [accessToken, id]);

  const [confirmEdit, setConfirmEdit] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const [alertData, setAlertData] = useState<boolean>(false);

  const editProfile = () => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      dob !== "" &&
      phoneNum !== "" &&
      gender !== "" &&
      email !== ""
    ) {
      //waiting update profile
      setAlert(true);
      setConfirmEdit(false);
      setEdit(false);
    } else {
      setAlertData(true);
      setConfirmEdit(false);
    }
  };

  return (
    <Grid>
      <TopBar page="ข้อมูลส่วนตัว" />

      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-between"
      >
        <Grid item className={classes.main}>
          {!loading ? (
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12} md={10} lg={8}>
                <ProfileCard
                  name={user?.FirstName + " " + user?.LastName}
                  gmail={user?.Gmail}
                  img={avatar}
                />
              </Grid>
              <Grid item xs={12} md={10} lg={8}>
                <form className={classes.form}>
                  <div className={classes.margin}>
                    <Grid
                      container
                      spacing={2}
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item xs={2}>
                        <Typography align="center">
                          <Person />
                        </Typography>
                      </Grid>

                      {edit ? (
                        <>
                          <Grid item xs={5}>
                            <TextField
                              id="input-with-icon-grid"
                              label="ชื่อ"
                              fullWidth={true}
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              required
                              disabled={!edit}
                              type="text"
                            />
                          </Grid>
                          <Grid item xs={5}>
                            <TextField
                              id="input-with-icon-grid"
                              label="นามสกุล"
                              fullWidth={true}
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              required
                              type="text"
                            />
                          </Grid>
                        </>
                      ) : (
                        <Grid item xs={10}>
                          <Typography variant="body1">
                            ชื่อ: {user?.FirstName} {user?.LastName}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid
                      container
                      spacing={2}
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item xs={2}>
                        <Typography align="center">
                          <Wc />
                        </Typography>
                      </Grid>
                      <Grid item xs={10}>
                        {edit ? (
                          <FormControl required fullWidth={true}>
                            <InputLabel id="gender-label" shrink={true}>
                              เพศ
                            </InputLabel>
                            <Select
                              labelId="gender-label"
                              value={user !== undefined ? gender : "gender"}
                              onChange={(e) => {
                                setGender(e.target.value as string);
                              }}
                              fullWidth={true}
                              required
                            >
                              <MenuItem value={undefined} disabled>
                                เพศ
                              </MenuItem>
                              <MenuItem value="male">ชาย</MenuItem>
                              <MenuItem value="female">หญิง</MenuItem>
                              <MenuItem value="other">อื่น ๆ</MenuItem>
                            </Select>
                          </FormControl>
                        ) : (
                          <Typography variant="body1">
                            เพศ:{" "}
                            {user?.Gender === "male"
                              ? "ชาย"
                              : user?.Gender === "female"
                              ? "หญิง"
                              : "อื่น ๆ"}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid
                      container
                      spacing={2}
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item xs={2}>
                        <Typography align="center">
                          <Cake />
                        </Typography>
                      </Grid>
                      <Grid item xs={10}>
                        {edit ? (
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                              label="วันเกิด"
                              value={dob !== undefined ? new Date(dob) : null}
                              onChange={(e) => setDOB(moment(e).format())}
                              openTo="year"
                              views={["year", "month", "date"]}
                              disableFuture
                              fullWidth={true}
                              TextFieldComponent={renderInput}
                            />
                          </MuiPickersUtilsProvider>
                        ) : (
                          <Typography variant="body1">
                            วันเกิด: {convertToThaiDate(new Date(user?.DOB))}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid
                      container
                      spacing={2}
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item xs={2}>
                        <Typography align="center">
                          <PhoneAndroid />
                        </Typography>
                      </Grid>
                      <Grid item xs={10}>
                        {edit ? (
                          <TextField
                            id="input-with-icon-grid"
                            label="เบอร์โทรศัพท์"
                            fullWidth={true}
                            value={phoneNum}
                            onChange={(e) => setPhoneNum(e.target.value)}
                            required
                            type="text"
                          />
                        ) : (
                          <Typography variant="body1">
                            เบอร์โทร: {user?.PhoneNumber}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid
                      container
                      spacing={2}
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item xs={2}>
                        <Typography align="center">
                          <Email />
                        </Typography>
                      </Grid>
                      <Grid item xs={10}>
                        {edit ? (
                          <TextField
                            id="input-with-icon-grid"
                            label="อีเมล์"
                            fullWidth={true}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            required
                          />
                        ) : (
                          <Typography variant="body1">
                            อีเมล์: {user?.Email}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                </form>
                {/* <div className={classes.margin}> */}
                <Divider variant="middle" />
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  style={{ padding: "3%" }}
                >
                  <Grid item xs={3}>
                    {edit && (
                      <Button
                        onClick={() => setEdit(false)}
                        type="button"
                        fullWidth={true}
                        style={{
                          backgroundColor: "#D86060",
                          color: "white",
                          padding: "7%",
                        }}
                      >
                        <Grid
                          container
                          direction="row"
                          spacing={1}
                          justify="center"
                          alignItems="center"
                        >
                          {/* <ExitToApp /> */}
                          <Typography variant="body1">ยกเลิก</Typography>
                        </Grid>
                      </Button>
                    )}
                  </Grid>
                  <Grid item xs={3}>
                    {edit ? (
                      <Button
                        onClick={() => setConfirmEdit(true)}
                        type="button"
                        fullWidth={true}
                        style={{
                          padding: "7%",
                          backgroundColor: "#4CB85C",
                          color: "white",
                        }}
                      >
                        <Grid
                          container
                          direction="row"
                          spacing={1}
                          justify="center"
                          alignItems="center"
                        >
                          {/* <ExitToApp /> */}
                          <Typography variant="body1">ยืนยัน</Typography>
                        </Grid>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setEdit(true)}
                        type="button"
                        fullWidth={true}
                        style={{
                          padding: "7%",
                          backgroundColor: "#508F7F",
                          color: "white",
                        }}
                      >
                        <Grid
                          container
                          direction="row"
                          spacing={1}
                          justify="center"
                          alignItems="center"
                        >
                          <Edit />
                          <Typography variant="body1">แก้ไขข้อมูล</Typography>
                        </Grid>
                      </Button>
                    )}
                  </Grid>
                </Grid>
                {/* </div> */}
                <Alert
                  closeAlert={() => setAlert(false)}
                  alert={alert}
                  title="สำเร็จ"
                  text="แก้ไขข้อมูลสำเร็จ"
                  buttonText="ปิด"
                />
                <Alert
                  closeAlert={() => setAlertData(false)}
                  alert={alertData}
                  title="ข้อมูลไม่ครบ"
                  text="กรุณากรอกข้อมูลให้ครบ"
                  buttonText="ปิด"
                />
                <Submit
                  submit={confirmEdit}
                  title="แก้ไขข้อมูล"
                  text="ยืนยันการแก้ไขข้อมูลใช่หรือไม่?"
                  denyText="ยกเลิก"
                  submitText="ยืนยัน"
                  denyAction={() => setConfirmEdit(false)}
                  submitAction={editProfile}
                />
              </Grid>
            </Grid>
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
      <BottomBar page="Profile" />
    </Grid>
  );
}

export default ProfilePage;
