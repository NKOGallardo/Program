import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div class="container">
        <h1>✅ TRAINING PLAN TABLE (1 DEC – 4 JAN)</h1>
        
        <button class="expand-all-btn" onclick="toggleAll()">Expand All Weeks</button>
        
        <div class="timer-container">
            <h2>⏱️ Workout Timer</h2>
            <div class="timer-display" id="timerDisplay">00:00</div>
            <div class="timer-controls">
                <button class="timer-btn" onclick="startTimer()">▶ Start</button>
                <button class="timer-btn" onclick="pauseTimer()">⏸ Pause</button>
                <button class="timer-btn" onclick="resetTimer()">↻ Reset</button>
            </div>
            <div class="preset-times">
                <button class="preset-btn" onclick="setTimer(30)">30s</button>
                <button class="preset-btn" onclick="setTimer(60)">1 min</button>
                <button class="preset-btn" onclick="setTimer(120)">2 min</button>
                <button class="preset-btn" onclick="setTimer(180)">3 min</button>
                <button class="preset-btn" onclick="setTimer(300)">5 min</button>
                <button class="preset-btn" onclick="setTimer(600)">10 min</button>
            </div>
            <div class="custom-time">
                <input type="number" id="customMinutes" placeholder="Min" min="0" max="99"></input>
                <input type="number" id="customSeconds" placeholder="Sec" min="0" max="59"></input>
                <button class="timer-btn" onclick="setCustomTimer()">Set Custom</button>
            </div>
        </div>

        <div class="week-section">
            <div class="week-header" onclick="toggleWeek(this)">
                <h2>📅 29 Dec – 4 Jan</h2>
                <span class="toggle-icon">▼</span>
            </div>
            <div class="week-content">
                <table>
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Workout Type</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="date-cell">29 Dec</td>
                            <td class="type-cell">Strength + Conditioning</td>
                            <td class="details-cell">Warm Up (3 rounds): 20 shoulder taps, 12 alt V-ups, 8 push ups. Main Work: 20 rounds – 5 burpees, 10 push ups, 15 air squats.</td>
                        </tr>
                        <tr>
                            <td class="date-cell">30 Dec</td>
                            <td class="rest-day">Rest</td>
                            <td class="rest-day">—</td>
                        </tr>
                        <tr>
                            <td class="date-cell">31 Dec</td>
                            <td class="type-cell">Running</td>
                            <td class="details-cell">10-min dynamic warm-up. 8 rounds: 40s sprint / 20s walk. Rest 1 min after 4 rounds. Rest 2 min after 8 rounds. Then: 8 × 80m sprint (walk back to recover).</td>
                        </tr>
                        <tr>
                            <td class="date-cell">1 Jan</td>
                            <td class="rest-day">Rest</td>
                            <td class="rest-day">—</td>
                        </tr>
                        <tr>
                            <td class="date-cell">2 Jan</td>
                            <td class="type-cell">Strength</td>
                            <td class="details-cell">Warm Up (3 rounds): 10/side WGS, 10 push ups, 10 lunges. 30-min AMRAP: 20 lunges, 10 burpees, 20 squat jumps, 10 push ups, 10 sit ups.</td>
                        </tr>
                        <tr>
                            <td class="date-cell">3 Jan</td>
                            <td class="rest-day">Rest Day</td>
                            <td class="rest-day">—</td>
                        </tr>
                        <tr>
                            <td class="date-cell">4 Jan</td>
                            <td class="type-cell">Running</td>
                            <td class="details-cell">10-min dynamic warm up. 6 rounds: 3-min easy run / 1-min sprint / 1-min walk. Then: Rest + own training.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="week-section">
            <div class="week-header" onclick="toggleWeek(this)">
                <h2>📅 22 – 28 December</h2>
                <span class="toggle-icon">▼</span>
            </div>
            <div class="week-content">
                <table>
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Workout Type</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="date-cell">22 Dec</td>
                            <td class="type-cell">Running</td>
                            <td class="details-cell">10-min warm-up. 12 sets: 20s sprint + 10s rest. Rest 5 min. Repeat x2 rounds (24 sets total).</td>
                        </tr>
                        <tr>
                            <td class="date-cell">23 Dec</td>
                            <td class="rest-day">Rest</td>
                            <td class="rest-day">—</td>
                        </tr>
                        <tr>
                            <td class="date-cell">24 Dec</td>
                            <td class="type-cell">Running</td>
                            <td class="details-cell">10-min warm-up. Rolling 100s: 1:30 to complete 100m. Rest with remaining time.</td>
                        </tr>
                        <tr>
                            <td class="date-cell">25 Dec</td>
                            <td class="rest-day">Rest</td>
                            <td class="rest-day">—</td>
                        </tr>
                        <tr>
                            <td class="date-cell">26 Dec</td>
                            <td class="type-cell">Running</td>
                            <td class="details-cell">10-min warm-up. 3 rounds: 10-min run / 2-min walk.</td>
                        </tr>
                        <tr>
                            <td class="date-cell">27 Dec</td>
                            <td class="rest-day">Rest</td>
                            <td class="rest-day">—</td>
                        </tr>
                        <tr>
                            <td class="date-cell">28 Dec</td>
                            <td class="type-cell">Running</td>
                            <td class="details-cell">10-min warm-up. 4 rounds: 8-min run / 2-min walk. Then: Rest + own training.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="week-section">
            <div class="week-header" onclick="toggleWeek(this)">
                <h2>📅 15 – 21 December</h2>
                <span class="toggle-icon">▼</span>
            </div>
            <div class="week-content">
                <table>
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Workout Type</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="date-cell">15 Dec</td>
                            <td class="type-cell">Lower Body</td>
                            <td class="details-cell">Warm Up: 3 rounds – 10 air squats, 10/side WGS, 10 KB swings. 5 Rounds: 5 back squats, 10 jump squats. 5 Rounds: 12 alt jump lunges, 12/side single-leg glute bridge, 1-min wall sit.</td>
                        </tr>
                        <tr>
                            <td class="date-cell">16 Dec</td>
                            <td class="type-cell">Running</td>
                            <td class="details-cell">10-min warm-up. 8 sets: 10 × 22m sprints. Rest 1 min between rounds.</td>
                        </tr>
                        <tr>
                            <td class="date-cell">17 Dec</td>
                            <td class="type-cell">Upper Body</td>
                            <td class="details-cell">Warm Up: 3 rounds – 10 push ups, 20 shoulder taps, 1-min plank. 5 Rounds: 8 bench press, 16 Arnold press. 3 Rounds: 10 push ups, 10 sit ups, 10 strict press, 10 dips, 10 push press.</td>
                        </tr>
                        <tr>
                            <td class="date-cell">18 Dec</td>
                            <td class="type-cell">Running</td>
                            <td class="details-cell">10-min warm-up. Rolling 100s: 1:30 per 100m. Stretch after.</td>
                        </tr>
                        <tr>
                            <td class="date-cell">19 Dec</td>
                            <td class="type-cell">Total Body</td>
                            <td class="details-cell">Warm Up: 3 rounds – thrusters, jump squats, sit ups. 8 × 4-min AMRAP: 5 pull ups, 10 DB snatch, 10 push ups, max plank. Rest 1 min between rounds.</td>
                        </tr>
                        <tr>
                            <td class="date-cell">20 Dec</td>
                            <td class="rest-day">Rest</td>
                            <td class="rest-day">—</td>
                        </tr>
                        <tr>
                            <td class="date-cell">21 Dec</td>
                            <td class="type-cell">Running</td>
                            <td class="details-cell">10-min warm-up. 3 rounds: 10-min run / 2-min walk. Then rest + own training.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="week-section">
            <div class="week-header" onclick="toggleWeek(this)">
                <h2>📅 8 – 14 December</h2>
                <span class="toggle-icon">▼</span>
            </div>
            <div class="week-content">
                <table>
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Workout Type</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="date-cell">8 Dec</td>
                            <td class="type-cell">Lower Body</td>
                            <td class="details-cell">Warm up + 5 rounds: 5 deadlifts, 20 single-leg calf raises. 5 rounds: 12 squats (heels elevated), 1-min walking lunges.</td>
                        </tr>
                        <tr>
                            <td class="date-cell">9 Dec</td>
                            <td class="type-cell">Running</td>
                            <td class="details-cell">10-min warm-up. 6 sets: 8 × 20m sprints. Rest 1 min between sets.</td>
                        </tr>
                        <tr>
                            <td class="date-cell">10 Dec</td>
                            <td class="type-cell">Upper Body</td>
                            <td class="details-cell">Warm up + 5 rounds: 8 shoulder press, 16 sit-up & press. 5 rounds: 10 barbell curls, 5 pull-ups, 10 bent-over rows.</td>
                        </tr>
                        <tr>
                            <td class="date-cell">11 Dec</td>
                            <td class="type-cell">Running</td>
                            <td class="details-cell">10-min warm-up. 12 rounds: 1-min run / 20s walk. Stretch after.</td>
                        </tr>
                        <tr>
                            <td class="date-cell">12 Dec</td>
                            <td class="type-cell">Total Body</td>
                            <td class="details-cell">Warm up + 10 rounds: 30s row sprint / 30s rest. 10 rounds: 10 deadlifts (80kg), 10 burpees over bar.</td>
                        </tr>
                        <tr>
                            <td class="date-cell">13 Dec</td>
                            <td class="rest-day">Rest</td>
                            <td class="rest-day">—</td>
                        </tr>
                        <tr>
                            <td class="date-cell">14 Dec</td>
                            <td class="type-cell">Running</td>
                            <td class="details-cell">40-min easy run. Rest + own training.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="week-section">
            <div class="week-header" onclick="toggleWeek(this)">
                <h2>📅 1 – 7 December</h2>
                <span class="toggle-icon">▼</span>
            </div>
            <div class="week-content">
                <table>
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Workout Type</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="date-cell">1 Dec</td>
                            <td class="type-cell">Lower Body</td>
                            <td class="details-cell">Warm up + 5 rounds: 5 back squats, 20 walking lunges. 5 rounds: 12 Bulgarian split squats, 1-min wall sit, KB swings.</td>
                        </tr>
                        <tr>
                            <td class="date-cell">2 Dec</td>
                            <td class="type-cell">Running</td>
                            <td class="details-cell">10-min warm-up. 4 sets: 6 × 50m sprints. Rest 1 min between sets.</td>
                        </tr>
                        <tr>
                            <td class="date-cell">3 Dec</td>
                            <td class="type-cell">Upper Body</td>
                            <td class="details-cell">Warm up + 5 rounds: 8 bench press, 16 lateral raises. 5 rounds: 10 diamond push ups, 5 pull-ups, KB rows.</td>
                        </tr>
                        <tr>
                            <td class="date-cell">4 Dec</td>
                            <td class="type-cell">Running</td>
                            <td class="details-cell">10-min warm-up. 15 rounds: 1-min run / 30s walk. Stretch after.</td>
                        </tr>
                        <tr>
                            <td class="date-cell">5 Dec</td>
                            <td class="type-cell">Total Body</td>
                            <td class="details-cell">Warm up + 10 rounds: 30s bike sprint / 30s rest. 5 rounds: 10 jump squats, 20 push-up shoulder taps, 30 burpees, back down.</td>
                        </tr>
                        <tr>
                            <td class="date-cell">6 Dec</td>
                            <td class="rest-day">Rest</td>
                            <td class="rest-day">—</td>
                        </tr>
                        <tr>
                            <td class="date-cell">7 Dec</td>
                            <td class="type-cell">Running</td>
                            <td class="details-cell">30-min easy run. Rest + own training.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </>
  )
}

export default App
