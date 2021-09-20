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

interface EducationFormProps {
  user: GuideForm;
  setUser: any;
  setStep: any;
}

function EducationForm({ user, setUser, setStep }: EducationFormProps) {
  const classes = useStyles();
  const [degree, setDegree] = useState<string | undefined>(
    user.Education?.Degree
  );
  const [acadamy, setAcadamy] = useState<string | undefined>(
    user.Education?.Acadamy
  );
  const [certificate, setCertificate] = useState<any | undefined>(
    user.Education?.Certificate
  );
  const [languageSkill, setLanguageSkill] = useState<LanguageSkill[]>(
    user.LangSkill !== undefined ? user.LangSkill : []
  );
  const [newLang, setNewLang] = useState<string | undefined>(undefined);
  const [newLevel, setNewLevel] = useState<number>();
  const [langAlert, setLangAlert] = useState<boolean>(false);
  const addLang = () => {
    if (newLang !== undefined && newLevel !== undefined) {
      let newSkill: LanguageSkill = {
        Language: newLang,
        Level: newLevel,
      };
      if (languageSkill.find((l) => l.Language === newSkill.Language)) {
        setLangAlert(true);
      } else {
        setLanguageSkill((l) => [...l, newSkill]);
        setNewLang(undefined);
        setNewLevel(undefined);
      }
    }
  };

  const deleteLang = (m: LanguageSkill) => {
    setLanguageSkill(languageSkill.filter((l) => l !== m));
  };

  const uploadFile = async (e: any) => {
    const file = e.target.files[0];
    // const base64 = await convertBase64(file);
    setCertificate(file);
  };

  const next = () => {
    if (degree !== undefined && acadamy !== undefined) {
      setUser({
        ...user,
        Education: {
          Degree: degree,
          Acadamy: acadamy,
          Certificate: certificate,
        },
        LangSkill: languageSkill,
      });
      setStep(4);
    }
  };

  const back = () => {
    setUser({
      ...user,
      Education: {
        Degree: degree,
        Acadamy: acadamy,
        Certificate: certificate,
      },
      LangSkill: languageSkill,
    });
    setStep(2);
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
                  3
                </Fab>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h4">Education</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  การศึกษาและทักษะ
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <div className={classes.margin}>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item>
              <Book />
            </Grid>
            <Grid item xs={10}>
              <FormControl required fullWidth={true}>
                <InputLabel id="degree-label" shrink={degree !== undefined}>
                  ระดับการศึกษา
                </InputLabel>
                <Select
                  labelId="degree-label"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value as string)}
                  fullWidth={true}
                  required
                >
                  <MenuItem value={undefined} disabled>
                    ระดับการศึกษา
                  </MenuItem>
                  <MenuItem value="ต่ำกว่ามัธยมศึกษาตอนต้น">
                    ต่ำกว่ามัธยมศึกษาตอนต้น
                  </MenuItem>
                  <MenuItem value="มัธยมศึกษาตอนต้น">มัธยมศึกษาตอนต้น</MenuItem>
                  <MenuItem value="มัธยมศึกษาตอนปลายหรือเทียบเท่า">
                    มัธยมศึกษาตอนปลายหรือเทียบเท่า
                  </MenuItem>
                  <MenuItem value="อุดมศึกษาหรือเทียบเท่า">
                    อุดมศึกษาหรือเทียบเท่า
                  </MenuItem>
                </Select>
              </FormControl>
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
                value={acadamy}
                onChange={(e) => setAcadamy(e.target.value)}
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
              <FormLabel component="legend">แนบหลักฐานทางการศึกษา</FormLabel>
            </Grid>
            {certificate !== undefined && (
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
        
        <div className={classes.margin}>
          <Grid container spacing={1} justify="center" alignItems="center">
            <Grid item>
              {/* <Typography variant="h6"> */}
              <Language />
              {/* </Typography> */}
            </Grid>
            <Grid item xs={10}>
              <FormLabel component="legend">ทักษะทางด้านภาษา</FormLabel>
            </Grid>
          </Grid>

          <Grid container spacing={1} justify="center" alignItems="center">
            {languageSkill.map((m) => {
              return (
                <>
                  <Grid item xs={4}>
                    <TextField
                      id="input-with-icon-grid"
                      label="ชื่อภาษา"
                      fullWidth={true}
                      value={m.Language}
                      disabled={true}
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="input-with-icon-grid"
                      label="ความชำนาญ"
                      fullWidth={true}
                      value={"ระดับ " + m.Level}
                      disabled={true}
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button type="button" onClick={() => deleteLang(m)}>
                      ลบ
                    </Button>
                  </Grid>
                </>
              );
            })}
          </Grid>
          <Grid container spacing={2} justify="center" alignItems="flex-end">
            <Grid item xs={5} md={4} lg={4}>
              <TextField
                id="input-with-icon-grid"
                label="ชื่อภาษา"
                fullWidth={true}
                value={newLang !== undefined ? newLang : null}
                onChange={(e) => setNewLang(e.target.value)}
                type="text"
              />
            </Grid>
            <Grid item xs={5} md={4} lg={4}>
              <FormControl required fullWidth={true}>
                <InputLabel id="level-label" shrink={newLevel !== undefined}>ความชำนาญ</InputLabel>
                <Select
                  labelId="level-label"
                  value={newLevel !== undefined ? newLevel : null}
                  onChange={(e) => setNewLevel(e.target.value as number)}
                  fullWidth={true}
                >
                  <MenuItem value={undefined} disabled>
                    ความชำนาญ
                  </MenuItem>
                  <MenuItem value={1}>ระดับ 1 สนทนาได้เล็กน้อย</MenuItem>
                  <MenuItem value={2}>ระดับ 2 สนทนาได้</MenuItem>
                  <MenuItem value={3}>ระดับ 3 สนทนาและอ่านเขียนได้</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={11} md={2} lg={1}>
              <Typography align="center">
                <Button type="button" fullWidth={true} onClick={addLang}>
                  เพิ่ม
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </div>

        <Alert
          closeAlert={() => setLangAlert(false)}
          alert={langAlert}
          title="ภาษาซ้ำ"
          text="มีภาษานี้อยู่ในรายการแล้ว"
          buttonText="รับทราบ"
        />

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

export default EducationForm;
