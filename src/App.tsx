import React from "react";
import { makeStyles, shorthands } from "@griffel/react";
import { useState } from "@hookstate/core";
import { chordButtState, highlighted, noteButtState } from "./globalState";

const useClasses = makeStyles({
  App: {
    backgroundColor: "black",
    color: "white",
    height: "100vh",
    display: "grid",
    gridTemplateColumns: "1fr 90% 1fr",
    gridTemplateRows: "80px 1fr 1fr 80px",
    gridColumnGap: "0px",
    gridRowGap: "10px",
  },
  AppHeader: {
    backgroundColor: "#282c34",
    gridColumnStart: 1,
    gridColumnEnd: -1,
    gridRowStart: 1,
    gridRowEnd: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  Buttons: {
    gridColumnStart: 2,
    gridColumnEnd: 3,
    gridRowStart: 2,
    gridRowEnd: 3,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
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
  NoteB: {
    ...shorthands.border("1px", "solid", "white"),
    fontSize: "20px",
    width: "60px",
    paddingTop: "6px",
    paddingBottom: "6px",
    paddingLeft: "12px",
    paddingRight: "12px",
    marginLeft: "5px",
    marginRight: "5px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  GuitarNeck: {
    gridColumnStart: 2,
    gridColumnEnd: 3,
    gridRowStart: 3,
    gridRowEnd: 4,
    height: "300px",
    marginTop: "10px",
    marginBottom: "10px",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    gridColumnGap: "0px",
    gridRowGap: "0px",
  },
  GuitarNeckRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
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
  Subscript: { fontSize: "60%" },
  Smaller: { fontSize: "75%" },
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
    color: "white",
    marginTop: "0px",
    marginBottom: "0px",
    paddingTop: "4px",
    paddingBottom: "0px",
    paddingLeft: "0px",
    paddingRight: "0px",
    display: "inline-block",
  },
  DotRow: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "100px 1fr",
    gridTemplateRows: "1fr",
    gridColumnGap: "0px",
    gridRowGap: "0px",
  },
  DotDivDiv: {
    gridColumnStart: 2,
    gridColumnEnd: 3,
    gridRowStart: 1,
    gridRowEnd: 2,
    height: "10px",
    marginTop: "5px",
    marginBottom: "10px",
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridTemplateRows: "1fr",
    gridColumnGap: "0px",
    gridRowGap: "0px",
  },
  DotDiv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  AppFooter: {
    backgroundColor: "#282c34",
    gridColumnStart: 1,
    gridColumnEnd: -1,
    gridRowStart: 4,
    gridRowEnd: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

interface ChordObj {
  [index: string]: string;
  first: string;
  third: string;
  fifth: string;
  minor3: string;
}

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
  const hlght = useState(highlighted);
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
        if (buttS[first].value) {
          hlght[fixedFirst].set(hlght[fixedFirst].value - 1);
          hlght[third].set(hlght[third].value - 1);
          hlght[fifth].set(hlght[fifth].value - 1);
        } else {
          hlght[fixedFirst].set(hlght[fixedFirst].value + 1);
          hlght[third].set(hlght[third].value + 1);
          hlght[fifth].set(hlght[fifth].value + 1);
        }
        buttS[first].set((p) => !p);
      }}
    >
      {displayNote}
      <IsMinor minor={minor} />
      <br />
      <NotesInChord third={third} fifth={fifth} />
    </button>
  );
};

const NoteButton: React.FC<{
  first: string;
  pressed: boolean;
}> = ({ first, pressed }) => {
  const classes = useClasses();
  const hlght = useState(highlighted);
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
      className={classes.ChB}
      style={{
        backgroundColor: pressed ? "white" : "transparent",
        color: pressed ? "black" : "white",
      }}
      onClick={() => {
        if (buttS[first].value) {
          hlght[fixedFirst].set(hlght[fixedFirst].value - 1);
        } else {
          hlght[fixedFirst].set(hlght[fixedFirst].value + 1);
        }
        buttS[first].set((p) => !p);
      }}
    >
      {displayNote}
      <br />
    </button>
  );
};

