import { makeStyles, Theme, createStyles, Modal, Paper, Typography, IconButton, Grid, Divider } from "@material-ui/core"
import { Close } from "@material-ui/icons"
import moment from "moment"

interface ManageScheduleProps{
    open: boolean
    setOpen: any
}

const useStyles = makeStyles((theme : Theme) => 
    createStyles({
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          paper: {
            backgroundColor: theme.palette.background.paper,
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            height: "80vh",
            width: "80vw",
            overflow: 'auto'
          },
          line: {
              padding: '5%'
          }
    })
)

function ManageSchedule({open, setOpen} : ManageScheduleProps) {

    const classes = useStyles()

    return (
        <Modal
            open={open}  
            className={classes.modal}
        >
            <Paper className={classes.paper}>
                <Typography align="right">
                    <IconButton onClick={() => setOpen(false)} style={{padding:'0'}}>
                        <Close/>
                    </IconButton>
                </Typography>
                <Grid container direction="row" justify="center" alignItems="flex-start">
                    <Grid item xs={12} md={12} lg={12}>
                        <Typography variant="h4" className={classes.line}>
                            ตารางเวลา
                            <Typography variant="subtitle2">
                                ({moment(new Date()).add(1, 'days').format('DD MMMM yyyy')} - {moment(new Date()).add(14, 'days').format('DD MMMM yyyy')})
                            </Typography> 
                        </Typography>
                             
                        <Divider variant="middle" />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} className={classes.line}>
                        
                    </Grid>
                    
                </Grid>
            </Paper>
        </Modal>
    )
}

export default ManageSchedule