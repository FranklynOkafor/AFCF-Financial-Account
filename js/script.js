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

dateInput.value = date;

const title = document.getElementById("title").value;
const amount = document.getElementById("amount").value;
const category = document.getElementById("category").value;
toggleButton.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  toggleButton.classList.toggle("cancel");
});
const form = document.getElementById("yourForm");

const getAPIurl =
  "https://afcf-financial-record-backend-1.onrender.com/api/records";
const postAPIurl =
  "https://afcf-financial-record-backend-1.onrender.com/api/records/";
const deleteAPIurl =
  "https://afcf-financial-record-backend-1.onrender.com/api/records/";

// function loadRecords() {
//   fetch(getAPIurl)
//     .then((response) => response.json())
//     .then((data) => {
//       data.forEach((record) => {

//         console.log(
//           `${record._id}: ${record.date} - ${record.title}: ₦${record.amount} [${record.category}]`
//         );
//       });
//     })
//     .catch((error) => {
//       console.error("Error fetching records:", error);
//     });
// }

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    title: document.getElementById("title").value,
    amount: document.getElementById("amount").value,
    category: document.getElementById("category").value,
    date: dateInput.value,
  };

  fetch(postAPIurl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => {
      alert("Record added successfully!");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error posting record:", error);
    });
});

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
      alert("Record deleted successfully!");
      window.location.reload(); // Optional: refresh to update the UI
    })
    .catch((error) => {
      console.error("Error deleting record:", error);
    });
}
