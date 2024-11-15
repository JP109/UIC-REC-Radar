export const challengeService = {
  sendChallenge: async (challengeData) => {
    fetch("https://uic-rec-radar.onrender.com/api/challenges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(challengeData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
  },

  getAvailableTimes: async (date) => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          "09:00 AM",
          "10:00 AM",
          "11:00 AM",
          "12:00 PM",
          "01:00 PM",
          "02:00 PM",
          "03:00 PM",
          "04:00 PM",
          "05:00 PM",
        ]);
      }, 500);
    });
  },

  getAvailableCourts: async (date, time) => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(["Court 1", "Court 2", "Court 3", "Court 4"]);
      }, 500);
    });
  },
};
