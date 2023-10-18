async function getAverageRGBA(imagePath, lightenFactor = 8, transparency = 0.7) {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Enable CORS for the image
    img.src = imagePath;

    await img.decode(); // Wait for the image to be fully loaded and decoded

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let totalRed = 0;
    let totalGreen = 0;
    let totalBlue = 0;
    let pixelCount = 0;

    // Iterate over the image data in steps of 20 (5 pixels * 4 color channels)
    for (let i = 0; i < data.length; i += 100) {
        totalRed += data[i];
        totalGreen += data[i + 1];
        totalBlue += data[i + 2];
        pixelCount++;
    }

    const averageRed = Math.round(Math.min(255, totalRed / pixelCount * lightenFactor));
    const averageGreen = Math.round(Math.min(255, totalGreen / pixelCount * lightenFactor));
    const averageBlue = Math.round(Math.min(255, totalBlue / pixelCount * lightenFactor));

    return {
        r: averageRed,
        g: averageGreen,
        b: averageBlue,
        a: transparency
    };
}

function getContrastColor(rgbColor) {
    // Calculate relative luminance using the formula for sRGB

    const {r, g, b} = rgbColor;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Choose white for dark background colors, and black for light background colors
    // Return the text color as an RGB object
    return luminance > 0.5 ? {r: 0, g: 0, b: 0} : {r: 255, g: 255, b: 255};
}

export {getAverageRGBA, getContrastColor};





