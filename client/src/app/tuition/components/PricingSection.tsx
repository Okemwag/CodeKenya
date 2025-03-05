import React from "react";

import { CheckIcon } from "lucide-react";
import Link from "next/link";

interface PricingFeature {
  text: string;
}

interface PricingPlan {
  label?: string;
  planThemeColor?: string;
  checkIconColor?: string;
  cycle?: string;
  iconBgColor?: string;
  textColor?: string;
  price: number;
  title: string;
  description: string;
  features: PricingFeature[];
  buttonColor: string;
  buttonShadow?: string;
  expandIcon?: boolean;
}

const PricingSection = () => {
  const plans: PricingPlan[] = [
    {
      title: "Flexible Installments",
      planThemeColor: "primaryBlackColor",
      checkIconColor: "#000000ff",
      price: 285,
      cycle: "month",
      iconBgColor: "bg-[#e0e0e0ff]",
      textColor: "text-primaryBlackColor",
      description:
        "Spread your tuition fees in monthly installments, customized to suit your schedule.",
      buttonColor: "bg-primaryBlackColor",
      buttonShadow: "shadow-[0_2px_10px_rgba(0,0,0,0.3)]",
      expandIcon: true,
      features: [
        { text: "Divide costs monthly." },
        { text: "No interest fees." },
        { text: "Equal payment terms." },
        { text: "Adjustable plans." },
        { text: "Access after first payment." },
        { text: "Payment reminders." },
        { text: "Secure online payments." },
      ],
    },
    {
      label: "Best value",
      title: "Pay Once – Save More",
      planThemeColor: "primaryRedColor",
      checkIconColor: "#ba0000ff",
      price: 500,
      iconBgColor: "bg-[#f7e1e1ff]",
      textColor: "text-primaryRedColor",
      description:
        "Pay your tuition upfront and enjoy exclusive discounts on your program.",
      buttonColor: "bg-primaryRedColor",
      expandIcon: true,
      features: [
        { text: "One-time payment." },
        { text: "Lifetime access to materials." },
        { text: "Online or In-person." },
        { text: "No additional fees." },
        { text: "No Accommodation." },
        { text: "Priority enrollment support." },
        { text: "Free program resources." },
        { text: "No Excursions + Safari" },
        { text: "Unlimited projects" },
      ],
    },
    {
      title: "Buy Now, Pay Later",
      planThemeColor: "primaryGreenColor",
      checkIconColor: "#006600ff",
      price: 7000,
      iconBgColor: "bg-[#e1ede1ff]",
      textColor: "text-primaryGreenColor",
      cycle: "",
      description:
        "Start learning now and pay over time, with flexible repayment terms.",
      buttonColor: "bg-primaryGreenColor",
      expandIcon: true,
      features: [
        { text: "4 star Accommodation" },
        { text: "Instant course access." },
        { text: "In-Person Attendance." },
        { text: "Excursions. + Safari " },
        { text: "Easy repayment tracking." },
        { text: "Automated reminders." },
        { text: "Automated reminders." },
        { text: "No upfront costs." },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="relative bg-white rounded-3xl p-6 border border-gray-100"
          >
            {plan.label && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="bg-red-600 text-white text-sm px-4 py-1 rounded-full font-medium">
                  {plan.label}
                </div>
              </div>
            )}

            {/* Header */}

            <div className="flex justify-between flex-col items-start mb-4">
              <p
                className={`${plan.iconBgColor || ""} ${
                  plan.textColor || ""
                }  w-fit py-1 px-2 my-2 text-xs rounded-md`}
              >
                {plan.title}
              </p>
              <div className="flex-grow">
                <div className="flex items-baseline">
                  <span className="text-2xl text-slate-400 font-medium">$</span>
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.cycle && (
                    <span className="text-lg font-medium">/{plan.cycle}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

            {/* Button */}
            <button
              className={`w-full ${
                plan.buttonColor
              } text-white rounded-full py-3 font-medium
                ${
                  plan.buttonShadow || ""
                } flex items-center justify-center gap-2 mb-6 hover:bg-opacity-90`}
            >
              Pay now
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>

            {/* Features */}
            <ul className="space-y-3">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center gap-2">
                  <div
                    className={`rounded-full p-1  ${plan.iconBgColor || " "}`}
                  >
                    <CheckIcon color={plan.checkIconColor || " "} size={10} />
                  </div>

                  <span className="text-gray-600 text-sm">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Explore Programs Button */}
      <div className="mt-12 text-center">
        <Link href="/bootcamps">
          <button className="bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-3 rounded-full inline-flex items-center justify-center">
            Explore Our Programs
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PricingSection;
