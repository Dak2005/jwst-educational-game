// JWST Educational Game - Main Application Logic

class JWSTGame {
    constructor() {
        this.currentScreen = 'welcome-screen';
        this.currentLevel = 'easy';
        this.totalScore = 0;
        this.gameScores = {
            compare: 0,
            focus: 0,
            quiz: 0,
            material: 0
        };
        this.achievements = new Set();
        this.gameState = {};

        // Game data from provided JSON
        this.telescopes = [
            {
                name: "James Webb Space Telescope",
                shortName: "JWST",
                launchYear: 2021,
                type: "Infrared",
                features: ["6.5m segmented mirror", "Infrared observations", "Ultra-deep field imaging", "Exoplanet atmosphere analysis"],
                color: "#1FB8CD"
            },
            {
                name: "Hubble Space Telescope",
                shortName: "Hubble",
                launchYear: 1990,
                type: "Optical/UV",
                features: ["2.4m mirror", "Visible light imaging", "Long operational history", "High resolution imaging"],
                color: "#FFC185"
            },
            {
                name: "Spitzer Space Telescope",
                shortName: "Spitzer",
                launchYear: 2003,
                type: "Infrared",
                features: ["0.85m mirror", "Mid-infrared observations", "Dust penetration", "Star formation studies"],
                color: "#B4413C"
            }
        ];

        // Comprehensive quiz questions from learning session PDFs
        this.gameQuestions = [
            // EASY LEVEL QUESTIONS (30 questions)
            {
                difficulty: "easy",
                question: "What does NASA stand for?",
                options: ["National Aeronautics and Space Administration", "National Aviation and Space Agency", "North American Space Association", "National Aerospace and Satellite Administration"],
                correct: 0,
                explanation: "NASA stands for National Aeronautics and Space Administration, established in 1958."
            },
            {
                difficulty: "easy",
                question: "Which country was the first to send a human into space?",
                options: ["United States", "Soviet Union (Russia)", "China", "Germany"],
                correct: 1,
                explanation: "The Soviet Union sent Yuri Gagarin into space on April 12, 1961, making him the first human in space."
            },
            {
                difficulty: "easy",
                question: "What is the name of the first artificial satellite launched into space?",
                options: ["Explorer 1", "Sputnik 1", "Telstar", "Vanguard 1"],
                correct: 1,
                explanation: "Sputnik 1 was launched by the Soviet Union on October 4, 1957, marking the beginning of the space age."
            },
            {
                difficulty: "easy",
                question: "Which telescope has captured some of the deepest images of the universe?",
                options: ["James Webb Space Telescope", "Hubble Space Telescope", "Spitzer Space Telescope", "Kepler Space Telescope"],
                correct: 1,
                explanation: "Hubble Space Telescope has captured iconic deep field images showing galaxies billions of light-years away."
            },
            {
                difficulty: "easy",
                question: "Which telescope is considered the successor to Hubble?",
                options: ["Spitzer Space Telescope", "Kepler Space Telescope", "James Webb Space Telescope", "Chandra X-ray Observatory"],
                correct: 2,
                explanation: "The James Webb Space Telescope is designed as Hubble's successor, with enhanced infrared capabilities."
            },
            {
                difficulty: "easy",
                question: "What is the main function of the International Space Station (ISS)?",
                options: ["Space tourism", "A space laboratory for research and experiments", "Satellite repair", "Moon mission preparation"],
                correct: 1,
                explanation: "The ISS serves as a microgravity laboratory where astronauts conduct scientific research and experiments."
            },
            {
                difficulty: "easy",
                question: "Which planet has been explored by rovers like Curiosity and Perseverance?",
                options: ["Venus", "Mars", "Jupiter", "Saturn"],
                correct: 1,
                explanation: "NASA's Curiosity and Perseverance rovers have been exploring the surface of Mars to study its geology and search for signs of past life."
            },
            {
                difficulty: "easy",
                question: "What is our galaxy called?",
                options: ["Andromeda Galaxy", "The Milky Way", "Whirlpool Galaxy", "Magellanic Clouds"],
                correct: 1,
                explanation: "Our galaxy is called the Milky Way, a barred spiral galaxy containing over 100 billion stars."
            },
            {
                difficulty: "easy",
                question: "What theory explains the origin of the universe?",
                options: ["Steady State Theory", "The Big Bang Theory", "Multiverse Theory", "Cyclic Model"],
                correct: 1,
                explanation: "The Big Bang Theory explains how the universe began from a singularity and has been expanding ever since."
            },
            {
                difficulty: "easy",
                question: "What is Hubble's Law related to?",
                options: ["Star formation", "The expansion of the universe", "Black hole formation", "Planetary motion"],
                correct: 1,
                explanation: "Hubble's Law describes the relationship between a galaxy's distance and its recession velocity, proving universal expansion."
            },
            {
                difficulty: "easy",
                question: "Who was the first woman in space?",
                options: ["Sally Ride", "Valentina Tereshkova", "Mae Jemison", "Peggy Whitson"],
                correct: 1,
                explanation: "Valentina Tereshkova from the Soviet Union became the first woman in space on June 16, 1963."
            },
            {
                difficulty: "easy",
                question: "Which private company developed the Falcon 9 rocket?",
                options: ["Blue Origin", "SpaceX", "Virgin Galactic", "Boeing"],
                correct: 1,
                explanation: "SpaceX, founded by Elon Musk, developed the Falcon 9 rocket series for satellite deployment and crew missions."
            },
            {
                difficulty: "easy",
                question: "What is the most famous achievement of the Hubble Space Telescope?",
                options: ["Discovering exoplanets", "Deep field images of galaxies", "Mapping the Moon", "Studying the Sun"],
                correct: 1,
                explanation: "Hubble's deep field images revealed thousands of distant galaxies, revolutionizing our understanding of the universe."
            },
            {
                difficulty: "easy",
                question: "What is the purpose of space probes?",
                options: ["Space tourism", "To explore planets, moons, and other celestial bodies", "Mining asteroids", "Building space stations"],
                correct: 1,
                explanation: "Space probes are unmanned spacecraft designed to explore and gather data from planets, moons, and other celestial objects."
            },
            {
                difficulty: "easy",
                question: "What is redshift a proof of?",
                options: ["Star formation", "The universe is expanding", "Black holes exist", "Planets orbit stars"],
                correct: 1,
                explanation: "Redshift shows that galaxies are moving away from us, providing evidence for the expanding universe."
            },
            {
                difficulty: "easy",
                question: "What is the main benefit of satellites?",
                options: ["They enable communication, navigation, and Earth observation", "They generate power", "They clean space debris", "They protect from asteroids"],
                correct: 0,
                explanation: "Satellites provide essential services including GPS navigation, communications, weather monitoring, and Earth observation."
            },
            {
                difficulty: "easy",
                question: "What is the name of the first space shuttle launched?",
                options: ["Atlantis", "Discovery", "Columbia", "Challenger"],
                correct: 2,
                explanation: "Columbia was the first space shuttle to fly, launching on April 12, 1981, for the STS-1 mission."
            },
            {
                difficulty: "easy",
                question: "Which telescope studies the universe in infrared light?",
                options: ["Hubble Space Telescope", "James Webb Space Telescope", "Spitzer Space Telescope", "Both B and C"],
                correct: 3,
                explanation: "Both JWST and Spitzer observe in infrared, though JWST has much more advanced capabilities."
            },
            {
                difficulty: "easy",
                question: "Who was the first human to step on the Moon?",
                options: ["Buzz Aldrin", "Neil Armstrong", "Michael Collins", "John Glenn"],
                correct: 1,
                explanation: "Neil Armstrong was the first person to walk on the Moon during the Apollo 11 mission on July 20, 1969."
            },
            {
                difficulty: "easy",
                question: "What does a rover do on a planet?",
                options: ["Flies in the atmosphere", "Explores the surface, takes images, and conducts experiments", "Orbits the planet", "Returns to Earth"],
                correct: 1,
                explanation: "Rovers are mobile laboratories that move across planetary surfaces to study geology, atmosphere, and search for signs of life."
            },
            {
                difficulty: "easy",
                question: "What is a supernova?",
                options: ["A new star being born", "A massive explosion marking the end of a star's life", "A small asteroid", "A type of galaxy"],
                correct: 1,
                explanation: "A supernova is the explosive death of a massive star, one of the most energetic events in the universe."
            },
            {
                difficulty: "easy",
                question: "What does the term 'space tourism' mean?",
                options: ["Studying space from Earth", "Traveling to space for recreational purposes", "Working on space stations", "Building rockets"],
                correct: 1,
                explanation: "Space tourism refers to commercial spaceflight for recreational, leisure, or business purposes."
            },
            {
                difficulty: "easy",
                question: "What does GPS stand for?",
                options: ["Global Positioning System", "General Physics Satellite", "Galactic Probe System", "Gravity Positioning Sensor"],
                correct: 0,
                explanation: "GPS stands for Global Positioning System, which uses satellites to provide location and navigation services."
            },
            {
                difficulty: "easy",
                question: "Which space station is still active today?",
                options: ["Mir", "Skylab", "The International Space Station (ISS)", "Salyut"],
                correct: 2,
                explanation: "The International Space Station (ISS) has been continuously occupied since 2000 and remains active."
            },
            {
                difficulty: "easy",
                question: "What does the term 'galaxy' mean?",
                options: ["A single star", "A planet system", "A collection of billions of stars, gas, and dust bound by gravity", "A type of telescope"],
                correct: 2,
                explanation: "A galaxy is a massive collection of stars, stellar remnants, gas, dust, and dark matter bound together by gravity."
            },
            {
                difficulty: "easy",
                question: "Which robotic spacecraft have explored the outer planets?",
                options: ["Apollo missions", "Voyager probes", "Space shuttles", "Soyuz spacecraft"],
                correct: 1,
                explanation: "The Voyager 1 and 2 probes launched in 1977 have provided detailed information about the outer solar system."
            },
            {
                difficulty: "easy",
                question: "What is the life cycle stage of a star after it runs out of fuel?",
                options: ["It becomes a planet", "It becomes a red giant, then possibly a white dwarf, neutron star, or black hole", "It disappears completely", "It becomes a comet"],
                correct: 1,
                explanation: "When stars exhaust their nuclear fuel, they expand into red giants and then evolve into white dwarfs, neutron stars, or black holes depending on their mass."
            },
            {
                difficulty: "easy",
                question: "What do satellites help us with in daily life?",
                options: ["Only military operations", "Communication, weather forecasting, GPS, and scientific observation", "Only internet access", "Only space exploration"],
                correct: 1,
                explanation: "Satellites provide numerous civilian services including communications, weather prediction, navigation, and Earth monitoring."
            },
            {
                difficulty: "easy",
                question: "Which companies are leading in commercial space tourism?",
                options: ["NASA and ESA", "SpaceX, Blue Origin, Virgin Galactic", "Boeing and Lockheed", "Google and Apple"],
                correct: 1,
                explanation: "Private companies like SpaceX, Blue Origin, and Virgin Galactic are pioneering commercial space tourism."
            },
            {
                difficulty: "easy",
                question: "What was the goal of the Apollo program?",
                options: ["To build space stations", "To land humans on the Moon and return them safely to Earth", "To explore Mars", "To launch satellites"],
                correct: 1,
                explanation: "The Apollo program's primary goal was to land humans on the Moon and return them safely, achieved six times between 1969-1972."
            },

            // MEDIUM LEVEL QUESTIONS (30 questions)
            {
                difficulty: "medium",
                question: "What evidence supports the Big Bang Theory?",
                options: ["Only fossil records", "The expansion of the universe, cosmic microwave background radiation, and abundance of light elements", "Solar system formation", "Black hole observations"],
                correct: 1,
                explanation: "The Big Bang Theory is supported by Hubble's observations of universal expansion, cosmic microwave background radiation, and the observed abundance of light elements like hydrogen and helium."
            },
            {
                difficulty: "medium",
                question: "How do astronomers measure the expansion of the universe?",
                options: ["By counting stars", "By observing the redshift of light from distant galaxies", "By measuring planet sizes", "By studying moon phases"],
                correct: 1,
                explanation: "Astronomers use redshift measurements of distant galaxies to determine their recession velocities, proving universal expansion."
            },
            {
                difficulty: "medium",
                question: "Why is the James Webb Space Telescope more powerful than Hubble?",
                options: ["It's closer to Earth", "It observes mainly in infrared, has a much larger mirror, and can see farther back in time", "It uses nuclear power", "It has more computers"],
                correct: 1,
                explanation: "JWST's 6.5m infrared mirror and advanced instruments allow it to observe the early universe and see through cosmic dust better than Hubble."
            },
            {
                difficulty: "medium",
                question: "What role does dark energy play in the universe?",
                options: ["It creates new stars", "It is responsible for the accelerated expansion of the universe", "It forms black holes", "It powers telescopes"],
                correct: 1,
                explanation: "Dark energy is the mysterious force causing the universe's expansion to accelerate, making up about 68% of the universe."
            },
            {
                difficulty: "medium",
                question: "How are stars formed from nebulae?",
                options: ["They appear instantly", "Gas and dust in nebulae collapse under gravity, forming protostars that eventually ignite nuclear fusion", "They migrate from other galaxies", "They split from existing stars"],
                correct: 1,
                explanation: "Star formation occurs when dense regions of gas and dust in nebulae collapse under gravity until temperatures become hot enough for nuclear fusion."
            },
            {
                difficulty: "medium",
                question: "What happens when a massive star dies?",
                options: ["It becomes a planet", "It may explode as a supernova, leaving behind a neutron star or black hole", "It just disappears", "It becomes a comet"],
                correct: 1,
                explanation: "Massive stars end their lives in spectacular supernova explosions, leaving behind either neutron stars or black holes depending on their mass."
            },
            {
                difficulty: "medium",
                question: "Why do stars of different masses have different life cycles?",
                options: ["They are made of different materials", "The mass determines the rate of nuclear fusion: higher mass stars burn fuel faster and live shorter lives", "They are at different distances", "They formed at different times"],
                correct: 1,
                explanation: "More massive stars have higher core pressures and temperatures, causing faster nuclear fusion rates and shorter lifespans."
            },
            {
                difficulty: "medium",
                question: "How does the ISS contribute to science?",
                options: ["Only by taking pictures", "It provides a microgravity laboratory for experiments in biology, physics, materials, and Earth observation", "Only by studying space weather", "Only for astronaut training"],
                correct: 1,
                explanation: "The ISS's microgravity environment enables unique research impossible on Earth, advancing our understanding in multiple scientific fields."
            },
            {
                difficulty: "medium",
                question: "What is a redshift in astronomy?",
                options: ["When stars turn red", "It is the stretching of light waves toward longer wavelengths as galaxies move away", "When telescopes overheat", "When planets change color"],
                correct: 1,
                explanation: "Redshift occurs when light waves are stretched to longer (redder) wavelengths due to the source moving away from the observer."
            },
            {
                difficulty: "medium",
                question: "Why are space probes important for planetary exploration?",
                options: ["They are cheaper than telescopes", "They collect detailed data from planets and moons that are unreachable for humans", "They can return immediately", "They work better than satellites"],
                correct: 1,
                explanation: "Space probes can travel to distant worlds and provide close-up observations impossible from Earth-based telescopes."
            },
            {
                difficulty: "medium",
                question: "What is the purpose of the cosmic microwave background study?",
                options: ["To predict weather", "To understand conditions of the early universe just after the Big Bang", "To find new planets", "To measure Earth's temperature"],
                correct: 1,
                explanation: "The cosmic microwave background is relic radiation from when the universe became transparent, providing insights into early cosmic conditions."
            },
            {
                difficulty: "medium",
                question: "How do communication satellites help in daily life?",
                options: ["Only for TV broadcasts", "They enable GPS, internet, broadcasting, and global telecommunication", "Only for military use", "Only for weather prediction"],
                correct: 1,
                explanation: "Communication satellites form the backbone of modern global communications, enabling everything from GPS to internet connectivity."
            },
            {
                difficulty: "medium",
                question: "What is stellar nucleosynthesis?",
                options: ["Star navigation", "It is the process by which stars fuse elements inside their cores, creating heavier elements", "Star destruction", "Star classification"],
                correct: 1,
                explanation: "Stellar nucleosynthesis is the nuclear fusion process in stars that creates heavier elements from lighter ones, enriching the universe."
            },
            {
                difficulty: "medium",
                question: "Why is the Milky Way classified as a barred spiral galaxy?",
                options: ["It has barriers around it", "Because it has a central bar-shaped structure of stars with spiral arms extending outward", "It spins very fast", "It's very old"],
                correct: 1,
                explanation: "The Milky Way has a central bar-shaped concentration of stars with spiral arms extending from the ends of the bar."
            },
            {
                difficulty: "medium",
                question: "How do robotic rovers assist Mars exploration?",
                options: ["They build bases", "They analyze soil, rocks, and atmosphere to search for signs of past water or life", "They transport humans", "They mine resources"],
                correct: 1,
                explanation: "Mars rovers conduct detailed geological and chemical analysis to understand Mars' history and potential for past or present life."
            },
            {
                difficulty: "medium",
                question: "What is an exoplanet?",
                options: ["A former planet", "A planet orbiting a star outside our solar system", "A very large planet", "A planet without moons"],
                correct: 1,
                explanation: "An exoplanet is any planet that orbits a star other than our Sun, thousands of which have been discovered."
            },
            {
                difficulty: "medium",
                question: "Why was the Hubble Space Telescope placed in orbit?",
                options: ["To be closer to stars", "To avoid atmospheric distortion and capture clearer images of space", "To save money", "To study the Moon better"],
                correct: 1,
                explanation: "Placing Hubble above Earth's atmosphere eliminates atmospheric turbulence and absorption, providing crystal-clear space observations."
            },
            {
                difficulty: "medium",
                question: "How does gravitational lensing help astronomers?",
                options: ["It makes telescopes bigger", "It magnifies light from distant galaxies using massive objects like clusters as natural lenses", "It reduces telescope cost", "It powers spacecraft"],
                correct: 1,
                explanation: "Gravitational lensing uses the gravity of massive objects to bend and magnify light from more distant objects, acting like a cosmic telescope."
            },
            {
                difficulty: "medium",
                question: "What are the main challenges of space tourism?",
                options: ["Only technical problems", "High costs, safety risks, radiation exposure, and environmental impact", "Only legal issues", "Only scheduling conflicts"],
                correct: 1,
                explanation: "Space tourism faces multiple challenges including enormous costs, safety concerns, health risks from radiation, and environmental considerations."
            },
            {
                difficulty: "medium",
                question: "Why do galaxies collide?",
                options: ["They move too fast", "Because of gravitational attraction, though stars rarely collide directly due to vast distances", "They are pushed by dark energy", "They run out of fuel"],
                correct: 1,
                explanation: "Galaxies are gravitationally bound and can collide over cosmic timescales, though the vast distances between stars make stellar collisions rare."
            },
            {
                difficulty: "medium",
                question: "What is the significance of water detection on Mars?",
                options: ["It proves aliens exist", "It suggests potential habitability and future human colonization possibilities", "It means Mars is warm", "It will end space exploration"],
                correct: 1,
                explanation: "Water on Mars indicates potential past or present habitability and provides resources essential for future human missions."
            },
            {
                difficulty: "medium",
                question: "What is a neutron star?",
                options: ["A new type of star", "A super-dense remnant of a massive star left after a supernova explosion", "A star made of gas", "A failed star"],
                correct: 1,
                explanation: "Neutron stars are incredibly dense stellar remnants where matter is compressed to nuclear density, formed in supernova explosions."
            },
            {
                difficulty: "medium",
                question: "How does NASA use satellites for climate monitoring?",
                options: ["Only for temperature", "By tracking weather, sea levels, greenhouse gases, and deforestation from space", "Only for ice measurement", "Only for cloud observation"],
                correct: 1,
                explanation: "NASA's Earth observation satellites provide comprehensive climate data including atmospheric composition, ocean temperatures, and land use changes."
            },
            {
                difficulty: "medium",
                question: "What makes the space shuttle program unique?",
                options: ["It was the fastest", "It was reusable and allowed astronauts to conduct missions repeatedly in orbit", "It was the smallest", "It was unmanned"],
                correct: 1,
                explanation: "The Space Shuttle was the first reusable orbital spacecraft, enabling multiple missions and the construction of the ISS."
            },
            {
                difficulty: "medium",
                question: "Why are international collaborations important in space exploration?",
                options: ["Only for politics", "They reduce costs, share technology, and promote peaceful cooperation", "Only for language practice", "Only for tourism"],
                correct: 1,
                explanation: "International cooperation in space exploration maximizes scientific return while fostering peaceful relationships and technological advancement."
            },
            {
                difficulty: "medium",
                question: "How are gamma-ray bursts important to astronomy?",
                options: ["They power spacecraft", "They are powerful explosions that provide insights into black holes and star deaths", "They help navigation", "They create new planets"],
                correct: 1,
                explanation: "Gamma-ray bursts are the universe's most energetic explosions, providing insights into stellar death, black hole formation, and early universe conditions."
            },
            {
                difficulty: "medium",
                question: "What is a black hole's event horizon?",
                options: ["The black hole's surface", "The boundary beyond which nothing, not even light, can escape its gravity", "The black hole's atmosphere", "The space around the black hole"],
                correct: 1,
                explanation: "The event horizon is the point of no return around a black hole where the escape velocity equals the speed of light."
            },
            {
                difficulty: "medium",
                question: "Why are women astronauts' contributions significant?",
                options: ["They are better pilots", "They broke barriers, conducted groundbreaking research, and promoted diversity in STEM", "They weigh less", "They need less oxygen"],
                correct: 1,
                explanation: "Women astronauts have made crucial scientific contributions while breaking gender barriers and inspiring future generations in STEM fields."
            },
            {
                difficulty: "medium",
                question: "What is dark matter and why is it important?",
                options: ["Visible black material", "It is invisible mass that holds galaxies together and makes up most of the universe's matter", "Empty space", "Dead stars"],
                correct: 1,
                explanation: "Dark matter is invisible matter that provides the gravitational scaffolding for galaxy formation and makes up about 27% of the universe."
            },
            {
                difficulty: "medium",
                question: "Why can JWST see further back in time than Hubble?",
                options: ["It's newer technology", "Infrared light from distant galaxies is redshifted into wavelengths JWST can detect", "It has better software", "It's positioned closer to stars"],
                correct: 1,
                explanation: "Due to cosmic expansion, light from very distant galaxies is redshifted into infrared wavelengths that JWST can detect but Hubble cannot."
            },

            // HARD LEVEL QUESTIONS (15 questions)
            {
                difficulty: "hard",
                question: "How do the design trade-offs between optical, infrared, and radio telescopes impact discoveries?",
                options: ["All telescopes work the same way", "Optical telescopes are limited by atmospheric distortion, infrared telescopes need cooling systems, and radio telescopes can penetrate dust but require large arrays", "Only cost differences matter", "They all observe the same things"],
                correct: 1,
                explanation: "Each telescope type has unique capabilities and limitations that determine what astronomical phenomena they can best observe and study."
            },
            {
                difficulty: "hard",
                question: "Why is the James Webb Space Telescope positioned at the L2 point?",
                options: ["It's the closest point to stars", "L2 offers a stable gravitational balance and constant shielding from the Sun, Earth, and Moon", "It's the cheapest location", "It has the best internet connection"],
                correct: 1,
                explanation: "The L2 Lagrange point provides gravitational stability and allows JWST's sunshield to simultaneously block radiation from the Sun, Earth, and Moon."
            },
            {
                difficulty: "hard",
                question: "Compare the benefits and limitations of human-crewed missions versus robotic exploration.",
                options: ["Humans are always better", "Human missions allow adaptive decision-making and complex tasks but are risky and costly; robotic probes are cheaper and can last decades but lack flexibility", "Robots are always better", "There's no difference"],
                correct: 1,
                explanation: "Human missions provide adaptability and complex problem-solving but are expensive and risky, while robotic missions offer longevity and cost-effectiveness but limited adaptability."
            },
            {
                difficulty: "hard",
                question: "What are the astrophysical implications of observing high redshift galaxies?",
                options: ["They show us future galaxy evolution", "High redshift galaxies reveal conditions of the early universe, providing evidence for galaxy formation and cosmic structure growth", "They prove galaxies are getting smaller", "They show galaxies are slowing down"],
                correct: 1,
                explanation: "High redshift observations show galaxies as they were billions of years ago, revealing how cosmic structures formed and evolved over time."
            },
            {
                difficulty: "hard",
                question: "How do gravitational wave observations complement electromagnetic observations?",
                options: ["They replace electromagnetic observations", "Gravitational waves probe events like black hole mergers invisible to light, forming 'multi-messenger astronomy'", "They only work on Earth", "They are less accurate"],
                correct: 1,
                explanation: "Gravitational waves detect spacetime distortions from events like black hole mergers, providing information unavailable through electromagnetic radiation alone."
            },
            {
                difficulty: "hard",
                question: "What engineering challenges make interstellar travel fundamentally harder than interplanetary travel?",
                options: ["Only distance matters", "Interstellar travel requires propulsion beyond chemical rockets, cosmic ray protection, sustainable life support, and energy on unprecedented scales", "Only time matters", "It's just more expensive"],
                correct: 1,
                explanation: "Interstellar distances require revolutionary propulsion, decades-long life support, radiation shielding, and energy systems far beyond current capabilities."
            },
            {
                difficulty: "hard",
                question: "How does dark matter influence galaxy rotation curves?",
                options: ["It makes galaxies spin faster everywhere", "Dark matter provides additional unseen mass explaining why galaxy rotation curves remain flat at large radii", "It only affects galaxy centers", "It slows down galaxy rotation"],
                correct: 1,
                explanation: "Dark matter's gravitational influence explains why galaxy rotation curves stay flat instead of declining as predicted by visible matter alone."
            },
            {
                difficulty: "hard",
                question: "Explain the importance of the Cosmic Microwave Background (CMB) in validating the Big Bang model.",
                options: ["It shows current star formation", "The CMB is relic radiation from ~380,000 years after the Big Bang, providing evidence for expansion and inflation theory", "It measures galaxy distances", "It detects black holes"],
                correct: 1,
                explanation: "The CMB is the afterglow of the Big Bang, providing crucial evidence for the hot, dense early universe and supporting inflation cosmology."
            },
            {
                difficulty: "hard",
                question: "Why are exoplanet detection methods biased towards large planets close to their stars?",
                options: ["Small planets don't exist", "Transit and radial velocity methods detect stronger signals from large, close planets that cause noticeable effects", "Large planets are more common", "Close planets are easier to photograph"],
                correct: 1,
                explanation: "Current detection methods rely on measurable effects like brightness dips or stellar wobbles, which are strongest for large planets in close orbits."
            },
            {
                difficulty: "hard",
                question: "How does stellar nucleosynthesis explain the abundance of heavier elements in the universe?",
                options: ["All elements formed during Big Bang", "Fusion in stars produces elements up to iron; supernovae and neutron star mergers create heavier elements", "Planets create heavy elements", "Heavy elements don't exist"],
                correct: 1,
                explanation: "Stars forge elements up to iron through fusion, while explosive events like supernovae create elements heavier than iron, enriching space."
            },
            {
                difficulty: "hard",
                question: "What are the challenges of establishing a permanent human base on Mars?",
                options: ["Only transportation costs", "Thin CO₂ atmosphere, harmful radiation, dust storms, limited water access, and extreme cold require advanced life support", "Only communication delays", "Mars is too small"],
                correct: 1,
                explanation: "Mars colonization faces multiple challenges including atmospheric, radiation, resource, and environmental factors requiring advanced technological solutions."
            },
            {
                difficulty: "hard",
                question: "How does Hubble's Law provide evidence for an expanding universe?",
                options: ["It shows stars getting brighter", "Hubble's Law shows recession velocity proportional to distance, proving expansion", "It measures planet orbits", "It counts galaxies"],
                correct: 1,
                explanation: "Hubble's Law demonstrates that more distant galaxies recede faster, providing direct evidence for universal expansion from a common origin."
            },
            {
                difficulty: "hard",
                question: "What makes pulsars and quasars valuable astrophysical tools?",
                options: ["They are very bright", "Pulsars serve as precise cosmic clocks for testing relativity, while quasars act as bright beacons to probe intergalactic space", "They are very close", "They never change"],
                correct: 1,
                explanation: "Pulsars provide precision timing for testing physics theories, while quasars serve as distant lighthouses to study intervening matter and cosmic evolution."
            },
            {
                difficulty: "hard",
                question: "Why is detecting biosignatures in exoplanet atmospheres extremely difficult?",
                options: ["Planets are too small", "It requires separating faint planetary signals from bright starlight and distinguishing biological from non-biological processes", "We lack the technology", "Atmospheres change too quickly"],
                correct: 1,
                explanation: "Biosignature detection requires extraordinary precision to isolate weak atmospheric signals and eliminate false positives from non-biological sources."
            },
            {
                difficulty: "hard",
                question: "How do modern observations validate Einstein's general relativity predictions about black holes?",
                options: ["We can see black holes directly", "Gravitational wave detections and Event Horizon Telescope images confirm Einstein's predictions about spacetime curvature", "Black holes emit light", "Einstein was guessing"],
                correct: 1,
                explanation: "LIGO's gravitational wave detections and the Event Horizon Telescope's black hole image provide direct evidence for Einstein's century-old predictions."
            },
            {
                difficulty: "hard",
                question: "What is the advantage of JWST's segmented mirror design?",
                options: ["Lower cost", "Fits in rocket fairing when folded", "Better image quality", "Easier maintenance"],
                correct: 1,
                explanation: "The segmented mirror can fold to fit inside the rocket fairing and then unfold in space, allowing for a much larger mirror than would otherwise be possible."
            }
        ];

        this.achievementsList = [
            {name: "First Focus", description: "Complete your first focus challenge", icon: "🔭"},
            {name: "Telescope Expert", description: "Correctly identify 10 telescope images", icon: "🏆"},
            {name: "Quiz Master", description: "Answer 5 quiz questions correctly in a row", icon: "🧠"},
            {name: "Explorer", description: "Visit all sections of the game", icon: "🚀"},
            {name: "Perfect Vision", description: "Complete a focus challenge with perfect accuracy", icon: "👁️"},
            {name: "Material Scientist", description: "Learn about telescope materials", icon: "🔬"},
            {name: "Knowledge Seeker", description: "Answer 10 questions correctly", icon: "📚"},
            {name: "Expert Scholar", description: "Complete hard level quiz", icon: "🎓"}
        ];

        this.cosmicObjects = [
            {name: "Carina Nebula", type: "Star-forming region", distance: "7,500 light-years"},
            {name: "SMACS 0723", type: "Galaxy cluster", distance: "4.6 billion light-years"},
            {name: "Stephan's Quintet", type: "Galaxy group", distance: "290 million light-years"},
            {name: "Southern Ring Nebula", type: "Planetary nebula", distance: "2,000 light-years"},
            {name: "WASP-96b", type: "Exoplanet", distance: "1,150 light-years"}
        ];

        // Material facts for the learning session
        this.materialFacts = [
            "The James Webb Space Telescope uses materials that didn't exist when Hubble was built!",
            "JWST's gold coating is 1000 times thinner than human hair but reflects 98% of infrared light!",
            "The beryllium mirrors maintain their shape at -370°F within nanometer precision!",
            "Each layer of the sunshield is thinner than human hair but blocks 99.99% of the Sun's heat!",
            "The cryocooler materials can maintain temperatures colder than deep space naturally provides!",
            "Carbon fiber composites in JWST are stronger than steel but lighter than aluminum!"
        ];
    }

