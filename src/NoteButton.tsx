import React from "react";
import { makeStyles, shorthands } from "@griffel/react";
import { useState } from "@hookstate/core";
import { highlightedNote, noteButtState } from "./globalState";

const useClasses = makeStyles({
  NoteB: {
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

const NoteButton: React.FC<{
  first: string;
  pressed: boolean;
}> = ({ first, pressed }) => {
  const classes = useClasses();
  const hN = useState(highlightedNote);
  const buttS = useState(noteButtState);
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
      className={classes.NoteB}
      style={{
        backgroundColor: pressed ? "white" : "transparent",
        color: pressed ? "black" : "white",
      }}
      onClick={() => {
        if (buttS[first].value) {
          hN[fixedFirst].set(false);
        } else {
          hN[fixedFirst].set(true);
        }
        buttS[first].set((p) => !p);
      }}
    >
      {displayNote}
      <br />
    </button>
  );
};

export { NoteButton };
