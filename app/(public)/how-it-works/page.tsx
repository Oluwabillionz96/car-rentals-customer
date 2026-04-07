import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, Banknote, Key, Car, Lock } from "lucide-react";

const HowItWorksPage = () => {
  const steps = [
    {
      id: 1,
      desktopIcon: Search,
      mobileIcon: Car,
      title: "1. Choose Your Service",
      mobileDesc: "Select the perfect option for your journey: take the wheel with our self-drive fleet or relax with a premium chauffeur.",
      desktopDesc: "Decide how you want to travel. Opt for the freedom of self-drive or the luxury of a professional chauffeur."
    },
    {
      id: 2,
      desktopIcon: Calendar,
      mobileIcon: Calendar,
      title: "2. Browse & Schedule",
      mobileDesc: "Explore our diverse fleet of vehicles and select your preferred dates and pickup options for your trip.",
      desktopDesc: "Explore our premium fleet to find the perfect car, then schedule your pickup and drop-off dates effortlessly."
    },
    {
      id: 3,
      desktopIcon: Banknote,
      mobileIcon: Lock,
      title: "3. Book Securely",
      mobileDesc: "Provide your details and complete your reservation instantly using our safe and secure online checkout.",
      desktopDesc: "Enter your personal details and complete your booking with a safe, instant transaction powered by Paystack."
    },
    {
      id: 4,
      desktopIcon: Key,
      mobileIcon: Key,
      title: "4. Drive or Be Driven",
      mobileDesc: "Collect your car keys from our designated location or simply wait for your professional chauffeur to arrive in style.",
      desktopDesc: "Pick up your keys to begin your self-drive adventure, or relax as your professional chauffeur whisks you away."
    }
  ];

  return (
    <div className="-mx-4 md:-mx-20 -mt-18 md:-mt-32">
       {/* Hero Section */}
       <div className="relative w-full md:bg-slate-50 md:py-32 py-24 flex items-center justify-center overflow-hidden">
          {/* Mobile Background */}
          <div className="absolute inset-0 md:hidden z-0 bg-[#161c2d]">
             <div className="absolute inset-0 bg-[#161c2d]/70 z-10" />
             <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLyDuinTZ4hHj2kEBaOr2PCfWpb5Jiz0Jlt5FZiWCHQ6KnrLkSmnFQbYYEuWVdujDGWrNx_GsVjJ9ACMDG-l1l0CQpKco6BoKNZQDF8zrdWzlVk1r5Wcha1fK7U0PHbQbjOXwqk4ooNgzRSU6lbxSlGNZ2vK-px7d2LMarTS27Z2W2eTrOTw9-PSy7LP_-77L4z6jLOXA_oiu08STdri6-rCr9FvT-FMrPrncZpu17wY2HMAy8rTbg1lyQbzh7M9Sq0VC32tUenA"
                alt="Background"
                fill
                priority
                className="object-cover opacity-80"
             />
          </div>
          <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-4xl mx-auto lg:mt-10">
             <h1 className="text-3xl md:text-[44px] lg:text-[56px] font-extrabold text-white md:text-[#1e2330] mb-4 md:mb-6">
               How it Works
             </h1>
             <p className="text-[15px] md:text-lg text-slate-200 md:text-slate-500 mb-8 max-w-3xl px-2 leading-relaxed">
                <span className="md:hidden">
                   Experience a seamless travel process in four simple steps. Find your perfect ride, choose your service, and get going with Solution Car Rentals.
                </span>
                <span className="hidden md:block leading-[1.6]">
                   Experience a seamless journey with Solution Car Rentals. Whether you prefer<br className="hidden lg:block" />the freedom of self-drive or the luxury of a premium chauffeur, we&apos;ve simplified every step.
                </span>
             </p>
             <Link href="/services" className="bg-[#4facfe] md:bg-[#4facfe] hover:opacity-90 text-slate-900 md:text-white font-semibold py-3 px-8 md:py-4 md:px-10 md:text-[17px] rounded-full transition-opacity inline-block">
                <span className="md:hidden">Get Started</span>
                <span className="hidden md:inline">Explore Services</span>
             </Link>
          </div>
       </div>

       {/* Steps Section */}
       <div className="bg-slate-50 md:bg-white py-12 md:py-24 px-4 md:px-20 mx-0">
          <div className="max-w-[1280px] mx-auto bg-slate-50 md:bg-transparent">
             <div className="text-center mb-10 md:mb-20">
                <h2 className="text-[22px] md:text-[32px] font-bold text-slate-900 mb-2 md:mb-4">
                   <span className="md:hidden">Our Simple Process</span>
                   <span className="hidden md:block relative pb-4 text-[#1e2330]">
                      Your Journey in 4 Simple Steps
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-[#4facfe] rounded-full"></div>
                   </span>
                </h2>
             </div>

             {/* Desktop & Tablet Grid */}
             <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
                {/* Connecting Dotted Line (Hidden on tablet, shown on desktop) */}
                <div className="hidden lg:block absolute top-[42px] left-[12%] right-[12%] h-[2px] border-t-2 border-dashed border-slate-200 z-0"></div>
                
                {steps.map((step) => (
                  <div key={step.id} className="bg-[#f8fafc] rounded-[24px] p-6 lg:p-8 text-center relative z-10 flex flex-col items-center shadow-sm border border-slate-100/50">
                     <div className="w-[72px] h-[72px] lg:w-[84px] lg:h-[84px] bg-[#eafdff] rounded-[24px] flex items-center justify-center mb-6 lg:mb-8 text-[#4facfe]">
                        <step.desktopIcon size={32} strokeWidth={1.5} className="w-7 h-7 lg:w-8 lg:h-8" />
                     </div>
                     <h3 className="font-bold text-[#1e2330] mb-3 lg:mb-4 text-[17px] lg:text-[19px]">{step.title}</h3>
                     <p className="text-slate-500 text-[14px] lg:text-[15px] leading-relaxed px-1">{step.desktopDesc}</p>
                  </div>
                ))}
             </div>

             {/* Mobile Vertical List */}
             <div className="md:hidden flex flex-col space-y-10 relative pt-2">
                <div className="absolute left-[31px] top-6 bottom-16 w-[2px] bg-[#eafdff]"></div>

                {steps.map((step) => (
                  <div key={step.id} className="flex gap-5 relative z-10 w-full pl-2 pr-2">
                     <div className="shrink-0 flex flex-col items-center">
                        <div className="w-12 h-12 bg-[#4facfe] rounded-full flex items-center justify-center text-white shadow-md z-10 relative shadow-sky-400/20">
                           <step.mobileIcon size={20} strokeWidth={2.5} />
                        </div>
                     </div>
                     <div className="pt-1 w-full pb-2">
                        <h3 className="font-bold text-[#1e2330] text-[17px] mb-2">{step.title}</h3>
                        <p className="text-slate-500 text-[14px] leading-relaxed mb-4">{step.mobileDesc}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
       </div>

       {/* Ready to Start Section */}
       <div className="py-12 md:py-24 px-4 md:px-20 mx-4 pb-20 md:pb-32 max-w-[1400px] md:mx-auto">
          {/* Mobile version */}
          <div className="md:hidden bg-[#eaf4fe] rounded-3xl p-8 text-center flex flex-col items-center shadow-sm">
             <h2 className="text-2xl font-bold text-slate-900 mb-3">Ready to start?</h2>
             <p className="text-slate-600 mb-8 max-w-[280px] text-[15px] leading-relaxed">
                 Experience premium travel. Book your self-drive or chauffeur service today.
             </p>
             <Link href="/services" className="bg-[#4facfe] hover:opacity-90 text-slate-900 font-bold py-3.5 px-8 rounded-full w-[200px] transition-opacity text-[15px] inline-block">
                View Services
             </Link>
          </div>

          {/* Desktop & Tablet version */}
          <div className="hidden md:flex bg-[#161c2d] rounded-[32px] py-16 lg:py-[72px] px-12 lg:px-20 flex-col items-center justify-center text-center">
             <h2 className="text-[36px] lg:text-[44px] font-bold text-white mb-4 lg:mb-6">Ready to start?</h2>
             <p className="text-[#4facfe] mb-10 lg:mb-12 text-[17px] lg:text-[19px] max-w-2xl font-medium">
                Experience premium travel tailored to you. Book your self-drive car or relax with a professional luxury chauffeur today.
             </p>
             <div className="flex flex-row gap-4 lg:gap-5">
                <Link href="/our-fleet" className="bg-[#4facfe] hover:opacity-90 text-slate-900 font-bold py-3.5 px-8 lg:py-4 lg:px-10 rounded-full transition-opacity text-[15px] lg:text-[17px] inline-block">
                   Browse Fleet
                </Link>
             </div>
          </div>
       </div>
    </div>
  );
};

export default HowItWorksPage;
