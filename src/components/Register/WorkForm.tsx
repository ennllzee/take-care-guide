import {
  Button,
  CardMedia,
  createStyles,
  Fab,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
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
  Work,
  AssignmentInd,
} from "@material-ui/icons";
import moment from "moment";
import { useState } from "react";
import GuideForm from "../../models/GuideForm";
import WorkExp from "../../models/WorkExp";
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
  })
);

interface WorkFormProps {
  user: GuideForm;
  setUser: any;
  setStep: any;
  setNext: any;
  setBack: any
}

function WorkForm({ user, setUser, setStep, setNext, setBack }: WorkFormProps) {
  const classes = useStyles();
  const [workExp, setWorkExp] = useState<WorkExp[]>(
    user.WorkExp !== undefined ? user.WorkExp : []
  );
  const [newTitle, setNewTitle] = useState<string>();
  const [newWorkPlace, setNewWorkPlace] = useState<string>();

  const next = () => {
    setUser({
      ...user,
      WorkExp: hasExp ? workExp : [],
    });
    setStep(4);
  };

  const back = () => {
    setUser({
      ...user,
      WorkExp: hasExp ? workExp : [],
    });
    setStep(2);
  };

  setNext(next)
  setBack(back)

  const [duplicate, setDuplicate] = useState<boolean>(false);
  const [hasExp, setHasExp] = useState<boolean>(user.WorkExp?.length !== 0);

  const addWork = () => {
    if (newTitle !== undefined && newWorkPlace !== undefined) {
      let newExp: WorkExp = {
        JobTitle: newTitle,
        WorkPlace: newWorkPlace,
      };
      if (workExp?.find((e) => e === newExp)) {
        setDuplicate(true);
      } else {
        setWorkExp((w) => [...w, newExp]);
        setNewTitle(undefined);
        setNewWorkPlace(undefined);
      }
    }
  };

  const deleteWork = (w: WorkExp) => {
    setWorkExp(workExp.filter((e) => e !== w));
  };

  const handleChangeExp = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasExp((event.target as HTMLInputElement).value === "true" ? true : false);
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
          <Grid item xs={1}>
            <Typography align="center">1</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography align="center">2</Typography>
          </Grid>
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
                  3
                </Fab>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h4">Work</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  ประวัติการทำงาน
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Typography align="center" color="textSecondary">
              4
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography align="center" color="textSecondary">
              5
            </Typography>
          </Grid>
        </Grid>
        {/* <Typography variant="h4">ข้อมูลส่วนตัว</Typography> */}

        <div className={classes.margin}>
          <Grid container spacing={1} justify="center" alignItems="center">
            <Grid item>
              {/* <Typography variant="h6"> */}
              <AssignmentInd />
              {/* </Typography> */}
            </Grid>
            <Grid item xs={10}>
              <FormLabel component="legend">
                คุณมีประสบการณ์การทำงานหรือไม่?
              </FormLabel>
            </Grid>
          </Grid>
          <FormControl component="fieldset" fullWidth={true}>
            <RadioGroup
              name="exp"
              value={hasExp}
              onChange={handleChangeExp}
            >
              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="flex-end"
              >
                <Grid item xs={5} md={4} lg={4}>
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label={
                      <>
                        <Typography variant="body2">ไม่มี</Typography>
                      </>
                    }
                  />
                </Grid>
                <Grid item xs={5} md={4} lg={4}>
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label={
                      <>
                        <Typography variant="body2">มี</Typography>
                      </>
                    }
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </div>
        {hasExp && (
          <>
            <div className={classes.margin}>
              <Grid container spacing={1} justify="center" alignItems="center">
                <Grid item>
                  {/* <Typography variant="h6"> */}
                  <Work />
                  {/* </Typography> */}
                </Grid>
                <Grid item xs={10}>
                  <FormLabel component="legend">ประสบการณ์การทำงาน</FormLabel>
                </Grid>
              </Grid>
              <Grid container spacing={1} justify="center" alignItems="center">
                {workExp.map((m) => {
                  return (
                    <>
                      <Grid item xs={4}>
                        <TextField
                          id="input-with-icon-grid"
                          label="ตำแหน่งงาน"
                          fullWidth={true}
                          value={m.JobTitle}
                          disabled={true}
                          type="text"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="input-with-icon-grid"
                          label="สถานที่ทำงาน"
                          fullWidth={true}
                          value={m.WorkPlace}
                          disabled={true}
                          type="text"
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Button type="button" onClick={() => deleteWork(m)}>
                          ลบ
                        </Button>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
              <Grid
                container
                spacing={2}
                justify="center"
                alignItems="flex-end"
              >
                <Grid item xs={5} md={4} lg={4}>
                  <TextField
                    id="input-with-icon-grid"
                    label="ตำแหน่งงาน"
                    fullWidth={true}
                    value={newTitle === undefined ? undefined : newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    type="text"
                  />
                </Grid>
                <Grid item xs={5} md={4} lg={4}>
                    <TextField
                      id="input-with-icon-grid"
                      label="สถานที่ทำงาน"
                      fullWidth={true}
                      value={newWorkPlace === undefined ? undefined : newWorkPlace}
                      onChange={(e) => setNewWorkPlace(e.target.value)}
                      type="text"
                    />
                </Grid>
                <Grid item xs={11} md={2} lg={1}>
                  <Typography align="center">
                    <Button type="button" fullWidth={true} onClick={addWork}>
                      เพิ่ม
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </>
        )}
        <Alert
          closeAlert={() => setDuplicate(false)}
          alert={duplicate}
          title="งานซ้ำ"
          text="มีงานนี้อยู่ในรายการแล้ว"
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

export default WorkForm;
