import { http } from "./http";
import type { Video } from "../types/video";

export const videosApi = {
  byModule: async (moduleId: string): Promise<Video[]> => {
    const res = await http.get(`/modules/${moduleId}/videos`);
    return res.data;
  },
  videoDetailbyId: async (videoId : string) : Promise<Video> => {
    const res = await http.get(`/video-id/${videoId}`);
    return res.data;
  },
  setVideoDetailsById: async (videoId : string, setVideo : React.Dispatch<React.SetStateAction<Video | null>>) : Promise<void> => {
    const res = await http.get(`/video-id/${videoId}`);
    setVideo(res.data);
  },
  setVideoDetailsByIdForTeacher: async (videoId : string, setVideo : React.Dispatch<React.SetStateAction<Video | null>>) : Promise<void> => {
    const res = await http.get(`/teacher/video-id/${videoId}`);
    setVideo(res.data);
  },
  setVideoDetailsByIdForAdmin: async (videoId : string, setVideo : React.Dispatch<React.SetStateAction<Video | null>>) : Promise<void> => {
    const res = await http.get(`/admin/video-id/${videoId}`);
    setVideo(res.data);
  }
};
