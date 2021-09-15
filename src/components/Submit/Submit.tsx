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
  submit: boolean;
  title: string;
  text: string;
  denyText: string;
  submitText: string;
  denyAction: any;
  submitAction: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100vw'
    }
  })
);

function Submit({
  submit,
  title,
  text,
  denyText,
  submitText,
  denyAction,
  submitAction,
}: AlertProps) {

  const classes = useStyles()
  return (
    <Dialog
      //   onClose={closeSubmit}
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
      open={submit}
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
        <DialogActions>
          <Button onClick={denyAction} color="primary">
            {denyText}
          </Button>
          <Button onClick={submitAction} color="primary">
            {submitText}
          </Button>
        </DialogActions>
      </DialogActions>
    </Dialog>
  );
}

export default Submit;
