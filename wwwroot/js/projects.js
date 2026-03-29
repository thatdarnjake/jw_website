const PROJECTS = [
    {
        name: "Little Island at Pier 55",
        location: "New York, NY",
        lat: 40.7425,
        lng: -74.0101,
        year: "2013 - 2018",
        status: "Complete",
        region: "North America",
        sector: "Maritime",
        image: "assets/projects/little-island.jpg",
        team: {
            architect: "Heatherwick Studios, Standard Architects",
            landscape: "MNLA",
            cm: "Hunter Roberts Construction Group",
            marine_contractor: "Weeks Marine",
            precast: "Fort Miller Group (Pots)",
            marine_engineer: "Mueser Rutledge",
            structural: "Arup"
        },
        involvement: "Schematic thru Construction",
        overview: "10,000m\u00B2 public park and performance space located on the West side of Manhattan. The Park is connected to the esplanade via two accessways, rising 18m out of the water at its highest point. The park is supported on ~280 precast piles, 132 of which support 'Pots', complex and architecturally expressive doubly curved structural elements that are the distinct design feature.",
        role: "Structural Parametric lead, created 3D geometry for the precast, steel connections, and stay-in-place formwork related to the Pots. Created and maintained analysis models and had a role in most structural design elements."
    },
    {
        name: "Salesforce Tower",
        location: "Sydney, Australia",
        lat: -33.8612,
        lng: 151.2100,
        year: "2018 - 2021",
        status: "Substantial Completion",
        region: "Oceania",
        sector: "Tall Buildings",
        image: "assets/projects/salesforce-tower.jpg",
        team: {
            architect: "Fosters + Partners, Architectus",
            developer: "Lendlease",
            structural: "Arup"
        },
        involvement: "DD to Construction",
        overview: "265m tall tower (tallest commercial building at time of completion). Composite steel floorplates, eccentric core with outrigger at Level 24 to connect to mega-brace along the north.",
        role: "Lead the lateral analysis from DD, performed detailed design of the core and part of other aspects of the lateral systems design. Resident Engineer on site for 3 months."
    },
    {
        name: "Powerhouse Parramatta",
        location: "Sydney, Australia",
        lat: -33.8150,
        lng: 151.0030,
        year: "2020 - 2021",
        status: "Under Construction",
        region: "Oceania",
        sector: "Arts & Culture",
        image: "assets/projects/powerhouse.jpg",
        team: {
            architect: "Moreau Kusunoki, Genton",
            builder: "Lendlease",
            structural: "Arup"
        },
        involvement: "Scheme to Tender",
        overview: "Lead by Infrastructure NSW this project moved the existing MAAS \u2013 Powerhouse from Ultimo to Parramatta in large gallery spaces divided between two buildings with large columnless spaces enabled by an external lattice exo-skeleton.",
        role: "Lateral design lead, involved in the exo skeleton development, lead the megadoor design \u2013 a large operable door allowing the ground floor of the east building to open up."
    },
    {
        name: "55 Pitt",
        location: "Sydney, Australia",
        lat: -33.8620,
        lng: 151.2090,
        year: "2021",
        status: "Under Construction",
        region: "Oceania",
        sector: "Tall Buildings",
        image: "assets/projects/55-pitt.jpg",
        team: {
            architect: "SHoP, Woods Bagot",
            developer: "Mirvac",
            structural: "Arup"
        },
        involvement: "Schematic Design",
        overview: "240m tall tower with 70,000m\u00B2 of commercial and retail space.",
        role: "Lead the lateral design and analysis portion of the tower during my involvement."
    },
    {
        name: "Blacktown BEST Hub",
        location: "Sydney, Australia",
        lat: -33.7688,
        lng: 150.9063,
        year: "2021",
        status: "Complete",
        region: "Oceania",
        sector: "Sport",
        image: "assets/projects/blacktown.jpg",
        team: {
            architect: "ARM Architects",
            structural: "Arup"
        },
        involvement: "Tender Design",
        overview: "$100 Million AUD sporting precinct featuring sports science, exercise and recovery facilities.",
        role: "Project Manager at end of Tender Phase."
    },
    {
        name: "Delta Phase 3, Terminal 4 JFK",
        location: "New York, NY",
        lat: 40.6413,
        lng: -73.7781,
        year: "2014",
        status: "Complete",
        region: "North America",
        sector: "Aviation",
        image: "assets/projects/delta-jfk.jpg",
        team: {
            architect: "Gensler",
            structural: "Arup"
        },
        involvement: "DD",
        overview: "Phase 3 of the redevelopment to the existing Delta Terminal 4 at JFK airport. Added 300,000ft\u00B2 of new concourse and bridges.",
        role: "Structural designer for the concourse and in charge of coordinating with internal services."
    },
    {
        name: "Torre Colon",
        location: "Mexico City, Mexico",
        lat: 19.4326,
        lng: -99.1332,
        year: "2016",
        status: "Cancelled",
        region: "North America",
        sector: "Tall Buildings",
        image: "assets/projects/torre-colon.jpg",
        team: {
            structural: "Arup"
        },
        involvement: "SD to DD",
        overview: "300m tall, mixed-use elliptical tower envisioned for Mexico City, utilizing a central core + external Diagrid.",
        role: "Performed lateral analysis and design as well as parametric studies to affect the external form."
    },
    {
        name: "Olympic Halls \u2013 Arenas Cariocas",
        location: "Rio De Janeiro, Brazil",
        lat: -22.9756,
        lng: -43.3950,
        year: "2013",
        status: "Complete",
        region: "South America",
        sector: "Sport",
        image: "assets/projects/olympic-halls.jpg",
        team: {
            client: "Rio Mais S.A.",
            structural: "Arup"
        },
        involvement: "SD to DD",
        overview: "Arenas Cariocas was a three-tiered venue for various indoor events consisting of concrete bowls with two-way steel trussed roofs. Handed over to local engineer at DD.",
        role: "Junior engineer working on the roof structure."
    },
    {
        name: "Raffles City",
        location: "Chongqing, China",
        lat: 29.5630,
        lng: 106.5830,
        year: "2012",
        status: "Complete",
        region: "Asia",
        sector: "Tall Buildings",
        image: "assets/projects/raffles-city.png",
        team: {
            architect: "Safdie Architects",
            mep: "WSP",
            contractor: "China Construction Eighth Engineering Division / Third Engineering Bureau",
            structural: "Arup"
        },
        involvement: "SD",
        overview: "Mixed-use development with a floor area of 1.13 million m\u00B2 between a podium and 8 towers. Two 350m towers and six 250m towers with six of the towers linked by 300m long sky bridge.",
        role: "Junior Engineer, performed floor studies and analysis of the smaller towers."
    },
    {
        name: "Mill River Park Ice Rink",
        location: "Stamford, CT",
        lat: 41.0534,
        lng: -73.5387,
        year: "2013 - 2014",
        status: "Cancelled",
        region: "North America",
        sector: "Civic",
        image: "assets/projects/mill-river.jpg",
        team: {
            architect: "River Architects",
            structural: "Arup"
        },
        involvement: "Scheme to Construction Docs",
        overview: "Building to support the skating rink and general park functions, housing caf\u00E9 and changing rooms. Envisioned as an occupiable, stepped roof.",
        role: "Junior engineer responsible for general analysis and design, concrete structure."
    },
    {
        name: "Flatiron Installation",
        location: "New York, NY",
        lat: 40.7411,
        lng: -73.9897,
        year: "2016",
        status: "Temp Installation",
        region: "North America",
        sector: "Arts & Culture",
        image: "assets/projects/flatiron.jpg",
        team: {
            designer: "Softlabs",
            structural: "Arup"
        },
        involvement: "Thru Construction",
        overview: "Annual Flatiron plaza holiday installation. Small structure with colored 'glass' viewports. Laser cut aluminum frames clad in a 3m panel.",
        role: "Pro-bono structural support for a temporary holiday installation."
    },
    {
        name: "Pollinators Pavilion",
        location: "Hudson, NY",
        lat: 42.2528,
        lng: -73.7907,
        year: "2017",
        status: "Complete",
        region: "North America",
        sector: "Arts & Culture",
        image: "assets/projects/pollinators.jpg",
        team: {
            architect: "Harrison Atelier",
            structural: "Arup"
        },
        involvement: "Scheme",
        overview: "Small architectural pavilion built to house/study a bee species that was endangered. Originally conceived as ceramic forms over a wooden frame.",
        role: "Pro-bono structural design assistance for a small pavilion structure. Provided parametric studies to explore molds and timber frame design."
    }
];
