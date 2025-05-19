document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".toggle");
  const cancelButton = document.querySelector(".cancel");
  const navLinks = document.querySelector(".nav-links");
  const recordsTableBody = document.getElementById("recordsTableBody");
  const sortByDateButton = document.getElementById("sortByDate");
  let sortOrder = 'desc'; // Default sorting order to newest first

  toggleButton.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    toggleButton.classList.toggle("cancel");
  });

  function displayRecords(recordsToSort) {
    if (recordsTableBody) {
      recordsTableBody.innerHTML = "";

      if (recordsToSort.length > 0) {
        recordsToSort.forEach((record) => {
          const row = recordsTableBody.insertRow();
          const dateCell = row.insertCell();
          dateCell.textContent = record.date;
          const titleCell = row.insertCell();
          titleCell.textContent = record.title;
          const amountCell = row.insertCell();
          amountCell.textContent = record.amount;
          const categoryCell = row.insertCell();
          categoryCell.textContent = record.category;
          const deleteCell = row.insertCell();
          deleteCell.innerHTML = "<button class='deleteBtn'>Delete</button>"
        });
      } else {
        const row = recordsTableBody.insertRow();
        const messageCell = row.insertCell();
        messageCell.colSpan = 4;
        messageCell.textContent = "No records found.";
      }
    } else {
      console.error(
        'Table body element with ID "recordsTableBody" not found in record.html'
      );
    }
  }

  function sortRecordsByDate(records, order = 'desc') { // Default to descending
    return records.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (order === 'asc') {
        return dateA - dateB; // Ascending order (oldest to newest)
      } else {
        return dateB - dateA; // Descending order (newest to oldest)
      }
    });
  }

  // Load and initially display records (newest first)
  const storedRecords = localStorage.getItem("financialRecords");
  let records = storedRecords ? JSON.parse(storedRecords) : [];
  let sortedRecords = sortRecordsByDate(records, sortOrder);
  displayRecords(sortedRecords);

  // Add event listener for the sort button
  if (sortByDateButton) {
    sortByDateButton.addEventListener("click", () => {
      sortOrder = sortOrder === 'desc' ? 'asc' : 'desc'; // Toggle between descending and ascending
      sortedRecords = sortRecordsByDate(records, sortOrder);
      displayRecords(sortedRecords);
      sortByDateButton.textContent = `Sort by Date (${sortOrder === 'desc' ? 'Newest First' : 'Oldest First'})`;
    });
  } else {
    console.warn('Sort by date button with ID "sortByDate" not found in records.html');
  }
});