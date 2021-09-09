import {
  Button,
  CardMedia,
  createStyles,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { Person, Wc, Cake, Healing, Home } from "@material-ui/icons";
import moment from "moment";
import { useState } from "react";
import GuideForm from "../../models/GuideForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      paddingTop: "2%",
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

interface ProfileFormProps {
  user: GuideForm;
  setUser: any;
  setStep: any;
}

function ProfileForm({ user, setUser, setStep }: ProfileFormProps) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState<string | undefined>(
    user.FirstName
  );
  const [lastName, setLastName] = useState<string | undefined>(user.LastName);
  const [dob, setDOB] = useState<string | undefined>(user.DOB);
  const [address, setAddress] = useState<string | undefined>(user.Address);

  const [gender, setGender] = useState<string | undefined>(user.Gender);
  //   const [imgName, setImgName] = useState<any | undefined>(user.FirstName);
  const [baseImage, setBaseImage] = useState<any | undefined>(user.Avatar);

  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const next = () => {
    if (
      firstName !== undefined &&
      lastName !== undefined &&
      gender !== undefined &&
      dob !== undefined &&
      address !== undefined
    ) {
      setUser({
        ...user,
        FirstName: firstName,
        LastName: lastName,
        Gender: gender,
        DOB: dob,
        Address: address,
        Avatar: baseImage,
      });
      setStep(2);
    }
  };

  return (
    <Grid>
      <form className={classes.form}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <Grid item xs={8}>
            <Grid container spacing={2} alignItems="center" justify="flex-start">            
                <Grid item>
                  <Fab
                    variant="extended"
                    style={{ background: "#6DB8A5", color: "white" }}
                    disabled={true}
                  >
                    1
                  </Fab>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h4">Profile</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    ข้อมูลส่วนตัว
                  </Typography>
                </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Typography align="center" color="textSecondary">
              {/* <Fab
                variant="extended"
                style={{ background: "#7DC4B2" }}
                disabled={true}
              >
                2
              </Fab> */}
              2
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography align="center" color="textSecondary">
              {/* <Fab
                variant="extended"
                style={{ background: "#7DC4B2" }}
                disabled={true}
              >
                3
              </Fab> */}
              3
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography align="center" color="textSecondary">
              {/* <Fab
                variant="extended"
                style={{ background: "#7DC4B2" }}
                disabled={true}
              >
                4
              </Fab> */}
              4
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography align="center" color="textSecondary">
              {/* <Fab
                variant="extended"
                style={{ background: "#7DC4B2" }}
                disabled={true}
              >
                5
              </Fab> */}
              5
            </Typography>
          </Grid>
        </Grid>
        {/* <Typography variant="h4">ข้อมูลส่วนตัว</Typography> */}
        <div className={classes.margin}>
          <Grid
            container
            spacing={1}
            justify="center"
            alignItems="center"
            className={classes.card}
          >
            <Grid item xs={4}>
              <CardMedia image={baseImage} className={classes.img} />
            </Grid>
            <Grid item xs={6}>
              <Typography align="center">
                <input
                  type="file"
                  accept="image/*"
                  id="contained-button-file"
                  //   key={imgName}
                  onChange={(e: any) => {
                    // setImgName(e.currentTarget.files[0].name);
                    uploadImage(e);
                  }}
                  hidden
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    อัปโหลด
                  </Button>
                </label>
              </Typography>
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
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
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Wc />
            </Grid>
            <Grid item xs={10}>
              <FormControl required fullWidth={true}>
                <InputLabel id="gender-label" shrink={gender !== undefined}>
                  เพศ
                </InputLabel>
                <Select
                  labelId="gender-label"
                  value={gender}
                  onChange={(e) => setGender(e.target.value as string)}
                  fullWidth={true}
                  required
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
                defaultValue={
                  dob === undefined
                    ? undefined
                    : moment(dob).format("YYYY-MM-DD")
                }
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth={true}
                onChange={(e) => setDOB(new Date(e.target.value).toISOString())}
                required
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                required
              />
            </Grid>
          </Grid>
        </div>

        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          className={classes.button}
        >
          <Grid item xs={4} md={3} lg={2}>
            <Button
              fullWidth={true}
              type="submit"
              // color="primary"
              onClick={next}
              variant="contained"
            >
              ถัดไป
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default ProfileForm;
