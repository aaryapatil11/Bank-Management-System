
// Store accounts in browser localStorage

let accounts = JSON.parse(localStorage.getItem("bankAccounts")) || [];

let totalDeposits = Number(localStorage.getItem("totalDeposits")) || 0;
let totalWithdrawals = Number(localStorage.getItem("totalWithdrawals")) || 0;


// Save Data

function saveData() {

    localStorage.setItem(
        "bankAccounts",
        JSON.stringify(accounts)
    );

    localStorage.setItem("totalDeposits", totalDeposits);
    localStorage.setItem("totalWithdrawals", totalWithdrawals);

    updateDashboard();
    displayAccounts();
}


// Navigation

function showSection(sectionId) {

    document.querySelectorAll(".section").forEach(section => {
        section.classList.add("hidden");
    });

    document.getElementById(sectionId).classList.remove("hidden");

    if (sectionId === "accounts") {
        displayAccounts();
    }
}


// Create Account

document.getElementById("accountForm").addEventListener("submit", function(e) {

    e.preventDefault();

    let accountNumber = document.getElementById("accountNumber").value;
    let name = document.getElementById("accountName").value.trim();
    let balance = Number(document.getElementById("initialBalance").value);

    if (!/^\d+$/.test(accountNumber) || !name || !Number.isFinite(balance) || balance < 0) {
        alert("Please enter valid account details.");
        return;
    }

    let existing = accounts.find(acc => acc.accountNumber === accountNumber);

    if (existing) {
        alert("Account number already exists!");
        return;
    }

    let account = {
        accountNumber: accountNumber,
        name: name,
        balance: balance
    };

    accounts.push(account);

    totalDeposits += balance;

    saveData();

    alert("Account created successfully!");

    document.getElementById("accountForm").reset();

    showSection("accounts");

});


// Display All Accounts

function displayAccounts() {

    let table = document.getElementById("accountTable");

    let search = document.getElementById("tableSearch")?.value.toLowerCase() || "";

    table.innerHTML = "";

    let filteredAccounts = accounts.filter(acc =>
        acc.name.toLowerCase().includes(search) ||
        acc.accountNumber.includes(search)
    );

    if (filteredAccounts.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="4">No accounts found.</td>
            </tr>
        `;

        return;
    }

    filteredAccounts.forEach(acc => {

        table.innerHTML += `
            <tr>
                <td>${acc.accountNumber}</td>
                <td>${escapeHTML(acc.name)}</td>
                <td>${formatMoney(acc.balance)}</td>
                <td>
                    <button class="delete-btn"
                    onclick="deleteAccount('${acc.accountNumber}')">
                    Delete
                    </button>
                </td>
            </tr>
        `;

    });

}


// Find Account

function findAccount(accountNumber) {

    return accounts.find(acc =>
        acc.accountNumber === String(accountNumber)
    );

}


// Search Account

function searchAccount() {

    let number = document.getElementById("searchNumber").value;

    let account = findAccount(number);

    let result = document.getElementById("searchResult");

    if (account) {

        result.innerHTML = `
            <h3>Account Found ✓</h3>
            <p>Account Number: ${account.accountNumber}</p>
            <p>Account Holder: ${escapeHTML(account.name)}</p>
            <p>Balance: ${formatMoney(account.balance)}</p>
        `;

    } else {

        result.innerHTML = "<h3>Account Not Found!</h3>";

    }

}


// Deposit Money

function depositMoney() {

    let number = document.getElementById("transactionNumber").value;

    let amount = Number(document.getElementById("amount").value);

    let account = findAccount(number);

    if (!account) {
        alert("Account not found!");
        return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        alert("Enter a valid deposit amount!");
        return;
    }

    account.balance += amount;

    totalDeposits += amount;

    saveData();

    alert("Money deposited successfully!");

    document.getElementById("amount").value = "";

}


// Withdraw Money

function withdrawMoney() {

    let number = document.getElementById("transactionNumber").value;

    let amount = Number(document.getElementById("amount").value);

    let account = findAccount(number);

    if (!account) {
        alert("Account not found!");
        return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        alert("Enter a valid withdrawal amount!");
        return;
    }

    if (amount > account.balance) {
        alert("Insufficient balance!");
        return;
    }

    account.balance -= amount;

    totalWithdrawals += amount;

    saveData();

    alert("Money withdrawn successfully!");

    document.getElementById("amount").value = "";

}


// Delete Account

function deleteAccount(accountNumber) {

    let confirmDelete = confirm(
        "Are you sure you want to delete this account?"
    );

    if (!confirmDelete) {
        return;
    }

    accounts = accounts.filter(acc =>
        acc.accountNumber !== String(accountNumber)
    );

    saveData();

    alert("Account deleted successfully!");

}


// Dashboard Statistics

function updateDashboard() {

    let totalBalance = accounts.reduce(
        (sum, acc) => sum + acc.balance, 0
    );

    document.getElementById("totalAccounts").innerText =
        accounts.length;

    document.getElementById("totalBalance").innerText =
        formatMoney(totalBalance);

    document.getElementById("totalDeposits").innerText =
        formatMoney(totalDeposits);

    document.getElementById("totalWithdrawals").innerText =
        formatMoney(totalWithdrawals);

}


// Format Currency

function formatMoney(amount) {

    return amount.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2
    });

}


// Escape HTML in user-provided names

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);

}


// Initial Dashboard Loading

updateDashboard();
displayAccounts();
