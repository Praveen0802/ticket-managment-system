const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[999999] bg-white/60 h-screen w-screen flex flex-col items-center justify-center">
      <div className="relative w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-full">
          <div
            className="absolute h-full bg-green-500 rounded-full"
            style={{
              width: "30%",
              animation: "lineProgress 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600">Loading...</p>

      <style jsx>{`
        @keyframes lineProgress {
          0% {
            width: 0%;
            left: 0%;
          }
          50% {
            width: 70%;
            left: 0%;
          }
          70% {
            width: 50%;
            left: 50%;
          }
          100% {
            width: 0%;
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
