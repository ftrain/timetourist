class TimeSlider extends HTMLElement {
    constructor() {
        super();
        this.currentYear = 2025;
        this.slider = null;
        this.yearDisplay = null;
        this.eraIndicator = null;
        this.eventsContainer = null;
        this.historicalEvents = {};
        this.darkMode = this.getInitialDarkMode();
        this.loadEvents();
    }

    getInitialDarkMode() {
        const saved = localStorage.getItem('time-tourist-dark-mode');
        if (saved !== null) {
            return saved === 'true';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    loadEvents() {
        try {
            // Load events from generated JavaScript file
            if (window.historicalEvents) {
                this.historicalEvents = window.historicalEvents;
                console.log('Loaded', Object.keys(this.historicalEvents).length, 'years of events');
            } else {
                console.error('Historical events data not loaded - window.historicalEvents is undefined');
                this.historicalEvents = {};
            }
        } catch (error) {
            console.error('Failed to load events:', error);
            this.historicalEvents = {};
        }
    }

    connectedCallback() {
        this.innerHTML = `
            <a href="#main-content" class="skip-link">Skip to main content</a>
            
            <div class="container">
                <header>
                    <h1 id="main-heading">Time Tourist</h1>
                </header>
                
                <main id="main-content">
                    <section class="controls-section" aria-labelledby="controls-heading">
                        <h2 id="controls-heading" class="sr-only">Time Controls</h2>
                        
                        <div class="theme-toggle-container">
                            <button class="theme-toggle" aria-label="Toggle dark/light mode">
                                <span class="theme-icon"></span>
                            </button>
                        </div>
                        
                        <div class="year-display" id="year-display" aria-live="polite" aria-atomic="true">
                            ${this.formatYear(this.currentYear)}
                        </div>
                        
                        <div class="slider-container" role="region" aria-labelledby="slider-heading">
                            <h3 id="slider-heading" class="sr-only">Time Navigation Slider</h3>
                            <input 
                                type="range" 
                                min="0" 
                                max="10000" 
                                value="${this.yearToPosition(this.currentYear)}" 
                                class="slider" 
                                id="time-slider"
                                aria-label="Navigate through time from Big Bang to Heat Death of Universe"
                                aria-valuemin="0"
                                aria-valuemax="10000"
                                aria-valuenow="${this.yearToPosition(this.currentYear)}"
                                aria-valuetext="${this.formatYear(this.currentYear)}"
                            />
                            <div class="era-indicator" id="era-indicator" aria-live="polite">
                                ${this.getEraDescription(this.currentYear)}
                            </div>
                        </div>
                        
                        <div class="navigation-buttons" role="group" aria-labelledby="nav-buttons-heading">
                            <h3 id="nav-buttons-heading" class="sr-only">Quick Navigation</h3>
                            <button class="nav-button" id="big-bang-btn" aria-describedby="big-bang-desc">
                                Big Bang
                                <span id="big-bang-desc" class="sr-only">Jump to 13.8 billion years ago</span>
                            </button>
                            <button class="nav-button" id="now-btn" aria-describedby="now-desc">
                                Now
                                <span id="now-desc" class="sr-only">Jump to present day</span>
                            </button>
                            <button class="nav-button" id="heat-death-btn" aria-describedby="heat-death-desc">
                                Heat Death
                                <span id="heat-death-desc" class="sr-only">Jump to heat death of universe</span>
                            </button>
                        </div>
                    </section>
                    
                    <section class="events-container" role="region" aria-labelledby="events-heading" tabindex="0">
                        <h2 id="events-heading">Historical Events</h2>
                        <div class="events-list" id="events-list" role="list">
                            ${this.getEventsHTML(this.currentYear)}
                        </div>
                        <div aria-live="polite" aria-atomic="false" class="sr-only" id="events-announcer"></div>
                    </section>
                </main>
            </div>
        `;

        this.setupElements();
        this.setupEventListeners();
        this.setupKeyboardNavigation();
        this.applyTheme();
        this.throttledAnnounce = this.throttle((message) => {
            const announcer = this.querySelector('#events-announcer');
            if (announcer) {
                announcer.textContent = message;
            }
        }, 1000);
        
        this.updateDisplay();
    }

    setupElements() {
        this.slider = this.querySelector('#time-slider');
        this.yearDisplay = this.querySelector('#year-display');
        this.eraIndicator = this.querySelector('#era-indicator');
        this.eventsContainer = this.querySelector('#events-list');
    }

    setupEventListeners() {
        // Slider input
        this.slider.addEventListener('input', (e) => {
            this.currentYear = this.positionToYear(parseInt(e.target.value));
            this.updateDisplay();
        });

        // Navigation buttons
        this.querySelector('#big-bang-btn').addEventListener('click', () => {
            this.jumpToYear(-13800000000);
        });

        this.querySelector('#now-btn').addEventListener('click', () => {
            this.jumpToYear(2025);
        });

        this.querySelector('#heat-death-btn').addEventListener('click', () => {
            this.jumpToYear(1e80);
        });

        // Theme toggle
        this.querySelector('.theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (localStorage.getItem('time-tourist-dark-mode') === null) {
                this.darkMode = e.matches;
                this.applyTheme();
            }
        });
    }

    setupKeyboardNavigation() {
        this.slider.addEventListener('keydown', (e) => {
            let handled = false;
            const currentPosition = parseInt(this.slider.value);
            
            switch(e.key) {
                case 'Home':
                    this.jumpToYear(-13800000000);
                    handled = true;
                    break;
                case 'End':
                    this.jumpToYear(1e80);
                    handled = true;
                    break;
                case 'PageUp':
                    this.slider.value = Math.min(10000, currentPosition + 100);
                    this.currentYear = this.positionToYear(parseInt(this.slider.value));
                    this.updateDisplay();
                    handled = true;
                    break;
                case 'PageDown':
                    this.slider.value = Math.max(0, currentPosition - 100);
                    this.currentYear = this.positionToYear(parseInt(this.slider.value));
                    this.updateDisplay();
                    handled = true;
                    break;
                default:
                    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                        e.preventDefault();
                        this.jumpToYear(2025);
                        handled = true;
                    }
                    break;
            }
            
            if (handled) {
                e.preventDefault();
            }
        });

        // Events list keyboard navigation
        const eventsList = this.querySelector('#events-list');
        eventsList.addEventListener('keydown', this.handleEventsKeydown.bind(this));
    }

    handleEventsKeydown(e) {
        const eventItems = Array.from(this.querySelectorAll('.event-item[tabindex="0"]'));
        const currentIndex = eventItems.findIndex(item => item === e.target);
        
        let targetIndex = currentIndex;
        
        switch(e.key) {
            case 'ArrowDown':
                targetIndex = Math.min(eventItems.length - 1, currentIndex + 1);
                break;
            case 'ArrowUp':
                targetIndex = Math.max(0, currentIndex - 1);
                break;
            case 'Home':
                targetIndex = 0;
                break;
            case 'End':
                targetIndex = eventItems.length - 1;
                break;
            default:
                return;
        }
        
        if (targetIndex !== currentIndex && eventItems[targetIndex]) {
            e.preventDefault();
            eventItems[targetIndex].focus();
        }
    }

    toggleTheme() {
        this.darkMode = !this.darkMode;
        localStorage.setItem('time-tourist-dark-mode', this.darkMode.toString());
        this.applyTheme();
    }

    applyTheme() {
        document.body.classList.toggle('dark-mode', this.darkMode);
        const themeIcon = this.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = this.darkMode ? '☀️' : '🌙';
        }
    }

    jumpToYear(year) {
        this.currentYear = year;
        this.slider.value = this.yearToPosition(year);
        this.updateDisplay();
        this.slider.focus();
    }

    updateDisplay() {
        this.yearDisplay.innerHTML = this.formatYear(this.currentYear);
        this.eraIndicator.textContent = this.getEraDescription(this.currentYear);
        this.eventsContainer.innerHTML = this.getEventsHTML(this.currentYear);
        
        // Update slider attributes for accessibility
        this.slider.setAttribute('aria-valuenow', this.yearToPosition(this.currentYear));
        this.slider.setAttribute('aria-valuetext', this.formatYear(this.currentYear));
        
        // Update year display classes for font sizing
        this.updateYearDisplayClasses();
        
        // Announce changes to screen readers (throttled)
        const announcement = `Time: ${this.formatYear(this.currentYear)}. Era: ${this.getEraDescription(this.currentYear)}`;
        this.throttledAnnounce(announcement);
    }

    updateYearDisplayClasses() {
        const yearStr = this.formatYear(this.currentYear);
        this.yearDisplay.className = 'year-display';
        
        if (yearStr.length > 25) {
            this.yearDisplay.classList.add('extremely-large-number');
        } else if (yearStr.length > 20) {
            this.yearDisplay.classList.add('very-large-number');
        } else if (yearStr.length > 15) {
            this.yearDisplay.classList.add('large-number');
        }
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Logarithmic scale mapping functions
    positionToYear(position) {
        const p = position / 10000;
        
        if (p <= 0.10) {
            // Deep BCE: -13.8B to -25,000 (logarithmic)
            const logMin = Math.log10(25000);
            const logMax = Math.log10(13800000000);
            const logValue = logMin + (logMax - logMin) * (0.10 - p) / 0.10;
            return -Math.pow(10, logValue);
        } else if (p <= 0.25) {
            // Recent BCE: -25,000 to -3,000 (linear)
            const t = (p - 0.10) / 0.15;
            return -25000 + t * 22000;
        } else if (p <= 0.75) {
            // History: -3,000 to 3,000 (linear)
            const t = (p - 0.25) / 0.50;
            return -3000 + t * 6000;
        } else if (p <= 0.90) {
            // Future CE: 3,000 to 25,000 (logarithmic)
            const t = (p - 0.75) / 0.15;
            const logMin = Math.log10(3000);
            const logMax = Math.log10(25000);
            const logValue = logMin + t * (logMax - logMin);
            return Math.pow(10, logValue);
        } else {
            // Far Future CE: 25,000 to 10^80 (logarithmic)
            const t = (p - 0.90) / 0.10;
            const logMin = Math.log10(25000);
            const logMax = 80;
            const logValue = logMin + t * (logMax - logMin);
            return Math.pow(10, logValue);
        }
    }

    yearToPosition(year) {
        if (year <= -25000) {
            // Deep BCE
            const logMin = Math.log10(25000);
            const logMax = Math.log10(13800000000);
            const logValue = Math.log10(Math.abs(year));
            const t = (logValue - logMin) / (logMax - logMin);
            return (0.10 - t * 0.10) * 10000;
        } else if (year <= -3000) {
            // Recent BCE
            const t = (-25000 - year) / 22000;
            return (0.10 + t * 0.15) * 10000;
        } else if (year <= 3000) {
            // History
            const t = (year + 3000) / 6000;
            return (0.25 + t * 0.50) * 10000;
        } else if (year <= 25000) {
            // Future CE
            const logMin = Math.log10(3000);
            const logMax = Math.log10(25000);
            const logValue = Math.log10(year);
            const t = (logValue - logMin) / (logMax - logMin);
            return (0.75 + t * 0.15) * 10000;
        } else {
            // Far Future CE
            const logMin = Math.log10(25000);
            const logMax = 80;
            const logValue = Math.log10(year);
            const t = (logValue - logMin) / (logMax - logMin);
            return (0.90 + t * 0.10) * 10000;
        }
    }

    formatYear(year) {
        // Round year to eliminate floating point precision issues
        const roundedYear = Math.round(year);
        
        if (Math.abs(roundedYear) < 10000) {
            return roundedYear < 0 ? `${Math.abs(roundedYear)} BCE` : `${roundedYear} CE`;
        }
        
        const absYear = Math.abs(roundedYear);
        const formatted = this.formatLargeNumber(absYear);
        
        if (roundedYear < 0) {
            return `${formatted} years ago`;
        } else {
            return `${formatted} years from now`;
        }
    }

    formatLargeNumber(num) {
        if (num < 1000) return num.toString();
        if (num < 1000000) {
            const thousands = num / 1000;
            return thousands % 1 === 0 ? `${thousands.toFixed(0)} thousand` : `${thousands.toFixed(1)} thousand`;
        }
        if (num < 1000000000) {
            const millions = num / 1000000;
            return millions % 1 === 0 ? `${millions.toFixed(0)} million` : `${millions.toFixed(1)} million`;
        }
        if (num < 1000000000000) {
            const billions = num / 1000000000;
            return billions % 1 === 0 ? `${billions.toFixed(0)} billion` : `${billions.toFixed(1)} billion`;
        }
        if (num < 1000000000000000) {
            const trillions = num / 1000000000000;
            return trillions % 1 === 0 ? `${trillions.toFixed(0)} trillion` : `${trillions.toFixed(1)} trillion`;
        }
        
        // For very large numbers, show both named and scientific notation
        const exponent = Math.floor(Math.log10(num));
        const mantissa = num / Math.pow(10, exponent);
        const namedNumber = this.getNamedLargeNumber(exponent);
        
        if (namedNumber && mantissa === 1) {
            return `1 ${namedNumber} (10^${exponent})`;
        } else if (namedNumber) {
            return `${mantissa.toFixed(1)} ${namedNumber} (${num.toExponential(1)})`;
        } else {
            return num.toExponential(1);
        }
    }

    getNamedLargeNumber(exponent) {
        const names = {
            15: 'quadrillion', 18: 'quintillion', 21: 'sextillion',
            24: 'septillion', 27: 'octillion', 30: 'nonillion',
            33: 'decillion', 36: 'undecillion', 39: 'duodecillion'
        };
        return names[exponent] || null;
    }

    getEraDescription(year) {
        if (year <= -4600000000) return "Formation of Solar System";
        if (year <= -4000000000) return "Hadean Eon - Early Earth";
        if (year <= -2500000000) return "Archean Eon - First Life";
        if (year <= -541000000) return "Proterozoic Eon - Complex Cells";
        if (year <= -252000000) return "Paleozoic Era - Life on Land";
        if (year <= -66000000) return "Mesozoic Era - Age of Dinosaurs";
        if (year <= -2600000) return "Cenozoic Era - Age of Mammals";
        if (year <= -10000) return "Stone Age - Hunter-Gatherers";
        if (year <= -3000) return "Bronze Age - Early Civilizations";
        if (year <= 500) return "Classical Antiquity";
        if (year <= 1500) return "Medieval Period";
        if (year <= 1800) return "Renaissance & Early Modern";
        if (year <= 1900) return "Industrial Revolution";
        if (year <= 2000) return "Modern Era";
        if (year <= 2100) return "Present Day & Near Future";
        if (year <= 10000) return "Near Future - Climate & Technology";
        if (year <= 1000000) return "Distant Future - Geological Changes";
        if (year <= 1000000000) return "Far Future - Biological Evolution";
        if (year <= 5000000000) return "Astronomical Future - Stellar Evolution";
        return "Ultimate Future - Heat Death";
    }

    getEventsHTML(year) {
        const allEvents = [];
        
        // First, collect ALL events with their distances from current year
        Object.keys(this.historicalEvents).forEach(eventYear => {
            const numYear = parseFloat(eventYear);
            const distance = Math.abs(numYear - year);
            
            this.historicalEvents[eventYear].forEach(event => {
                allEvents.push({
                    year: numYear,
                    distance: distance,
                    ...event
                });
            });
        });
        
        // Sort chronologically by year
        allEvents.sort((a, b) => a.year - b.year);
        
        // Get tolerance for this time period
        const tolerance = this.getYearTolerance(year);
        const maxEvents = 5;
        
        // Filter events within tolerance
        let eventsToShow = allEvents.filter(event => event.distance <= tolerance).slice(0, maxEvents);
        
        // If no events within tolerance, find and show the closest event
        if (eventsToShow.length === 0 && allEvents.length > 0) {
            // Find the closest event by distance
            const closestEvent = allEvents.reduce((closest, current) => 
                current.distance < closest.distance ? current : closest
            );
            eventsToShow = [closestEvent];
        }
        
        return eventsToShow.map((event, index) => {
            // Show distance indicator for events far from current year
            let yearLabel = this.formatYear(event.year);
            
            // Add distance indicator for very distant events
            if (Math.abs(year) >= 10000 || event.distance > tolerance) {
                const distanceLabel = this.formatLargeNumber(event.distance);
                if (event.year < year) {
                    yearLabel += ` <span class="event-distance">(${distanceLabel} earlier)</span>`;
                } else if (event.year > year) {
                    yearLabel += ` <span class="event-distance">(${distanceLabel} later)</span>`;
                }
            }
                
            return `
                <div class="event-item" role="listitem" tabindex="0" aria-describedby="event-${index}">
                    <div class="event-year">${yearLabel}</div>
                    <div class="event-description" id="event-${index}">
                        <a href="${event.link}" target="_blank" rel="noopener noreferrer">${event.text}</a>
                        ${event.media ? this.getMediaHTML(event.media, index) : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    getMediaHTML(media, index) {
        if (!media.youtube) return '';
        
        const youtubeId = this.extractYouTubeId(media.youtube.url);
        if (!youtubeId) return '';
        
        return `
            <button class="media-toggle" onclick="this.parentElement.querySelector('.media-content').classList.toggle('expanded'); this.querySelector('.media-toggle-icon').textContent = this.parentElement.querySelector('.media-content').classList.contains('expanded') ? '▼' : '▶';" aria-expanded="false">
                <span class="media-toggle-icon">▶</span>
                Watch Video
            </button>
            <div class="media-content">
                <div class="media-tabs">
                    <button class="media-tab active" onclick="this.parentElement.parentElement.querySelectorAll('.media-tab').forEach(t => t.classList.remove('active')); this.classList.add('active'); this.parentElement.parentElement.querySelectorAll('.media-panel').forEach(p => p.classList.remove('active')); this.parentElement.parentElement.querySelector('.youtube-panel').classList.add('active');">
                        YouTube
                    </button>
                </div>
                <div class="media-panel youtube-panel active">
                    <iframe class="youtube-embed" 
                        src="https://www.youtube-nocookie.com/embed/${youtubeId}" 
                        title="${media.youtube.title}"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
        `;
    }

    extractYouTubeId(url) {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    getYearTolerance(year) {
        const absYear = Math.abs(year);
        // Ultra-conservative tolerances to prevent absurd time mismatches
        if (absYear > 1e50) return 0; // No events for truly cosmic scales
        if (absYear > 1e20) return absYear * 0.0000001; // Basically nothing matches
        if (absYear > 1e15) return absYear * 0.000001;
        if (absYear > 1e12) return absYear * 0.00001;
        if (absYear > 1e9) return absYear * 0.0001;
        if (absYear > 1e6) return absYear * 0.001;
        if (absYear > 1e5) return 5000;
        if (absYear > 1e4) return 1000;
        if (absYear > 3000) return 500;
        return 100;
    }
}

// Register the custom element
customElements.define('time-slider', TimeSlider);
