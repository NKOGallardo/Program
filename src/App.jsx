import { useState, useRef, useEffect, useCallback } from 'react';
import './App.css'; // Assuming your CSS is correct

// Refactored React Component
function App() {
    // --- State Management ---
    const [allExpanded, setAllExpanded] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [customMinutes, setCustomMinutes] = useState('');
    const [customSeconds, setCustomSeconds] = useState('');
    
    // Using an object to track which weeks are expanded
    const [expandedWeeks, setExpandedWeeks] = useState({});

    // Ref to hold the interval ID without re-rendering
    const timerIntervalRef = useRef(null);

    // --- Helper Functions (Memoized for stability) ---

    // Week Toggling
    const toggleWeek = useCallback((weekIndex) => {
        setExpandedWeeks(prev => ({
            ...prev,
            [weekIndex]: !prev[weekIndex]
        }));
    }, []);

    const toggleAll = useCallback(() => {
        const newExpandedState = !allExpanded;
        setAllExpanded(newExpandedState);
        
        // Assuming there are 5 weeks (0 to 4), hardcode or derive dynamically
        const allWeekIndices = [0, 1, 2, 3, 4]; 
        const newExpandedWeeks = allWeekIndices.reduce((acc, index) => {
            acc[index] = newExpandedState;
            return acc;
        }, {});
        
        setExpandedWeeks(newExpandedWeeks);
    }, [allExpanded]);


    // Timer Functions

    const playAlertSound = useCallback(() => {
        // Standard Web Audio API for sound
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // First beep
            const oscillator1 = audioContext.createOscillator();
            const gainNode1 = audioContext.createGain();
            oscillator1.connect(gainNode1);
            gainNode1.connect(audioContext.destination);
            oscillator1.frequency.value = 800;
            gainNode1.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator1.start(audioContext.currentTime);
            oscillator1.stop(audioContext.currentTime + 0.5);

            // Second beep slightly later
            setTimeout(() => {
                const oscillator2 = audioContext.createOscillator();
                const gainNode2 = audioContext.createGain();
                oscillator2.connect(gainNode2);
                gainNode2.connect(audioContext.destination);
                oscillator2.frequency.value = 600;
                gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                oscillator2.start(audioContext.currentTime);
                oscillator2.stop(audioContext.currentTime + 0.5);
            }, 150);
        } catch (error) {
            console.error("Audio playback failed:", error);
        }
    }, []);

    const resetTimer = useCallback(() => {
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
        }
        setRemainingTime(0);
        setIsTimerRunning(false);
    }, []);

    const startTimer = useCallback(() => {
        if (remainingTime === 0) return;
        
        // Clear any existing interval
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
        }

        setIsTimerRunning(true);
        
        // Start new interval
        timerIntervalRef.current = setInterval(() => {
            setRemainingTime(prevTime => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    // Time's up
                    if (timerIntervalRef.current) {
                        clearInterval(timerIntervalRef.current);
                        timerIntervalRef.current = null;
                        setIsTimerRunning(false);
                        playAlertSound();
                    }
                    return 0;
                }
            });
        }, 1000);
    }, [remainingTime, playAlertSound]);

    const pauseTimer = useCallback(() => {
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
            setIsTimerRunning(false);
        }
    }, []);

    const setTimer = useCallback((seconds) => {
        resetTimer();
        setRemainingTime(seconds);
    }, [resetTimer]);

    const setCustomTimer = useCallback(() => {
        const minutes = parseInt(customMinutes) || 0;
        const seconds = parseInt(customSeconds) || 0;
        const totalSeconds = (minutes * 60) + seconds;
        
        if (totalSeconds > 0) {
            setTimer(totalSeconds);
            setCustomMinutes('');
            setCustomSeconds('');
        }
    }, [customMinutes, customSeconds, setTimer]);

    // --- Effects ---

    // Cleanup interval on component unmount
    useEffect(() => {
        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
            }
        };
    }, []);

    // Initial state: Expand the first week and set initial time display to 00:00
    useEffect(() => {
        setExpandedWeeks(prev => ({ ...prev, 0: true }));
        // Initial remainingTime is 0, so updateDisplay logic is implicitly handled by the render.
    }, []);

    // --- Render Helpers ---

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const weekData = [
        { 
            dateRange: '29 Dec – 4 Jan', 
            id: 0,
            workouts: [
                { date: '29 Dec', type: 'Strength + Conditioning', details: 'Warm Up (3 rounds): 20 shoulder taps, 12 alt V-ups, 8 push ups. Main Work: 20 rounds – 5 burpees, 10 push ups, 15 air squats.' },
                { date: '30 Dec', type: 'Rest', details: '—', isRest: true },
                { date: '31 Dec', type: 'Running', details: '10-min dynamic warm-up. 8 rounds: 40s sprint / 20s walk. Rest 1 min after 4 rounds. Rest 2 min after 8 rounds. Then: 8 × 80m sprint (walk back to recover).' },
                { date: '1 Jan', type: 'Rest', details: '—', isRest: true },
                { date: '2 Jan', type: 'Strength', details: 'Warm Up (3 rounds): 10/side WGS, 10 push ups, 10 lunges. 30-min AMRAP: 20 lunges, 10 burpees, 20 squat jumps, 10 push ups, 10 sit ups.' },
                { date: '3 Jan', type: 'Rest Day', details: '—', isRest: true },
                { date: '4 Jan', type: 'Running', details: '10-min dynamic warm up. 6 rounds: 3-min easy run / 1-min sprint / 1-min walk. Then: Rest + own training.' },
            ]
        },
        { 
            dateRange: '22 – 28 December', 
            id: 1,
            workouts: [
                { date: '22 Dec', type: 'Running', details: '10-min warm-up. 12 sets: 20s sprint + 10s rest. Rest 5 min. Repeat x2 rounds (24 sets total).' },
                { date: '23 Dec', type: 'Rest', details: '—', isRest: true },
                { date: '24 Dec', type: 'Running', details: '10-min warm-up. Rolling 100s: 1:30 to complete 100m. Rest with remaining time.' },
                { date: '25 Dec', type: 'Rest', details: '—', isRest: true },
                { date: '26 Dec', type: 'Running', details: '10-min warm-up. 3 rounds: 10-min run / 2-min walk.' },
                { date: '27 Dec', type: 'Rest', details: '—', isRest: true },
                { date: '28 Dec', type: 'Running', details: '10-min warm-up. 4 rounds: 8-min run / 2-min walk. Then: Rest + own training.' },
            ]
        },
        { 
            dateRange: '15 – 21 December', 
            id: 2,
            workouts: [
                { date: '15 Dec', type: 'Lower Body', details: 'Warm Up: 3 rounds – 10 air squats, 10/side WGS, 10 KB swings. 5 Rounds: 5 back squats, 10 jump squats. 5 Rounds: 12 alt jump lunges, 12/side single-leg glute bridge, 1-min wall sit.' },
                { date: '16 Dec', type: 'Running', details: '10-min warm-up. 8 sets: 10 × 22m sprints. Rest 1 min between rounds.' },
                { date: '17 Dec', type: 'Upper Body', details: 'Warm Up: 3 rounds – 10 push ups, 20 shoulder taps, 1-min plank. 5 Rounds: 8 bench press, 16 Arnold press. 3 Rounds: 10 push ups, 10 sit ups, 10 strict press, 10 dips, 10 push press.' },
                { date: '18 Dec', type: 'Running', details: '10-min warm-up. Rolling 100s: 1:30 per 100m. Stretch after.' },
                { date: '19 Dec', type: 'Total Body', details: 'Warm Up: 3 rounds – thrusters, jump squats, sit ups. 8 × 4-min AMRAP: 5 pull ups, 10 DB snatch, 10 push ups, max plank. Rest 1 min between rounds.' },
                { date: '20 Dec', type: 'Rest', details: '—', isRest: true },
                { date: '21 Dec', type: 'Running', details: '10-min warm-up. 3 rounds: 10-min run / 2-min walk. Then rest + own training.' },
            ]
        },
        { 
            dateRange: '8 – 14 December', 
            id: 3,
            workouts: [
                { date: '8 Dec', type: 'Lower Body', details: 'Warm up + 5 rounds: 5 deadlifts, 20 single-leg calf raises. 5 rounds: 12 squats (heels elevated), 1-min walking lunges.' },
                { date: '9 Dec', type: 'Running', details: '10-min warm-up. 6 sets: 8 × 20m sprints. Rest 1 min between sets.' },
                { date: '10 Dec', type: 'Upper Body', details: 'Warm up + 5 rounds: 8 shoulder press, 16 sit-up & press. 5 rounds: 10 barbell curls, 5 pull-ups, 10 bent-over rows.' },
                { date: '11 Dec', type: 'Running', details: '10-min warm-up. 12 rounds: 1-min run / 20s walk. Stretch after.' },
                { date: '12 Dec', type: 'Total Body', details: 'Warm up + 10 rounds: 30s row sprint / 30s rest. 10 rounds: 10 deadlifts (80kg), 10 burpees over bar.' },
                { date: '13 Dec', type: 'Rest', details: '—', isRest: true },
                { date: '14 Dec', type: 'Running', details: '40-min easy run. Rest + own training.' },
            ]
        },
        { 
            dateRange: '1 – 7 December', 
            id: 4,
            workouts: [
                { date: '1 Dec', type: 'Lower Body', details: 'Warm up + 5 rounds: 5 back squats, 20 walking lunges. 5 rounds: 12 Bulgarian split squats, 1-min wall sit, KB swings.' },
                { date: '2 Dec', type: 'Running', details: '10-min warm-up. 4 sets: 6 × 50m sprints. Rest 1 min between sets.' },
                { date: '3 Dec', type: 'Upper Body', details: 'Warm up + 5 rounds: 8 bench press, 16 lateral raises. 5 rounds: 10 diamond push ups, 5 pull-ups, KB rows.' },
                { date: '4 Dec', type: 'Running', details: '10-min warm-up. 15 rounds: 1-min run / 30s walk. Stretch after.' },
                { date: '5 Dec', type: 'Total Body', details: 'Warm up + 10 rounds: 30s bike sprint / 30s rest. 5 rounds: 10 jump squats, 20 push-up shoulder taps, 30 burpees, back down.' },
                { date: '6 Dec', type: 'Rest', details: '—', isRest: true },
                { date: '7 Dec', type: 'Running', details: '30-min easy run. Rest + own training.' },
            ]
        },
    ].reverse(); // Reverse the array to display the latest week first (29 Dec – 4 Jan)

    // --- JSX Return ---
    return (
        <div className="container">
            <h1>✅ TRAINING PLAN TABLE (1 DEC – 4 JAN)</h1>
            
            <button className="expand-all-btn" onClick={toggleAll}>
                {allExpanded ? 'Collapse All Weeks' : 'Expand All Weeks'}
            </button>
            
            <div className="timer-container">
                <h2>⏱️ Workout Timer</h2>
                <div 
                    className={`timer-display ${remainingTime === 0 && !isTimerRunning ? 'timer-finished' : ''}`} 
                    id="timerDisplay"
                >
                    {formatTime(remainingTime)}
                </div>
                <div className="timer-controls">
                    <button className="timer-btn" onClick={isTimerRunning ? pauseTimer : startTimer}>
                        {isTimerRunning ? '⏸ Pause' : remainingTime > 0 ? '▶ Continue' : '▶ Start'}
                    </button>
                    <button className="timer-btn" onClick={resetTimer}>↻ Reset</button>
                </div>
                <div className="preset-times">
                    <button className="preset-btn" onClick={() => setTimer(30)}>30s</button>
                    <button className="preset-btn" onClick={() => setTimer(60)}>1 min</button>
                    <button className="preset-btn" onClick={() => setTimer(120)}>2 min</button>
                    <button className="preset-btn" onClick={() => setTimer(180)}>3 min</button>
                    <button className="preset-btn" onClick={() => setTimer(300)}>5 min</button>
                    <button className="preset-btn" onClick={() => setTimer(600)}>10 min</button>
                </div>
                <div className="custom-time">
                    <input 
                        type="number" 
                        placeholder="Min" 
                        min="0" max="99"
                        value={customMinutes}
                        onChange={(e) => setCustomMinutes(e.target.value)}
                    />
                    <input 
                        type="number" 
                        placeholder="Sec" 
                        min="0" max="59"
                        value={customSeconds}
                        onChange={(e) => setCustomSeconds(e.target.value)}
                    />
                    <button className="timer-btn" onClick={setCustomTimer}>Set Custom</button>
                </div>
            </div>

            {weekData.map((week, index) => (
                <div key={week.id} className="week-section">
                    <div className="week-header" onClick={() => toggleWeek(week.id)}>
                        <h2>📅 {week.dateRange}</h2>
                        <span className={`toggle-icon ${expandedWeeks[week.id] ? 'rotated' : ''}`}>▼</span>
                    </div>
                    <div className={`week-content ${expandedWeeks[week.id] ? 'expanded' : ''}`}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Workout Type</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {week.workouts.map((day, dayIndex) => (
                                    <tr key={dayIndex}>
                                        <td className="date-cell">{day.date}</td>
                                        <td className={`type-cell ${day.isRest ? 'rest-day' : ''}`}>{day.type}</td>
                                        <td className={`details-cell ${day.isRest ? 'rest-day' : ''}`}>{day.details}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default App;