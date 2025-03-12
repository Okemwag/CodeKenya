import React, { useEffect } from "react";
import { Check, AlertTriangle } from "lucide-react";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  isError: boolean;
}

const SubscriptionModal = ({
  isOpen = false,
  onClose,
  message,
  isError,
}: SubscriptionModalProps) => {
  useEffect(() => {
    const handleEscape = (e: { key: string }) => {
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
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        <div className="flex flex-col items-center text-center">
          <div
            className={`h-12 w-12 rounded-full flex items-center justify-center mb-2 ${
              isError ? "bg-red-100" : "bg-green-100"
            }`}
          >
            {isError ? (
              <AlertTriangle className="text-red-500" />
            ) : (
              <Check className="text-green-500" />
            )}
          </div>
          <h2
            className={`text-xl ${
              isError ? "text-red-500" : "text-green-500"
            }  font-semibold mb-2`}
          >
            {isError ? "Subscription Failed" : "Successfully Subscribed!"}
          </h2>
          <p className="text-sm text-gray-500 mb-6">{message}</p>
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
