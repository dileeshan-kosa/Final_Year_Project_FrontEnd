// const SerialPort = require('serialport');
// const Readline = require('@serialport/parser-readline');

// const port = new SerialPort({
//   path: 'COM9', // Change this to your actual COM port (Check Device Manager)
//   baudRate: 57600 // Default baud rate for R307s
// });

// // Create a parser to read incoming data
// const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

// // Open the Serial Port
// port.on('open', () => {
//   console.log('Serial Port Opened');
// });

// // Read data from the fingerprint sensor
// parser.on('data', (data) => {
//   console.log('Received Data:', data);
// });

// // Function to send command to R307s (Example: Get image)
// function getFingerprintImage() {
//   const command = Buffer.from([0xEF, 0x01, 0xFF, 0xFF, 0xFF, 0xFF, 0x01, 0x00, 0x03, 0x01, 0x00, 0x05]);
//   port.write(command);
// }

// setTimeout(() => {
//   getFingerprintImage();
// }, 2000); // Wait 2 seconds before sending command

// const ffi = require("ffi-napi");
// const ref = require("ref-napi");
// const readline = require("readline");

// // Define the DLL and its functions
// const intPtr = ref.refType("int");
// const R307 = new ffi.Library("./SynoAPIEx", {
//   PSOpenDeviceEx: [
//     "int32",
//     [intPtr, "int32", "int32", "int32", "int32", "int32"],
//   ],
//   PSCloseDeviceEx: ["int32", [intPtr]],
//   PSGetImage: ["int32", [intPtr, "int32"]],
// });

// // Initialize readline for button press simulation
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// // Function to get fingerprint
// function getFingerprint() {
//   const pHandle = ref.alloc(ref.types.int, 0);

//   // Open device
//   const status = R307.PSOpenDeviceEx(pHandle, 2, 1, 1, 2, 0);

//   if (status === 0) {
//     console.log("Device opened successfully.");

//     // Get fingerprint image
//     const response = R307.PSGetImage(pHandle, 1);

//     if (response === 0) {
//       console.log("Fingerprint captured successfully.");
//       // Here you can add additional code to process the fingerprint data
//       console.log("Fingerprint data:", response); // Displaying response as number
//     } else {
//       console.log("Failed to capture fingerprint. Error code:", response);
//     }

//     // Close device
//     R307.PSCloseDeviceEx(pHandle);
//   } else {
//     console.log("Failed to open device. Error code:", status);
//   }
// }

// // Simulate button press
// rl.question("Press Enter to capture fingerprint...", (answer) => {
//   getFingerprint();
//   rl.close();
// });

// const ffi = require("ffi-napi");
// const ref = require("ref-napi");
// const readline = require("readline");

// // Define the DLL and its functions
// const intPtr = ref.refType("int");
// const R307 = new ffi.Library("./SynoAPIEx", {
//   PSOpenDeviceEx: [
//     "int32",
//     [intPtr, "int32", "int32", "int32", "int32", "int32"],
//   ],
//   PSCloseDeviceEx: ["int32", [intPtr]],
//   PSGetImage: ["int32", [intPtr, "int32"]],
// });

// // Function to get fingerprint
// function getFingerprint() {
//   const pHandle = ref.alloc(ref.types.int, 0);

//   // Open device
//   const status = R307.PSOpenDeviceEx(pHandle, 2, 1, 1, 2, 0);
//   if (status === 0) {
//     console.log("Device opened successfully.");

//     // Get fingerprint image
//     const response = R307.PSGetImage(pHandle, 1);
//     if (response === 0) {
//       console.log("Fingerprint captured successfully.");
//       console.log("Fingerprint data:", response); // Displaying response as number
//     } else {
//       console.log("Failed to capture fingerprint. Error code:", response);
//     }

//     // Close device
//     R307.PSCloseDeviceEx(pHandle);
//   } else {
//     console.log("Failed to open device. Error code:", status);
//   }
// }

// // Export the function using CommonJS syntax
// module.exports = fingerprint;
