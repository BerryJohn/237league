# ✅ Tasks – Assetto Corsa Competizione 237League 

## 1. Authentication and User Profile

### Backend
- [ ] Integrate Steam login (OAuth)
- [ ] Fetch user data from Steam (SteamID, nickname, avatar)
- [ ] Create user profile on first login
- [ ] API to update profile data (car, race number, team)

### Frontend
- [ ] Login page with "Login via Steam" button
- [ ] Profile form to complete user information
- [ ] User profile view
- [ ] List of league drivers

---

## 2. Pre-Qualifying (PreQ)

### Backend
- [ ] API endpoint to fetch best lap times for each track
- [ ] Manual or automatic import of lap times (e.g., from ACC logs)

### Frontend
- [ ] PreQ leaderboard table (driver, car, track, time, date)
- [ ] Filters by track and date

---

## 3. Race Results

### Backend
- [ ] Race model (track, date, round, results)
- [ ] API endpoint to fetch and submit race results (CSV/JSON)

### Frontend
- [ ] Race results view
- [ ] List of all completed races

---

## 4. Championship Standings

### Backend
- [ ] Calculate overall standings based on race points
- [ ] API endpoint to fetch the standings

### Frontend
- [ ] Standings table (position, driver, points, starts)
- [ ] Sort and filter options

---

## 5. Data Structure and Database

- [ ] User (SteamID, nickname, avatar, car, team, race number)
- [ ] PreQ result (user_id, track, time, date)
- [ ] Race (id, date, track, round)
- [ ] Race result (user_id, position, points, time, round)
- [ ] Standings (calculated dynamically or cached)

---

## 6. Integrations and Automation (Optional)

- [ ] Parser for ACC log/preq/race_results files
- [ ] Scheduler to auto-import data (e.g., CRON job)
