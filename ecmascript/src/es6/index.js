function newFunction(name, age, country){
    var name = name || 'oscar';
    var age = age || 32;
    var country = country || 'MX';
    console.log(name, age, country)
}

// es6
function newFunction2(name = 'Oscar', age = 32, country = 'MX'){
    console.log(name, age, country);
}

newFunction2();
newFunction2('Ricardo',23,'CO');

let hello = "Hello";
let world = "world";
let epicPhrase = hello + ' '+ world;
console.log(epicPhrase);
let epicPhrase2 = `${hello} fucking ${world}`;
console.log(epicPhrase2);

let lorem2 = `prueba de enter
probando andamos`;

console.log(lorem2);

let person = {
    'name': 'Rocko',
    'age': 31,
    'country': 'MX'
}

console.log(person);

let {name, age, country} = person;
console.log(name, age);

let team1 = ['a','b','c']
let team2 = [1,2,3]

let education = ['David', ...team1, ...team2];
console.log(education)

let name = 'rockus';
let age = 31;

obj2 = {name,age}
console.log(obj2)

class calculator {
    constructor(){
        this.valueA = 0;
        this.valueB = 0;
    }

    sum(valueA,valueB){
        this.valueA = valueA;
        this.valueB = valueB;
        return this.valueA + this.valueB;
    }
}

const calc = new calculator();
console.log( calc.sum(3,9))

function* helloWorld(){
    if(true){
        yield 'Hello, ';
    }
    if(true){
        yield 'world';
    }
};

const generatorHello = helloWorld();
console.log(generatorHello.next().value);
console.log(generatorHello.next().value);

console.log(generatorHello.next().value);

const UserRegex = new RegExp(/@(\w+)/, "g");
function* getUsernames(string) {
    let match = null;

    do {
        match = UserRegex.exec(string);
        console.log(match)
        if (match) {
            yield match;
        }
    } while (match);
}
const string = "this is a test with @swizec and @kyleshevlin, maybe @lukeed05"

for (const username of getUsernames(string)) {
  console.log(username)
}

 
function* mensajes() {
 
    console.log("mensaje1");
    yield null;
    console.log("mensaje2");
    console.log("mensaje3");
    yield null;
    console.log("mensaje5");
    console.log("mensaje6");
     
    }
     
    var iterador = mensajes();
    iterador.next();
    console.log("MENSAJE4");
     
    iterador.next();
    console.log("MENSAJE4 - fin");
    iterador.next();

    const prueba = [1,2,3,4];
    function * iterableObj(){
        yield 'Welcome';
        yield 'to ';
        yield 'generators';
        yield null
    }
    const iter = iterableObj();
    console.log(iter.next())
    // for( const val of iter){
    //     console.log(val)
    // }


    function* oddsGenerator() {
        let n = 0
        while (true) {
          yield 2*n + 1
          n++
        }
      }
      
      function take(n, iter) {
        let counter = n
        for ( c of iter) {
          console.log(c)
          counter--
          if(counter <= 0) break
        }
      }
      
      var oddNumbers = oddsGenerator() // TODOS los números impares 
      
      take(5, oddNumbers) // toma 5 números impares