    init() {
        console.log('Initializing JWST Game');
        this.setupEventListeners();
        this.setupPWA();
        this.loadGameState();
        this.updateScoreDisplay();
        console.log('JWST Game initialized successfully');
    }

    setupEventListeners() {
        console.log('Setting up event listeners');
        
        // Welcome screen - Multiple event handling approaches
        const startBtn = document.getElementById('start-btn');
        console.log('Start button found:', startBtn);
        if (startBtn) {
            // Remove any existing listeners first
            startBtn.replaceWith(startBtn.cloneNode(true));
            const newStartBtn = document.getElementById('start-btn');
            
            // Add click event
            newStartBtn.addEventListener('click', (e) => {
                console.log('Start button clicked!');
                e.preventDefault();
                e.stopPropagation();
                this.switchScreen('level-screen');
                return false;
            }, { capture: true });

            // Add mousedown for immediate response
            newStartBtn.addEventListener('mousedown', (e) => {
                console.log('Start button mousedown');
                e.preventDefault();
            });

            // Add keyboard support
            newStartBtn.addEventListener('keydown', (e) => {
                console.log('Start button keydown:', e.key);
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.switchScreen('level-screen');
                }
            });

            // Make button focusable
            newStartBtn.tabIndex = 0;
        }

        // Install button
        const installBtn = document.getElementById('install-btn');
        if (installBtn) {
            installBtn.addEventListener('click', () => {
                console.log('Install button clicked');
                this.handleInstall();
            });
        }

