import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import { AccessTime } from "@material-ui/icons";
import { makeStyles, createStyles } from "@material-ui/styles";
import moment from "moment";
import { Theme } from "pretty-format";
import { useEffect, useState } from "react";
import Appointment from "../../models/Appointment";
import Record from "../../models/Record";
import Alert from "../Alert/Alert";
import { useMutation, useQuery } from "@apollo/client";
import useGuideApi from "../../hooks/guidehooks";
import { Autocomplete } from "@material-ui/lab";
import Title from "../../models/Title";
import Submit from "../Submit/Submit";

interface AddRecordProps {
  appointment: Appointment;
  add: boolean;
  setAdd: any;
  setAlert: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100vw",
    },
  })
);

function AddRecord({ appointment, add, setAdd, setAlert }: AddRecordProps) {
  const classes = useStyles();

  const { GET_ALL_RECORDTITLE } = useGuideApi();
  const { loading, error, data } = useQuery(GET_ALL_RECORDTITLE, {});

  const [title, setTitle] = useState<string | undefined>();
  const [des, setDes] = useState<string | undefined>();
  const [time, setTime] = useState<Date>(new Date());
  const [confirm, setConfirm] = useState<boolean>(false);
  const [alertData, setAlertData] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<Title[]>(
    data !== undefined ? data.getAllRecordTitles : []
  );

  useEffect(() => {
    if (!loading && data) {
      setKeyword(data.getAllRecordTitles);
    }
    if (error) console.log(error?.graphQLErrors);
  }, [loading, data, error]);

  const { UPDATE_APPOINTMENT_RECORD } = useGuideApi();
  const [addRecord] = useMutation(UPDATE_APPOINTMENT_RECORD, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const submit = () => {
    if (title !== undefined) {
      let newRecord: Record = {
        At: time.toISOString(),
        Title: title,
        Description: des,
      };

      addRecord({
        variables: {
          updateAppointmentRecordId: appointment._id,
          updateAppointmentRecordRecordinput: { ...newRecord },
        },
      });
      setAlert(true);
      setAdd(false);
    } else {
      setAlertData(true);
    }
  };

  useEffect(() => {
    setTime(new Date());
    setTitle(undefined);
    setDes(undefined);
  }, [add]);

  return (
    <Dialog
      //   onClose={closeSubmit}
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
      open={add}
      className={classes.root}
      fullWidth={true}
    >
      <DialogTitle id="alert-dialog-title">เพิ่มบันทึก</DialogTitle>
      <DialogContent>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={2}>
            <AccessTime />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h4">
              {moment(time).format("HH.mm น.")}
            </Typography>
          </Grid>
        </Grid>
        <Autocomplete
          freeSolo
          options={keyword.map((option) => option.Title)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="กิจกรรม"
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
          onChange={(e, val) => {
            if(val !== null){
              setTitle(val);
            }
          }}
        />
        <TextField
          type="text"
          label="บันทึก (ถ้ามี)"
          fullWidth={true}
          value={des}
          onChange={(e) => setDes(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <DialogActions>
          <Button onClick={() => setAdd(false)} color="primary">
            ยกเลิก
          </Button>
          <Button onClick={submit} color="primary">
            เพิ่ม
          </Button>
        </DialogActions>
      </DialogActions>
      <Submit
          submit={confirm}
          title="บันทึกข้อมูล"
          text="ยืนยันการบันทึกข้อมูลหรือไม่?"
          denyText="ยกเลิก"
          submitText="ยืนยัน"
          denyAction={() => setConfirm(false)}
          submitAction={addRecord}
        />
      <Alert
        closeAlert={() => setAlertData(false)}
        alert={alertData}
        title="ข้อมูลไม่ครบ"
        text="โปรดใส่กิจกรรม"
        buttonText="ตกลง"
      />
    </Dialog>
  );
}

export default AddRecord;
