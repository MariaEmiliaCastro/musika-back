import { Router } from "express";
import UserRoutes from "./userRoutes";
import SongRoutes from "./songRoutes";
import TestRouter from "./testRoutes";

const router = Router();

router.use(UserRoutes);
router.use(SongRoutes);
router.use(TestRouter);

export default router;