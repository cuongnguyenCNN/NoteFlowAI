import React from "react";
import clsx from "clsx";
import {
  LucideYoutube,
  LucideFileText,
  LucideMic,
  LucideBookOpenCheck,
  LucideMap,
  LucideMail,
} from "lucide-react";
import { ReactNode, ButtonHTMLAttributes } from "react";
import Navbar from "./components/navbar";
import Link from "next/link";
import FAQ from "./components/faq";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}

function CustomButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: CustomButtonProps) {
  return (
    <button
      className={clsx(
        "font-medium rounded-2xl px-6 py-3 transition",
        variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700",
        variant === "outline" &&
          "border border-blue-500 text-blue-600 bg-white hover:bg-blue-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

interface CustomCardProps {
  children: ReactNode;
}

function CustomCard({ children }: CustomCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {children}
    </div>
  );
}

interface CustomCardContentProps {
  children: ReactNode;
  className?: string;
}

function CustomCardContent({
  children,
  className = "",
}: CustomCardContentProps) {
  return <div className={clsx("p-6", className)}>{children}</div>;
}
// interface PricingCard {
//   title?: string;
//   price: string;
//   features: string[];
//   buttonText: string;
//   highlight: boolean;
// }
// function PricingCard({
//   title,
//   price,
//   features,
//   buttonText,
//   highlight,
// }: PricingCard) {
//   return (
//     <div
//       className={clsx(
//         "contrainer rounded-2xl p-6 shadow-md flex flex-col items-center text-center",
//         highlight ? "bg-blue-600 text-white" : "bg-white text-gray-900"
//       )}
//     >
//       <h3 className="text-xl font-bold mb-2">{title}</h3>
//       <div className="text-4xl font-extrabold mb-4">{price}</div>
//       <ul className="text-left mb-6 space-y-2">
//         {features.map((f, i) => (
//           <li key={i} className="flex items-start gap-2">
//             <LucideStar className="w-4 h-4 text-yellow-400 mt-1" />
//             <span>{f}</span>
//           </li>
//         ))}
//       </ul>
//       <CustomButton
//         variant={highlight ? "outline" : "primary"}
//         className={
//           highlight
//             ? "text-white border-white hover:bg-white hover:text-blue-600"
//             : ""
//         }
//       >
//         {buttonText}
//       </CustomButton>
//     </div>
//   );
// }

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-8">
      <Navbar />
      <div>
        <h1>
          <br></br>
          <br></br>
        </h1>
      </div>
      <header className="text-center mb-12">
        <h3 className="text-6xl md:text-6xl font-bold text-gray-900 mb-4">
          Your Second Brain for Notes, Learning.
        </h3>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Smart note-taking from videos, PDFs, YouTube, and recordings — in text
          or mind map format. Boost productivity and retain knowledge.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <CustomButton style={{ background: "black" }}>
            <Link href="/dashboard">Start for Free</Link>
          </CustomButton>
          <CustomButton variant="outline">Upgrade to Pro</CustomButton>
        </div>
      </header>

      <section id="how-it-works" className="mb-16 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">
          🎥 Full Dashboard in Action
        </h2>

        <img
          alt="LinkPost Calendar Preview"
          fetchPriority="high"
          width="1915"
          height="902"
          decoding="async"
          data-nimg="1"
          className="rounded-2xl shadow-xl w-full"
          src="/images/fullscreen.jpg"
        />
      </section>
      <h2 className="text-2xl font-semibold text-center mb-6">Main features</h2>
      <section
        id="features"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        <CustomCard>
          <CustomCardContent className="text-center">
            <LucideYoutube className="w-10 h-10 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Extract from YouTube</h3>
            <p className="text-gray-600">
              Automatically detect content and generate notes from YouTube
              videos.
            </p>
          </CustomCardContent>
        </CustomCard>

        <CustomCard>
          <CustomCardContent className="text-center">
            <LucideFileText className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Analyze PDF Files</h3>
            <p className="text-gray-600">
              Create clear notes from books, documents, and course materials.
            </p>
          </CustomCardContent>
        </CustomCard>

        <CustomCard>
          <CustomCardContent className="text-center">
            <LucideMic className="w-10 h-10 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Audio & Speech Recognition
            </h3>
            <p className="text-gray-600">
              Convert speech to text and take notes in real-time.
            </p>
          </CustomCardContent>
        </CustomCard>

        {/* <CustomCard>
          <CustomCardContent className="text-center">
            <LucideBookOpenCheck className="w-10 h-10 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Text-Based Notes</h3>
            <p className="text-gray-600">
              Organize information into bullet points or short paragraphs.
            </p>
          </CustomCardContent>
        </CustomCard> */}

        <CustomCard>
          <CustomCardContent className="text-center">
            <LucideMap className="w-10 h-10 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Visual Mind Maps</h3>
            <p className="text-gray-600">
              Represent knowledge with vivid, easy-to-remember mind maps.
            </p>
          </CustomCardContent>
        </CustomCard>
      </section>

      <section id="testimonial" className="bg-gray-50 py-16 mt-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          ❤️ What Users Are Saying
        </h2>
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
          <CustomCard>
            <CustomCardContent>
              <p className="text-gray-600 mb-4">
                “NoteFlow has changed the way I learn and work every day.”
              </p>
              <div className="font-semibold">Nguyen Huyen, Medical Student</div>
            </CustomCardContent>
          </CustomCard>
          <CustomCard>
            <CustomCardContent>
              <p className="text-gray-600 mb-4">
                “I use it to quickly summarize team meeting notes.”
              </p>
              <div className="font-semibold">Minh Tri, Project Manager</div>
            </CustomCardContent>
          </CustomCard>
          <CustomCard>
            <CustomCardContent>
              <p className="text-gray-600 mb-4">
                “NoteFlow’s mind maps are perfect for brainstorming.”
              </p>
              <div className="font-semibold">Linh Le, Designer</div>
            </CustomCardContent>
          </CustomCard>
        </div>
      </section>

      <section className="text-center my-20">
        <h2 className="text-2xl font-semibold mb-4">
          📬 Subscribe for Productivity & Learning Tips
        </h2>
        <form className="flex flex-col md:flex-row gap-4 justify-center mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-xl border w-72 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <CustomButton className="flex gap-2">
            <LucideMail className="w-5 h-5" /> Subscribe
          </CustomButton>
        </form>
        <p className="text-gray-400 text-sm mt-2">
          No spam. Unsubscribe anytime.
        </p>
      </section>

      <section className="bg-blue-100 py-16 text-center rounded-2xl max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl font-bold mb-4">
          ✨ Upgrade to Pro for the Full Experience
        </h2>
        <p className="text-lg text-gray-700 max-w-xl mx-auto mb-6">
          Unlimited access, advanced note-taking, cloud storage, and more
          features coming soon.
        </p>
        <CustomButton
          className="text-lg px-8 py-4 rounded-full"
          style={{ background: "black" }}
        >
          Upgrade to Pro
        </CustomButton>
      </section>

      {/* <section className="py-20 bg-white max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          💎 Pricing Plans
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <PricingCard
            title="Free"
            price="$0"
            features={[
              "Extract from YouTube",
              "Notes from PDF",
              "Audio & Speech-to-Text",
            ]}
            buttonText="Get Started"
            highlight
          />
          <PricingCard
            title="Pro"
            price="$ / month"
            features={[
              "Mind Maps",
              "Cloud Storage",
              "Priority Support",
              "Unlimited Notes",
            ]}
            buttonText="Go Pro"
            highlight
          />
          <PricingCard
            title="Enterprise"
            price="Contact Us"
            features={[
              "Custom Features",
              "Advanced Security",
              "API Integration",
              "Multi-user Management",
            ]}
            buttonText="Contact Now"
            highlight
          />
        </div>
      </section> */}
      <section>
        <FAQ></FAQ>
      </section>
    </div>
  );
}
