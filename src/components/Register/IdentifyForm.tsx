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
  Home,
  Book,
  School,
  Language,
  AttachFile,
  CheckCircle,
} from "@material-ui/icons";
import moment from "moment";
import { useState } from "react";
import GuideForm from "../../models/GuideForm";
import LanguageSkill from "../../models/LanguageSkill";
import Alert from "../Alert/Alert";

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
    title: {
      color: "#6DB8A5",
    },
  })
);

interface IdentifyFormProps {
  user: GuideForm;
  setUser: any;
  setStep: any;
}

function IdentifyForm({ user, setUser, setStep }: IdentifyFormProps) {
  const classes = useStyles();
  const [idCard, setIdCard] = useState<string | undefined>(user.IdCard);
  const [idCardPic, setIdCardPic] = useState<any | undefined>(
    user.FaceWithIdCard
  );

  const uploadFile = async (e: any) => {
    const file = e.target.files[0];
    // const base64 = await convertBase64(file);
    setIdCardPic(file);
  };

  const next = () => {
    if (idCard !== undefined) {
      setUser({
        ...user,
        IdCard: idCard,
        FaceWithIdCard: idCardPic,
      });
      setStep(3);
    }
  };

  const back = () => {
    setUser({
      ...user,
      IdCard: idCard,
      FaceWithIdCard: idCardPic,
    });
    setStep(1);
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
          <Grid item xs={12}>
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
                  2
                </Fab>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h4">Identify</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  บัตรประจำตัวประชาชน
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <School />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="input-with-icon-grid"
                label="เลขประจำตัวประชาชน"
                fullWidth={true}
                value={idCard}
                onChange={(e) => setIdCard(e.target.value)}
                type="text"
                required
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item>
              <AttachFile />
            </Grid>
            <Grid item xs={10}>
              <FormLabel component="legend">
                แนบรูปคู่บัตรประจำตัวประชาชน
              </FormLabel>
            </Grid>
            {idCardPic !== undefined && (
              <Grid item xs={10}>
                <Grid
                  container
                  spacing={1}
                  alignItems="flex-end"
                  justify="flex-start"
                >
                  <CheckCircle />
                  <Typography align="left">อัปโหลดสำเร็จ</Typography>
                </Grid>
              </Grid>
            )}
            <Grid item xs={10}>
              <Typography align="center">
                <input
                  type="file"
                  accept="image/*"
                  id="contained-button-file"
                  //   key={imgName}
                  onChange={(e: any) => {
                    // setImgName(e.currentTarget.files[0].name);
                    uploadFile(e);
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
              onClick={back}
              // color="primary"
              variant="contained"
            >
              ก่อนหน้า
            </Button>
          </Grid>
          <Grid item xs={4} md={3} lg={2}>
            <Button
              fullWidth={true}
              type="submit"
              onClick={next}
              // color="primary"
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

export default IdentifyForm;
