import { createState } from "@hookstate/core";

interface ChordObj {
  [index: string]: string;
  first: string;
  third: string;
  fifth: string;
  minor3: string;
}
interface NoteArray {
  [index: string]: boolean;
  A: boolean;
  Ash: boolean;
  B: boolean;
  C: boolean;
  Csh: boolean;
  D: boolean;
  Dsh: boolean;
  E: boolean;
  F: boolean;
  Fsh: boolean;
  G: boolean;
  Gsh: boolean;
}

const initialNoteHighlightState: NoteArray = {
  A: false,
  Ash: false,
  B: false,
  C: false,
  Csh: false,
  D: false,
  Dsh: false,
  E: false,
  F: false,
  Fsh: false,
  G: false,
  Gsh: false,
};

const initialChordHighlightState: NoteArray = {
  A: false,
  Ash: false,
  B: false,
  C: false,
  Csh: false,
  D: false,
  Dsh: false,
  E: false,
  F: false,
  Fsh: false,
  G: false,
  Gsh: false,
};

interface ChordButtType {
  [index: string]: boolean;
  A: boolean;
  Am: boolean;
  Ash: boolean;
  Ashm: boolean;
  B: boolean;
  Bm: boolean;
  C: boolean;
  Cm: boolean;
  Csh: boolean;
  Cshm: boolean;
  D: boolean;
  Dm: boolean;
  Dsh: boolean;
  Dshm: boolean;
  E: boolean;
  Em: boolean;
  F: boolean;
  Fm: boolean;
  Fsh: boolean;
  Fshm: boolean;
  G: boolean;
  Gm: boolean;
  Gsh: boolean;
  Gshm: boolean;
}

const chordButtsAllOff: ChordButtType = {
  A: false,
  Am: false,
  Ash: false,
  Ashm: false,
  B: false,
  Bm: false,
  C: false,
  Cm: false,
  Csh: false,
  Cshm: false,
  D: false,
  Dm: false,
  Dsh: false,
  Dshm: false,
  E: false,
  Em: false,
  F: false,
  Fm: false,
  Fsh: false,
  Fshm: false,
  G: false,
  Gm: false,
  Gsh: false,
  Gshm: false,
};

interface NoteButtType {
  [index: string]: boolean;
  A: boolean;
  Ash: boolean;
  B: boolean;
  C: boolean;
  Csh: boolean;
  D: boolean;
  Dsh: boolean;
  E: boolean;
  F: boolean;
  Fsh: boolean;
  G: boolean;
  Gsh: boolean;
}
interface NoteFreqType {
  [index: string]: number;
  A: number;
  Ash: number;
  B: number;
  C: number;
  Csh: number;
  D: number;
  Dsh: number;
  E: number;
  F: number;
  Fsh: number;
  G: number;
  Gsh: number;
}
const chordLowFreq: NoteFreqType = {
  A: 110,
  Ash: 117,
  B: 123,
  C: 131,
  Csh: 139,
  D: 147,
  Dsh: 156,
  E: 82,
  F: 87,
  Fsh: 92,
  G: 98,
  Gsh: 104,
};

const noteButts: NoteButtType = {
  A: false,
  Ash: false,
  B: false,
  C: false,
  Csh: false,
  D: false,
  Dsh: false,
  E: false,
  F: false,
  Fsh: false,
  G: false,
  Gsh: false,
};

const highlightedChord = createState(initialChordHighlightState);
const highlightedNote = createState(initialNoteHighlightState);
const chordButtState = createState(chordButtsAllOff);
const noteButtState = createState(noteButts);
const chordFirst = createState("");
const chordThird = createState("");
const chordFifth = createState("");

export {
  chordButtState,
  chordButtsAllOff,
  highlightedChord,
  chordFirst,
  chordThird,
  chordFifth,
  chordLowFreq,
  highlightedNote,
  initialChordHighlightState,
  noteButtState,
};
