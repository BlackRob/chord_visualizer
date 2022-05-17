import { createState } from "@hookstate/core";

interface ChordObj {
  [index: string]: string;
  first: string;
  third: string;
  fifth: string;
  minor3: string;
}
interface NoteArray {
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

const initialHighlightState: NoteArray = {
  A: 0,
  Ash: 0,
  B: 0,
  C: 0,
  Csh: 0,
  D: 0,
  Dsh: 0,
  E: 0,
  F: 0,
  Fsh: 0,
  G: 0,
  Gsh: 0,
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

const chordButts: ChordButtType = {
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

const highlighted = createState(initialHighlightState);
const chordButtState = createState(chordButts);
const noteButtState = createState(noteButts);

export { chordButtState, highlighted, noteButtState };
