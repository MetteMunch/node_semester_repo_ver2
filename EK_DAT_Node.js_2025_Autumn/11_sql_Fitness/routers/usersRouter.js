import { Router} from "express";
import db from "../database/connection.js";


const router = Router();

router.post("/api/users", (req,res) => {
    const { username, role } = req.body;
    const result = db.run('INSERT INTO users (username, role) VALUES (?,?), ' +
        [username, role]);
    console.log(result);
    res.send({ data: "OK?"})
})



export default router;