        // Global click handler for level and mode cards
        document.addEventListener('click', (e) => {
            // Level selection - including material science
            const levelCard = e.target.closest('.level-card');
            if (levelCard && levelCard.dataset.level) {
                console.log('Level card clicked:', levelCard.dataset.level);
                e.preventDefault();
                e.stopPropagation();
                const level = levelCard.dataset.level;
                
                // Special handling for material science - open external link
                if (level === 'material-science') {
                    console.log('Opening 30 Chapters Learning Session');
                    window.open('https://rafiaya.github.io/chapters/', '_blank');
                    this.checkAchievement('Material Scientist');
                    this.gameScores.material += this.getPointsForLevel();
                    this.updateScoreDisplay();
                    return false;
                }

                // Regular level selection
                this.setLevel(level);
                this.switchScreen('mode-screen');
                return false;
            }

            // Mode selection
            const modeCard = e.target.closest('.mode-card');
            if (modeCard && modeCard.dataset.mode) {
                console.log('Mode card clicked:', modeCard.dataset.mode);
                e.preventDefault();
                e.stopPropagation();
                const mode = modeCard.dataset.mode;
                this.startGameMode(mode);
                return false;
            }

            // Back buttons
            if (e.target.closest('.back-btn')) {
                console.log('Back button clicked');
                e.preventDefault();
                e.stopPropagation();
                this.goBack();
                return false;
            }

            // Telescope buttons in comparison game
            if (e.target.classList.contains('telescope-btn') && this.compareState) {
                if (this.compareState.answered) return;
                console.log('Telescope button clicked:', e.target.dataset.telescope);
                const selected = e.target.dataset.telescope;
                this.answerCompareQuestion(selected);
            }
        }, { capture: true });

