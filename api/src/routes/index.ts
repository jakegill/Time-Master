import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { resolveTenancy } from "../middleware/resolveTenancy.middleware";
import { resolveRole } from "../middleware/resolveRole.middleware";
import { createTenantController } from "../controllers/tenancy/createTenant.controller";
import { loginUserController } from "../controllers/auth/loginUser.controller";
import { registerUserController } from "../controllers/auth/registerUser.controller";
import { createProjectController } from "../controllers/projects/createProject.controller";
import { getAllProjectsController } from "../controllers/projects/getAllProjects.controller";
import { assignProjectController } from "../controllers/projects/assignProject.controller";
import { getEmployeesController } from "../controllers/employees/getEmployees.controller";
import { getProjectsController } from "../controllers/projects/getProjects.controller";


const router = Router();

/* ---------- Tenant Management ---------- */

router.post("/api/v1/tenants", authMiddleware, resolveRole, createTenantController);

/* ---------- Authentication ---------- */

router.post("/api/v1/auth/login", loginUserController);
router.post("/api/v1/auth/register", authMiddleware, resolveTenancy, resolveRole, registerUserController);

/* ---------- Projects ---------- */

router.post("/api/v1/projects", authMiddleware, resolveTenancy, resolveRole, createProjectController);
router.get("/api/v1/projects", authMiddleware, resolveTenancy, resolveRole, getAllProjectsController);
router.post("/api/v1/projects/assign", authMiddleware, resolveTenancy, resolveRole, assignProjectController);

/* ---------- Employees ---------- */

router.get("/api/v1/employees", authMiddleware, resolveTenancy, resolveRole, getEmployeesController)
router.get("/api/v1/employees/:id/projects", authMiddleware, resolveTenancy, resolveRole, getProjectsController)

export { router };
