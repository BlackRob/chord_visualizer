import React from "react";
import { makeStyles, shorthands } from "@griffel/react";
import { useState } from "@hookstate/core";
import {
  highlightedChord,
  highlightedNote,
  chordFirst,
  chordThird,
  chordLowFreq,
} from "./globalState";
import { calculateColor } from "./functions";

const useClasses = makeStyles({
  StringNote: {
    ...shorthands.border("1px", "solid", "transparent"),
    fontSize: "20px",
    color: "white",
    marginTop: "1px",
    marginBottom: "1px",
    marginRight: "8px",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "2px",
    paddingRight: "2px",
    textAlign: "center",
    width: "80px",
    display: "inline-block",
  },
  FretDivText: {
    fontSize: "20px",
    marginTop: "0px",
    marginBottom: "0px",
    paddingTop: "4px",
    paddingBottom: "0px",
    paddingLeft: "0px",
    paddingRight: "0px",
    display: "inline-block",
  },
  Subscript: { fontSize: "60%" },
  Smaller: { fontSize: "75%" },
});

const First: React.FC<{}> = ({}) => {
  const classes = useClasses();
  return (
    <span className={classes.FretDivText} style={{ color: "inherit" }}>
      1<sup className={classes.Subscript}>st</sup> &nbsp;
    </span>
  );
};
const Third: React.FC<{}> = ({}) => {
  const classes = useClasses();
  return (
    <span className={classes.FretDivText}>
      3<sup className={classes.Subscript}>rd</sup> &nbsp;
    </span>
  );
};
const Fifth: React.FC<{}> = ({}) => {
  const classes = useClasses();
  return (
    <span className={classes.FretDivText}>
      5<sup className={classes.Subscript}>th</sup> &nbsp;
    </span>
  );
};
const ExtraInfo: React.FC<{
  note: string;
  freq: number;
  chordHiglht: boolean;
}> = ({ note, freq, chordHiglht }) => {
  const classes = useClasses();
  const chord1 = useState(chordFirst);
  const chord3 = useState(chordThird);

  const fretFreq = <span className={classes.Smaller}>{freq.toString()}</span>;
  let chordPlace = <></>;
  let difference = chordLowFreq[note] - freq;
  let tmp = difference > 0; // ? true : false;

  if (chordHiglht) {
    if (note == chord1.value) {
      chordPlace = <First />;
    } else if (note == chord3.value) {
      chordPlace = <Third />;
    } else {
      chordPlace = <Fifth />;
    }
  }

  return chordHiglht ? chordPlace : fretFreq;
};

const StringNote: React.FC<{ note: string; numbo: string; freq: number }> = ({
  note,
  numbo,
  freq,
}) => {
  const classes = useClasses();
  const hCh = useState(highlightedChord);
  const hN = useState(highlightedNote);
  const textColor: string = calculateColor(freq, numbo);
  const borderColor: string =
    hCh.nested(note).value || hN.nested(note).value ? textColor : "transparent";

  return (
    <span
      className={classes.StringNote}
      style={{ color: textColor, borderColor: borderColor }}
    >
      {note}
      <sub className={classes.Subscript}>{numbo}</sub> &nbsp;
      <ExtraInfo note={note} freq={freq} chordHiglht={hCh.nested(note).value} />
    </span>
  );
};

export { StringNote };
