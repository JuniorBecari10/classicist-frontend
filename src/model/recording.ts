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

export interface RecordedMovement {
  id: number;
  movement_index: number; 
  movement_id: number;
  audio_file: AudioFile;
}

export interface Recording {
  id: number;
  work_id: number;
  year: number;
  photo_path: string; 
  performers: RecordingPerformer[];
  movements: RecordedMovement[];
}
