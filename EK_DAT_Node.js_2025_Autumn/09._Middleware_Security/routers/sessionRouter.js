import { Router } from 'express';

const router = Router();

//I denne gemmes der data på session cookie, som skal bruges i det næste endpoint
router.get("/addicecream", (req, res) => {
    req.session.flavor = "Chocolate Caramel";
    req.session.amount = 5;
    res.send({ flavor: req.session.flavor, amount: req.session.amount });
});

//her hentes og bruges data fra req session cookie
router.get("/eaticecream", (req, res) => {

    if (!req.session.flavor) {
        return res.send({ message: "The shop does not exist yet." });
    }
    req.session.amount--;
    if (!req.session.amount) {
        return res.send({ message: "Ran out of ice cream, please add more" });
    }
    res.send({ flavor: req.session.flavor, amount: req.session.amount });
});

//her slettes forbindelsen til sessionen og data kan ikke mere anvendes
router.get("/closeshop", (req, res) => {
    // setting session values as undefined is also just as good 
    req.session.destroy(() => {
        res.send({ message: "The shop has been closed down" });
    });
});

export default router;
