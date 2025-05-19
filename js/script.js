document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".toggle");
  const cancelButton = document.querySelector(".cancel");
  const navLinks = document.querySelector(".nav-links");
  const submitBtn = document.querySelector(".submitBtn"); // Ensure this is inside
  const dateInput = document.querySelector(".date");

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  // const formattedDate = `${day}-${month}-${year}`;
  const formattedDate = `${year}-${month}-${day}`;

  const date = formattedDate;

  // const dateInput = document.getElementById('todayDate');
  // const today = new Date();
  // const year = today.getFullYear();
  // const month = String(today.getMonth() + 1).padStart(2, '0');
  // const day = String(today.getDate()).padStart(2, '0');
  dateInput.value = date;

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
        date: dateInput.value,
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
