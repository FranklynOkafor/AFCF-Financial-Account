const toggleButton = document.querySelector(".toggle");
const cancelButton = document.querySelector(".cancel");
const navLinks = document.querySelector(".nav-links");
const submitBtn = document.querySelector(".submitBtn"); // Ensure this is inside
const dateInput = document.querySelector(".date");

const today = new Date();
const day = String(today.getDate()).padStart(2, "0");
const month = String(today.getMonth() + 1).padStart(2, "0");
const year = today.getFullYear();
const formattedDate = `${day}-${month}-${year}`;
const date = formattedDate;

toggleButton.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  toggleButton.classList.toggle("cancel");
});

// APIs
const getAPIurl =
  "https://afcf-financial-record-backend-1.onrender.com/api/records";
const deleteAPIurl =
  "https://afcf-financial-record-backend-1.onrender.com/api/records/";
const calenderApiKey =
  "nyk_v0_xq1nwyLNjnKIVzlGKl09emFLYJeYH19dMtlyUv3EBKocmO5GGG1rvs7D5o7cuOw2";

// LOAD RECORDS
let input = 0;
let expenses = 0;

async function fetchRecords() {
  try {
    const response = await fetch(getAPIurl);
    const data = await response.json();

    const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));

    const record_array = sorted.map((record) => ({
      id: `${record._id}`,
      date: `${getEditedDate(record)}`,
      title: `${record.title}`,
      amount: `${record.amount}`,
      category: `${record.category}`,
    }));

    return record_array;
  } catch (error) {
    console.error("Error fetching records:", error);
    return []; // return empty array on error
  }
}

function getEditedDate(record) {
  let newDate = record.date.slice(0, 10);

  let day = newDate.slice(8, 10);
  if (day[0] == 0) {
    newDay = `0${Number(day) + 1}`;
  } else if (day[0] > 0) {
    newDay = `${Number(day) + 1}`;
  }

  newDate = newDate.slice(0, -2) + newDay;
  return newDate;
}
function loadRecords() {
  // fetch(getAPIurl)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date)); // Oldest to newest
  //     sorted.forEach(function (record) {
  //       addRecordAndBalance(record);
  //     });
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching records:", error);
  //   });
  fetchRecords().then((result) => {
    result.forEach((record) => {
      addRecordAndBalance(record);
    });
  });
}

window.onload = loadRecords();

function addRecordToTable(record) {
  // getEditedDate(record);

  const tableBody = document.querySelector("#recordsTableBody");

  const row = document.createElement("tr");

  row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.title}</td>
            <td>₦${record.amount}</td>
            <td>${record.category}</td>
            <td>
              <button onclick="deleteRecord('${record._id}')" class='deleteBtn'>Delete</button>
            </td>
          `;

  tableBody.appendChild(row);
}

function getCategory(record) {
  return record.category;
}
function addRecordAndBalance(record) {
  addRecordToTable(record);
  if (getCategory(record) === "tithe" || getCategory(record) === "others") {
    input += Number(record.amount);
  } else if (getCategory(record) === "expenses") {
    expenses += Number(record.amount);
  }
  document.querySelector("#input").innerHTML = `₦${input}`;

  document.querySelector("#output").innerHTML = `₦${expenses}`;

  document.querySelector("#balance").innerHTML = `₦${input - expenses}`;
}

// DELETE RECORDS
function deleteRecord(recordID) {
  const selectedAPIurl = deleteAPIurl + recordID;
  fetch(selectedAPIurl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete record");
      }
      return response.json();
    })
    .then((result) => {
      // alert("Record deleted successfully!");
      window.location.reload(); // Optional: refresh to update the UI
    })
    .catch((error) => {
      console.error("Error deleting record:", error);
    });
}

// CODE FOR LAST WEEK'S SUMMARY
function getLastWeeksMonday() {
  const today = new Date();
  const currentDay = today.getDay();

  const daysSinceMonday = currentDay === 0 ? 7 : currentDay;

  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysSinceMonday - 6);
  const y = lastMonday.getFullYear();
  const m = String(lastMonday.getMonth() + 1).padStart(2, "0");
  const d = String(lastMonday.getDate()).padStart(2, "0");

  return `${y}-${m}-${d}`;
}

function getWeeklySummary() {
  const tableBody = document.querySelector("#recordsTableBody");
  tableBody.innerHTML = "";
  const monday = getLastWeeksMonday();
  let weeksSummaryArray = [];
  fetchRecords().then((result) => {
    result.forEach((record) => {
      const thisYear = Number(record.date.slice(0, 4));
      const thisMonth = Number(record.date.slice(5, 7));
      const day = Number(record.date.slice(8));

      const mondaysYear = Number(monday.slice(0, 4));
      const mondaysMonth = Number(monday.slice(5, 7));
      const mondaysDate = Number(monday.slice(8));

      if (thisYear >= mondaysYear) {
        if (thisMonth >= mondaysMonth) {
          if (day >= mondaysDate) {
            addRecordAndBalance(record);
          }
        }
      }

    });
  });
}

