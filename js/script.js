// ===============================
// DOM ELEMENTS
// ===============================

const form = document.getElementById("expense-form");

const salaryInput = document.getElementById("salary");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");

const salaryDisplay = document.getElementById("salary-display");
const expenseList = document.getElementById("expense-list");
const totalExpensesDisplay = document.getElementById("total-expenses");
const balanceDisplay = document.getElementById("balance");
const errorMessage = document.getElementById("error-message");

const currencySelect =
  document.getElementById("currency-select");

const downloadBtn =
  document.getElementById("download-report");

const warningBanner =
  document.getElementById("warning-banner");

// ===============================
// APP STATE
// ===============================

let salary = 0;
let expenses = [];

let expenseChart = null;

let currentCurrency = "INR";
let exchangeRate = 1;

// ===============================
// LOCAL STORAGE
// ===============================

function saveToLocalStorage() {

  localStorage.setItem(
    "salary",
    JSON.stringify(salary)
  );

  localStorage.setItem(
    "expenses",
    JSON.stringify(expenses)
  );
}

function loadFromLocalStorage() {

  const storedSalary =
    JSON.parse(localStorage.getItem("salary"));

  const storedExpenses =
    JSON.parse(localStorage.getItem("expenses"));

  if (storedSalary !== null) {
    salary = storedSalary;
  }

  if (storedExpenses) {
    expenses = storedExpenses;
  }
}

// ===============================
// CURRENCY HELPERS
// ===============================

async function fetchExchangeRate(currency) {

  if (currency === "INR") {
    exchangeRate = 1;
    return;
  }

  try {

    const response = await fetch(
      "https://open.er-api.com/v6/latest/INR"
    );

    const data = await response.json();

    exchangeRate = data.rates[currency];

  } catch (error) {

    console.error(
      "Currency API Error:",
      error
    );

    exchangeRate = 1;
  }
}

function formatCurrency(amount) {

  const convertedAmount =
    amount * exchangeRate;

  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: currentCurrency
    }
  ).format(convertedAmount);
}

// ===============================
// RENDER EXPENSES
// ===============================

function renderExpenses() {

  expenseList.innerHTML = "";

  expenses.forEach((expense, index) => {

    const li =
      document.createElement("li");

    li.innerHTML = `
      ${expense.name}
      -
      ${formatCurrency(expense.amount)}

      <button
        class="delete-btn"
        data-id="${index}"
      >
        🗑
      </button>
    `;

    expenseList.appendChild(li);
  });
}

// ===============================
// CHART
// ===============================

function renderChart(
  totalExpenses,
  balance
) {

  const canvas =
    document.getElementById(
      "expense-chart"
    );

  if (!canvas) return;

  const ctx =
    canvas.getContext("2d");

  if (expenseChart) {
    expenseChart.destroy();
  }

  expenseChart =
    new Chart(ctx, {

      type: "pie",

      data: {

        labels: [
          "Expenses",
          "Remaining Balance"
        ],

        datasets: [{
          data: [
            totalExpenses,
            balance
          ]
        }]
      }
    });
}

// ===============================
// SUMMARY
// ===============================

function updateSummary() {

  let totalExpenses = 0;

  expenses.forEach((expense) => {
    totalExpenses += expense.amount;
  });

  const balance =
    salary - totalExpenses;

salaryDisplay.textContent =
  formatCurrency(salary);

totalExpensesDisplay.textContent =
  formatCurrency(totalExpenses);

balanceDisplay.textContent =
  formatCurrency(balance);
  // Threshold Alert

  const threshold =
    salary * 0.10;

  if (
    balance < threshold &&
    salary > 0
  ) {

    balanceDisplay.style.color =
      "red";

    if (warningBanner) {

      warningBanner.textContent =
        "⚠ Warning: Remaining balance is below 10% of salary.";
    }

  } else {

    balanceDisplay.style.color =
      "green";

    if (warningBanner) {
      warningBanner.textContent = "";
    }
  }

  renderChart(
    totalExpenses,
    balance
  );
}

// ===============================
// ADD EXPENSE
// ===============================

form.addEventListener(
  "submit",
  async function (event) {

    event.preventDefault();

    const enteredSalary =
      Number(
        salaryInput.value
      );

    const expenseName =
      expenseNameInput.value.trim();

    const expenseAmount =
      Number(
        expenseAmountInput.value
      );

    if (
      enteredSalary <= 0 ||
      expenseName === "" ||
      expenseAmount <= 0
    ) {

      errorMessage.textContent =
        "Please enter valid values.";

      return;
    }

    errorMessage.textContent = "";

    salary = enteredSalary;

    expenses.push({
      name: expenseName,
      amount: expenseAmount
    });

    saveToLocalStorage();

    renderExpenses();

    updateSummary();

    expenseNameInput.value = "";
    expenseAmountInput.value = "";
  }
);

// ===============================
// DELETE EXPENSE
// ===============================

expenseList.addEventListener(
  "click",
  function (event) {

    if (
      event.target.classList.contains(
        "delete-btn"
      )
    ) {

      const index =
        Number(
          event.target.dataset.id
        );

      expenses.splice(
        index,
        1
      );

      saveToLocalStorage();

      renderExpenses();

      updateSummary();
    }
  }
);

// ===============================
// CURRENCY CHANGE
// ===============================

currencySelect.addEventListener(
  "change",
  async function () {

    currentCurrency =
      this.value;

    await fetchExchangeRate(currentCurrency);

    renderExpenses();

    updateSummary();
  }
);

// ===============================
// PDF DOWNLOAD
// ===============================

downloadBtn.addEventListener(
  "click",
  function () {

    const { jsPDF } =
      window.jspdf;

    const doc =
      new jsPDF();

    let y = 20;

    doc.text(
      "Cash Flow Report",
      20,
      y
    );

    y += 15;

    doc.text(
      `Salary: ${formatCurrency(salary)}`,
      20,
      y
    );

    y += 15;

    doc.text(
      "Expenses:",
      20,
      y
    );

    y += 10;

    expenses.forEach(
      (expense) => {

        doc.text(
          `${expense.name} - ${formatCurrency(expense.amount)}`,
          20,
          y
        );

        y += 10;
      }
    );

    const totalExpenses =
      expenses.reduce(
        (sum, expense) =>
          sum + expense.amount,
        0
      );

    const balance =
      salary - totalExpenses;

    const chartCanvas =
        document.getElementById("expense-chart");

    const chartImage =
        chartCanvas.toDataURL("image/png");

    y += 10;

    doc.text(
      `Total Expenses: ${formatCurrency(totalExpenses)}`,
      20,
      y
    );

    y += 10;

    doc.text(
      `Remaining Balance: ${formatCurrency(balance)}`,
      20,
      y
    );
    y += 20;

doc.text(
  "Expense Distribution Chart",
  20,
  y
);

y += 10;

doc.addImage(
  chartImage,
  "PNG",
  20,
  y,
  80,
  80
);


    doc.save(
      "cash-flow-report.pdf"
    );
  }
);

// ===============================
// INITIAL LOAD
// ===============================

async function initializeApp() {

  loadFromLocalStorage();

  await fetchExchangeRate(currentCurrency);

  renderExpenses();

  updateSummary();
}

initializeApp();