const calculateColor = (freq: number) => {
  let r = 200;
  let g = 150;
  let b = 200;
  // yellow is 255,255,0
  const lowestFreq = 82; // E2
  const highestFreq = 660; // E5

  b = ((freq - lowestFreq) * 255) / (highestFreq - lowestFreq);
  r = ((highestFreq - freq) * 255) / (highestFreq - lowestFreq);

  return [`rgb(${r},${g},${b},0.0)`, `rgb(${r},${g},${b})`];
};

const StringNote: React.FC<{ note: string; numbo: string; freq: number }> = ({
  note,
  numbo,
  freq,
}) => {
  const classes = useClasses();
  const hlght = useState(highlighted);
  const textColor: string = calculateColor(freq)[1];
  const borderColor: string =
    hlght.nested(note).value > 0 ? textColor : "transparent";

  return (
    <span
      className={classes.StringNote}
      style={{ color: textColor, borderColor: borderColor }}
    >
      {note}
      <sub className={classes.Subscript}>{numbo}</sub> &nbsp;
      {freq}
    </span>
  );
};

const FretDiv: React.FC<{
  note: string;
  numbo: string;
  freq: number;
}> = ({ note, numbo, freq }) => {
  const classes = useClasses();
  const hlght = useState(highlighted);
  // note is used as object key, so we can't use the #,
  // we write 'instead'; but one button we want #
  const displayNote = note.length > 1 ? `${note[0]}#` : note;

  const theColors = calculateColor(freq);
  const thisColor: string =
    hlght.nested(note).value > 0 ? theColors[1] : theColors[0];

  return (
    <div className={classes.FretDiv} style={{ backgroundColor: thisColor }}>
      <span className={classes.FretDivText}>
        {displayNote}
        <sub className={classes.Subscript}>{numbo}</sub> &nbsp;
        <span className={classes.Smaller}>{freq.toString()}</span>
      </span>
    </div>
  );
};

