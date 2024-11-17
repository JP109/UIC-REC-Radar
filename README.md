# **UIC-REC-Radar**

**UIC-REC-Radar** is an interactive social sports platform designed to connect players seeking live challenges or game partners at UIC's REC Center. With a range of engaging features, this app enhances the recreational experience by enabling seamless match organization and real-time tracking of player stats.

## **Features**

### **1. Player Challenges**

- Search and view all registered players in the **Challenge** tab.
- Filter players by rank to find opponents that match your skill level.
- Send a challenge request to any player, specifying a proposed time for the match.
- The challenged player receives a notification on their homepage with the challenger's name and proposed time.
- If the challenge is accepted, the match begins. Both players decide the winner and click on the winner's name in the match notification.

### **2. Points System**

- The winner of each match earns points, which are displayed in the navigation bar.
- Points are gained from the loser, with a points-based ranking system that adds a competitive edge.

### **3. Daily Check-in**

- Players can check into the REC Center by clicking the **"Check-in"** button on the **Home** tab, but only if they are within a 100-meter radius of the REC Center (determined by their location).
- Each successful check-in awards the player **+1 point**, encouraging regular visits and activity.

### **4. Fraud Detection Algorithm**

- A basic fraud detection mechanism is implemented to prevent users from gaming the system by repeatedly challenging and defeating the same players.
- Points are adjusted based on the **confidence levels** of both the winner and the loser, ensuring a more authentic and fair points distribution.

### **5. Live Occupancy**

- Player check-in data is aggregated on the backend and displayed in the **Live Occupancy** tab.
- View real-time check-ins and occupancy trends at the REC Center.

### **6. Leaderboard**

- The **Leaderboard** showcases the top players with the highest points, promoting healthy competition within the community.
- Track your progress against others and see where you rank in the overall points tally.

## **Created Using**

- **Frontend**: React
- **Backend**: Node.js with Express
- **Database**: Supabase
