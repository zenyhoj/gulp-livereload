var name = 'joe';


var cars = ['toyota', 'honda', 'mitsubishi']

var allCars = cars.filter(function (car) {
    return car != 'honda';
})
document.write('hello ' + name + '!');
document.write(allCars);