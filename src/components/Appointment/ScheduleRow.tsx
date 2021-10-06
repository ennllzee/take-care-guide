import {
  Checkbox,
  createStyles,
  TableCell,
  TableRow,
  Theme,
  Typography,
  withStyles,
} from "@material-ui/core";
import { useState } from "react";
import convertToThaiDate from "../../hooks/convertToThaiDate";
import GuideScheduleForm from "../../models/GuideScheduleForm";

interface ScheduleRowProps {
  key: number;
  morning?: GuideScheduleForm;
  morIndex?: number;
  morWork: boolean;
  afternoon?: GuideScheduleForm;
  aftIndex?: number;
  aftWork: boolean;
  check: any;
}

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    body: {
      fontSize: 10,
      padding: "2%",
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

function ScheduleRow({
  key,
  morning,
  morIndex,
  morWork,
  afternoon,
  aftIndex,
  aftWork,
  check,
}: ScheduleRowProps) {
  const [checkMor, setCheckMor] = useState<boolean>(
    morning !== undefined ? morning?.AvailableMorning : true
  );
  const [checkAft, setCheckAft] = useState<boolean>(
    afternoon !== undefined ? afternoon?.AvailableAfternoon : true
  );

  return (
    <StyledTableRow key={key}>
      <StyledTableCell align="center">
        {convertToThaiDate(new Date(morning?.ScheduleDate))}
      </StyledTableCell>
      <StyledTableCell align="center">
        {morWork ? (
          <>มีนัดหมาย</>
        ) : (
          <>
            <Checkbox
              checked={checkMor}
              onChange={() => {
                setCheckMor((s) => !s);
                check(morning, morIndex);
              }}
              color="primary"
              style={{ padding: 0 }}
            />
            <Typography variant="caption">{checkMor ? "ว่าง" : "ไม่ว่าง"}</Typography>
          </>
        )}
      </StyledTableCell>
      <StyledTableCell align="center">
        {aftWork ? (
          <>มีนัดหมาย</>
        ) : (
          <>
            <Checkbox
              checked={checkAft}
              onChange={() => {
                setCheckAft((s) => !s);
                check(afternoon, aftIndex);
              }}
              color="primary"
              style={{ padding: 0 }}
            />
            <Typography variant="caption">{checkAft ? "ว่าง" : "ไม่ว่าง"}</Typography>
          </>
        )}
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default ScheduleRow;
