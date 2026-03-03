interface TrailerProps {
  videoKey: string;
}

export const TrailerPlayer = ({ videoKey }: TrailerProps) => {
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoKey}?origin=${window.location.origin}&enablejsapi=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};
