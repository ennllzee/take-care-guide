import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Theme,
} from "@material-ui/core";

interface AlertProps {
  closeAlert: any;
  alert: boolean;
  title: string;
  text: string;
  buttonText: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100vw'
    }
  })
);

function Alert({ closeAlert, alert, title, text, buttonText }: AlertProps) {

  const classes = useStyles()
  return (
    <Dialog
    //   onClose={closeAlert}
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
      open={alert}
      className={classes.root}
      fullWidth={true}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={closeAlert} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Alert;
