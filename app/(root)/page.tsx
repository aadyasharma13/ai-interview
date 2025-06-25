import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { dummyInterviews } from "@/constants";
import InterviewCard from "@/components/InterviewCard";


const Page = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>get interview ready with Prepwise</h2>
          <p className="text-lg">
            Prepwise is a platform that helps you prepare for your interviews.
          </p>
          <div className="flex gap-4">
            <Button asChild className="btn-primary max-sm:w-full">
              <Link href="/interview">Start an Interview</Link>
            </Button>
            </div>
        </div>
            <Image src="/robot.png" alt="robot" width={400} height={400} className="max-sm:hidden" />

          
      </section>

      <section className="flex flex-col gap-6 mt-8"> 
        <h2>Your Interviews</h2>
        <div className="Interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}

          <p>you have no interviews yet</p>
          </div>
         </section>

         <section className="flex flex-col gap-6 mt-8">
          <h2>Take an Interviews</h2>
          <div className="Interviews-section">
            
            
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id}/>
          ))}
          <p>you have no interviews yet</p>

          </div>
         </section>


    </>
  );
};

export default Page;