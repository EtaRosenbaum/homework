/* global $ */
(function () {

    const loadButton = $('#loadButton');
    const textBox = $('#text');
    let filename = $('#fileInput');
    const spinner = $('.spinner');




    async function loadFile(filename) {

        try {
            spinner.show();
            await new Promise(resolve => setTimeout(resolve, 1000));


            const response = await fetch(filename);

            if (!response.ok) {
                throw new Error(`${response.status} - ${response.statusText}`);
            }

            const people = await response.json();
            const Peoplestring = JSON.stringify(people, null, 2);
            textBox.html(Peoplestring.replace(/\n/g, '<br>'));

            console.log('response.status', response.status);

        } catch (e) {
            console.error('oops', e);
            console.log(filename);
            alert(e);
        }

        spinner.hide();
    }

    loadButton.on('click', () => {
        loadFile(filename.val());
    });








}());