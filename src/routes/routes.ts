import { Router } from "express";
import UserRoutes from "./userRoutes";
import SongRoutes from "./songRoutes";

const router = Router();

router.use(UserRoutes);
router.use(SongRoutes);

export default router;