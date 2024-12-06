/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Calendar, Clock, X, Loader } from "lucide-react";
import toast from "react-hot-toast";

const ChallengeModal = ({ isOpen, onClose, selectedUser, onSubmit }) => {
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split("T")[0];

  // Get date 14 days from today for max date
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
  const maxDate = twoWeeksFromNow.toISOString().split("T")[0];

  useEffect(() => {
    const fetchTimes = async () => {
      if (isOpen && selectedDate) {
        try {
          setIsLoading(true);
          // Generate time slots from 6 AM to 10 PM
          const times = [];
          for (let hour = 6; hour <= 22; hour++) {
            const formattedHour = hour.toString().padStart(2, "0");
            times.push(`${formattedHour}:00`);
          }
          setAvailableTimes(times);
        } catch (err) {
          toast.error("Failed to load available times. Please try again.");
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchTimes();
  }, [isOpen, selectedDate]);

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time");
      return;
    }

    const loadingToast = toast.loading("Sending challenge...");
    try {
      setIsSubmitting(true);
      await onSubmit({ selectedTime, selectedDate });
      toast.success(`Challenge sent to ${selectedUser.name}!`, {
        id: loadingToast,
      });
      handleClose();
    } catch (err) {
      toast.error("Failed to send challenge. Please try again.", {
        id: loadingToast,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedTime("");
    setSelectedDate("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />

      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div
          className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="p-4 border-b dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Challenge {selectedUser?.name}
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                disabled={isSubmitting}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Select your preferred date and time for the match
            </p>
          </div>

          {/* Modal Body */}
          <div className="p-4 space-y-4">
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  min={today}
                  max={maxDate}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                Time
              </label>
              <div className="relative">
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  disabled={!selectedDate || isLoading}
                  className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select time</option>
                  {availableTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {isLoading && (
                  <Loader className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
                )}
              </div>
            </div>

            {/* Information Notes */}
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="mr-2 h-4 w-4" />
                <span>You can schedule matches up to 2 weeks in advance</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="mr-2 h-4 w-4" />
                <span>
                  Both players must be at the court to start the match
                </span>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t dark:border-gray-700 flex justify-end space-x-3">
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-4 py-2 border dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedDate || !selectedTime || isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Sending...
                </>
              ) : (
                "Send Challenge"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChallengeModal;
