'use strict';

//#1
function createAccount(balance) {

    return {
        balance,
        performTransaction(amount) {
            this.balance += amount;
        }
    };
}


const account1=createAccount(10);
console.log(account1.balance);

account1.performTransaction(15);
console.log(account1);

const account2 = createAccount(10);
console.log(account2.balance);

account2.performTransaction(15);
console.log(account2);



//#2
function createAccount2(balance){
return{
    balance
};
}

function transaction(amount){
    this.balance += amount;
}


 const account3 = createAccount2(20);
 transaction.call(account3,10);
 console.log(`account2 ${account3.balance}`);




//#3
const depositFive= transaction.bind( account3,50);
depositFive();
console.log(account3);
