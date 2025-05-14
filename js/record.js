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
  const recordsTableBody = document.getElementById("recordsTableBody"); // Make sure your table body has this ID

  function displayRecords() {
    const storedRecords = localStorage.getItem("financialRecords");
    const records = storedRecords ? JSON.parse(storedRecords) : [];

    // Clear any existing rows in the table
    if (recordsTableBody) {
      recordsTableBody.innerHTML = "";

      if (records.length > 0) {
        records.forEach((record) => {
          const row = recordsTableBody.insertRow();

          // We are intentionally skipping the 'id' here

          const dateCell = row.insertCell();
          dateCell.textContent = record.date;

          const titleCell = row.insertCell();
          titleCell.textContent = record.title;

          const amountCell = row.insertCell();
          amountCell.textContent = record.amount;

          const categoryCell = row.insertCell();
          categoryCell.textContent = record.category;

          // You can add more cells for other record details if needed
        });
      } else {
        const row = recordsTableBody.insertRow();
        const messageCell = row.insertCell();
        messageCell.colSpan = 4; // Update colspan to reflect the removed 'ID' column
        messageCell.textContent = "No records found.";
      }
    } else {
      console.error(
        'Table body element with ID "recordsTableBody" not found in record.html'
      );
    }
  }

  // Call the function to display records when the page loads
  displayRecords();
});
// document.addEventListener('DOMContentLoaded', () => {
//   const recordsTableBody = document.getElementById('recordsTableBody'); // Make sure your table body has this ID

//   function displayRecords() {
//     const storedRecords = localStorage.getItem('financialRecords');
//     const records = storedRecords ? JSON.parse(storedRecords) : [];

//     // Clear any existing rows in the table
//     if (recordsTableBody) {
//       recordsTableBody.innerHTML = '';

//       if (records.length > 0) {
//         records.forEach(record => {
//           const row = recordsTableBody.insertRow();

//           const idCell = row.insertCell();
//           idCell.textContent = record.id; // Display the ID

//           const dateCell = row.insertCell();
//           dateCell.textContent = record.date; // Display the Date

//           const titleCell = row.insertCell();
//           titleCell.textContent = record.title;

//           const amountCell = row.insertCell();
//           amountCell.textContent = record.amount;

//           const categoryCell = row.insertCell();
//           categoryCell.textContent = record.category;

//           // You can add more cells for other record details if needed
//         });
//       } else {
//         const row = recordsTableBody.insertRow();
//         const messageCell = row.insertCell();
//         messageCell.colSpan = 5; // Update colspan to include the new 'ID' and 'Date' columns
//         messageCell.textContent = 'No records found.';
//       }
//     } else {
//       console.error('Table body element with ID "recordsTableBody" not found in record.html');
//     }
//   }

//   // Call the function to display records when the page loads
//   displayRecords();
// });