function App() {
  const classes = useClasses();
  // button states: whether each is pressed or not
  const buttS = useState(chordButtState);
  const noteButtS = useState(noteButtState);

  return (
    <div className={classes.App}>
      <header className={classes.AppHeader}>
        <p>
          A guitar chord visualizer, for major/minor chords and single notes
        </p>
      </header>

      <div className={classes.Buttons}>
        <div className={classes.ButtonRow}>
          <ChordButton
            first="A"
            third="Csh"
            fifth="E"
            pressed={buttS.A.value}
          />
          <ChordButton
            first="Am"
            third="C"
            fifth="E"
            pressed={buttS.Am.value}
          />
          <ChordButton
            first="Ash"
            third="D"
            fifth="F"
            pressed={buttS.Ash.value}
          />
          <ChordButton
            first="Ashm"
            third="Csh"
            fifth="F"
            pressed={buttS.Ashm.value}
          />
          <ChordButton
            first="B"
            third="Dsh"
            fifth="Fsh"
            pressed={buttS.B.value}
          />
          <ChordButton
            first="Bm"
            third="D"
            fifth="Fsh"
            pressed={buttS.Bm.value}
          />
          <ChordButton first="C" third="E" fifth="G" pressed={buttS.C.value} />
          <ChordButton
            first="Cm"
            third="Dsh"
            fifth="G"
            pressed={buttS.Cm.value}
          />
          <ChordButton
            first="Csh"
            third="F"
            fifth="Gsh"
            pressed={buttS.Csh.value}
          />
          <ChordButton
            first="Cshm"
            third="E"
            fifth="Gsh"
            pressed={buttS.Cshm.value}
          />
          <ChordButton
            first="D"
            third="Fsh"
            fifth="A"
            pressed={buttS.D.value}
          />
          <ChordButton
            first="Dm"
            third="F"
            fifth="A"
            pressed={buttS.Dm.value}
          />
        </div>
        <div className={classes.ButtonRow}>
          <ChordButton
            first="Dsh"
            third="G"
            fifth="Ash"
            pressed={buttS.Dsh.value}
          />
          <ChordButton
            first="Dshm"
            third="Fsh"
            fifth="Ash"
            pressed={buttS.Dshm.value}
          />
          <ChordButton
            first="E"
            third="Gsh"
            fifth="B"
            pressed={buttS.E.value}
          />
          <ChordButton
            first="Em"
            third="G"
            fifth="B"
            pressed={buttS.Em.value}
          />
          <ChordButton first="F" third="A" fifth="C" pressed={buttS.F.value} />
          <ChordButton
            first="Fm"
            third="Gsh"
            fifth="C"
            pressed={buttS.Fm.value}
          />
          <ChordButton
            first="Fsh"
            third="Ash"
            fifth="Csh"
            pressed={buttS.Fsh.value}
          />
          <ChordButton
            first="Fshm"
            third="A"
            fifth="Csh"
            pressed={buttS.Fshm.value}
          />
          <ChordButton first="G" third="B" fifth="D" pressed={buttS.G.value} />
          <ChordButton
            first="Gm"
            third="Ash"
            fifth="D"
            pressed={buttS.Gm.value}
          />
          <ChordButton
            first="Gsh"
            third="C"
            fifth="Dsh"
            pressed={buttS.Gsh.value}
          />
          <ChordButton
            first="Gshm"
            third="B"
            fifth="Dsh"
            pressed={buttS.Gshm.value}
          />
        </div>{" "}
        <div className={classes.ButtonRow}>
          <NoteButton first="A" pressed={noteButtS.A.value} />
          <NoteButton first="Ash" pressed={noteButtS.Ash.value} />
          <NoteButton first="B" pressed={noteButtS.B.value} />
          <NoteButton first="C" pressed={noteButtS.C.value} />
          <NoteButton first="Csh" pressed={noteButtS.Csh.value} />
          <NoteButton first="D" pressed={noteButtS.D.value} />
          <NoteButton first="Dsh" pressed={noteButtS.Dsh.value} />
          <NoteButton first="E" pressed={noteButtS.E.value} />
          <NoteButton first="F" pressed={noteButtS.F.value} />
          <NoteButton first="Fsh" pressed={noteButtS.Fsh.value} />
          <NoteButton first="G" pressed={noteButtS.G.value} />
          <NoteButton first="Gsh" pressed={noteButtS.Gsh.value} />
        </div>
      </div>
      <div className={classes.GuitarNeck}>
        <div className={classes.GuitarNeckRow}>
          <StringNote note="E" numbo="4" freq={330} />
          <FretDiv note="F" numbo="4" freq={349} />
          <FretDiv note="Fsh" numbo="4" freq={370} />
          <FretDiv note="G" numbo="4" freq={392} />
          <FretDiv note="Gsh" numbo="4" freq={415} />
          <FretDiv note="A" numbo="4" freq={440} />
          <FretDiv note="Ash" numbo="4" freq={466} />
          <FretDiv note="B" numbo="4" freq={494} />
          <FretDiv note="C" numbo="5" freq={523} />
          <FretDiv note="Csh" numbo="5" freq={554} />
          <FretDiv note="D" numbo="5" freq={587} />
          <FretDiv note="Dsh" numbo="5" freq={622} />
          <FretDiv note="E" numbo="5" freq={659} />
        </div>
        <div className={classes.GuitarNeckRow}>
          <StringNote note="B" numbo="3" freq={247} />
          <FretDiv note="C" numbo="4" freq={262} />
          <FretDiv note="Csh" numbo="4" freq={277} />
          <FretDiv note="D" numbo="4" freq={294} />
          <FretDiv note="Dsh" numbo="4" freq={311} />
          <FretDiv note="E" numbo="4" freq={330} />
          <FretDiv note="F" numbo="4" freq={349} />
          <FretDiv note="Fsh" numbo="4" freq={370} />
          <FretDiv note="G" numbo="4" freq={392} />
          <FretDiv note="Gsh" numbo="4" freq={415} />
          <FretDiv note="A" numbo="4" freq={440} />
          <FretDiv note="Ash" numbo="4" freq={466} />
          <FretDiv note="B" numbo="4" freq={494} />
        </div>
        <div className={classes.GuitarNeckRow}>
          <StringNote note="G" numbo="3" freq={196} />
          <FretDiv note="Gsh" numbo="3" freq={208} />
          <FretDiv note="A" numbo="3" freq={220} />
          <FretDiv note="Ash" numbo="3" freq={233} />
          <FretDiv note="B" numbo="3" freq={247} />
          <FretDiv note="C" numbo="4" freq={262} />
          <FretDiv note="Csh" numbo="4" freq={277} />
          <FretDiv note="D" numbo="4" freq={294} />
          <FretDiv note="Dsh" numbo="4" freq={311} />
          <FretDiv note="E" numbo="4" freq={330} />
          <FretDiv note="F" numbo="4" freq={349} />
          <FretDiv note="Fsh" numbo="4" freq={370} />
          <FretDiv note="G" numbo="4" freq={392} />
        </div>
        <div className={classes.GuitarNeckRow}>
          <StringNote note="D" numbo="3" freq={147} />
          <FretDiv note="Dsh" numbo="3" freq={156} />
          <FretDiv note="E" numbo="3" freq={165} />
          <FretDiv note="F" numbo="3" freq={175} />
          <FretDiv note="Fsh" numbo="3" freq={185} />
          <FretDiv note="G" numbo="3" freq={196} />
          <FretDiv note="Gsh" numbo="3" freq={208} />
          <FretDiv note="A" numbo="3" freq={220} />
          <FretDiv note="Ash" numbo="3" freq={233} />
          <FretDiv note="B" numbo="3" freq={247} />
          <FretDiv note="C" numbo="4" freq={262} />
          <FretDiv note="Csh" numbo="4" freq={277} />
          <FretDiv note="D" numbo="4" freq={294} />
        </div>
        <div className={classes.GuitarNeckRow}>
          <StringNote note="A" numbo="2" freq={110} />
          <FretDiv note="Ash" numbo="2" freq={117} />
          <FretDiv note="B" numbo="2" freq={123} />
          <FretDiv note="C" numbo="3" freq={131} />
          <FretDiv note="Csh" numbo="3" freq={139} />
          <FretDiv note="D" numbo="3" freq={147} />
          <FretDiv note="Dsh" numbo="3" freq={156} />
          <FretDiv note="E" numbo="3" freq={165} />
          <FretDiv note="F" numbo="3" freq={175} />
          <FretDiv note="Fsh" numbo="3" freq={185} />
          <FretDiv note="G" numbo="3" freq={196} />
          <FretDiv note="Gsh" numbo="3" freq={208} />
          <FretDiv note="A" numbo="3" freq={220} />
        </div>
        <div className={classes.GuitarNeckRow}>
          <StringNote note="E" numbo="2" freq={82} />
          <FretDiv note="F" numbo="2" freq={87} />
          <FretDiv note="Fsh" numbo="2" freq={92} />
          <FretDiv note="G" numbo="2" freq={98} />
          <FretDiv note="Gsh" numbo="2" freq={104} />
          <FretDiv note="A" numbo="2" freq={110} />
          <FretDiv note="Ash" numbo="2" freq={117} />
          <FretDiv note="B" numbo="2" freq={123} />
          <FretDiv note="C" numbo="3" freq={131} />
          <FretDiv note="Csh" numbo="3" freq={139} />
          <FretDiv note="D" numbo="3" freq={147} />
          <FretDiv note="Dsh" numbo="3" freq={156} />
          <FretDiv note="E" numbo="3" freq={165} />
        </div>
        <div className={classes.DotRow}>
          <div className={classes.DotDivDiv}>
            <div
              className={classes.DotDiv}
              style={{
                gridColumnStart: 3,
                gridColumnEnd: 4,
              }}
            >
              ◦
            </div>
            <div
              className={classes.DotDiv}
              style={{ gridColumnStart: 5, gridColumnEnd: 6 }}
            >
              ◦
            </div>
            <div
              className={classes.DotDiv}
              style={{ gridColumnStart: 7, gridColumnEnd: 8 }}
            >
              ◦
            </div>
            <div
              className={classes.DotDiv}
              style={{ gridColumnStart: 9, gridColumnEnd: 10 }}
            >
              ◦
            </div>
            <div
              className={classes.DotDiv}
              style={{ gridColumnStart: 12, gridColumnEnd: 13 }}
            >
              ◦ ◦
            </div>
          </div>
        </div>
      </div>

      <footer className={classes.AppFooter}>
        <p>
          Given frequencies are for an "even-tempered chromatic scale", with A
          <sub>4</sub> defined as 440 Hz.
        </p>
      </footer>
    </div>
  );
}

export default App;
