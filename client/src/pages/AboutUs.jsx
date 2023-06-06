import { useEffect } from "react";
import pestbytes from "../assets/pestbytes.jpg";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="2xl:container 2xl:mx-auto lg:px-20 md:py-5 md:px-6 px-4">
      <div className="w-full">
        <h2 className="w-full font-bold text-center text-gray-800 lg:text-4xl text-3xl lg:leading-10 leading-9 mt-2">
          About Pestbytes
        </h2>
        <p className="font-normal text-base leading-6 text-gray-600 mt-6">
          It started as an talkathon idea between 2 individuals to create a
          space neutral but must be cohesive and collaborative in every sense of
          its expression. <br /> Where one would put words to text and the other
          would ideate. Pestbytes was registered in 2020, but stayed in
          incubation for 3 years, bouncing around, seeking collaboration through
          the years that passed and then in 2023 the pivot was to create a
          platform to influence a new pattern of collaborative learning not just
          keeping it focused on a fixed set of writers but opening it up to all
          communities and spectrum of contributors. <br /> <b> "Pestbytes"</b>{" "}
          in 2023 collaborated putting together mind and technology to create a
          platform open to becoming a central space where knowledge sharing and
          innovation announcement is done with pride, encouraging a whole new
          generation of entrepreneurs to share, learn, comment, and build
          knowledge.
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
            My Story
          </h2>
          <p className="font-normal text-base leading-6 text-gray-600 mt-4 mr-2">
            Personally I am a long-time champion of interdisciplinary research,
            proudly a 2nd generation entrepreneur, with over 2 decades of
            hands-on experience adding value to the different products used
            whilst delivering pest management services. <br /> I saw that many
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
      <div className="w-full">
        <h2 className="w-full font-bold text-center text-gray-800 lg:text-4xl text-3xl lg:leading-10 leading-9 mt-8">
          What’s to be published
        </h2>
        <p className="font-normal text-base leading-6 text-gray-600 mt-6">
          The discussion topics can include some research based information,
          some experience based stories and anecdotes, some loud-mouthed
          opinion.   We are keeping it simple, just one image and load your
          text..
        </p>
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
          <p className="font-normal text-base leading-6 text-gray-600 mt-4 ml-1">
            <b> Left triangle </b> represents the triangle of Knowledge. It’s
            equilateral sides represent, (fact), (information) & (skill).
            Knowledge is facts, information, and skills acquired through
            experience or education; the theoretical or practical understanding
            of a subject.
            <br />
            <br /> <b> Right triangle </b> represents the triangle of Research.
            It’s equilateral sides represent (investigation), fact)& (new
            conclusion). Research is the systematic investigation into and study
            of materials and sources in order to establish facts and reach new
            conclusions. <br />
            <br /> <b> The two dots </b> to either side communicate out common
            goal to be available via new emerging platform and technologies.{" "}
            <br />
            <br /> <b> The intersection </b> of the two triangles of knowledge
            and research opens up a third new space, a space of influenced
            decision taking, opening up a new spectrum of works which will be
            undertaken where research will influence knowledge, resulting in
            more responsible actions leading to sustainable and environmentally
            stable actions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
