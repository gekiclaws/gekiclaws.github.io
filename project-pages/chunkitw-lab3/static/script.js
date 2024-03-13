var x = 5;
var y = 7;
var z = x + y;
console.log(z);

var A = 'Hello';
var B = ' world!';
var C = A + B;
console.log(C);

function SumNPrint(x1, x2) {
    var x3 = x1 + x2;
    console.log(x3);
}
SumNPrint(x, y);
SumNPrint(A, B);

if (C.length > z) {
    console.log(C);
} else if (z > C.length) {
    console.log(z);
} else {
    console.log("good job!");
}

var L1 = ["Watermelon", "Pineapple", "Pear", "Banana"];
var L2 = ["Apple", "Banana", "Kiwi", "Orange"];
function findTheBanana(array) {
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (array[index] === "Banana") {
            alert("found the Banana in " + index);
        }
    }
}
findTheBanana(L1);
findTheBanana(L2);

L1.forEach((element, index) => {
    if (element === "Banana") {
        alert("We found a banana in the first array in " + index);
    }
});
L2.forEach((element, index) => {
    if (element === "Banana") {
        alert("We found a banana in the second array in " + index);
    }
});

function greetingFunc() {
    var d = new Date();
    var h = d.getHours();
    var E = document.getElementById("greeting");
    if (h >= 5 && h < 12) {
        E.innerHTML = " Good morning, I am Matthew";
    } else if (h >= 12 && h < 18) {
        E.innerHTML += " Good afternoon, I am Matthew";
    } else if (h >= 18 && h < 20) {
        E.innerHTML = " Good evening, I am Matthew";
    } else {
        E.innerHTML = "Good night, I am Matthew";
    }
}

var L = window.location.href;
console.log(L);
if (L.includes("index.html")) {
    greetingFunc();
}