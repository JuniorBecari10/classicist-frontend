import type { Option } from "./option";

enum Note {
    C,
    CSharp,
    DFlat,
    D,
    DSharp,
    EFlat,
    E,
    F,
    FSharp,
    GFlat,
    G,
    GSharp,
    AFlat,
    A,
    ASharp,
    BFlat,
    B,
}

enum KeyMode {
    Major,
    Minor,
}

export interface WorkTitle {
    kind: string;
    number: Option<number>;
    nickname: Option<string>;
}

interface Key {
    note: Note;
    mode: KeyMode;
}

export interface Composer {
    id: number;
    name: string;
    birth_year: number;
    death_year: Option<number>;
    photo_path: string;
}

interface Catalog {
    prefix: string;
    number: Option<string>;
    subnumber: Option<string>;
}

interface TempoMarking {
    form: Option<string>;
    name: string;
}

interface SheetMusic {
    path: string;
}

interface Movement {
    nickname: Option<string>;
    form: Option<string>;
    lyrics: Option<string[]>;
    tempo_markings: TempoMarking[];
    sheet: SheetMusic;
}

interface CompositionYear {
    start_year: number;
    end_year: Option<number>;
}

interface Work {
    id: number;
    title: WorkTitle;
    key: Key;
    composer: Composer;
    catalog: Catalog;
    movements: Movement[];
    year: CompositionYear;
}

// ---

export interface DisplayWork {
    title: WorkTitle;
    movement: string;
}
