import { Skeleton } from "@nextui-org/react";

export const SkeletonVideoCard = () => {
  return (
    // <div className="w-[400px] xl:w-[380px] lg:w-[320px] md:w-[280px] h-80 space-y-5  bg-transparent">
    <div className="w-full space-y-5  bg-transparent">
      <Skeleton className="rounded-xl">
        <div className="aspect-video rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="max-w-[300px] w-full flex items-center gap-3">
        <div>
          <Skeleton
            disableAnimation={true}
            className="flex rounded-full w-12 h-12"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton disableAnimation={true} className="h-3 w-4/5 rounded-lg" />
          <Skeleton disableAnimation={true} className="h-3 w-2/5 rounded-lg" />
          <Skeleton disableAnimation={true} className="h-3 w-2/5 rounded-lg" />
        </div>
      </div>
    </div>
  );
};
