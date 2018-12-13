class Person {
    constructor(name) {
        this.name = name;
    }

    hello() {
        if (typeof this.name === 'string') {
            return 'Hello, I am ' + this.name + '!';
        } else {
            return 'Hello there';
        }
    }
}

var person = new Person('Heberjune');
document.write(person.hello());