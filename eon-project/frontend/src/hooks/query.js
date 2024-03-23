import {
    useMutation,
    useQuery,
    useQueryClient,
  } from "@tanstack/react-query";
  import API from "../services/api";

  /* **************************************************************************** */
/* VIDEO ITEMS */

// Function to upload a new video (POST)
const useUploadVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      API.post("/api/video/upload", data),
    onSuccess: () => {
      queryClient.invalidateQueries("videos");
    },
  });
};

// Function to get all videos (GET)
const useGetVideos = () => {
  return useQuery({
    queryKey: "videos",
    queryFn: () =>
      API.get("/api/video"),
    select: (response) => response.data.videos,
  });
};
  