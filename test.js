function testObject(name) {
    this.name = name
}

var t = new testObject("fdsfds");

console.log(t.name);