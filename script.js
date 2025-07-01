class TimeSlider extends HTMLElement {
    constructor() {
        super();
        this.currentYear = 2025;
        this.slider = null;
        this.yearDisplay = null;
        this.eraIndicator = null;
        this.eventsContainer = null;
        this.initializeEvents();
    }

    initializeEvents() {
        this.historicalEvents = {
            // Geological Eons
            [-4567000000]: [
                {text: "Formation of Earth", link: "https://en.wikipedia.org/wiki/Formation_and_evolution_of_the_Solar_System"},
                {text: "Hadean Eon begins", link: "https://en.wikipedia.org/wiki/Hadean"}
            ],
            [-4031000000]: [
                {text: "Archean Eon begins", link: "https://en.wikipedia.org/wiki/Archean"},
                {text: "First stable continental crust", link: "https://en.wikipedia.org/wiki/Continental_crust"}
            ],
            [-3800000000]: [{text: "Earliest evidence of life on Earth", link: "https://en.wikipedia.org/wiki/Earliest_known_life_forms"}],
            [-2500000000]: [
                {text: "Proterozoic Eon begins", link: "https://en.wikipedia.org/wiki/Proterozoic"},
                {text: "Great Oxidation Event", link: "https://en.wikipedia.org/wiki/Great_Oxidation_Event"}
            ],
            [-541000000]: [
                {text: "Phanerozoic Eon begins", link: "https://en.wikipedia.org/wiki/Phanerozoic"},
                {text: "Cambrian explosion", link: "https://en.wikipedia.org/wiki/Cambrian_explosion"}
            ],
            
            // Paleozoic Era
            [-485000000]: [
                {text: "Ordovician Period", link: "https://en.wikipedia.org/wiki/Ordovician"},
                {text: "Marine life diversifies", link: "https://en.wikipedia.org/wiki/Great_Ordovician_Biodiversification_Event"}
            ],
            [-443000000]: [
                {text: "Silurian Period", link: "https://en.wikipedia.org/wiki/Silurian"},
                {text: "First land plants", link: "https://en.wikipedia.org/wiki/Evolutionary_history_of_plants"}
            ],
            [-419000000]: [
                {text: "Devonian Period", link: "https://en.wikipedia.org/wiki/Devonian"},
                {text: "Age of Fishes", link: "https://en.wikipedia.org/wiki/Devonian#Life"}
            ],
            [-358000000]: [
                {text: "Carboniferous Period", link: "https://en.wikipedia.org/wiki/Carboniferous"},
                {text: "Coal forests", link: "https://en.wikipedia.org/wiki/Carboniferous#Climate_and_weather"}
            ],
            [-252000000]: [{text: "Permian-Triassic extinction", link: "https://en.wikipedia.org/wiki/Permian%E2%80%93Triassic_extinction_event"}],
            
            // Mesozoic Era
            [-251000000]: [
                {text: "Triassic Period begins", link: "https://en.wikipedia.org/wiki/Triassic"},
                {text: "First dinosaurs", link: "https://en.wikipedia.org/wiki/Evolution_of_dinosaurs"}
            ],
            [-201000000]: [
                {text: "Jurassic Period", link: "https://en.wikipedia.org/wiki/Jurassic"},
                {text: "Age of large dinosaurs", link: "https://en.wikipedia.org/wiki/Jurassic#Fauna"}
            ],
            [-145000000]: [
                {text: "Cretaceous Period", link: "https://en.wikipedia.org/wiki/Cretaceous"},
                {text: "Flowering plants evolve", link: "https://en.wikipedia.org/wiki/Flowering_plant"}
            ],
            [-66000000]: [
                {text: "Cretaceous-Paleogene extinction", link: "https://en.wikipedia.org/wiki/Cretaceous%E2%80%93Paleogene_extinction_event"},
                {text: "End of non-avian dinosaurs", link: "https://en.wikipedia.org/wiki/Dinosaur"}
            ],
            
            // Cenozoic Era
            [-65000000]: [
                {text: "Paleogene Period", link: "https://en.wikipedia.org/wiki/Paleogene"},
                {text: "Rise of mammals", link: "https://en.wikipedia.org/wiki/Evolution_of_mammals"}
            ],
            [-23000000]: [
                {text: "Neogene Period", link: "https://en.wikipedia.org/wiki/Neogene"},
                {text: "Grasslands spread", link: "https://en.wikipedia.org/wiki/Grassland#Evolution"}
            ],
            [-2600000]: [
                {text: "Quaternary Period", link: "https://en.wikipedia.org/wiki/Quaternary"},
                {text: "Ice ages begin", link: "https://en.wikipedia.org/wiki/Ice_age"}
            ],
            [-300000]: [{text: "Homo sapiens emerges", link: "https://en.wikipedia.org/wiki/Homo_sapiens"}],
            [-50000]: [{text: "Humans reach Australia", link: "https://en.wikipedia.org/wiki/Prehistory_of_Australia"}],
            [-15000]: [{text: "Humans reach Americas", link: "https://en.wikipedia.org/wiki/Settlement_of_the_Americas"}],
            
            // Neolithic Revolution
            [-10000]: [
                {text: "Agriculture begins", link: "https://en.wikipedia.org/wiki/Agriculture"},
                {text: "Neolithic Revolution", link: "https://en.wikipedia.org/wiki/Neolithic_Revolution"}
            ],
            [-9000]: [{text: "Çatalhöyük settlement", link: "https://en.wikipedia.org/wiki/%C3%87atalh%C3%B6y%C3%BCk"}],
            [-8000]: [{text: "Farming spreads to Europe", link: "https://en.wikipedia.org/wiki/Neolithic_Europe"}],
            [-3500]: [
                {text: "Writing invented", link: "https://en.wikipedia.org/wiki/History_of_writing"},
                {text: "Wheel invented", link: "https://en.wikipedia.org/wiki/Wheel"}
            ],
            [-3200]: [
                {text: "Bronze Age begins", link: "https://en.wikipedia.org/wiki/Bronze_Age"},
                {text: "Early civilizations", link: "https://en.wikipedia.org/wiki/Civilization"}
            ],
            [-3100]: [{text: "Egyptian hieroglyphs", link: "https://en.wikipedia.org/wiki/Egyptian_hieroglyphs"}],
            [-2600]: [{text: "Great Pyramid of Giza built", link: "https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza"}],
            [-2334]: [
                {text: "Sargon of Akkad", link: "https://en.wikipedia.org/wiki/Sargon_of_Akkad"},
                {text: "First empire", link: "https://en.wikipedia.org/wiki/Akkadian_Empire"}
            ],
            [-1800]: [{text: "Code of Hammurabi", link: "https://en.wikipedia.org/wiki/Code_of_Hammurabi"}],
            [-1200]: [
                {text: "Iron Age begins", link: "https://en.wikipedia.org/wiki/Iron_Age"},
                {text: "Bronze Age collapse", link: "https://en.wikipedia.org/wiki/Late_Bronze_Age_collapse"}
            ],
            
            // Iron Age & Classical Antiquity
            [-776]: [{text: "First Olympic Games", link: "https://en.wikipedia.org/wiki/Ancient_Olympic_Games"}],
            [-753]: [{text: "Rome founded", link: "https://en.wikipedia.org/wiki/Founding_of_Rome"}],
            [-508]: [{text: "Athenian democracy", link: "https://en.wikipedia.org/wiki/Athenian_democracy"}],
            [-490]: [{text: "Battle of Marathon", link: "https://en.wikipedia.org/wiki/Battle_of_Marathon"}],
            [-480]: [{text: "Battle of Thermopylae", link: "https://en.wikipedia.org/wiki/Battle_of_Thermopylae"}],
            [-447]: [{text: "Parthenon construction", link: "https://en.wikipedia.org/wiki/Parthenon"}],
            [-399]: [{text: "Death of Socrates", link: "https://en.wikipedia.org/wiki/Trial_of_Socrates"}],
            [-336]: [{text: "Alexander the Great", link: "https://en.wikipedia.org/wiki/Alexander_the_Great"}],
            [-221]: [{text: "Qin Dynasty unifies China", link: "https://en.wikipedia.org/wiki/Qin_dynasty"}],
            [-49]: [{text: "Caesar crosses Rubicon", link: "https://en.wikipedia.org/wiki/Caesar%27s_civil_war"}],
            [-44]: [{text: "Assassination of Caesar", link: "https://en.wikipedia.org/wiki/Assassination_of_Julius_Caesar"}],
            [-27]: [{text: "Roman Empire begins", link: "https://en.wikipedia.org/wiki/Roman_Empire"}],
            
            // Common Era
            [0]: [{text: "Birth of Jesus", link: "https://en.wikipedia.org/wiki/Nativity_of_Jesus"}],
            [30]: [{text: "Crucifixion of Jesus", link: "https://en.wikipedia.org/wiki/Crucifixion_of_Jesus"}],
            [476]: [{text: "Fall of Western Roman Empire", link: "https://en.wikipedia.org/wiki/Fall_of_the_Western_Roman_Empire"}],
            [800]: [{text: "Charlemagne crowned Emperor", link: "https://en.wikipedia.org/wiki/Charlemagne"}],
            [1066]: [{text: "Norman Conquest", link: "https://en.wikipedia.org/wiki/Norman_Conquest"}],
            [1215]: [{text: "Magna Carta", link: "https://en.wikipedia.org/wiki/Magna_Carta"}],
            [1347]: [{text: "Black Death", link: "https://en.wikipedia.org/wiki/Black_Death"}],
            [1453]: [{text: "Fall of Constantinople", link: "https://en.wikipedia.org/wiki/Fall_of_Constantinople"}],
            [1492]: [{text: "Columbus reaches Americas", link: "https://en.wikipedia.org/wiki/Voyages_of_Christopher_Columbus"}],
            [1517]: [{text: "Protestant Reformation", link: "https://en.wikipedia.org/wiki/Protestant_Reformation"}],
            [1776]: [{text: "American Independence", link: "https://en.wikipedia.org/wiki/United_States_Declaration_of_Independence"}],
            [1789]: [{text: "French Revolution", link: "https://en.wikipedia.org/wiki/French_Revolution"}],
            [1804]: [{text: "Napoleon Emperor", link: "https://en.wikipedia.org/wiki/Napoleon"}],
            [1859]: [{text: "Darwin's Origin of Species", link: "https://en.wikipedia.org/wiki/On_the_Origin_of_Species"}],
            [1914]: [{text: "World War I begins", link: "https://en.wikipedia.org/wiki/World_War_I"}],
            [1939]: [{text: "World War II begins", link: "https://en.wikipedia.org/wiki/World_War_II"}],
            [1945]: [
                {text: "Nuclear bombs", link: "https://en.wikipedia.org/wiki/Atomic_bombings_of_Hiroshima_and_Nagasaki"},
                {text: "United Nations founded", link: "https://en.wikipedia.org/wiki/United_Nations"}
            ],
            [1969]: [{text: "Moon landing", link: "https://en.wikipedia.org/wiki/Apollo_11"}],
            [1989]: [{text: "Berlin Wall falls", link: "https://en.wikipedia.org/wiki/Fall_of_the_Berlin_Wall"}],
            [1991]: [{text: "Soviet Union dissolves", link: "https://en.wikipedia.org/wiki/Dissolution_of_the_Soviet_Union"}],
            [2001]: [
                {text: "September 11 attacks", link: "https://en.wikipedia.org/wiki/September_11_attacks"},
                {text: "Wikipedia launched", link: "https://en.wikipedia.org/wiki/Wikipedia"}
            ],
            [2020]: [{text: "COVID-19 pandemic", link: "https://en.wikipedia.org/wiki/COVID-19_pandemic"}],
            
            // FUTURE EVENTS - Near Term (2025-2050)
            [2025]: [
                {text: "Artemis II lunar flyby", link: "https://en.wikipedia.org/wiki/Artemis_2"},
                {text: "Lunar Gateway initial capabilities", link: "https://en.wikipedia.org/wiki/Lunar_Gateway"}
            ],
            [2026]: [
                {text: "Artemis III lunar landing", link: "https://en.wikipedia.org/wiki/Artemis_3"},
                {text: "Winter Olympics Milan-Cortina", link: "https://en.wikipedia.org/wiki/2026_Winter_Olympics"}
            ],
            [2028]: [{text: "Summer Olympics Los Angeles", link: "https://en.wikipedia.org/wiki/2028_Summer_Olympics"}],
            [2030]: [
                {text: "Europa Clipper arrives at Jupiter", link: "https://en.wikipedia.org/wiki/Europa_Clipper"},
                {text: "Winter Olympics French Alps", link: "https://en.wikipedia.org/wiki/2030_Winter_Olympics"},
                {text: "China peaks CO2 emissions", link: "https://en.wikipedia.org/wiki/Climate_change_mitigation"}
            ],
            [2031]: [{text: "JUICE arrives at Jupiter", link: "https://en.wikipedia.org/wiki/Jupiter_Icy_Moons_Explorer"}],
            [2032]: [{text: "Summer Olympics Brisbane", link: "https://en.wikipedia.org/wiki/2032_Summer_Olympics"}],
            [2034]: [
                {text: "Dragonfly lands on Titan", link: "https://en.wikipedia.org/wiki/Dragonfly_(spacecraft)"},
                {text: "Winter Olympics Salt Lake City", link: "https://en.wikipedia.org/wiki/2034_Winter_Olympics"}
            ],
            [2035]: [
                {text: "ITER achieves nuclear fusion", link: "https://en.wikipedia.org/wiki/ITER"},
                {text: "EU bans petrol/diesel cars", link: "https://en.wikipedia.org/wiki/Phase-out_of_fossil_fuel_vehicles"}
            ],
            [2040]: [{text: "World population ~9 billion", link: "https://en.wikipedia.org/wiki/World_population"}],
            
            // Medium-term Future (2050-3000)
            [2100]: [{text: "Sea level rise 1-8 meters", link: "https://en.wikipedia.org/wiki/Sea_level_rise"}],
            [2200]: [{text: "Antarctic ice sheet changes", link: "https://en.wikipedia.org/wiki/West_Antarctic_Ice_Sheet"}],
            [2500]: [{text: "English language evolution", link: "https://en.wikipedia.org/wiki/Future_of_the_English_language"}],
            
            // Astronomical Events
            [3100]: [{text: "Gamma Cephei becomes pole star", link: "https://en.wikipedia.org/wiki/Pole_star"}],
            [8000]: [{text: "Current interglacial ends", link: "https://en.wikipedia.org/wiki/Interglacial"}],
            [25000]: [{text: "Chernobyl exclusion zone safe", link: "https://en.wikipedia.org/wiki/Chernobyl_Exclusion_Zone"}],
            [50000]: [
                {text: "Niagara Falls erodes to Lake Erie", link: "https://en.wikipedia.org/wiki/Niagara_Falls"},
                {text: "Next ice age possible", link: "https://en.wikipedia.org/wiki/Ice_age"}
            ],
            [100000]: [{text: "Star constellations unrecognizable", link: "https://en.wikipedia.org/wiki/Constellation"}],
            [250000]: [{text: "Kamaʻehuakanaloa becomes new island", link: "https://en.wikipedia.org/wiki/Kama%CA%BBehuakanaloa"}],
            [1000000]: [{text: "Likely supervolcanic eruption", link: "https://en.wikipedia.org/wiki/Supervolcano"}],
            [1290000]: [{text: "Gliese 710 approaches Solar System", link: "https://en.wikipedia.org/wiki/Gliese_710"}],
            [10000000]: [{text: "Red Sea floods African continent", link: "https://en.wikipedia.org/wiki/Red_Sea_Rift"}],
            
            // Earth's Far Future
            [600000000]: [{text: "C3 photosynthesis ends", link: "https://en.wikipedia.org/wiki/Future_of_Earth"}],
            [1000000000]: [
                {text: "Moist greenhouse effect begins", link: "https://en.wikipedia.org/wiki/Runaway_greenhouse_effect"},
                {text: "Oceans start evaporating", link: "https://en.wikipedia.org/wiki/Future_of_Earth"}
            ],
            [2800000000]: [{text: "Earth's magnetic field ends", link: "https://en.wikipedia.org/wiki/Earth%27s_magnetic_field"}],
            [5400000000]: [{text: "Sun becomes red giant", link: "https://en.wikipedia.org/wiki/Red_giant"}],
            [7590000000]: [
                {text: "Earth likely destroyed by Sun", link: "https://en.wikipedia.org/wiki/Future_of_Earth"},
                {text: "Sun swallows inner planets", link: "https://en.wikipedia.org/wiki/Stellar_evolution"}
            ],
            [8000000000]: [{text: "Sun becomes white dwarf", link: "https://en.wikipedia.org/wiki/White_dwarf"}],
            
            // Cosmic Future
            [1000000000000]: [{text: "Star formation ends in galaxies", link: "https://en.wikipedia.org/wiki/Timeline_of_the_far_future"}],
            [2000000000000]: [{text: "Local Group isolation complete", link: "https://en.wikipedia.org/wiki/Local_Group"}],
            [100000000000000]: [{text: "Normal star formation ends", link: "https://en.wikipedia.org/wiki/Stellar_evolution"}],
            [1000000000000000]: [{text: "Planetary systems detach", link: "https://en.wikipedia.org/wiki/Timeline_of_the_far_future"}],
            [100000000000000000000]: [{text: "Stellar remnants ejected from galaxies", link: "https://en.wikipedia.org/wiki/Galaxy_formation_and_evolution"}],
            [1000000000000000000000000000000000000000]: [{text: "Proton decay begins", link: "https://en.wikipedia.org/wiki/Proton_decay"}],
            [100000000000000000000000000000000000000000000000000000000000000000000000000000000]: [{text: "Heat death of universe", link: "https://en.wikipedia.org/wiki/Heat_death_of_the_universe"}]
        };
    }

    connectedCallback() {
        this.slider = document.getElementById('timeSlider');
        this.yearDisplay = document.getElementById('yearDisplay');
        this.eraIndicator = document.getElementById('eraIndicator');
        this.eventsContainer = document.getElementById('eventsList');
        
        this.setDefaultPosition();
        this.slider.addEventListener('input', (e) => this.updateYear(e.target.value));
        this.slider.addEventListener('change', (e) => this.updateYear(e.target.value));
        
        // Add click handlers for navigation buttons
        document.querySelectorAll('.nav-button').forEach(button => {
            button.addEventListener('click', () => {
                const targetYear = parseFloat(button.dataset.year);
                this.jumpToYear(targetYear);
            });
        });
    }

    jumpToYear(year) {
        const position = this.yearToPosition(year);
        this.slider.value = Math.round(position);
        this.updateYear(this.slider.value);
    }

    // Convert slider position (0-10000) to year
    positionToYear(position) {
        const pos = position / 10000; // Normalize to 0-1
        
        if (pos < 0.1) {
            // Deep BCE (0-10%): -13.8 billion to -25,000 years (logarithmic)
            const progress = pos / 0.1;
            const maxLog = Math.log10(13.8e9);
            const minLog = Math.log10(25000);
            const logValue = maxLog - (progress * (maxLog - minLog));
            return -Math.pow(10, logValue);
        } else if (pos < 0.25) {
            // Recent BCE (10-25%): -25,000 to -3,000 years (linear for detail)
            const progress = (pos - 0.1) / 0.15;
            return -25000 + (progress * 22000);
        } else if (pos < 0.75) {
            // History (25-75%): -3,000 to 3,000 years (linear for detail)
            const progress = (pos - 0.25) / 0.5;
            return -3000 + (progress * 6000);
        } else if (pos < 0.9) {
            // Future CE (75-90%): 3,000 to 25,000 years (logarithmic)
            const progress = (pos - 0.75) / 0.15;
            const minLog = Math.log10(3000);
            const maxLog = Math.log10(25000);
            const logValue = minLog + (progress * (maxLog - minLog));
            return Math.pow(10, logValue);
        } else {
            // Far Future CE (90-100%): 25,000 to 10^78 years (logarithmic)
            const progress = (pos - 0.9) / 0.1;
            if (progress >= 0.999) {
                return 1e78;
            }
            const minLog = Math.log10(25000);
            const maxLog = 78;
            const logValue = minLog + (progress * (maxLog - minLog));
            return Math.pow(10, logValue);
        }
    }

    // Convert year to slider position (0-10000)
    yearToPosition(year) {
        if (year < -25000) {
            // Deep BCE (0-10%): -13.8 billion to -25,000 years
            const absYear = Math.abs(year);
            const maxLog = Math.log10(13.8e9);
            const minLog = Math.log10(25000);
            const yearLog = Math.log10(absYear);
            const progress = (maxLog - yearLog) / (maxLog - minLog);
            return (progress * 0.1) * 10000;
        } else if (year < -3000) {
            // Recent BCE (10-25%): -25,000 to -3,000 years
            const progress = (year + 25000) / 22000;
            return ((0.1 + progress * 0.15) * 10000);
        } else if (year <= 3000) {
            // History (25-75%): -3,000 to 3,000 years
            const progress = (year + 3000) / 6000;
            return ((0.25 + progress * 0.5) * 10000);
        } else if (year <= 25000) {
            // Future CE (75-90%): 3,000 to 25,000 years
            const minLog = Math.log10(3000);
            const maxLog = Math.log10(25000);
            const yearLog = Math.log10(year);
            const progress = (yearLog - minLog) / (maxLog - minLog);
            return ((0.75 + progress * 0.15) * 10000);
        } else {
            // Far Future CE (90-100%): 25,000 to 10^78 years
            const minLog = Math.log10(25000);
            const maxLog = 78;
            const yearLog = Math.log10(year);
            const progress = (yearLog - minLog) / (maxLog - minLog);
            return ((0.9 + progress * 0.1) * 10000);
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
        if (absYear <= 10000) {
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
        if (roundedYear > 10000) {
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
        // Deep cosmic history
        if (year < -13e9) return "Before the Big Bang";
        if (year < -10e9) return "Primordial Universe";
        if (year < -4.6e9) return "Formation of Solar System";
        if (year < -4e9) return "Hadean Eon";
        if (year < -2.5e9) return "Archean Eon";
        if (year < -541e6) return "Proterozoic Eon";
        
        // Phanerozoic Eon
        if (year < -252e6) return "Paleozoic Era";
        if (year < -66e6) return "Mesozoic Era (Age of Dinosaurs)";
        if (year < -2.6e6) return "Cenozoic Era";
        
        // Quaternary Period
        if (year < -11700) return "Pleistocene (Ice Age)";
        if (year < -8000) return "Holocene (Early)";
        if (year < -5000) return "Neolithic Period";
        if (year < -3200) return "Bronze Age";
        if (year < -1200) return "Late Bronze Age";
        if (year < -600) return "Iron Age";
        if (year < -500) return "Axial Age";
        if (year < 0) return "Classical Antiquity";
        
        // Common Era
        if (year < 500) return "Late Antiquity";
        if (year < 1000) return "Early Middle Ages";
        if (year < 1300) return "High Middle Ages";
        if (year < 1500) return "Late Middle Ages";
        if (year < 1800) return "Early Modern Period";
        if (year < 1914) return "Long 19th Century";
        if (year < 1945) return "World Wars Era";
        if (year < 1991) return "Cold War Era";
        if (year < 2020) return "Information Age";
        if (year < 3000) return "Present Era";
        
        // Future eras
        if (year < 1e4) return "Near Future";
        if (year < 1e6) return "Distant Future";
        if (year < 1e9) return "Stellar Evolution";
        if (year < 1e12) return "Galactic Evolution";
        if (year < 1e15) return "Degenerate Era";
        if (year < 1e40) return "Black Hole Era";
        return "Heat Death Era";
    }

    findRelevantEvents(currentYear) {
        const events = [];
        const eventYears = Object.keys(this.historicalEvents).map(Number).sort((a, b) => a - b);
        
        // Find events within a reasonable range based on the current year
        let rangeSize;
        const absYear = Math.abs(currentYear);
        
        if (absYear > 1e9) rangeSize = absYear * 0.1; // 10% range for very large years
        else if (absYear > 1e6) rangeSize = absYear * 0.05; // 5% range for large years
        else if (absYear > 10000) rangeSize = absYear * 0.02; // 2% range for medium years
        else if (absYear > 1000) rangeSize = 500; // 500 year range for historical periods
        else rangeSize = 100; // 100 year range for recent history
        
        const minYear = currentYear - rangeSize;
        const maxYear = currentYear + rangeSize;
        
        for (const eventYear of eventYears) {
            if (eventYear >= minYear && eventYear <= maxYear) {
                events.push({
                    year: eventYear,
                    events: this.historicalEvents[eventYear]
                });
            }
        }
        
        // If no events found in range, find the closest events
        if (events.length === 0) {
            const closestBefore = eventYears.filter(year => year <= currentYear).pop();
            const closestAfter = eventYears.find(year => year > currentYear);
            
            if (closestBefore !== undefined) {
                events.push({
                    year: closestBefore,
                    events: this.historicalEvents[closestBefore]
                });
            }
            if (closestAfter !== undefined && closestAfter !== closestBefore) {
                events.push({
                    year: closestAfter,
                    events: this.historicalEvents[closestAfter]
                });
            }
        }
        
        return events.sort((a, b) => a.year - b.year);
    }

    displayEvents(events) {
        if (!this.eventsContainer) return;
        
        if (events.length === 0) {
            this.eventsContainer.innerHTML = '<div style="text-align: center; opacity: 0.7; padding: 2rem;">No major events recorded for this time period</div>';
            return;
        }
        
        let html = '';
        for (const eventGroup of events) {
            const formattedYear = this.formatYear(eventGroup.year);
            html += `<div class="event-item">
                <div class="event-year">${formattedYear}</div>
                <div class="event-description">`;
            
            for (const event of eventGroup.events) {
                if (typeof event === 'string') {
                    // Handle old format for backward compatibility
                    html += `• ${event}<br>`;
                } else {
                    // Handle new format with links
                    html += `• <a href="${event.link}" target="_blank" rel="noopener">${event.text}</a><br>`;
                }
            }
            
            html += `</div></div>`;
        }
        
        this.eventsContainer.innerHTML = html;
    }

    updateYear(position) {
        const year = this.positionToYear(position);
        this.yearDisplay.innerHTML = this.formatYear(year);
        this.yearDisplay.className = `year-display ${this.getNumberClass(year)}`;
        this.eraIndicator.textContent = this.getEraDescription(year);
        
        // Display relevant events
        const relevantEvents = this.findRelevantEvents(year);
        this.displayEvents(relevantEvents);
    }
}

// Initialize the time slider component
customElements.define('time-slider', TimeSlider);

// Create and initialize the component
document.addEventListener('DOMContentLoaded', () => {
    new TimeSlider().connectedCallback();
});