document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".toggle");
  const cancelButton = document.querySelector(".cancel");
  const navLinks = document.querySelector(".nav-links");
  const submitBtn = document.querySelector(".submitBtn"); // Ensure this is inside

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  const date = formattedDate;
  console.log(date);

  toggleButton.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    toggleButton.classList.toggle("cancel");
  });
  const form = document.getElementById("yourForm");
  let nextId = 1; // Initialize a counter for the ID

  // Function to get the next available ID from local storage
  function getNextId() {
    const storedRecords = localStorage.getItem("financialRecords");
    const records = storedRecords ? JSON.parse(storedRecords) : [];
    if (records.length > 0) {
      // Find the maximum ID and increment by 1
      const maxId = records.reduce(
        (max, record) => Math.max(max, record.id),
        0
      );
      return maxId + 1;
    }
    return 1; // Start with 1 if no records exist
  }

  // Initialize nextId when the page loads
  nextId = getNextId();

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date = new Date().toISOString().slice(0, 10); // Get the current date in YYYY-MM-DD format

    if (title && amount && category) {
      const record = {
        id: nextId++, // Use the current nextId and then increment it
        date: date,
        title: title,
        amount: parseFloat(amount), // Convert amount to a number
        category: category,
      };

      // Get existing records from local storage or initialize an empty array
      const storedRecords = localStorage.getItem("financialRecords");
      const records = storedRecords ? JSON.parse(storedRecords) : [];

      // Add the new record to the array
      records.push(record);

      // Store the updated array back in local storage
      localStorage.setItem("financialRecords", JSON.stringify(records));

      // Update the nextId for the next record
      localStorage.setItem("nextRecordId", nextId);

      // Optionally, you can add a confirmation message or clear the form here
      alert("Record saved!");
      form.reset();
    } else {
      alert("Please fill in all the fields.");
    }
  });

  // Load the nextId from local storage if it exists
  const storedNextId = localStorage.getItem("nextRecordId");
  if (storedNextId) {
    nextId = parseInt(storedNextId, 10);
  }
});
// document.addEventListener("DOMContentLoaded", () => {
//   const toggleButton = document.querySelector(".toggle");
//   const cancelButton = document.querySelector(".cancel");
//   const navLinks = document.querySelector(".nav-links");
//   const submitBtn = document.querySelector(".submitBtn"); // Ensure this is inside

//   const today = new Date();
//   const day = String(today.getDate()).padStart(2, "0");
//   const month = String(today.getMonth() + 1).padStart(2, "0");
//   const year = today.getFullYear();
//   const formattedDate = `${day}-${month}-${year}`;
//   const date = formattedDate;
//   console.log(date);

//   toggleButton.addEventListener("click", () => {
//     navLinks.classList.toggle("active");
//     toggleButton.classList.toggle("cancel");
//   });

//   console.log("submitBtn element (DOMContentLoaded):", submitBtn);

//   const dbName = "AFCF Record";
//   const dbVersion = 2;
//   let db;
//   let dbInitialized = false; // Flag to track database initialization

//   // Open or create the database
//   const request = indexedDB.open(dbName, dbVersion);

//   request.onerror = function (event) {
//     console.error("Error opening database:", event.target.errorCode);
//   };

//   request.onsuccess = function (event) {
//     db = event.target.result;
//     window.db = db; // Make db accessible globally
//     console.log("Database opened successfully (script.js)");
//     dbInitialized = true;

//     // Fire the custom event so record.js knows DB is ready
//     window.dispatchEvent(new Event("dbReady"));

//     const formElement = document.getElementById("yourForm");
//     if (formElement && submitBtn) {
//       formElement.addEventListener("submit", function (event) {
//         event.preventDefault();
//         handleAddRecord();
//       });
//     } else {
//       console.error("Form or submit button not found!");
//     }
//     // Check if the object store exists
//     const transaction = db.transaction(["records"], "readonly");
//     const recordStore = transaction.objectStore("records");
//     const getRequest = recordStore.getAll();

//     getRequest.onsuccess = function (event) {
//       console.log("Records retrieved:", event.target.result);
//     };

//     getRequest.onerror = function (event) {
//       console.error("Error retrieving records:", event.target.errorCode);
//     };
//   };

//   request.onupgradeneeded = function (event) {
//     const db = event.target.result;
//     if (!db.objectStoreNames.contains("records")) {
//       const recordStore = db.createObjectStore("records", {
//         keyPath: "id",
//         autoIncrement: true,
//       });
//       recordStore.createIndex("date", "date", { unique: false });
//       recordStore.createIndex("title", "title", { unique: false });
//       recordStore.createIndex("amount", "amount", { unique: false });
//       recordStore.createIndex("category", "category", { unique: false });
//       console.log("Object store 'records' created.");
//     }
//   };

//   function handleAddRecord() {
//     const title = document.getElementById("title").value;
//     const amount = document.getElementById("amount").value;
//     const category = document.getElementById("category").value;

//     if (!title || !amount || !category) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     // Add the current date (formatted as dd-mm-yyyy)
//     const today = new Date();
//     const day = String(today.getDate()).padStart(2, "0");
//     const month = String(today.getMonth() + 1).padStart(2, "0");
//     const year = today.getFullYear();
//     const formattedDate = `${day}-${month}-${year}`;

//     const recordData = {
//       date: formattedDate,
//       title: title,
//       amount: amount,
//       category: category,
//     };

//     console.log("Adding record:", recordData);

//     // Call the function to add the record to the database
//     addRecordToDB(recordData);

//     // Clear the form after adding the record
//     document.getElementById("yourForm").reset();
//   }

//   function addRecordToDB(recordData) {
//     if (!db) {
//       console.error("Database is not initialized.");
//       return;
//     }
//     if (!dbInitialized) {
//       console.error("Database not initialized.");
//       return;
//     }

//     const transaction = db.transaction(["records"], "readwrite");
//     const recordStore = transaction.objectStore("records");

//     const addRequest = recordStore.add(recordData);

//     addRequest.onsuccess = function () {
//       console.log("Record added successfully:", recordData);
//       alert("Record saved successfully!");
//     };

//     addRequest.onerror = function (event) {
//       console.error("Error adding record:", event.target.error);
//       alert("Failed to save the record.");
//     };

//   }
// });
