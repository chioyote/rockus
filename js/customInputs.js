class Polygon {
    constructor(height, width) {
      this.name = 'Polygon';
      this.height = height;
      this.width = width;
    }
  
    sayName() {
      console.log('Holaaaaa, yo soy ', this.name + '.');
    }
    
    static staticMethod() {
      console.log('STATIIIIC DESDE POLYGON')
    }
  
  }
  
  class Square extends Polygon {
    constructor(length) {
      super(length, length);
      this.name = 'Square';
    }
  
    get area() {
      return this.height * this.width;
    }
  
    set area(value) {
      this.area = value;
    }
  }
  
  let s = new Square(5);
  console.log(s.sayName());
  // Holaaaaa, yo soy  Square.
  console.log(s.name);
  // Square
  console.log(s.area);
  // 25
  console.log(s.height);
  // 5
  console.log(s.width);
  // 5
  console.log(Square.staticMethod());