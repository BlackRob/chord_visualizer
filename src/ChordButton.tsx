import React from "react";
import { makeStyles, shorthands } from "@griffel/react";
import { useState } from "@hookstate/core";
import {
  chordButtState,
  chordLowFreq,
  highlightedChord,
  chordFirst,
  chordThird,
  chordFifth,
  initialChordHighlightState,
} from "./globalState";

const useClasses = makeStyles({
  ChB: {
    ...shorthands.border("1px", "solid", "white"),
    fontSize: "20px",
    width: "80px",
    paddingTop: "6px",
    paddingBottom: "6px",
    paddingLeft: "12px",
    paddingRight: "12px",
    marginLeft: "5px",
    marginRight: "5px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  Subscript: { fontSize: "60%" },
  Smaller: { fontSize: "75%" },
});

const IsMinor: React.FC<{ minor: boolean }> = ({ minor }) => {
  const classes = useClasses();
  if (minor) {
    return <sub className={classes.Subscript}>m</sub>;
  } else {
    return <></>;
  }
};

const NotesInChord: React.FC<{ third: string; fifth: string }> = ({
  third,
  fifth,
}) => {
  const classes = useClasses();
  const fixedThird = third.length > 1 ? `${third[0]}#` : third;
  const fixedFifth = fifth.length > 1 ? `${fifth[0]}#` : fifth;

  return (
    <span className={classes.Smaller}>{`${fixedThird}, ${fixedFifth}`}</span>
  );
};

const ChordButton: React.FC<{
  first: string;
  third: string;
  fifth: string;
  pressed: boolean;
}> = ({ first, third, fifth, pressed }) => {
  const classes = useClasses();
  const hCh = useState(highlightedChord);
  const buttS = useState(chordButtState);

  const minor = first.length === 2 || first.length === 4 ? true : false;
  let fixedFirst = first;
  if (first.length === 2) {
    fixedFirst = first.substring(0, 1);
  }
  if (first.length === 4) {
    fixedFirst = first.substring(0, 3);
  }
  const displayNote =
    first.length === 3 || first.length === 4 ? `${first[0]}#` : first[0];

  return (
    <button
      className={classes.ChB}
      style={{
        backgroundColor: pressed ? "white" : "transparent",
        color: pressed ? "black" : "white",
      }}
      onClick={() => {
        for (const key in buttS.value) {
          buttS[key].set(false);
        }
        for (const key in hCh.value) {
          hCh[key].set(false);
        }
        chordFirst.set(fixedFirst);
        chordThird.set(third);
        chordFifth.set(fifth);
        if (!pressed) {
          buttS[first].set(true);
          hCh[fixedFirst].set(true);
          hCh[third].set(true);
          hCh[fifth].set(true);
        }
      }}
    >
      {displayNote}
      <IsMinor minor={minor} />
      <br />
      <NotesInChord third={third} fifth={fifth} />
    </button>
  );
};

export { ChordButton };
