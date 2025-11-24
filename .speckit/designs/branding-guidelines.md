# PFA App - Branding & Design Guidelines

## Brand Identity

### Premier Fitness Alliance
**Website:** https://www.premierfa.com/
**Location:** Wethersfield, Connecticut

**Mission Statement:**
"Empower the next generation of female athletes by harmonizing elite science with authentic mentorship."

**Core Values:**
- Unapologetic authenticity
- Precision training using biomechanics
- Protection and development of young athletes
- Authentic mentorship and support

### Target Audience
- **Primary**: Female soccer athletes (ages 12-18, youth to high school)
- **Secondary**: Parents of young athletes
- **Tertiary**: High school athletic programs and coaches

### Brand Personality
- **Professional** - Elite-level training standards
- **Supportive** - Mentorship-focused approach
- **Scientific** - Biomechanics-based methodology
- **Aspirational** - Empowering next-generation athletes
- **Authentic** - Genuine care and development

## Visual Design

### Color Palette

Based on Premier FA website analysis:

#### Primary Colors
- **Dark Navy/Black**: `#1a1a1a` - Professional, strong, elite
  - Use for: Headers, primary text, navigation bars
- **White**: `#FFFFFF` - Clean, professional
  - Use for: Backgrounds, contrast text, cards

#### Accent Colors (Recommendations for App)
- **Action Green**: `#00D084` - Success, achievement, progress
  - Use for: Completed exercises, met targets, success indicators
- **Warning Yellow**: `#FFB800` - Caution, slight underperformance
  - Use for: Close-to-target indicators, warnings
- **Athletic Blue**: `#0066CC` - Trust, performance, professional
  - Use for: Primary buttons, links, interactive elements
- **Alert Red**: `#DC3545` - Errors, significantly under target
  - Use for: Error states, skipped sets, failures

#### Neutral Colors
- **Gray Scale**:
  - Light Gray: `#F5F5F5` - Backgrounds, separators
  - Medium Gray: `#9E9E9E` - Secondary text, disabled states
  - Dark Gray: `#424242` - Body text, icons

### Typography

#### Font Recommendations
- **Primary Font**: **Inter** or **SF Pro** (iOS native)
  - Clean, modern, highly readable
  - Excellent for data and numbers
  - Professional athletic aesthetic

- **Headings**: Bold (700) or Semi-Bold (600)
  - Workout names, section headers

- **Body Text**: Regular (400) or Medium (500)
  - Exercise descriptions, notes

- **Data/Numbers**: Semi-Bold (600) or Bold (700)
  - Sets, reps, weights - need to stand out

#### Font Sizes
- **Extra Large (32px)**: Workout titles, main headers
- **Large (24px)**: Section headers, exercise names
- **Medium (18px)**: Subheaders, important data
- **Regular (16px)**: Body text, descriptions
- **Small (14px)**: Secondary info, metadata
- **Extra Small (12px)**: Captions, timestamps

### Logo Usage

**Primary Logo**: "PFA Wormdark White" (from website)
- Display in app header/splash screen
- Maintain proper spacing and proportions
- Don't stretch or distort
- Minimum size: 120px width

**Icon/App Icon**:
- Simplified "PFA" letters or logo mark
- High contrast for visibility
- Must work at small sizes (60x60px to 1024x1024px)

## UI Components

### Buttons

#### Primary Action Button
- **Style**: Rounded corners (8px), bold text
- **Color**: Athletic Blue background, white text
- **Size**: Minimum 44px height (iOS touch target)
- **States**: Normal, Pressed, Disabled
- **Use**: "Start Workout", "Log Set", "Save"

#### Secondary Button
- **Style**: Outlined, no fill
- **Color**: Dark border, dark text
- **Use**: "Cancel", "Skip", "Back"

#### Destructive Button
- **Style**: Same as primary
- **Color**: Alert Red background, white text
- **Use**: "Delete Workout", "Abandon Session"

### Cards

#### Workout Card
```
┌────────────────────────────┐
│ [Video Thumbnail]          │
│ Workout Name               │
│ Category Badge • 45 min    │
│ 8 exercises                │
└────────────────────────────┘
```
- White background
- 12px border radius
- Subtle shadow (elevation 2)
- Tappable (navigate to detail)

