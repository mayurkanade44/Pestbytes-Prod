import Loading from "./Loading";

const SearchBlogSkeleton = () => {
  return (
    <div className="relative">
      <div className="container my-2 mx-auto animate-pulse">
        <section className="my-1 text-gray-800 text-center md:text-left ">
          <div className="flex justify-center">
            <h2 className="w-1/3 mt-3 md:mt-0 mb-5 md:mb-10 h-8 bg-slate-400" />
          </div>

          <div className="flex flex-wrap mb-6">
            <div className="grow-0 shrink-0 basis-auto w-full md:w-3/12 px-3 mb-0 ml-auto">
              <div className="h-48 bg-slate-400 rounded-lg" />
            </div>
            <div className="grow-0 shrink-0 basis-auto w-full md:w-9/12 xl:w-7/12 px-3 mb-6 md:mb-0 mr-auto">
              <h5 className="text-lg font-bold my-3 h-4 md:w-2/4 bg-slate-400" />
              <p className="my-4 h-2 md:w-1/4 bg-slate-400" />
              <p className="my-4 h-2 md:w-1/4 bg-slate-400" />
              <p className="my-4 h-24 md:w-10/12 bg-slate-400" />
            </div>
          </div>
          <div className="flex flex-wrap mb-6">
            <div className="grow-0 shrink-0 basis-auto w-full md:w-3/12 px-3 mb-0 ml-auto">
              <div className="h-48 bg-slate-400 rounded-lg" />
            </div>
            <div className="grow-0 shrink-0 basis-auto w-full md:w-9/12 xl:w-7/12 px-3 mb-6 md:mb-0 mr-auto">
              <h5 className="text-lg font-bold my-3 h-4 md:w-2/4 bg-slate-400" />
              <p className="my-4 h-2 md:w-1/4 bg-slate-400" />
              <p className="my-4 h-2 md:w-1/4 bg-slate-400" />
              <p className="my-4 h-24 md:w-10/12 bg-slate-400" />
            </div>
          </div>
        </section>
      </div>
      <Loading />
    </div>
  );
};
export default SearchBlogSkeleton;
