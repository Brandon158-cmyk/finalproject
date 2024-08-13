import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import Image from "next/image";

// Navbar Component
const Navbar = () => {
  const { userId } = auth();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="container mx-auto flex justify-between items-center py-2">
        <div className="flex p-4 justify-between items-center">
          <h1 className="font-bold w-auto h-8 flex items-center justify-center gap-3">
            <div className="!h-8 p-1 !w-8 !aspect-square bg-[#11DD7B] rounded-sm text-lg lg:text-xl flex items-center justify-center !text-primary">
              P
            </div>
            <div className="flex text-primary text-lg md:text-xl items-center gap-1">
              <span>Punzila</span>
            </div>
          </h1>
        </div>
        {userId ? (
          <Link
            href="/search"
            className={cn(
              buttonVariants({ size: "sm" }),
              "w-full sm:w-auto text-center bg-[#11DD7B] text-primary hover:bg-white hover:text-primary"
            )}
          >
            Sign In
          </Link>
        ) : (
          <Link
            href="/sign-up"
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full sm:w-auto text-center bg-[#11DD7B] text-primary hover:bg-white hover:text-primary"
            )}
          >
            Sign Up
          </Link>
        )}
      </div>
    </nav>
  );
};

interface Course {
  title: string;
  image: string;
}

// Course Image Component
const CourseImage = ({ course }: { course: Course }) => {
  return (
    <div className="w-[300px] h-[200px] rounded-xl border !mx-4 group relative overflow-hidden">
      <span className="opacity-0 duration-300 group-hover:opacity-100 absolute z-10 bottom-0 left-0 text-white bg-black/70 px-4 py-2 text-sm rounded-tr-xl">
        {course.title}
      </span>
      <Image
        width={300}
        height={200}
        src={course.image}
        alt={course.title}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </div>
  );
};

// Main Page Component
const Page = () => {
  const { userId } = auth();

  const courses = [
    {
      title: "Cook Course",
      image:
        "https://images.unsplash.com/photo-1556911261-6bd341186b2f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvb2t8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "How to be organized",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBzeWNvbG9neXxlbnwwfDB8MHx8fDA%3D",
    },
    {
      title: "Street Art",
      image:
        "https://images.unsplash.com/photo-1583225214464-9296029427aa?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN0cmVldCUyMGFydHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Photography",
      image:
        "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Video Editing",
      image:
        "https://images.unsplash.com/photo-1526698905402-e13b880ad864?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZpZGVvJTIwZWRpdHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Business Course",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YnVzc2luZXNzfGVufDB8fDB8fHww",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-background py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-lg mx-auto lg:mx-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Ready To Elevate Your Learning?
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Join our community of learners and master the skills of
                  tomorrow, today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {userId ? (
                    <Link
                      href="/dashboard"
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "w-full sm:w-auto text-center bg-[#11DD7B] text-primary hover:bg-white hover:text-primary"
                      )}
                    >
                      Go to Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/sign-up"
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "w-full sm:w-auto text-center bg-[#11DD7B] text-primary hover:bg-white hover:text-primary"
                      )}
                    >
                      Start Learning Now
                    </Link>
                  )}
                  <Link
                    href="/courses"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "w-full sm:w-auto text-center"
                    )}
                  >
                    Explore Courses
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <Image
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your actual image path
                  alt="Students learning online"
                  width={600}
                  height={400}
                  className="rounded-sm shadow-md"
                />
                <div className="absolute -bottom-10 -left-10 bg-white text-primary p-6 rounded-lg shadow-lg">
                  <p className="text-2xl font-bold mb-2">10,000+</p>
                  <p className="text-sm">Students already learning</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-background via-background to-transparent opacity-90 -z-10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/hero-pattern.svg')] opacity-5 -z-20"></div>
        </section>

        {/* Course Preview Section */}
        <section className="py-20 bg-accent">
          <div className="container mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Explore Our Courses
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              Discover a wide range of courses designed to equip you with the
              skills of tomorrow.
            </p>
          </div>
          <Marquee pauseOnHover={true} speed={40}>
            {courses.map((course, index) => (
              <CourseImage key={index} course={course} />
            ))}
          </Marquee>
        </section>

        {/* About Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-semibold mb-2">
                  Expert Instructors
                </h3>
                <p className="text-muted-foreground">
                  Learn from industry professionals with years of experience.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💻</div>
                <h3 className="text-xl font-semibold mb-2">
                  Hands-on Projects
                </h3>
                <p className="text-muted-foreground">
                  Apply your skills to real-world scenarios and build your
                  portfolio.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="text-xl font-semibold mb-2">
                  Community Support
                </h3>
                <p className="text-muted-foreground">
                  Connect with peers and mentors for guidance and collaboration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are already building their future
              with us.
            </p>
            <Link
              href="/courses"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "duration-300 transition-all"
              )}
            >
              Browse All Courses
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;
