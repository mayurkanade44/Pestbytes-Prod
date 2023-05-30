import pestbytes from "../assets/pestbytes.jpg";

const AboutUs = () => {
  return (
    <div className="2xl:container 2xl:mx-auto lg:px-20 md:py-5 md:px-6 px-4">
      <div className="w-full">
        <h2 className="w-full font-bold text-center text-gray-800 lg:text-4xl text-3xl lg:leading-10 leading-9 mt-2">
          About Pestbytes
        </h2>
        <p className="font-normal text-base leading-6 text-gray-600 mt-6">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum.In the first place we have granted to God, and by
          this our present charter confirmed for us and our heirs forever that
          the English Church shall be free, and shall have her rights entire,
        </p>
      </div>
      <div className="mt-5">
        <img
          className="lg:block hidden w-full"
          src="https://i.ibb.co/GvwJnvn/Group-736.png"
          alt="Group of people Chilling"
        />
        <img
          className="lg:hidden sm:block hidden w-full"
          src="https://i.ibb.co/5sZTmHq/Rectangle-116.png"
          alt="Group of people Chilling"
        />
        <img
          className="sm:hidden block w-full"
          src="https://i.ibb.co/zSxXJGQ/Rectangle-122.png"
          alt="Group of people Chilling"
        />
      </div>

      <div className="lg:mt-16 sm:mt-12 mt-16 flex lg:flex-row justify-between flex-col lg:gap-8 gap-12">
        <div className="w-full xl:w-5/12 lg:w-6/12">
          <h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800">
            Our Story
          </h2>
          <p className="font-normal text-base leading-6 text-gray-600 mt-4">
            Personally I am a long-time champion of interdisciplinary research,
            proudly a 2nd generation entrepreneur, with over 2 decades of
            hands-on experience adding value to the different products used
            whilst delivering pest management services, I saw that many
            individuals and manufacturers share a lot of valuable data which can
            help the industry on different portals, I personally wanted to
            create an integrated frame where knowledge and research is shared on
            a common platform which is open to all, where any individual
            associated to the service industry, member of academia,
            manufacturers, professional trainers can share their experiences and
            knowledge in a formatted manner promoting sharing of knowledge.
          </p>
        </div>
        <div className="lg:flex items-center w-full lg:w-1/2 ">
          <img
            className="lg:block hidden w-full"
            src="https://i.ibb.co/2kxWpNm/Group-740.png"
            alt="people discussing on board"
          />
          <img
            className="lg:hidden sm:block hidden w-full h-3/4"
            src="https://i.ibb.co/ZLgK3NQ/Group-788.png"
            alt="people discussing on board"
          />
          <img
            className="sm:hidden block w-full"
            src="https://i.ibb.co/9g2R7Xr/Group-803.png"
            alt="people discussing on board"
          />
        </div>
      </div>
      <div className="lg:mt-16 sm:mt-12 mt-16 flex lg:flex-row justify-between flex-col lg:gap-8 gap-12">
        <div className="lg:flex items-center w-full lg:w-1/2 ">
          <img
            className="md:block hidden w-full"
            src={pestbytes}
            alt="people discussing on board"
          />
          {/* <img
            className="lg:hidden sm:block hidden w-full h-3/4"
            src="https://i.ibb.co/ZLgK3NQ/Group-788.png"
            alt="people discussing on board"
          />
          <img
            className="sm:hidden block w-full"
            src="https://i.ibb.co/9g2R7Xr/Group-803.png"
            alt="people discussing on board"
          /> */}
        </div>
        <div className="w-full xl:w-5/12 lg:w-6/12">
          <h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800">
            Our Logo
          </h2>
          <img
            className="sm:hidden block w-full mt-4"
            src={pestbytes}
            alt="people discussing on board"
          />
          <p className="font-normal text-base leading-6 text-gray-600 mt-4">
            Left triangle - It’s there tips (fact)(information)(skill)
            Knowledge: facts, information, and skills acquired through
            experience or education; the theoretical or practical understanding
            of a subject.
            <br />
            <br /> Right triangle It’s three tips (investigation)(fact)(new
            conclusion) Research:: the systematic investigation into and study
            of materials and sources in order to establish facts and reach new
            conclusions. <br />
            <br />
            The two dots to either side communicate out common goal to be
            available via new emerging platform and technologies.
            <br />
            <br /> The intersection of the two triangles of knowledge and
            research opens up a third new space, a space of influenced decision
            taking, opening up a new spectrum of works which will be undertaken
            where research will influence knowledge, resulting in more
            responsible actions leading to sustainable and environmentally
            stable actions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
