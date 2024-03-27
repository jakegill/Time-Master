import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { resolveTenancy } from "../middleware/resolveTenancy.middleware";
import { resolveRole } from "../middleware/resolveRole.middleware";
import { createTenantController } from "../controllers/tenancy/createTenant.controller";
import { loginUserController } from "../controllers/auth/loginUser.controller";
import { registerUserController } from "../controllers/auth/registerUser.controller";


const router = Router();

/* ---------- Tenant Management ---------- */

router.post("/api/v1/tenants", authMiddleware, resolveRole, createTenantController);

/* ---------- Authentication ---------- */

router.post("/api/v1/auth/login", loginUserController);
router.post("/api/v1/auth/register", authMiddleware, resolveTenancy, resolveRole, registerUserController);



export { router };
