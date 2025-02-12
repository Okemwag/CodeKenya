import React from "react";

import Image from "next/image";

const Payment = () => {
  return (
    <div className="bg-primaryBlackColor text-white">
      <div className="max-w-[90%] mx-auto py-10 ">
        <h1 className="text-4xl font-black">Your payment options</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mt-12">
          <div className="border border-white rounded-lg p-4 border-[1px]">
            <Image
              src="/icons/payment-svg1.svg"
              alt="payment option 1 icon"
              height={30}
              width={30}
              loading="lazy"
              quality={80}
            />
            <div className="mt-6 space-y-1">
              <h2 className="font-semibold text-base">
                Klarna (Buy Now, Pay Later)
              </h2>
              <p className="text-xs font-thin text-slate-100">
                Flexible, short-term installment plans ranging from 4 to 36
                months.
              </p>
            </div>
          </div>

          <div className="border border-white rounded-lg p-4 border-[1px]">
            <Image
              src="/icons/payment-svg2.svg"
              alt="payment option 2 icon"
              height={30}
              width={30}
              loading="lazy"
              quality={80}
            />
            <div className="mt-6 space-y-1">
              <h2 className="font-semibold text-base">Once-Off Payments</h2>
              <p className="text-xs font-thin text-slate-100">
                Pay the entire tuition upfront via Bank Transfer or Klarna.
              </p>
            </div>
          </div>

          <div className="border border-white rounded-lg p-4 border-[1px]">
            <Image
              src="/icons/payment-svg3.svg"
              alt="payment option 3 icon"
              height={30}
              width={30}
              loading="lazy"
              quality={80}
            />
            <div className="mt-6 space-y-1">
              <h2 className="font-semibold text-base">Installment Payments</h2>
              <p className="text-xs font-thin text-slate-100">
                Spread payments across months leading up to the program start
                date.
              </p>
            </div>
          </div>

          <div className="border border-white rounded-lg p-4 border-[1px]">
            <Image
              src="/icons/payment-svg4.svg"
              alt="payment option 4 icon"
              height={30}
              width={30}
              loading="lazy"
              quality={80}
            />
            <div className="mt-6 space-y-1">
              <h2 className="font-semibold text-base">Traditional Bank Loan</h2>
              <p className="text-xs font-thin text-slate-100">
                Apply for an education loan from a bank or credit union.
              </p>
            </div>
          </div>

          <div className="border border-white rounded-lg p-4 border-[1px]">
            <Image
              src="/icons/payment-svg5.svg"
              alt="payment option 5 icon"
              height={30}
              width={30}
              loading="lazy"
              quality={80}
            />
            <div className="mt-6 space-y-1">
              <h2 className="font-semibold text-base">
                Income Share Agreements (ISAs)
              </h2>
              <p className="text-xs font-thin text-slate-100">
                Pay tuition after graduating, based on a percentage of your
                income.
              </p>
            </div>
          </div>

          <div className="border border-white rounded-lg p-4 border-[1px]">
            <Image
              src="/icons/payment-svg6.svg"
              alt="payment option 6 icon"
              height={30}
              width={30}
              loading="lazy"
              quality={80}
            />
            <div className="mt-6 space-y-1">
              <h2 className="font-semibold text-base">
                Work-Study or Part-Time Work
              </h2>
              <p className="text-xs font-thin text-slate-100">
                Combine tuition payments with earnings from a part-time job or
                work-study program.
              </p>
            </div>
          </div>

          <div className="border border-white rounded-lg p-4 border-[1px]">
            <Image
              src="/icons/payment-svg7.svg"
              alt="payment option 7 icon"
              height={30}
              width={30}
              loading="lazy"
              quality={80}
            />
            <div className="mt-6 space-y-1">
              <h2 className="font-semibold text-base">Employer Sponsorship</h2>
              <p className="text-xs font-thin text-slate-100">
                Partner with your employer to cover tuition in exchange for a
                commitment to work for the company post-graduation.
              </p>
            </div>
          </div>

          <div className="border border-white rounded-lg p-4 border-[1px]">
            <Image
              src="/icons/payment-svg8.svg"
              alt="payment option 8 icon"
              height={30}
              width={30}
              loading="lazy"
              quality={80}
            />
            <div className="mt-6 space-y-1">
              <h2 className="font-semibold text-base">Community Support</h2>
              <p className="text-xs font-thin text-slate-100">
                Use platforms like GoFundMe to raise tuition funds
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
