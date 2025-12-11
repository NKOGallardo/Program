# 🏋️ Training Plan Tracker

A modern, interactive web-based training plan with an integrated workout timer. Track your workouts from December 1st through January 4th with style and functionality.

## ✨ Features

### 📅 Training Plan Table

- **5 Weekly Sections** - Organized by date ranges (Dec 1 - Jan 4)
- **Collapsible Weeks** - Click any week header to expand/collapse workout details
- **Expand/Collapse All** - Quick button to show or hide all weeks at once
- **Color-Coded Workouts** - Different workout types (Lower Body, Upper Body, Running, Total Body, Strength, Rest Days)
- **Detailed Instructions** - Complete warm-up routines and main workout details for each day

### ⏱️ Workout Timer

- **Digital Countdown Display** - Large, easy-to-read timer
- **Full Controls** - Start, Pause, and Reset buttons
- **Quick Presets** - One-click buttons for common intervals:
  - 30 seconds
  - 1 minute
  - 2 minutes
  - 3 minutes
  - 5 minutes
  - 10 minutes
- **Custom Timer** - Set any custom time using minutes and seconds
- **Audio Alert** - Sound notification when timer reaches zero
- **Visual Alert** - Pulsing animation when timer completes

### 🎨 Design Features

- **Modern Gradient Theme** - Purple gradient aesthetic throughout
- **Smooth Animations** - Hover effects and transitions
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Clean Layout** - Easy to read and navigate

## 🚀 Getting Started

### Installation

1. **Download the HTML file**

   ```bash
   # Save the HTML file to your computer
   training-plan.html
   ```

2. **Open in Browser**
   - Double-click the HTML file, or
   - Right-click and select "Open with" → Your preferred browser

### No Installation Required!

This is a standalone HTML file with embedded CSS and JavaScript. No dependencies, no build process, no server needed.

## 📖 How to Use

### Viewing Your Training Plan

1. **Navigate Weeks**

   - Click on any week header (📅 date range) to expand/collapse
   - Use the "Expand All Weeks" button to see everything at once

2. **Read Workout Details**

   - Each day shows:
     - Date
     - Workout Type (Lower Body, Upper Body, Running, etc.)
     - Detailed instructions including warm-ups and main work

3. **Identify Rest Days**
   - Rest days are styled in gray italic text for easy identification

### Using the Timer

1. **Quick Start with Presets**

   - Click any preset button (30s, 1min, 2min, etc.)
   - Click "▶ Start" to begin countdown

2. **Set Custom Time**

   - Enter minutes in the "Min" field
   - Enter seconds in the "Sec" field
   - Click "Set Custom" button
   - Click "▶ Start" to begin

3. **Control the Timer**

   - **▶ Start** - Begin or resume countdown
   - **⏸ Pause** - Pause the timer
   - **↻ Reset** - Stop and reset to 00:00

4. **Timer Alerts**
   - Audio beep plays when timer reaches zero
   - Timer display pulses and changes color

## 💡 Use Cases

### Perfect for Timing:

- Sprint intervals (20s, 30s, 40s, etc.)
- Rest periods between sets
- AMRAP (As Many Rounds As Possible) workouts
- Plank holds and wall sits
- Recovery walks between rounds
- Any timed exercise in your training plan

## 🎯 Training Plan Overview

### Week 1: December 1-7

- Lower Body focus with squats and lunges
- Running drills with sprint intervals
- Upper Body work with pressing movements
- Total Body conditioning

### Week 2: December 8-14

- Lower Body with deadlifts and elevated squats
- Increased running volume
- Upper Body with rows and pull-ups
- Total Body with rowing and barbell work

### Week 3: December 15-21

- Lower Body with plyometrics
- Sprint training progression
- Upper Body with compound movements
- Total Body AMRAP sessions

### Week 4: December 22-28

- Running-focused week
- Sprint intervals and rolling 100s
- Active recovery with easy runs

### Week 5: December 29 - January 4

- Strength and conditioning blend
- Sprint work with longer distances
- AMRAP endurance sessions
- Program completion

## 🛠️ Technical Details

### Technologies Used

- **HTML5** - Structure and content
- **CSS3** - Styling and animations
- **Vanilla JavaScript** - Interactive functionality
- **Web Audio API** - Timer alert sounds

### Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- Works on all modern browsers with JavaScript enabled

### File Size

- Single file: ~25-30 KB
- No external dependencies
- Fast loading time

## 🎨 Customization

### Changing Colors

Edit the CSS gradient values in the `<style>` section:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Adding More Weeks

Duplicate a week section in the HTML and update the content:

```html
<div class="week-section">
  <div class="week-header" onclick="toggleWeek(this)">
    <h2>📅 Your Date Range</h2>
    <span class="toggle-icon">▼</span>
  </div>
  <div class="week-content">
    <!-- Add your table here -->
  </div>
</div>
```

### Modifying Timer Presets

Update the preset buttons with your preferred times:

```html
<button class="preset-btn" onclick="setTimer(45)">45s</button>
```

## 📱 Mobile Usage Tips

- Rotate to landscape for better table viewing
- Use preset timer buttons for easier tapping
- Pinch to zoom on workout details if needed
- Timer display is large and touch-friendly

## 🤝 Contributing

Feel free to customize this training plan for your own needs:

- Add your own exercises
- Modify workout structures
- Adjust timer presets
- Change color schemes
- Add additional features

## 📝 License

Free to use and modify for personal fitness tracking.

## 🆘 Troubleshooting

### Timer not working?

- Ensure JavaScript is enabled in your browser
- Try refreshing the page
- Check browser console for errors

### Weeks won't expand/collapse?

- Make sure JavaScript is enabled
- Try a different browser
- Clear browser cache and reload

### Audio alert not playing?

- Some browsers block autoplay audio
- Click anywhere on the page first to enable audio
- Check your device volume settings

## 📧 Support

For issues or questions, refer to this README or modify the code to suit your needs.

---

**Stay consistent, track your progress, and crush your fitness goals! 💪**
