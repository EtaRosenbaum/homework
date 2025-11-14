
function Vehicle(color, type) {
    this.color = color;
    this.type = type;
}

Vehicle.prototype.go = function (speed) {
    this.speed = speed;
    console.log(`Now going at speed ${this.speed} mph`);
};
Vehicle.prototype.print = function () {
    console.log(`The ${this.color} ${this.type} is going ${this.speed} `);
};

const car = new Vehicle('white', 'car');
console.log(car);
car.go(65);
car.print();


const bus = new Vehicle('yellow', 'bus');
console.log(car);
bus.go(55);
bus.print();

//////////////////////////
function Plane(color, type) {
    Vehicle.call(this, color, type);
}
Plane.prototype = Object.create(Vehicle.prototype);
Plane.prototype.constructor = Plane;


Plane.prototype.go = function (speed) {
    this.speed = speed;
    console.log(`Now flying at ${this.speed} mph `);
};


const jet = new Plane('blue', 'jet');
jet.go(150);
jet.print();

