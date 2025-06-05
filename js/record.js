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
function loadRecords() {
  fetch(getAPIurl)
    .then((response) => response.json())
    .then((data) => {
      // data.forEach((record) => {
      // console.log(
      //   `${record._id}: ${record.date} - ${record.title}: ₦${record.amount} [${record.category}]`
      // );
      const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date)); // Oldest to newest
      sorted.forEach((record) => addRecordToTable(record));
      // });
    })
    .catch((error) => {
      console.error("Error fetching records:", error);
    });
}

window.onload = loadRecords;
function addRecordToTable(record) {
  let newDate = record.date.slice(0, 10);

  let day = newDate.slice(8, 10);
  if (day[0] == 0) {
    newDay = `0${Number(day) + 1}`;
  } else if (day[0] > 0) {
    newDay = `${Number(day) + 1}`;
  }

  newDate = newDate.slice(0, -2) + newDay;

  const tableBody = document.querySelector("#recordsTableBody");

  const row = document.createElement("tr");

  row.innerHTML = `
            <td>${newDate}</td>
            <td>${record.title}</td>
            <td>₦${record.amount}</td>
            <td>${record.category}</td>
            <td>
              <button onclick="deleteRecord('${record._id}')" class='deleteBtn'>Delete</button>
            </td>
          `;

  tableBody.appendChild(row);
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

function getCategory(record) {
  return record.category;
}
async function getInput() {
  let input = 0;

  try {
    const response = await fetch(getAPIurl);
    const data = await response.json();

    data.forEach((record) => {
      if (getCategory(record) === "tithe" || getCategory(record) === "others") {
        input += Number(record.amount);
      }
    });

    return input; // ✅ returned after processing
  } catch (error) {
    console.error("Error fetching records:", error);
    return 0; // fallback value
  }
}
async function getExpenses() {
  let expenses = 0;

  try {
    const response = await fetch(getAPIurl);
    const data = await response.json();

    data.forEach((record) => {
      if (getCategory(record) === "expenses") {
        expenses += Number(record.amount);
      }
    });

    return expenses; // ✅ returned after processing
  } catch (error) {
    console.error("Error fetching records:", error);
    return 0; // fallback value
  }
}

async function balance() {
  const input = await getInput();
  const expenses = await getExpenses();

  document.querySelector("#input").innerHTML = `₦${input}`;

  document.querySelector("#output").innerHTML = `₦${expenses}`;

  document.querySelector("#balance").innerHTML = `₦${input + expenses}`;
}
balance();
