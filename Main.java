
import java.util.ArrayList;
import java.util.Scanner;

// Account Class
class Account {

    private long accountNumber;
    private String accountHolderName;
    private double balance;

    public Account(long accountNumber, String accountHolderName, double balance) {
        this.accountNumber = accountNumber;
        this.accountHolderName = accountHolderName;
        this.balance = balance;
    }

    public long getAccountNumber() {
        return accountNumber;
    }

    public String getAccountHolderName() {
        return accountHolderName;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Money deposited successfully.");
        } else {
            System.out.println("Invalid amount.");
        }
    }

    public void withdraw(double amount) {
        if (amount <= 0) {
            System.out.println("Invalid amount.");
        } else if (amount > balance) {
            System.out.println("Insufficient balance.");
        } else {
            balance -= amount;
            System.out.println("Money withdrawn successfully.");
        }
    }

    public void displayAccount() {
        System.out.println("-----------------------------");
        System.out.println("Account Number : " + accountNumber);
        System.out.println("Account Holder : " + accountHolderName);
        System.out.println("Balance        : " + balance);
        System.out.println("-----------------------------");
    }
}

// Bank Class
class Bank {

    ArrayList<Account> accounts = new ArrayList<>();

    public void createAccount(Account account) {
        accounts.add(account);
        System.out.println("Account created successfully.");
    }

    public Account findAccount(long accountNumber) {
        for (Account account : accounts) {
            if (account.getAccountNumber() == accountNumber) {
                return account;
            }
        }
        return null;
    }

    public void displayAllAccounts() {
        if (accounts.isEmpty()) {
            System.out.println("No accounts available.");
        } else {
            for (Account account : accounts) {
                account.displayAccount();
            }
        }
    }
}

// Main Class
public class Main {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        Bank bank = new Bank();

        int choice;

        do {
            System.out.println("\n=================================");
            System.out.println("     BANK MANAGEMENT SYSTEM");
            System.out.println("=================================");
            System.out.println("1. Create Account");
            System.out.println("2. View All Accounts");
            System.out.println("3. Search Account");
            System.out.println("4. Deposit Money");
            System.out.println("5. Withdraw Money");
            System.out.println("6. Check Balance");
            System.out.println("7. Exit");
            System.out.println("=================================");

            System.out.print("Enter your choice: ");
            choice = sc.nextInt();

            switch (choice) {

                case 1:
                    System.out.print("Enter account number: ");
                    long accountNumber = sc.nextLong();

                    sc.nextLine();

                    System.out.print("Enter account holder name: ");
                    String name = sc.nextLine();

                    System.out.print("Enter initial balance: ");
                    double balance = sc.nextDouble();

                    bank.createAccount(
                        new Account(accountNumber, name, balance)
                    );
                    break;

                case 2:
                    bank.displayAllAccounts();
                    break;

                case 3:
                    System.out.print("Enter account number: ");
                    Account search = bank.findAccount(sc.nextLong());

                    if (search != null) {
                        search.displayAccount();
                    } else {
                        System.out.println("Account not found.");
                    }
                    break;

                case 4:
                    System.out.print("Enter account number: ");
                    Account deposit = bank.findAccount(sc.nextLong());

                    if (deposit != null) {
                        System.out.print("Enter deposit amount: ");
                        deposit.deposit(sc.nextDouble());
                    } else {
                        System.out.println("Account not found.");
                    }
                    break;

                case 5:
                    System.out.print("Enter account number: ");
                    Account withdraw = bank.findAccount(sc.nextLong());

                    if (withdraw != null) {
                        System.out.print("Enter withdrawal amount: ");
                        withdraw.withdraw(sc.nextDouble());
                    } else {
                        System.out.println("Account not found.");
                    }
                    break;

                case 6:
                    System.out.print("Enter account number: ");
                    Account account = bank.findAccount(sc.nextLong());

                    if (account != null) {
                        System.out.println(
                            "Current Balance: " + account.getBalance()
                        );
                    } else {
                        System.out.println("Account not found.");
                    }
                    break;

                case 7:
                    System.out.println(
                        "Thank you for using the Bank Management System."
                    );
                    break;

                default:
                    System.out.println("Invalid choice.");
            }

        } while (choice != 7);

        sc.close();
    }
}
