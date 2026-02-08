export function numberMiddleware (req, res, next) {
    const a = req.query.a ?? req.params.a;
    const b = req.query.b ?? req.params.b;
    if (a === undefined || b === undefined) {
        return next(new Error('Missing numbers'));
    }

    const numA = Number(a);
    const numB = Number(b);

    if (isNaN(numA) || isNaN(numB)) {
        return next(new Error('Invalid number'));
    }

    req.numbers = { a: numA, b: numB };
    next();
}

export function errorHandler(err, req, res, next){
    res.status(400).send('Number passed is invalid');
}