import React, { useEffect } from "react";
import { Check } from "lucide-react";

const SubscriptionModal = ({ isOpen = false, onClose }) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        <div className="flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-green-600" />
          </div>

          {/* Content */}
          <h2 className="text-xl font-semibold mb-2">
            Successfully Subscribed!
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Thank you for subscribing to our newsletter. We&apos;ll keep you
            updated with the latest news and updates.
          </p>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
