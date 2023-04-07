console.log("class:", Emitter);

class A extends Emitter { }

const a = new A;

a.on("click", (event) => {
    console.log("event:", event);
});

a.emit("click", {
    some: "data",
});