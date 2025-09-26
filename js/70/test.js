(function () {

    const oldArray = [2, 4, 6, 8];

    function myMap(array, callback) {
        const newArray = [];

        for (let i = 0; i < array.length; i++) {

            newArray.push(callback(array[i]));
        }
        return newArray;
    }


    const mappedArray = myMap(oldArray, (x) => x = x * 3);
    console.log('old array', oldArray);
    console.log('mapped Array', mappedArray);

}());