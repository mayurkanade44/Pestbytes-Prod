import BlogCardSkeleton from "./BlogCardSkeleton";

const UserProfileSkeleton = () => {
  return (
    <div className="lg:w-8/12 lg:mx-auto mb-8 animate-pulse">
      <header className="flex flex-wrap p-4 md:pt-8 pb-2">
        {/* image */}
        <div className="md:ml-16 mt-1">
          <div className="w-28 h-28 md:w-40 md:h-40 object-cover rounded-full bg-slate-300" />
        </div>
        <div className="w-8/12 md:w-7/12 ml-4">
          {/* title */}
          <div className="mt-8 md:mt-0 my-4 w-3/4 h-10 bg-slate-300" />
          {/* about */}
          <div className="hidden md:block h-28 bg-slate-300" />
          <ul className="hidden md:flex space-x-8 mt-5 h-10 w-60 bg-slate-300" />
        </div>
        <hr />
        <div className="md:hidden block text-sm my-2">
          <div className="w-96 h-28 bg-slate-300" />
        </div>
      </header>
      <div className="px-px md:px-3">
        <ul
          className="flex md:hidden justify-around space-x-2 border-t 
                text-center p-2 text-gray-600 leading-snug text-sm"
        >
          <li>
            <span className="font-semibold text-gray-800 block w-20 h-5 bg-slate-300" />
          </li>
          <li>
            <span className="font-semibold text-gray-800 block w-20 h-5 bg-slate-300" />
          </li>
        </ul>
        <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10 px-3">
          {[...Array(2)].map((item, index) => (
            <BlogCardSkeleton
              key={index}
              className="w-full md:w-[calc(50%-20px)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default UserProfileSkeleton;
