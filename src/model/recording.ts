interface AudioFile {
  path: string;
  duration: number;
}

export interface Performer {
  id: number;
  name: string;
}

interface RecordingPerformer {
  id: number;
  performer: Performer;
  role: string; 
}

interface RecordedMovement {
  id: number;
  movementIndex: number; 
  movementId: number;
  audioFile: AudioFile;
}

export interface Recording {
  id: number;
  workId: number;
  year: number;
  photoPath: string; 
  performers: RecordingPerformer[];
  movements: RecordedMovement[];
}
