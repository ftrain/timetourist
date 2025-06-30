# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-page web application that implements a logarithmic time slider spanning from -13.8 billion years (Big Bang) to 10^78 years (heat death of the universe). The slider provides detailed resolution for years -5,000 to +5,000 to allow exploration of human history with precision.

## Project Structure

- `index.html` - Complete single-file web application containing HTML, CSS, and JavaScript

## Key Architecture

### Logarithmic Scale Implementation

The slider uses a multi-segment logarithmic mapping:
- **Deep BCE** (0-25% of slider): -13.8 billion to -10,000 years (logarithmic)
- **Recent BCE** (25-45% of slider): -10,000 to 0 years (linear for detail)  
- **Early CE** (45-55% of slider): 0 to 10,000 years (linear for detail)
- **Future CE** (55-100% of slider): 10,000 to 10^78 years (logarithmic)

### Core Functions

- `positionToYear(position)` - Converts slider position (0-1000) to year value
- `yearToPosition(year)` - Converts year value to slider position  
- `formatYear(year)` - Intelligently formats years with intuitive display rules
- `formatLargeNumber(num)` - Handles named number formatting with clean number detection
- `getEraDescription(year)` - Provides contextual era descriptions

### Number Formatting Rules

- **Recent history/future** (±10,000 years): Show actual numbers with BCE/CE (e.g., "2025 CE", "1000 BCE")
- **Deeper history** (>10,000 years ago): Use "years ago" format (e.g., "13.8 billion years ago")
- **Deeper future** (>10,000 years from now): Use "years from now" format (e.g., "1.5 trillion years from now")
- **Clean numbers**: Show "2000" instead of "2.0 thousand", "1000000" instead of "1.0 million"
- **Very large numbers** (≥10^15): Show both named and actual number formats

### Web Components

Uses a custom `TimeSlider` class that extends HTMLElement, though the implementation is simplified and doesn't use shadow DOM.

## Development Notes

- The slider range is 0-1000 for precision
- Default position is set to year 2025
- Year 0 is treated as a valid year (no historical discontinuity)
- Numbers are displayed with full comma formatting (e.g., "1,234,567 CE")
- Smooth transitions between positive and negative years