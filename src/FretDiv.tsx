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
  FretDiv: {
    ...shorthands.border("1px", "solid", "white"),
    height: "100%",
    display: "flex",
    flexDirection: "row",
    width: "96px",
    alignItems: "center",
    justifyContent: "center",
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

const FretDiv: React.FC<{
  note: string;
  numbo: string;
  freq: number;
}> = ({ note, numbo, freq }) => {
  const classes = useClasses();
  const hCh = useState(highlightedChord);
  const hN = useState(highlightedNote);
  // note is used as object key, so we can't use the #,
  // we write 'instead'; but one button we want #
  const displayNote = note.length > 1 ? `${note[0]}#` : note;

  const theColors = calculateColor(freq, numbo);
  const thisColor: string =
    hCh.nested(note).value || hN.nested(note).value ? theColors : "black";
  const textColor: string =
    hCh.nested(note).value || hN.nested(note).value ? "black" : "white";

  return (
    <div className={classes.FretDiv} style={{ backgroundColor: thisColor }}>
      <span className={classes.FretDivText} style={{ color: textColor }}>
        {displayNote}
        <sub className={classes.Subscript}>{numbo}</sub> &nbsp;
        <ExtraInfo
          note={note}
          freq={freq}
          chordHiglht={hCh.nested(note).value}
        />
      </span>
    </div>
  );
};

export { FretDiv };
