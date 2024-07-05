#!/usr/env/bin node
import inquirer from "inquirer";
import chalk from "chalk";
// Define the ATM class
class ATM {
    availableCash;
    constructor(cash) {
        this.availableCash = cash;
    }
    // Methods to check available cash in ATM
    checkAvailableCash() {
        return this.availableCash; // This represents the physical cash available in the ATM machine.
    }
    // Method to withdraw cash from ATM
    withdraw(account, amount) {
        if (amount > this.availableCash || amount > account.balance || amount <= 0) {
            console.log(chalk.bgRed("\nInsufficient funds or invalid amount."));
            return false;
        }
        account.balance -= amount;
        this.availableCash -= amount;
        console.log(chalk.bgGreen.bold(`\nWithdrawn ${amount} from account ${account.accountNumber}`));
        console.log(chalk.bgGreenBright.bold(`Remaining Balance: ${account.balance}`));
        console.log(chalk.bgCyan.bold(`Remaining Cash in ATM: ${this.availableCash}`));
        // This represents the physical cash available in the ATM machine.
        return true;
    }
    // Method to deposit cash into ATM
    deposit(account, amount) {
        if (amount <= 0) {
            console.log(chalk.bgRed("\nInvalid deposite amount"));
            return false;
        }
        account.balance += amount;
        this.availableCash += amount;
        console.log(chalk.bgGreen.bold(`\nDeposited ${amount} to account ${account.accountNumber}.`));
        console.log(chalk.bgGreenBright.bold(`New Balance: ${account.balance}`));
        console.log(chalk.bgCyan.bold(`New Cash in ATM: ${this.availableCash}`));
        return true;
    }
}
// Function to start an ATM interaction
function startATM() {
    const userAccount = {
        accountNumber: "123456789",
        balance: 500
    };
    const atm = new ATM(1000);
    console.log(chalk.bgBlue.bold('***********GIAIC ATM Machine***********'));
    console.log(chalk.bgCyan.bold(`Welcome to the ATM. Current Cash in ATM: ${atm.checkAvailableCash()}`));
    mainMenu(atm, userAccount);
}
// Function to display the main menu and handle user choices
function mainMenu(atm, userAccount) {
    inquirer.prompt([
        {
            name: 'action',
            message: chalk.bgGray('\nWhat would you like to do?'),
            type: 'list',
            choices: ['Withdraw', 'Deposit', 'Exit']
        }
    ]).then(answers => {
        if (answers['action'] === 'Withdraw') {
            withdrawMoney(atm, userAccount);
        }
        else if (answers['action'] === 'Deposit') {
            depositMoney(atm, userAccount);
        }
        else {
            console.log(chalk.bgYellowBright.bold.black('\nThank you for using the ATM. GoodBye!'));
        }
    });
}
// The 'then' method is a part of JavaScript Promises, specifically as used with the 'inquirer' library
// for handling user input in an asynchronous manner. 
// - The 'then' method is used to handle the resolution of a Promise. In this case, it is handling the
//   Promise returned by the 'inquirer.prompt' function.
// - When the user provides input and the prompt is completed, the 'then' method is called with the
//   'answers' object containing the user's responses.
// Function to handle withdrawl
function withdrawMoney(atm, userAccount) {
    inquirer.prompt([
        {
            name: 'withdrawAmount',
            message: chalk.bgYellow('\nEnter the amount you want to withdraw:'),
            type: 'number'
        }
    ]).then(answers => {
        const withdrawAmount = answers['withdrawAmount'];
        const success = atm.withdraw(userAccount, withdrawAmount);
        if (!success) {
            console.log(chalk.bgRed("\nTransaction Failed. Please try again."));
        }
        restartATM(atm, userAccount);
    });
}
// Function to handle deposit
function depositMoney(atm, userAccount) {
    inquirer.prompt([
        {
            name: 'depositAmount',
            message: chalk.bgYellow('\nEnter the amount you want to deposit:'),
            type: 'number'
        }
    ]).then(answers => {
        const depositAmount = answers['depositAmount'];
        const success = atm.deposit(userAccount, depositAmount);
        if (!success) {
            console.log(chalk.bgRed("\nTransaction Failed. Please try again."));
        }
        restartATM(atm, userAccount);
    });
}
// Function to restart ATM or exit
function restartATM(atm, userAccount) {
    inquirer.prompt([
        {
            name: 'restart',
            message: chalk.bgGray('\nDo you want to preform another transaction?'),
            type: 'list',
            choices: ['Yes', 'No']
        }
    ]).then(answers => {
        if (answers['restart'] === 'Yes') {
            mainMenu(atm, userAccount);
        }
        else {
            console.log(chalk.bgYellowBright.bold.black('\nThank you for using the ATM. Goodbye!'));
        }
    });
}
// Start ATM interaction
startATM();
