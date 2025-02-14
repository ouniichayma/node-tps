const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello, Express!");// accept all type in response
    res.json({ message: "Hell, Express!" });// return JSON response
    res.end() // do that and skip the other requests

    // res.status(404).send("Page not found");// return 404 status code
    // res.sendFile(__dirname + "/index.html");// serve static files
    // res.sendStatus(500); // return 500 status code
    // res.redirect("https://www.google.com"); // redirect to another URL
});






app.get("/file", (req, res) => {

    res.sendFile(__dirname + "/public/index.html"); // serve static files
});

app.use(express.json());

let todos = [
    { id: 1, name: "test" },
    { id: 2, name: "test2" }
];

app.post("/api/todo/create", (req, res) => {

    todos.push(req.body)
    res.send(todos)
});


app.put("/api/todo/edit/:id", (req, res) => {

    const id = parseInt(req.params.id);


    if (todos.length === 0) {
        res.send('the array is empty')
    } else {
        todos = todos.map((todo) => {
       return     todo.id === id ? { ...todo, ...req.body } : todo
        }
        
        );
        res.send(todos);

    }

});






app.delete("/api/todo/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter((todo) => todo.id!== id);

    res.send(todos);
});








const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

