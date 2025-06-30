class TimeSlider extends HTMLElement {
    constructor() {
        super();
        this.currentYear = 2025;
        this.slider = null;
        this.yearDisplay = null;
        this.eraIndicator = null;
    }

    connectedCallback() {
        this.slider = document.getElementById('timeSlider');
        this.yearDisplay = document.getElementById('yearDisplay');
        this.eraIndicator = document.getElementById('eraIndicator');
        
        this.setDefaultPosition();
        this.slider.addEventListener('input', (e) => this.updateYear(e.target.value));
        this.slider.addEventListener('change', (e) => this.updateYear(e.target.value));
        
        // Add click handlers for scale markers
        document.querySelectorAll('.scale-marker').forEach(marker => {
            marker.addEventListener('click', () => {
                const targetYear = parseFloat(marker.dataset.year);
                this.jumpToYear(targetYear);
            });
        });
    }

    jumpToYear(year) {
        const position = this.yearToPosition(year);
        this.slider.value = Math.round(position);
        this.updateYear(this.slider.value);
    }

    // Convert slider position (0-1000) to year
    positionToYear(position) {
        const pos = position / 1000; // Normalize to 0-1
        
        if (pos < 0.25) {
            // Deep BCE: -13.8 billion to -10,000
            const progress = pos / 0.25;
            const maxLog = Math.log10(13.8e9);
            const minLog = Math.log10(10000);
            const logValue = maxLog - (progress * (maxLog - minLog));
            return -Math.pow(10, logValue);
        } else if (pos < 0.35) {
            // Ancient BCE: -10,000 to -4,000 (centuries resolution)
            const progress = (pos - 0.25) / 0.1;
            return -10000 + (progress * 6000);
        } else if (pos < 0.45) {
            // Historical BCE: -4,000 to -100 (decades resolution)
            const progress = (pos - 0.35) / 0.1;
            return -4000 + (progress * 3900);
        } else if (pos < 0.47) {
            // Recent BCE: -100 to 0 (years resolution)
            const progress = (pos - 0.45) / 0.02;
            return -100 + (progress * 100);
        } else if (pos < 0.53) {
            // Present Era: 0 to 2100 (years resolution - expanded for current era detail)
            const progress = (pos - 0.47) / 0.06;
            return progress * 2100;
        } else if (pos < 0.57) {
            // Near Future: 2100 to 5000 (decades resolution)
            const progress = (pos - 0.53) / 0.04;
            return 2100 + (progress * 2900);
        } else if (pos < 0.65) {
            // Future: 2000 to 10,000 (centuries resolution)
            const progress = (pos - 0.57) / 0.08;
            return 2000 + (progress * 8000);
        } else {
            // Far Future: 10,000 to 10^78
            const progress = (pos - 0.65) / 0.35;
            if (progress >= 0.999) {
                return 1e78;
            }
            const minLog = Math.log10(10000);
            const maxLog = 78;
            const logValue = minLog + (progress * (maxLog - minLog));
            return Math.pow(10, logValue);
        }
    }

    // Convert year to slider position (0-1000)
    yearToPosition(year) {
        if (year < -10000) {
            // Deep BCE: -13.8 billion to -10,000
            const absYear = Math.abs(year);
            const maxLog = Math.log10(13.8e9);
            const minLog = Math.log10(10000);
            const yearLog = Math.log10(absYear);
            const progress = (maxLog - yearLog) / (maxLog - minLog);
            return (progress * 0.25) * 1000;
        } else if (year < -4000) {
            // Ancient BCE: -10,000 to -4,000
            const progress = (year + 10000) / 6000;
            return ((0.25 + progress * 0.1) * 1000);
        } else if (year < -100) {
            // Historical BCE: -4,000 to -100
            const progress = (year + 4000) / 3900;
            return ((0.35 + progress * 0.1) * 1000);
        } else if (year < 0) {
            // Recent BCE: -100 to 0
            const progress = (year + 100) / 100;
            return ((0.45 + progress * 0.02) * 1000);
        } else if (year <= 2100) {
            // Present Era: 0 to 2100 (expanded for current era detail)
            const progress = year / 2100;
            return ((0.47 + progress * 0.06) * 1000);
        } else if (year <= 5000) {
            // Near Future: 2100 to 5000
            const progress = (year - 2100) / 2900;
            return ((0.53 + progress * 0.04) * 1000);
        } else if (year <= 10000) {
            // Future: 5000 to 10,000
            const progress = (year - 5000) / 5000;
            return ((0.57 + progress * 0.08) * 1000);
        } else {
            // Far Future: 10,000 to 10^78
            const minLog = Math.log10(10000);
            const maxLog = 78;
            const yearLog = Math.log10(year);
            const progress = (yearLog - minLog) / (maxLog - minLog);
            return ((0.65 + progress * 0.35) * 1000);
        }
    }

    setDefaultPosition() {
        const position = this.yearToPosition(this.currentYear);
        this.slider.value = Math.round(position);
        this.updateYear(this.slider.value);
    }

    formatYear(year) {
        const roundedYear = Math.round(year);
        
        if (roundedYear === 0) {
            return "0";
        }
        
        const absYear = Math.abs(roundedYear);
        
        // Recent history/future: use BCE/CE with actual numbers (no commas for small numbers)
        if (absYear <= 2100) {
            if (roundedYear < 0) {
                return `${absYear} BCE`;
            } else {
                return `${roundedYear} CE`;
            }
        }
        
        // Deeper history: use "years ago"
        if (roundedYear < -10000) {
            const formatted = this.formatLargeNumber(absYear);
            const suffix = "years ago";
            // For extremely large numbers, show both named and actual number
            if (absYear >= 1e15) {
                return `${formatted} ${suffix}<br><span style="font-size: 0.6em; opacity: 0.8;">(${absYear.toLocaleString()})</span>`;
            } else {
                return `${formatted} ${suffix}`;
            }
        }
        
        // Deeper future: use "years from now"
        if (roundedYear > 2100) {
            const formatted = this.formatLargeNumber(roundedYear);
            const suffix = "years from now";
            // For extremely large numbers, show both named and actual number
            if (roundedYear >= 1e15) {
                return `${formatted} ${suffix}<br><span style="font-size: 0.6em; opacity: 0.8;">(${roundedYear.toLocaleString()})</span>`;
            } else {
                return `${formatted} ${suffix}`;
            }
        }
    }

    formatLargeNumber(num) {
        if (num < 1000) {
            return num.toLocaleString();
        }
        
        // For clean thousands/millions, show actual number instead of decimal
        if (num >= 1000 && num < 1e6) {
            if (num % 1000 === 0) {
                return num.toLocaleString(); // Show "2000" instead of "2.0 thousand"
            }
            return `${(num / 1000).toFixed(1)} thousand`;
        } else if (num >= 1e6 && num < 1e9) {
            if (num % 1e6 === 0) {
                return num.toLocaleString(); // Show "2000000" instead of "2.0 million"
            }
            return `${(num / 1e6).toFixed(1)} million`;
        } else if (num < 1e12) {
            return `${(num / 1e9).toFixed(1)} billion`;
        } else if (num < 1e15) {
            return `${(num / 1e12).toFixed(1)} trillion`;
        } else if (num < 1e18) {
            return `${(num / 1e15).toFixed(1)} quadrillion`;
        } else if (num < 1e21) {
            return `${(num / 1e18).toFixed(1)} quintillion`;
        } else if (num < 1e24) {
            return `${(num / 1e21).toFixed(1)} sextillion`;
        } else if (num < 1e27) {
            return `${(num / 1e24).toFixed(1)} septillion`;
        } else if (num < 1e30) {
            return `${(num / 1e27).toFixed(1)} octillion`;
        } else if (num < 1e33) {
            return `${(num / 1e30).toFixed(1)} nonillion`;
        } else if (num < 1e36) {
            return `${(num / 1e33).toFixed(1)} decillion`;
        } else if (num < 1e39) {
            return `${(num / 1e36).toFixed(1)} undecillion`;
        } else if (num < 1e42) {
            return `${(num / 1e39).toFixed(1)} duodecillion`;
        } else {
            // For extremely large numbers, use creative naming
            const exponent = Math.floor(Math.log10(num));
            if (exponent >= 60 && exponent < 78) {
                const billions = Math.floor(exponent / 9);
                const remainder = exponent % 9;
                const mantissa = (num / Math.pow(10, exponent)).toFixed(1);
                const baseNames = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion'];
                let description = '';
                for (let i = 0; i < billions; i++) {
                    description += 'billion ';
                }
                if (remainder > 0) {
                    description += baseNames[remainder] + ' ';
                }
                return `${mantissa} ${description.trim()}`;
            } else if (exponent >= 78) {
                // Special case for heat death of universe scale
                return `1 googol googol googol googol googol googol googol googol`;
            } else {
                const mantissa = (num / Math.pow(10, 42)).toFixed(1);
                return `${mantissa} tredecillion`;
            }
        }
    }

    getNumberClass(year) {
        const absYear = Math.abs(year);
        if (absYear >= 1e20) return 'extremely-large-number';
        if (absYear >= 1e12) return 'very-large-number';
        if (absYear >= 1e8) return 'large-number';
        return '';
    }

    getEraDescription(year) {
        if (year < -13e9) return "Before the Big Bang";
        if (year < -4.5e9) return "Early Universe";
        if (year < -3.8e9) return "Formation of Earth";
        if (year < -500e6) return "Precambrian Era";
        if (year < -65e6) return "Age of Dinosaurs";
        if (year < -2e6) return "Cenozoic Era";
        if (year < -10000) return "Ice Ages";
        if (year < 0) return "Prehistoric Times";
        if (year < 500) return "Ancient History";
        if (year < 1500) return "Medieval Period";
        if (year < 1800) return "Renaissance & Early Modern";
        if (year < 1900) return "19th Century";
        if (year < 2000) return "20th Century";
        if (year < 2100) return "Present Day";
        if (year < 1e6) return "Near Future";
        if (year < 1e9) return "Far Future";
        if (year < 1e12) return "Stellar Evolution Era";
        if (year < 1e15) return "Degenerate Era";
        if (year < 1e40) return "Black Hole Era";
        return "Heat Death Era";
    }

    updateYear(position) {
        const year = this.positionToYear(position);
        this.yearDisplay.innerHTML = this.formatYear(year);
        this.yearDisplay.className = `year-display ${this.getNumberClass(year)}`;
        this.eraIndicator.textContent = this.getEraDescription(year);
    }
}

// Initialize the time slider component
customElements.define('time-slider', TimeSlider);

// Create and initialize the component
document.addEventListener('DOMContentLoaded', () => {
    new TimeSlider().connectedCallback();
});