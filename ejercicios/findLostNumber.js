var allNumbers = [],
    lostNUmbersInArray = [7, 40,75];

var fillArray = function(){
    n = 1
    while (n < 101) {
        if(!lostNUmbersInArray.includes(n))allNumbers.push(n)
        n++
    }
    console.log(allNumbers)
}

var findLostNumbers = function(){
    allNumbers.forEach((element,index) => {
        let nextNumber = element + 1;
        console.log(nextNumber === allNumbers[index + 1], nextNumber)
    })
}

fillArray();
findLostNumbers();