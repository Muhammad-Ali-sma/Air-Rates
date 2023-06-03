
export const TRANSPORTATION_DATA = {
    sea: {
        options: [
            {
                icon: "boat",
                suboptions: [
                    { title: "SEA" },
                    { name: "Full container load", shortForm: "FCL", disabled: false },
                    { name: "Less container load", shortForm: "LCL", disabled: false },
                    { name: "Bulk", shortForm: null, disabled: false }
                ]
            }
        ]
    },
    land: {
        options: [
            {
                icon: "truck",
                suboptions: [
                    { title: "ROAD" },
                    { name: "Full container load", shortForm: "FCL", disabled: false },
                    { name: "Full truck load", shortForm: "FTL", disabled: false },
                    { name: "Less truck load", shortForm: "LTL", disabled: false }
                ]
            },
            {
                icon: "wagon",
                suboptions: [
                    { title: "RAIL" },
                    { name: "Full container load", shortForm: "FCL", disabled: true },
                    { name: "Full wagon load", shortForm: "FWL", disabled: false },
                    { name: "Less wagon load", shortForm: "LWL", disabled: true },
                    { name: "Full truck load", shortForm: "FTL", disabled: true },
                ]
            }
        ]
    },
    air: {
        options: [
            {
                icon: "plane",
                suboptions: [
                    { title: "AIR" },
                    { name: "Standard cargo", shortForm: "", disabled: false },
                    { name: "ULD container", shortForm: "", disabled: false },
                ]
            }
        ]
    }
}

export const CONTAINER_TYPE = [
    "20' Standard",
    "40' Standard",
    "40' High-Cube",
    "20' Refrigerated",
    "40' Refrigerated",
    "20' Open Top",
    "40' Open Top",
    "20' Flatrack",
    "40' Flatrack",
    "20' Tank",
    "40' Flatrack Collapsible",
    "20' Flatrack Collapsible",
    "20' Platform",
    "40' Platform",
    "20' Bulk",
    "45' High-Cube",
    "10' Standard"
]

export const IMO_CLASS = [
    "1.1 Explosives with a mass explosion hazard",
    "1.2 Explosives with a severe projection hazard",
    "1.3 Explosives with a fire",
    "1.4 Minor fire or projection hazard",
    "1.5 An insensitive substance with a mass explosion hazard",
    "1.6 Extremely insensitive articles",
    "2.1 Flammable Gas",
    "2.2 Non-flammable, Non-poisonus Gas",
    "2.3 Oxygen Gas",
    "2.4 Poison Gas",
    "3 Flammable Liquid",
    "4.1 Flammable Solids or Substances",
    "4.2 Flammable solids",
    "4.3 Substances which, in contact with water, emit flammable gases",
    "5.1 Oxidizing substances (agents) by yielding oxygen increase the risk and intensity of fire",
    "5.2 Organic peroxides - most will burn rapidly and are sensitive to impact or friction",
    "6.1 Toxic substances",
    "6.2 Infectious substances",
    "7 Radioactive Substances",
    "8 Corrosives",
    "9 Miscellaneous dangerous substances and articles"
]

export const SHIPPING_TYPE = [
    "Bulk Carriers",
    "Containerships",
    "General cargo",
    "Product tankers / Asphalt carriers",
    "Product tankers / Chemical tankers",
    "Product tankers / Crude carriers",
    "Product tankers / Gas carriers",
    "Specialized / Heavy-lift",
    "Specialized / Livestock",
    "Specialized / Refrigerated",
    "Specialized / RoRo",
    "Specialized / Wood chip"
]

export const TRUCK_TYPE = [
    "2т - 14м³",
    "3.5т - 35м³",
    "3.75т - 50м³",
    "Autocart",
    "Container",
    "Dump",
    "Flatbed",
    "Grain",
    "Heavy loaders",
    "Isoterm",
    "Jumbo 100м³",
    "Jumbo 120м³",
    "Logging & Pipes",
    "Mega trailer 100м³",
    "Refrigerator",
    "Road trains",
    "Semitrailer",
    "Tanker",
    "Tautliner",
    "Tilt",
    "Tilt 120м³",
    "Tilt 82м³",
    "Tilt 92м³"
]

export const WAGON_TYPE = [
    "Closed wagon",
    "Container platform",
    "Cover",
    "Flat wagon",
    "Freight wagon",
    "High side wagon",
    "Hopper wagon",
    "Platform",
    "Side dump wagon",
    "Tank wagon"
]
