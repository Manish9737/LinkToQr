// Select the DOM elements
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const linkInput = document.getElementById("linkInput");
const qrContainer = document.getElementById("qrContainer");
const qrCanvas = document.getElementById("qrcode");

// Event listener for the Generate button
generateBtn.addEventListener("click", () => {
    const link = linkInput.value.trim();

    if (!link) {
        alert("Please enter a valid link!");
        return;
    }

    // Clear previous QR code
    qrCanvas.getContext("2d").clearRect(0, 0, qrCanvas.width, qrCanvas.height);

    // Generate the QR Code
    QRCode.toCanvas(qrCanvas, link, { width: 250, margin: 2 }, (error) => {
        if (error) {
            console.error(error);
            alert("An error occurred while generating the QR Code.");
        } else {
            console.log("QR Code generated!");
            // Enable the download button
            downloadBtn.disabled = false;
        }
    });
});

// Event listener for the Download button
downloadBtn.addEventListener("click", () => {
    const link = linkInput.value.trim();

    if (!link) {
        alert("Please generate a QR Code first!");
        return;
    }

    // Convert canvas to image data and download
    const image = qrCanvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = image;
    a.download = "qrcode.png";
    a.click();
});
