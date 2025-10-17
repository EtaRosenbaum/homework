
window.app = window.app || {};

window.app.createPeople = (function () {
    'use strict';
    return function createPeople() {

        const firstNames = ['George', 'John', 'Thomas', 'James', 'James', 'John', 'Andrew', 'Martin', 'William', 'John', 'James', 'Zachary', 'Millard', 'Franklin', 'James', 'Abraham', 'Andrew', 'Ulysses', 'Rutherford', 'James',   /*girls*/ 'Martha', 'Abigail', 'Martha', 'Dolley', 'Elizabeth', 'Louisa', 'Rachel', 'Hannah', 'Anna', 'Letitia', 'Sarah', 'Margaret', 'Abigail', 'Jane', 'Harriet', 'Mary', 'Eliza', 'Julia', 'Lucy', 'Lucretia'];

        const lastNames = ['Washington', 'Adams', 'Jefferson', 'Madison', 'Monroe', 'Adams', 'Jackson', 'Van Buren', 'Harrison', 'Tyler', 'Polk', 'Taylor', 'Fillmore', 'Pierce', 'Buchanan', 'Lincoln', 'Johnson', 'Grant', 'Hayes', 'Garfield', 'Washington', 'Adams', 'Jefferson', 'Madison', 'Monroe', 'Adams', 'Jackson', 'Van Buren', 'Harrison', 'Tyler', 'Polk', 'Taylor', 'Fillmore', 'Pierce', 'Buchanan', 'Lincoln', 'Johnson', 'Grant', 'Hayes', 'Garfield'];


        let idNum = 0;

        const max = 40;


        function pickFirstName() {
            const pick = Math.floor(Math.random() * max);

            const firstName = firstNames[pick];
            return firstName;
        };

        function pickLastName() {

            const pick = Math.floor(Math.random() * max);
            const lastName = lastNames[pick];
            return lastName;
        };

        function fillPeopleArray() {
            const people = [];

            for (let i = 0; i < 40; i++) {
                const person = {
                    id: ++idNum,

                    first: pickFirstName(),
                    last: pickLastName(),
                    gender: 'M',
                    spouse: '',


                };


                if (person.id % 2 === 0) {
                    person.gender = 'F';
                    person.spouse = people[i - 1];
                }

                people.push(person);

            }

            function print(person) {
                console.log(`id: ${person.id}, first: ${person.first}, last: ${person.last}, gender: ${person.gender},
                    spouse: ${person.spouse.first} ${person.spouse.last} - ${person.spouse.id}`);
            }


            for (let i = people.length - 1; i >= 0; i--) {
                if (people[i].id % 2 !== 0) {
                    people[i].spouse = people[i + 1];
                }
            };
            people.forEach((p) => {
                print(p);


            });
            return people;
        }

        fillPeopleArray();


    };


}());


window.app.createPeople();


