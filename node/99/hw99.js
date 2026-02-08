import express from 'express';
import{ numberMiddleware, errorHandler} from './middleware.js';

const app = express();

app.use(numberMiddleware);

app.get('/add', (req, res) => {
    const { a, b } = req.numbers;
    const sum = a + b;
    console.log(sum);
    res.send(sum.toString());
})

app.get('/subtract', (req, res) => {
    const { a, b } = req.numbers;
    const diff = a - b;
    console.log(diff);
    res.send(diff.toString());
})

app.get('/calc', (req, res) => {
    const { a, b } = req.numbers;
    const operator = req.query.operator;
    let result;
    switch (operator){
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': result = a / b; break;
        default: return res.status(400).send('Invalid operator');
    }
    res.send(result.toString());
});

app.use(errorHandler);
app.listen(3000);