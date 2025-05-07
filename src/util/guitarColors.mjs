export const guitarColors = [
    // Classic Finishes
    "#2B1810", // Vintage Sunburst
    "#8B4513", // Tobacco Sunburst
    "#D2691E", // Honey Burst
    "#000000", // Jet Black
    "#FFFFFF", // Arctic White
    "#F5F5DC", // Natural
    "#8B0000", // Cherry Red
    "#4B0082", // Deep Purple

    // Modern Colors
    "#1E90FF", // Sonic Blue
    "#32CD32", // Seafoam Green
    "#FF4500", // Fiesta Red
    "#FFD700", // Gold Top
    "#708090", // Metallic Silver
    "#800020", // Wine Red
    "#2F4F4F", // Dark Slate
    "#8B4513", // Mahogany

    // Premium Finishes
    "#DAA520", // Antique Gold
    "#4682B4", // Ocean Blue
    "#556B2F", // Olive Drab
    "#B8860B", // Dark Goldenrod
    "#483D8B", // Dark Slate Blue
    "#8B008B", // Deep Magenta
    "#2E8B57", // Sea Green
    "#CD853F", // Peru Brown
];

// Create a mapping of color hex codes to their names
export const colorNameMap = {
    "#2B1810": "Vintage Sunburst",
    "#8B4513": "Tobacco Sunburst",
    "#D2691E": "Honey Burst",
    "#000000": "Jet Black",
    "#FFFFFF": "Arctic White",
    "#F5F5DC": "Natural",
    "#8B0000": "Cherry Red",
    "#4B0082": "Deep Purple",
    "#1E90FF": "Sonic Blue",
    "#32CD32": "Seafoam Green",
    "#FF4500": "Fiesta Red",
    "#FFD700": "Gold Top",
    "#708090": "Metallic Silver",
    "#800020": "Wine Red",
    "#2F4F4F": "Dark Slate",
    "#8B4513": "Mahogany",
    "#DAA520": "Antique Gold",
    "#4682B4": "Ocean Blue",
    "#556B2F": "Olive Drab",
    "#B8860B": "Dark Goldenrod",
    "#483D8B": "Dark Slate Blue",
    "#8B008B": "Deep Magenta",
    "#2E8B57": "Sea Green",
    "#CD853F": "Peru Brown",
    "#C0C0C0": "Chrome Shadow",
    "#141313": "Matte Black",
    "#FFFFF0": "Ivory",
    "#FFFDD0": "Cream",
};

// Function to get a color's name or return "Custom Color" if not found
export function getColorName(hexColor) {
    return colorNameMap[hexColor] || "Custom Color";
}