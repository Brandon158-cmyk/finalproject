import Image from "next/image";
import Link from "next/link";
import learning from "./online.jpg";

const Banner = () => {
  return (
    <div className='px-6 mb-6'>
      <div className='w-full bg-white text-[#2A2B2E] p-6 max-w-screen-xl mx-auto rounded-xl border border-gray-300 flex justify-between overflow-hidden relative'>
        <div className='flex items-center justify-between z-10 pr-8'>
          <div className='max-w-[60%]'>
            <h2 className='text-5xl font-bold mb-4'>
              Unlock Your <span className='text-pink-500'>Potential</span>:{" "}
              <br /> <span className='text-sky-700'>Skills</span> for the
              Future, Now
            </h2>
            <p className='text-gray-600 text-sm mb-4'>
              Access your courses anytime, anywhere with our mobile-friendly
              platform. Whether you are commuting, traveling, or just on the go,
              your learning journey continues seamlessly.
            </p>
            <div className='flex space-x-4 mt-6'>
              <Link
                href='/teacher/courses'
                className='bg-sky-400 text-[#2A2B2E] border border-[#2A2B2E]/50 px-6 py-2 text-sm rounded-full hover:bg-sky-600 transition duration-300'
              >
                Produce Courses
              </Link>
              <Link
                href='#'
                className='bg-green-200 text-[#2A2B2E] border border-[#2A2B2E]/50 text-sm px-6 py-2 rounded-full hover:bg-green-400 transition duration-300'
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <div className='hidden md:block absolute right-0 top-0 bottom-0 w-[45%]'>
          <Image
            src={learning}
            alt='Product Manager illustration'
            layout='fill'
            objectFit='cover'
            objectPosition='left'
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