        // Game-specific event listeners
        this.setupCompareGame();
        this.setupFocusGame();
        this.setupQuizGame();
        this.setupResults();
        console.log('Event listeners setup complete');
    }

    handleInstall() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            this.deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                    const installBtn = document.getElementById('install-btn');
                    if (installBtn) installBtn.style.display = 'none';
                }
                this.deferredPrompt = null;
            });
        }
    }

    setupPWA() {
        console.log('Setting up PWA');
        
        // Register service worker
        if ('serviceWorker' in navigator) {
            this.registerServiceWorker();
        }

        // Install prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('Install prompt available');
            e.preventDefault();
            this.deferredPrompt = e;
            const installBtn = document.getElementById('install-btn');
            if (installBtn) {
                installBtn.style.display = 'block';
            }
        });
    }

    async registerServiceWorker() {
        try {
            const swCode = `
                const CACHE_NAME = 'jwst-game-v1';
                const urlsToCache = [
                    '/',
                    '/index.html',
                    '/style.css',
                    '/app.js'
                ];
                
                self.addEventListener('install', event => {
                    console.log('SW installing');
                    event.waitUntil(
                        caches.open(CACHE_NAME)
                            .then(cache => cache.addAll(urlsToCache))
                    );
                });
                
                self.addEventListener('fetch', event => {
                    event.respondWith(
                        caches.match(event.request)
                            .then(response => {
                                return response || fetch(event.request);
                            })
                    );
                });
            `;
            
            const blob = new Blob([swCode], { type: 'application/javascript' });
            const swUrl = URL.createObjectURL(blob);
            await navigator.serviceWorker.register(swUrl);
            console.log('Service worker registered');

            // Create manifest
            const manifest = {
                name: "JWST Educational Game",
                short_name: "JWST Game",
                description: "Interactive educational game about the James Webb Space Telescope",
                start_url: "/",
                display: "standalone",
                theme_color: "#1f2121",
                background_color: "#1f2121",
                icons: [{
                    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='0.9em' font-size='90'%3E🔭%3C/text%3E%3C/svg%3E",
                    sizes: "192x192",
                    type: "image/svg+xml"
                }]
            };

            const manifestBlob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
            const manifestUrl = URL.createObjectURL(manifestBlob);
            const manifestLink = document.getElementById('manifest-placeholder');
            if (manifestLink) {
                manifestLink.href = manifestUrl;
            }
        } catch (error) {
            console.log('Service worker registration failed:', error);
        }
    }

    switchScreen(screenId) {
        console.log('Switching from', this.currentScreen, 'to', screenId);
        
        // Hide current screen
        const currentScreenEl = document.querySelector('.screen.active');
        if (currentScreenEl) {
            currentScreenEl.classList.remove('active');
            console.log('Removed active class from:', currentScreenEl.id);
        }

        // Show new screen
        const newScreenEl = document.getElementById(screenId);
        if (newScreenEl) {
            newScreenEl.classList.add('active');
            this.currentScreen = screenId;
            console.log('Added active class to:', screenId);
            // Trigger any screen-specific initialization
            this.onScreenChanged(screenId);
        } else {
            console.error('Screen not found:', screenId);
        }
    }

    onScreenChanged(screenId) {
        // Screen-specific initialization
        switch(screenId) {
            case 'level-screen':
                console.log('Level screen activated');
                break;
            case 'mode-screen':
                console.log('Mode screen activated');
                break;
        }
    }

    setLevel(level) {
        this.currentLevel = level;
        const levelDisplay = document.getElementById('current-level');
        if (levelDisplay) {
            levelDisplay.textContent = level.charAt(0).toUpperCase() + level.slice(1);
        }
        console.log('Level set to:', level);
    }

    goBack() {
        console.log('Going back from:', this.currentScreen);
        if (this.currentScreen === 'level-screen') {
            this.switchScreen('welcome-screen');
        } else if (this.currentScreen === 'mode-screen') {
            this.switchScreen('level-screen');
        } else if (this.currentScreen.includes('screen') && this.currentScreen !== 'welcome-screen') {
            this.switchScreen('mode-screen');
        }
    }

    startGameMode(mode) {
        console.log('Starting game mode:', mode);
        this.checkAchievement('Explorer');
        
        switch(mode) {
            case 'compare':
                this.startCompareGame();
                break;
            case 'focus':
                this.startFocusGame();
                break;
            case 'quiz':
                this.startQuizGame();
                break;
            case 'gallery':
                this.showGallery();
                break;
        }
    }

    // Telescope Comparison Game
    setupCompareGame() {
        this.compareState = {
            currentQuestion: 0,
            totalQuestions: 5,
            score: 0,
            questions: [],
            answered: false
        };
    }

    startCompareGame() {
        console.log('Starting comparison game');
        this.switchScreen('compare-screen');
        this.compareState.currentQuestion = 0;
        this.compareState.score = 0;
        this.compareState.answered = false;
        this.generateCompareQuestions();
        this.showCompareQuestion();
        this.updateProgress('compare-progress', 0);
    }

    generateCompareQuestions() {
        this.compareState.questions = [];
        for (let i = 0; i < this.compareState.totalQuestions; i++) {
            const telescope = this.telescopes[Math.floor(Math.random() * this.telescopes.length)];
            const objects = ['nebula', 'galaxy', 'star cluster', 'planet', 'cosmic dust'];
            const object = objects[Math.floor(Math.random() * objects.length)];
            this.compareState.questions.push({
                telescope: telescope,
                object: object,
                correct: telescope.shortName
            });
        }
    }

    showCompareQuestion() {
        const question = this.compareState.questions[this.compareState.currentQuestion];
        const canvas = document.getElementById('compare-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            this.drawTelescopeView(ctx, question.telescope, question.object);
        }

        const questionEl = document.getElementById('compare-question');
        if (questionEl) {
            questionEl.textContent = `Which telescope captured this ${question.object}?`;
        }

        // Reset button states
        document.querySelectorAll('.telescope-btn').forEach(btn => {
            btn.classList.remove('correct', 'incorrect', 'selected');
        });

        const feedback = document.getElementById('compare-feedback');
        if (feedback) {
            feedback.classList.remove('show', 'correct', 'incorrect');
        }

        this.compareState.answered = false;
    }

    drawTelescopeView(ctx, telescope, object) {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        
        // Clear canvas
        ctx.fillStyle = '#000011';
        ctx.fillRect(0, 0, width, height);

        // Add stars
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 50; i++) {
            ctx.beginPath();
            ctx.arc(
                Math.random() * width,
                Math.random() * height,
                Math.random() * 2,
                0, 2 * Math.PI
            );
            ctx.fill();
        }

        // Draw main object based on telescope characteristics
        ctx.save();
        ctx.translate(width / 2, height / 2);
        
        const baseSize = 80;
        const detail = telescope.shortName === 'JWST' ? 1.5 :
                      telescope.shortName === 'Hubble' ? 1.2 : 1.0;

        // Create gradient for cosmic object
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, baseSize * detail);
        gradient.addColorStop(0, telescope.color);
        gradient.addColorStop(0.5, telescope.color + '80');
        gradient.addColorStop(1, telescope.color + '20');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, baseSize * detail, 0, 2 * Math.PI);
        ctx.fill();

        // Add telescope-specific details
        if (telescope.shortName === 'JWST') {
            ctx.strokeStyle = '#ff6b6b';
            ctx.lineWidth = 2;
            for (let i = 0; i < 8; i++) {
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(
                    Math.cos(i * Math.PI / 4) * baseSize * 1.2,
                    Math.sin(i * Math.PI / 4) * baseSize * 1.2
                );
                ctx.stroke();
            }
        } else if (telescope.shortName === 'Hubble') {
            ctx.strokeStyle = '#4ecdc4';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(0, 0, baseSize * 0.8, 0, 2 * Math.PI);
            ctx.stroke();
        }

        ctx.restore();
    }

    answerCompareQuestion(selected) {
        if (this.compareState.answered) return;
        
        console.log('Answer selected:', selected);
        this.compareState.answered = true;
        const question = this.compareState.questions[this.compareState.currentQuestion];
        const correct = selected === question.correct;

        // Update button states
        document.querySelectorAll('.telescope-btn').forEach(btn => {
            const telescope = btn.dataset.telescope;
            if (telescope === selected) {
                btn.classList.add('selected');
            }
            if (telescope === question.correct) {
                btn.classList.add('correct');
            } else if (telescope === selected && !correct) {
                btn.classList.add('incorrect');
            }
        });

        // Show feedback
        const feedback = document.getElementById('compare-feedback');
        if (feedback) {
            feedback.classList.add('show', correct ? 'correct' : 'incorrect');
            feedback.textContent = correct ? 
                '✅ Correct! ' + question.telescope.features[0] :
                '❌ Incorrect. The correct answer is ' + question.telescope.shortName;
        }

        if (correct) {
            this.compareState.score += this.getPointsForLevel();
            this.gameScores.compare += this.getPointsForLevel();
        }

        // Progress to next question
        setTimeout(() => {
            this.compareState.currentQuestion++;
            if (this.compareState.currentQuestion < this.compareState.totalQuestions) {
                this.showCompareQuestion();
                this.updateProgress('compare-progress', 
                    (this.compareState.currentQuestion / this.compareState.totalQuestions) * 100);
            } else {
                this.finishCompareGame();
            }
        }, 2500);
    }

    finishCompareGame() {
        if (this.compareState.score >= this.compareState.totalQuestions * this.getPointsForLevel() * 0.8) {
            this.checkAchievement('Telescope Expert');
        }
        this.showResults('compare');
    }

    // Focus Challenge Game
    setupFocusGame() {
        this.focusState = {
            currentChallenge: 0,
            totalChallenges: 3,
            score: 0,
            targetFocus: 0,
            tolerance: 10,
            submitted: false
        };

        const focusSlider = document.getElementById('focus-slider');
        if (focusSlider) {
            focusSlider.addEventListener('input', (e) => {
                this.updateFocusView(parseInt(e.target.value));
            });
        }

        const focusSubmit = document.getElementById('focus-submit');
        if (focusSubmit) {
            focusSubmit.addEventListener('click', () => {
                this.submitFocus();
            });
        }
    }

    startFocusGame() {
        console.log('Starting focus game');
        this.switchScreen('focus-screen');
        this.focusState.currentChallenge = 0;
        this.focusState.score = 0;
        this.startFocusChallenge();
        this.updateProgress('focus-progress', 0);
    }

    startFocusChallenge() {
        this.focusState.targetFocus = Math.floor(Math.random() * 80) + 10;
        this.focusState.submitted = false;

        const slider = document.getElementById('focus-slider');
        if (slider) {
            slider.value = 0;
            this.updateFocusView(0);
        }

        const feedback = document.getElementById('focus-feedback');
        if (feedback) {
            feedback.classList.remove('show', 'correct', 'incorrect');
        }

        const submitBtn = document.getElementById('focus-submit');
        if (submitBtn) {
            submitBtn.disabled = false;
        }
    }

    updateFocusView(focusValue) {
        const canvas = document.getElementById('focus-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const targetFocus = this.focusState.targetFocus;
        const blurAmount = Math.abs(focusValue - targetFocus) / 2;

        ctx.fillStyle = '#000033';
        ctx.fillRect(0, 0, width, height);

        ctx.save();
        const iterations = Math.max(1, Math.floor(blurAmount / 5));
        ctx.globalAlpha = 1 / iterations;

        for (let i = 0; i < iterations; i++) {
            ctx.save();
            ctx.translate(
                (Math.random() - 0.5) * blurAmount,
                (Math.random() - 0.5) * blurAmount
            );

            // Draw stars
            ctx.fillStyle = '#ffffff';
            for (let j = 0; j < 20; j++) {
                ctx.beginPath();
                ctx.arc(
                    100 + j * 25,
                    100 + (j % 3) * 100,
                    3,
                    0, 2 * Math.PI
                );
                ctx.fill();
            }

            // Draw central galaxy
            const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, 100);
            gradient.addColorStop(0, '#ff6b9d');
            gradient.addColorStop(0.5, '#4ecdc4');
            gradient.addColorStop(1, '#45b7d1');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(width/2, height/2, 80, 0, 2 * Math.PI);
            ctx.fill();

            ctx.restore();
        }

        ctx.restore();
    }

    submitFocus() {
        if (this.focusState.submitted) return;
        
        this.focusState.submitted = true;
        const submitBtn = document.getElementById('focus-submit');
        if (submitBtn) {
            submitBtn.disabled = true;
        }

        const slider = document.getElementById('focus-slider');
        const focusValue = slider ? parseInt(slider.value) : 0;
        const targetFocus = this.focusState.targetFocus;
        const difference = Math.abs(focusValue - targetFocus);

        const feedback = document.getElementById('focus-feedback');
        if (feedback) {
            feedback.classList.add('show');
            let points = 0;

            if (difference <= 5) {
                feedback.classList.add('correct');
                feedback.textContent = '🎯 Perfect focus! Amazing precision!';
                points = this.getPointsForLevel() * 2;
                this.checkAchievement('Perfect Vision');
            } else if (difference <= 15) {
                feedback.classList.add('correct');
                feedback.textContent = '✅ Great focus! Very close to perfect.';
                points = this.getPointsForLevel();
            } else {
                feedback.classList.add('incorrect');
                feedback.textContent = `❌ Focus was off by ${difference}%. Keep practicing!`;
            }

            this.focusState.score += points;
            this.gameScores.focus += points;

            if (this.focusState.currentChallenge === 0) {
                this.checkAchievement('First Focus');
            }
        }

        setTimeout(() => {
            this.focusState.currentChallenge++;
            if (this.focusState.currentChallenge < this.focusState.totalChallenges) {
                this.startFocusChallenge();
                this.updateProgress('focus-progress', 
                    (this.focusState.currentChallenge / this.focusState.totalChallenges) * 100);
            } else {
                this.showResults('focus');
            }
        }, 2500);
    }

    // Quiz Game with Enhanced Question Pool
    setupQuizGame() {
        this.quizState = {
            currentQuestion: 0,
            totalQuestions: 10, // Increased to 10 questions minimum
            score: 0,
            correctStreak: 0,
            correctCount: 0,
            questions: []
        };

        const nextBtn = document.getElementById('quiz-next');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextQuizQuestion();
            });
        }
    }

    startQuizGame() {
        console.log('Starting quiz game');
        this.switchScreen('quiz-screen');
        this.quizState.currentQuestion = 0;
        this.quizState.score = 0;
        this.quizState.correctStreak = 0;
        this.quizState.correctCount = 0;
        this.generateQuizQuestions();
        this.showQuizQuestion();
        this.updateProgress('quiz-progress', 0);
    }

    generateQuizQuestions() {
        // Filter questions based on difficulty level
        const filteredQuestions = this.gameQuestions.filter(q => q.difficulty === this.currentLevel);
        console.log(`Found ${filteredQuestions.length} questions for ${this.currentLevel} level`);
        
        // Shuffle and select questions
        const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
        this.quizState.questions = shuffled.slice(0, Math.min(this.quizState.totalQuestions, shuffled.length));
        
        // If we don't have enough questions, adjust total
        if (this.quizState.questions.length < this.quizState.totalQuestions) {
            this.quizState.totalQuestions = this.quizState.questions.length;
        }
        
        console.log(`Generated ${this.quizState.questions.length} questions for quiz`);
    }

    showQuizQuestion() {
        const question = this.quizState.questions[this.quizState.currentQuestion];
        const questionEl = document.getElementById('quiz-question');
        if (questionEl) {
            questionEl.textContent = question.question;
        }

        const questionNumberEl = document.getElementById('quiz-question-number');
        if (questionNumberEl) {
            questionNumberEl.textContent = `Question ${this.quizState.currentQuestion + 1} of ${this.quizState.totalQuestions}`;
        }

        const optionsContainer = document.getElementById('quiz-options');
        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            question.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'btn btn--outline quiz-option';
                button.textContent = option;
                button.onclick = () => this.answerQuizQuestion(index);
                optionsContainer.appendChild(button);
            });
        }

        const feedback = document.getElementById('quiz-feedback');
        if (feedback) {
            feedback.classList.remove('show', 'correct', 'incorrect');
        }

        const nextBtn = document.getElementById('quiz-next');
        if (nextBtn) {
            nextBtn.style.display = 'none';
        }
    }

    answerQuizQuestion(selectedIndex) {
        const question = this.quizState.questions[this.quizState.currentQuestion];
        const correct = selectedIndex === question.correct;

        document.querySelectorAll('.quiz-option').forEach((btn, index) => {
            btn.disabled = true;
            if (index === question.correct) {
                btn.classList.add('correct');
            } else if (index === selectedIndex && !correct) {
                btn.classList.add('incorrect');
            }
        });

        const feedback = document.getElementById('quiz-feedback');
        if (feedback) {
            feedback.classList.add('show', correct ? 'correct' : 'incorrect');
            feedback.innerHTML = correct ? 
                '✅ Correct!<br><em>' + question.explanation + '</em>' :
                '❌ Incorrect. <em>' + question.explanation + '</em>';
        }

        if (correct) {
            this.quizState.score += this.getPointsForLevel();
            this.gameScores.quiz += this.getPointsForLevel();
            this.quizState.correctStreak++;
            this.quizState.correctCount++;
            
            if (this.quizState.correctStreak >= 5) {
                this.checkAchievement('Quiz Master');
            }
            
            if (this.quizState.correctCount >= 10) {
                this.checkAchievement('Knowledge Seeker');
            }
        } else {
            this.quizState.correctStreak = 0;
        }

        const nextBtn = document.getElementById('quiz-next');
        if (nextBtn) {
            nextBtn.style.display = 'block';
        }
    }

    nextQuizQuestion() {
        this.quizState.currentQuestion++;
        if (this.quizState.currentQuestion < this.quizState.totalQuestions) {
            this.showQuizQuestion();
            this.updateProgress('quiz-progress', 
                (this.quizState.currentQuestion / this.quizState.totalQuestions) * 100);
        } else {
            this.finishQuizGame();
        }
    }

    finishQuizGame() {
        if (this.currentLevel === 'hard' && this.quizState.score > 0) {
            this.checkAchievement('Expert Scholar');
        }
        this.showResults('quiz');
    }

    // Gallery Mode
    showGallery() {
        console.log('Showing gallery');
        this.switchScreen('gallery-screen');
        const grid = document.getElementById('gallery-grid');
        if (grid) {
            grid.innerHTML = '';
            this.cosmicObjects.forEach(obj => {
                const item = document.createElement('div');
                item.className = 'gallery-item';
                item.innerHTML = `
                    <h3>${obj.name}</h3>
                    <div class="object-type">${obj.type}</div>
                    <div class="distance">Distance: ${obj.distance}</div>
                    <p>This cosmic wonder showcases the incredible capabilities of modern space telescopes in revealing the universe's hidden beauty.</p>
                `;
                grid.appendChild(item);
            });
        }
    }

    // Results and Achievements
    setupResults() {
        const playAgainBtn = document.getElementById('play-again');
        if (playAgainBtn) {
            playAgainBtn.addEventListener('click', () => {
                this.switchScreen('mode-screen');
            });
        }

        const shareBtn = document.getElementById('share-results');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.shareResults();
            });
        }

        const mainMenuBtn = document.getElementById('main-menu');
        if (mainMenuBtn) {
            mainMenuBtn.addEventListener('click', () => {
                this.switchScreen('welcome-screen');
            });
        }

        const closeAchievementBtn = document.getElementById('close-achievement');
        if (closeAchievementBtn) {
            closeAchievementBtn.addEventListener('click', () => {
                const modal = document.getElementById('achievement-modal');
                if (modal) {
                    modal.classList.add('hidden');
                }
            });
        }
    }

    showResults(gameMode) {
        console.log('Showing results for:', gameMode);
        this.switchScreen('results-screen');
        
        this.totalScore = Object.values(this.gameScores).reduce((a, b) => a + b, 0);
        
        const finalScoreEl = document.getElementById('final-score');
        if (finalScoreEl) {
            finalScoreEl.textContent = this.totalScore;
        }

        let accuracy = 0;
        switch(gameMode) {
            case 'compare':
                accuracy = (this.compareState.score / (this.compareState.totalQuestions * this.getPointsForLevel())) * 100;
                break;
            case 'focus':
                accuracy = (this.focusState.score > 0) ? 75 : 0;
                break;
            case 'quiz':
                accuracy = (this.quizState.score / (this.quizState.totalQuestions * this.getPointsForLevel())) * 100;
                break;
        }

        const accuracyEl = document.getElementById('accuracy');
        if (accuracyEl) {
            accuracyEl.textContent = Math.round(accuracy) + '%';
        }

        this.displayAchievements();

        const facts = [
            "The James Webb Space Telescope can see light that has traveled for over 13 billion years!",
            "JWST's mirror is made of 18 hexagonal segments that work together as one giant mirror.",
            "The telescope operates at extremely cold temperatures, around -370°F (-223°C).",
            "JWST can detect the heat signature of a bumblebee on the Moon!",
            "The telescope's sunshield is about the size of a tennis court.",
            "The beryllium mirrors are coated with gold thinner than human hair!",
            "JWST's materials enable it to fold up for launch and perfectly unfold in space!"
        ];

        const educationalFactEl = document.getElementById('educational-fact');
        if (educationalFactEl) {
            educationalFactEl.textContent = facts[Math.floor(Math.random() * facts.length)];
        }

        this.updateScoreDisplay();
        this.saveGameState();
    }

    checkAchievement(achievementName) {
        if (this.achievements.has(achievementName)) return;
        
        this.achievements.add(achievementName);
        const achievement = this.achievementsList.find(a => a.name === achievementName);
        if (achievement) {
            this.showAchievementModal(achievement);
        }
    }

    showAchievementModal(achievement) {
        const iconEl = document.getElementById('modal-achievement-icon');
        const nameEl = document.getElementById('modal-achievement-name');
        const descEl = document.getElementById('modal-achievement-desc');
        const modal = document.getElementById('achievement-modal');

        if (iconEl) iconEl.textContent = achievement.icon;
        if (nameEl) nameEl.textContent = achievement.name;
        if (descEl) descEl.textContent = achievement.description;
        if (modal) modal.classList.remove('hidden');
    }

    displayAchievements() {
        const container = document.getElementById('achievements-list');
        if (container) {
            container.innerHTML = '';
            this.achievements.forEach(achievementName => {
                const achievement = this.achievementsList.find(a => a.name === achievementName);
                if (achievement) {
                    const badge = document.createElement('div');
                    badge.className = 'achievement-badge';
                    badge.innerHTML = `
                        <span>${achievement.icon}</span>
                        <span>${achievement.name}</span>
                    `;
                    container.appendChild(badge);
                }
            });
        }
    }

    shareResults() {
        if (navigator.share) {
            navigator.share({
                title: 'JWST Educational Game',
                text: `I scored ${this.totalScore} points exploring the universe with the James Webb Space Telescope!`,
                url: window.location.href
            });
        } else {
            const text = `I scored ${this.totalScore} points exploring the universe with the James Webb Space Telescope! Play at ${window.location.href}`;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    alert('Results copied to clipboard!');
                });
            }
        }
    }

    // Utility functions
    getPointsForLevel() {
        switch(this.currentLevel) {
            case 'easy': return 10;
            case 'medium': return 15;
            case 'hard': return 25;
            default: return 10;
        }
    }

    updateProgress(elementId, percentage) {
        const progressEl = document.getElementById(elementId);
        if (progressEl) {
            progressEl.style.width = percentage + '%';
        }
    }

    updateScoreDisplay() {
        const totalScoreEl = document.getElementById('total-score');
        if (totalScoreEl) totalScoreEl.textContent = this.totalScore;
        
        const totalScoreModeEl = document.getElementById('total-score-mode');
        if (totalScoreModeEl) totalScoreModeEl.textContent = this.totalScore;
    }

    saveGameState() {
        const gameState = {
            totalScore: this.totalScore,
            gameScores: this.gameScores,
            achievements: Array.from(this.achievements),
            currentLevel: this.currentLevel
        };
        
        try {
            window.gameState = gameState;
        } catch (e) {
            console.log('Could not save game state');
        }
    }

    loadGameState() {
        try {
            const savedState = window.gameState;
            if (savedState) {
                this.totalScore = savedState.totalScore || 0;
                this.gameScores = savedState.gameScores || {
                    compare: 0,
                    focus: 0,
                    quiz: 0,
                    material: 0
                };
                this.achievements = new Set(savedState.achievements || []);
                this.currentLevel = savedState.currentLevel || 'easy';
            }
        } catch (e) {
            console.log('Could not load game state');
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing game');
    
    // Create global game instance
    window.jwstGame = new JWSTGame();
    window.jwstGame.init();

    // Add additional initialization
    setTimeout(() => {
        console.log('Additional initialization after DOM ready');
        
        // Ensure start button is interactive
        const startBtn = document.getElementById('start-btn');
        if (startBtn) {
            console.log('Start button found, adding backup handler');
            startBtn.style.cursor = 'pointer';
            startBtn.style.userSelect = 'none';
            
            // Backup click handler
            startBtn.onclick = (e) => {
                console.log('Backup click handler triggered');
                e.preventDefault();
                e.stopPropagation();
                if (window.jwstGame) {
                    window.jwstGame.switchScreen('level-screen');
                }
                return false;
            };
        }
    }, 100);

    // Add touch event handlers for mobile
    if ('ontouchstart' in window) {
        document.body.addEventListener('touchstart', () => {}, { passive: true });
        
        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }

    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            window.scrollTo(0, 1);
        }, 500);
    });
});