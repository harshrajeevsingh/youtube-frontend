import axiosInstance from '../helpers/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSubscribeToCreator = (videoId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (creatorId) => {
      const { data } = await axiosInstance.post(
        `/subscriptions/c/${creatorId}`
      );
      return data;
    },
    // onMutate: async (creatorId) => {
    //   console.log("Optimistic update started for video:", videoId);

    //   await queryClient.cancelQueries(["video", { videoId }]);

    //   const previousVideo = queryClient.getQueryData(["video", { videoId }]);
    //   console.log("Previous video data:", previousVideo);

    //   queryClient.setQueryData(["video", { videoId }], (old) => {
    //     if (!old) {
    //       console.log("No existing data found for video:", { videoId });
    //       return old;
    //     }

    //     const newData = {
    //       ...old,
    //       data: {
    //         ...old.data,
    //         ownerDetails: {
    //           ...old.data.ownerDetails,
    //           isSubscribed: !old.data.ownerDetails.isSubscribed,
    //           subscribersCount: old.data.ownerDetails.isSubscribed
    //             ? (old.data.ownerDetails.subscribersCount || 0) - 1
    //             : (old.data.ownerDetails.subscribersCount || 0) + 1,
    //         },
    //       },
    //     };
    //     console.log("Updated video data:", newData);
    //     return newData;
    //   });

    //   console.log("Optimistic update completed");
    //   return { previousVideo };
    // },
    // onError: (err, variables, context) => {
    //   queryClient.setQueryData(["video", { videoId }], context.previousVideo);
    // },
    onSettled: () => {
      queryClient.invalidateQueries(['video', { videoId }]);
    },
  });
};
