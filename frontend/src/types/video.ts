export interface Video {
  id: string;
  title: string;
  durationSeconds?: number;
  moduleId: string;
  description: string;
  rawObjectKey: string;
  hlsMasterKey: string;
  thumbnailKey: string;
}
