/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Calendar, Clock, X, Loader } from "lucide-react";
import { challengeService } from "../services/challengeService";
import toast from "react-hot-toast";

const ChallengeModal = ({ isOpen, onClose, selectedUser, onSubmit }) => {
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedCourt, setSelectedCourt] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [availableCourts, setAvailableCourts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTimes = async () => {
      if (isOpen) {
        try {
          setIsLoading(true);
          const times = await challengeService.getAvailableTimes(new Date());
          setAvailableTimes(times);
        } catch (err) {
          toast.error("Failed to load available times. Please try again.");
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchTimes();
  }, [isOpen]);

  useEffect(() => {
    const fetchCourts = async () => {
      if (selectedTime) {
        try {
          setIsLoading(true);
          const courts = await challengeService.getAvailableCourts(
            new Date(),
            selectedTime
          );
          setAvailableCourts(courts);
        } catch (err) {
          toast.error("Failed to load available courts. Please try again.");
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchCourts();
  }, [selectedTime]);

  const handleSubmit = async () => {
    const loadingToast = toast.loading("Sending challenge...");
    try {
      setIsSubmitting(true);
      await onSubmit({ selectedTime, selectedCourt });
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
    setSelectedCourt("");
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
              Set up your match details below.
            </p>
          </div>

          {/* Modal Body */}
          <div className="p-4 space-y-4">
            {/* Time Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Time
              </label>
              <div className="relative">
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  disabled={isLoading || isSubmitting}
                  className="w-full px-3 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50"
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

            {/* Court Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Court
              </label>
              <div className="relative">
                <select
                  value={selectedCourt}
                  onChange={(e) => setSelectedCourt(e.target.value)}
                  disabled={!selectedTime || isLoading || isSubmitting}
                  className="w-full px-3 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50"
                >
                  <option value="">Select court</option>
                  {availableCourts.map((court) => (
                    <option key={court} value={court}>
                      {court}
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
                <span>Match will be scheduled for today</span>
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
              disabled={!selectedTime || !selectedCourt || isSubmitting}
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
