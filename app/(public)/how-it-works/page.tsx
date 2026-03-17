import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, Banknote, Key, Car, Lock } from "lucide-react";

const HowItWorksPage = () => {
  const steps = [
    {
      id: 1,
      desktopIcon: Search,
      mobileIcon: Car,
      title: "1. Browse & Choose",
      mobileDesc: "Explore our wide range of vehicles, from compact cars to luxury SUVs. Filter by your needs and find your perfect car from our premium fleet.",
      desktopDesc: "Find your perfect car from our fleet of well-maintained vehicles. Filter by type, price, or capacity."
    },
    {
      id: 2,
      desktopIcon: Calendar,
      mobileIcon: Calendar,
      title: "2. Book & Confirm",
      mobileDesc: "Select your dates, enter your personal details, and review your booking. We'll send an instant confirmation directly to your email.",
      desktopDesc: "Enter your rental details and receive an instant confirmation via email. Fast, easy, and digital."
    },
    {
      id: 3,
      desktopIcon: Banknote,
      mobileIcon: Lock,
      title: "3. Pay Securely",
      mobileDesc: "Complete your payment using our secure checkout powered by Paystack. We support cards, bank transfers, and mobile money for your convenience.",
      desktopDesc: "Complete your booking with a safe transaction powered by Paystack. Multiple payment options available."
    },
    {
      id: 4,
      desktopIcon: Key,
      mobileIcon: Key,
      title: "4. Pick Up & Drive",
      mobileDesc: "Visit our nearest pickup point at your scheduled time. Show your ID, grab your keys, and start your journey with peace of mind.",
      desktopDesc: "Collect your keys at our designated location or have it delivered. Your adventure starts here."
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
                   Experience a seamless car rental process in four simple steps. Find, book, and drive your perfect car today with Solution Car Rentals.
                </span>
                <span className="hidden md:block leading-[1.6]">
                   Experience a seamless car rental journey with Solution Car Rentals. From<br className="hidden lg:block" />browsing to driving, we&apos;ve simplified every step for your convenience.
                </span>
             </p>
             <Link href="/our-cars" className="bg-[#4facfe] md:bg-[#4facfe] hover:opacity-90 text-slate-900 md:text-white font-semibold py-3 px-8 md:py-4 md:px-10 md:text-[17px] rounded-full transition-opacity inline-block">
                <span className="md:hidden">Get Started</span>
                <span className="hidden md:inline">Get Started Now</span>
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
                 Join thousands of happy customers and get on the road today.
             </p>
             <Link href="/our-cars" className="bg-[#4facfe] hover:opacity-90 text-slate-900 font-bold py-3.5 px-8 rounded-full w-[200px] transition-opacity text-[15px] inline-block">
                Browse Cars
             </Link>
          </div>

          {/* Desktop & Tablet version */}
          <div className="hidden md:flex bg-[#161c2d] rounded-[32px] py-16 lg:py-[72px] px-12 lg:px-20 flex-col items-center justify-center text-center">
             <h2 className="text-[36px] lg:text-[44px] font-bold text-white mb-4 lg:mb-6">Ready to start?</h2>
             <p className="text-[#4facfe] mb-10 lg:mb-12 text-[17px] lg:text-[19px] max-w-2xl font-medium">
                Join thousands of happy customers and get the best rates on your next rental today.
             </p>
             <div className="flex flex-row gap-4 lg:gap-5">
                <Link href="/our-cars" className="bg-[#4facfe] hover:opacity-90 text-slate-900 font-bold py-3.5 px-8 lg:py-4 lg:px-10 rounded-full transition-opacity text-[15px] lg:text-[17px] inline-block">
                   Browse Fleet
                </Link>
             </div>
          </div>
       </div>
    </div>
  );
};

export default HowItWorksPage;
