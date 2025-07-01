# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-page web application that implements a logarithmic time slider spanning from -13.8 billion years (Big Bang) to 10^78 years (heat death of the universe). The slider provides detailed resolution for years -3,000 to +3,000 to allow exploration of human history with precision.

## Project Structure

Use native Web Components and clean, accessible HTML following WCAG 2.1 AA standards.

- `index.html` - Semantic HTML structure with ARIA labels and accessibility features
- `style.css` - Visual styling with focus indicators and accessibility enhancements
- `script.js` - Interactive functionality with keyboard navigation and screen reader support

## Data Sources
- As the slider is moved, show the eras or periods that correspond to the slider position. 
- Use this Wikipedia page as a baseline: https://en.wikipedia.org/wiki/List_of_time_periods

## Key Architecture

### Logarithmic Scale Implementation

The slider uses a multi-segment logarithmic mapping:
- **Deep BCE** (0-10% of slider): -13.8 billion to -25,000 years (logarithmic)
- **Recent BCE** (10-25% of slider): -25,000 to -3,000 years (linear for detail)
- **History** (25-75% of slider): -3,000 to 3,000 years (linear for detail)
- **Future CE** (75-90% of slider): 3,000 to 25,000 years (logarithmic)
- **Far Future CE** (90-100% of slider): 25,000 to 10^78 years (logarithmic)

### Core Functions

- `positionToYear(position)` - Converts slider position (0-10000) to year value
- `yearToPosition(year)` - Converts year value to slider position  
- `formatYear(year)` - Intelligently formats years with intuitive display rules
- `formatLargeNumber(num)` - Handles named number formatting with clean number detection
- `getEraDescription(year)` - Provides contextual era descriptions
- `setupKeyboardNavigation()` - Configures keyboard shortcuts and accessibility features
- `throttledAnnounce()` - Manages screen reader announcements to prevent spam
- `handleEventsKeydown()` - Handles keyboard navigation within events list

### Number Formatting Rules

- **Recent history/future** (±10,000 years): Show actual numbers with BCE/CE (e.g., "2025 CE", "1000 BCE")
- **Deeper history** (>10,000 years ago): Use "years ago" format (e.g., "13.8 billion years ago")
- **Deeper future** (>10,000 years from now): Use "years from now" format (e.g., "1.5 trillion years from now")
- **Clean numbers**: Show "2000" instead of "2.0 thousand", "1000000" instead of "1.0 million"
- **Very large numbers** (≥10^15): Show both named and actual number formats, with actual number following.

### Web Components

Uses a custom `TimeSlider` class that extends HTMLElement, though the implementation is simplified and doesn't use shadow DOM. The component includes comprehensive accessibility features and keyboard navigation support.

### Accessibility Features

The application is fully WCAG 2.1 AA compliant with:

- **Semantic HTML**: Proper heading structure, landmarks, and ARIA labels
- **Keyboard Navigation**: Full slider control with arrow keys, Home/End for extremes, Page Up/Down for large jumps
- **Screen Reader Support**: Live regions, throttled announcements, and descriptive labels
- **Visual Accessibility**: Focus indicators, high contrast mode support, and respect for user preferences
- **Motor Accessibility**: Large touch targets (44px minimum) and multiple input methods

#### Keyboard Shortcuts

- `Arrow Keys` - Navigate through time
- `Home` - Jump to Big Bang (-13.8 billion years)
- `End` - Jump to Heat Death (10^78 years)
- `Page Up/Down` - Large time jumps (±100 slider units)
- `Ctrl/Cmd + N` - Jump to Now (2025)
- `Tab` - Navigate between interactive elements
- `Arrow Keys` (in events list) - Navigate through historical events

## Development Notes

- The slider range is 0-10000 for precision
- Default position is set to year 2025
- Year 0 is treated as a valid year (no historical discontinuity)
- Smooth transitions between positive and negative years
- Include buttons to link to "Big Bang," "Now," and "Heat Death"

## Git Configuration
  - Auto-commit changes: Yes
  - Always run tests before committing: Yes
  
