import {
  Checkbox,
  createStyles,
  TableCell,
  TableRow,
  Theme,
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
    morning !== undefined ? morning?.Available : false
  );
  const [checkAft, setCheckAft] = useState<boolean>(
    afternoon !== undefined ? afternoon?.Available : false
  );

  return (
    <StyledTableRow key={key}>
      <StyledTableCell>
        {convertToThaiDate(new Date(morning?.ScheduleDate))}
      </StyledTableCell>
      <StyledTableCell align="center">
        {morWork ? (
          <>มีนัดหมาย</>
        ) : (
          <Checkbox
            checked={checkMor}
            onChange={() => {
              setCheckMor((s) => !s);
              check(morning, morIndex);
            }}
            color="primary"
          />
        )}
      </StyledTableCell>
      <StyledTableCell align="center">
        {aftWork ? (
          <>นัดหมาย</>
        ) : (
          <Checkbox
            checked={checkAft}
            onChange={() => {
              setCheckAft((s) => !s);
              check(afternoon, aftIndex);
            }}
            color="primary"
          />
        )}
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default ScheduleRow;
