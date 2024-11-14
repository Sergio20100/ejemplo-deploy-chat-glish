import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
    try {
        res.render("chat", { title: "Chat-online" });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

export default router;