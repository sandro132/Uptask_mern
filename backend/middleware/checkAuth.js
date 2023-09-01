
const checkAut = (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {

        try {
            token = req.headers.authorization;

            console.log(token)
        } catch (error) {}
    };

    next();
};

export default checkAut;