#### Exercise Card (During Workout)
```
┌────────────────────────────┐
│ Exercise Name              │
│ Target: 3 × 10 @ 50 lbs    │
│ ────────────────────────   │
│ [Set logging interface]    │
└────────────────────────────┘
```
- Prominent display of targets
- Clear visual hierarchy
- Easy-to-tap input fields

### Performance Indicators

#### Visual Indicators for Logged Performance

**✓ Met/Exceeded Target** (Green)
- Icon: Checkmark circle ✓
- Color: Action Green (#00D084)
- Use when: `actual >= target`

**⚠ Close to Target** (Yellow)
- Icon: Warning triangle ⚠
- Color: Warning Yellow (#FFB800)
- Use when: `actual >= 80% of target`

**✗ Under Target** (Red)
- Icon: X circle ✗
- Color: Alert Red (#DC3545)
- Use when: `actual < 80% of target`

**– Skipped** (Gray)
- Icon: Minus circle –
- Color: Medium Gray (#9E9E9E)
- Use when: Set not completed

### Navigation

#### Bottom Tab Bar (Primary Navigation)
- **Coaches**:
  1. Athletes (icon: people)
  2. Workouts (icon: clipboard)
  3. Profile (icon: person)

- **Athletes**:
  1. My Workouts (icon: clipboard)
  2. History (icon: chart)
  3. Profile (icon: person)

#### Top Navigation Bar
- Dark background (#1a1a1a)
- White text and icons
- PFA logo centered or left-aligned
- Back button (left), action buttons (right)

### Forms & Inputs

#### Text Input
- Border radius: 8px
- Border: 1px solid light gray
- Focus state: Blue border (2px)
- Height: 48px minimum
- Padding: 12px horizontal

#### Number Input (for sets/reps/weight)
- Large, easy-to-tap
- Include +/- stepper buttons
- Clear visual feedback
- Font size: 24px for numbers

#### Dropdown/Select
- Native iOS picker when possible
- Clear label above
- Selected value prominently displayed

## Iconography

### Icon Style
- **Style**: Line icons (not filled)
- **Weight**: Medium (2px stroke)
- **Size**: 24px standard, 20px small, 32px large
- **Color**: Inherit from context (usually dark or white)

### Key Icons
- **Dumbbell**: Strength training
- **Running**: Cardio/conditioning
- **Stretching**: Flexibility/recovery
- **Soccer ball**: Sport-specific exercises
- **Clipboard/List**: Workouts
- **Chart/Graph**: Progress/history
- **Camera/Video**: Video exercises
- **Checkmark**: Completed
- **Clock**: Duration/time
- **Calendar**: Schedule

## Screen Layouts

### General Principles
- **Safe Areas**: Respect iOS safe areas (notch, home indicator)
- **Spacing**: Use 8px grid system (8, 16, 24, 32px)
- **Content Width**: Max 600px for readability on tablets
- **Touch Targets**: Minimum 44x44px
- **Scrolling**: Vertical scroll primary, horizontal for secondary content

### Key Screens

#### 1. Athlete Workout List
```
┌─────────────────────────────────┐
│ ← My Workouts                   │
├─────────────────────────────────┤
│                                 │
│  Active Workouts                │
│  ┌─────────────────────────┐   │
│  │ [Video]                 │   │
│  │ Leg Day                 │   │
│  │ Strength • 45 min       │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ [Video]                 │   │
│  │ Speed Training          │   │
│  │ Conditioning • 30 min   │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

#### 2. Active Workout (Logging)
```
┌─────────────────────────────────┐
│ ← Exercise 2 of 5               │
├─────────────────────────────────┤
│ Box Jumps                       │
│ Target: 3 sets × 10 reps        │
│                                 │
│ Set 1 ✓  10 reps                │
│ Set 2 ✓  10 reps                │
│ ─────────────────────────       │
│ Set 3 (Current)                 │
│                                 │
│  Reps                           │
│  [   10   ] [-] [+]             │
│                                 │
│  [Log Set]  [Skip Set]          │
│                                 │
│ ─────────────────────────       │
│ Rest: 01:30 ●●●●○○○○            │
│                                 │
│ [Add Another Set]               │
│ [Complete Exercise]             │
└─────────────────────────────────┘
```

#### 3. Workout History
```
┌─────────────────────────────────┐
│ ← History                       │
├─────────────────────────────────┤
│                                 │
│  This Week                      │
│  ┌─────────────────────────┐   │
│  │ Leg Day         ✓       │   │
│  │ Today • 47 min          │   │
│  │ 5/5 exercises           │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Speed Training  ✓       │   │
│  │ 2 days ago • 32 min     │   │
│  │ 4/4 exercises           │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

## Motion & Animation

### General Principles
- **Purposeful**: Animations should guide attention and provide feedback
- **Quick**: 200-300ms for most transitions
- **Natural**: Ease-in-out curves feel most natural
- **Subtle**: Don't distract from content

### Key Animations
1. **Screen Transitions**: Slide left/right (iOS standard)
2. **Button Press**: Scale down slightly (0.95) on press
3. **Success Feedback**: Scale up checkmark with fade-in
4. **Loading States**: Skeleton screens or subtle pulse
5. **Pull to Refresh**: Standard iOS pull-to-refresh

## Accessibility

### WCAG 2.1 AA Compliance
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Touch Targets**: Minimum 44x44px
- **Font Sizes**: Respect iOS Dynamic Type
- **VoiceOver**: Proper labels for all interactive elements
- **Color Independence**: Don't rely solely on color to convey meaning

### Inclusive Design
- Support landscape orientation where appropriate
- Allow font size customization
- Provide text alternatives for icons
- Clear error messages
- High contrast mode support

## Voice & Tone

### Content Guidelines

#### For Coaches
- **Professional but approachable**
- Use terminology: "athletes", "training", "programs", "performance"
- Examples:
  - ✓ "Create a training session for your athletes"
  - ✗ "Make a workout for your clients"

#### For Athletes
- **Encouraging and empowering**
- Use terminology: "your training", "your progress", "your goals"
- Examples:
  - ✓ "Great job! You exceeded your target on 4 exercises"
  - ✗ "Good work completing your workout"

#### General Tone
- **Motivating** not patronizing
- **Clear** not jargon-heavy
- **Supportive** not pushy
- **Professional** not corporate

### Example Copy

**Success Messages:**
- "Training session logged! You're getting stronger 💪"
- "All exercises completed. Excellent work!"
- "New personal record on squats! 🎉"

**Guidance Messages:**
- "Tap to log your performance for each set"
- "Your coach has assigned a new training session"
- "Track your progress to see how you're improving"

**Error Messages:**
- "Couldn't save workout. Check your connection."
- "Please enter a valid weight"
- "This workout is already assigned"

## File Naming Conventions

### Images
- Lowercase with hyphens
- Format: `{screen}-{element}-{state}.png`
- Examples:
  - `workout-card-thumbnail.png`
  - `exercise-icon-strength.png`
  - `button-primary-pressed.png`

### Components
- PascalCase for React components
- Examples:
  - `WorkoutCard.tsx`
  - `ExerciseLogForm.tsx`
  - `PerformanceIndicator.tsx`

## Resources

### Design Tools
- **Figma**: Recommended for UI design and prototyping
- **SF Symbols**: iOS system icons (free)
- **Adobe Color**: Color palette generation

### Inspiration
- Nike Training Club (athletic motivation)
- Strava (performance tracking)
- TeamBuildr (athletic training)
- Apple Fitness+ (clean UI, clear metrics)

### Fonts
- **SF Pro** (iOS default): Free with Xcode
- **Inter**: https://fonts.google.com/specimen/Inter

### Stock Photos
- Focus on female athletes
- Soccer-specific imagery
- Authentic training environment
- Diverse representation

---

**Note**: This is a living document. Update as the brand and app evolve. Always prioritize user needs and Premier FA's mission of empowering young female athletes through elite training.
