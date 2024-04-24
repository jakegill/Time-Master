import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { resolveTenancy } from "../middleware/resolveTenancy.middleware";
import { resolveRole } from "../middleware/resolveRole.middleware";
import { resolveUserId } from "../middleware/resolveUserId.middleware";
import { createTenantController } from "../controllers/tenancy/createTenant.controller";
import { loginUserController } from "../controllers/auth/loginUser.controller";
import { registerUserController } from "../controllers/auth/registerUser.controller";
import { createProjectController } from "../controllers/projects/createProject.controller";
import { getAllProjectsController } from "../controllers/projects/getAllProjects.controller";
import { assignProjectController } from "../controllers/projects/assignProject.controller";
import { getEmployeesController } from "../controllers/employees/getEmployees.controller";
import { getProjectsController } from "../controllers/projects/getProjects.controller";
import { clockInController } from "../controllers/projects/clockIn.controller";
import { clockOutController } from "../controllers/projects/clockOut.controller";
import { getProjectController } from "../controllers/projects/getProject.controller";
import { getEmployeeTimelogsController } from "../controllers/timelogs/getEmployeeTimelogs.controller";
import { getTimelogsController } from "../controllers/timelogs/getTimelogs.controller";


const router = Router();

/* ---------- Tenant Management ---------- */

router.post("/api/v1/tenants", authMiddleware, resolveRole, createTenantController);

/* ---------- Authentication ---------- */

router.post("/api/v1/auth/login", loginUserController);
router.post("/api/v1/auth/register", authMiddleware, resolveTenancy, resolveRole, registerUserController);

/* ---------- Projects ---------- */

router.post("/api/v1/projects", authMiddleware, resolveTenancy, resolveRole, createProjectController);
router.get("/api/v1/projects", authMiddleware, resolveTenancy, resolveRole, getAllProjectsController);
router.get("/api/v1/projects/:projectId", authMiddleware, resolveTenancy, resolveRole, getProjectController)
router.post("/api/v1/projects/assign", authMiddleware, resolveTenancy, resolveRole, assignProjectController);
router.post("/api/v1/projects/:projectId/clock-in", authMiddleware, resolveTenancy, resolveRole, resolveUserId, clockInController);
router.post("/api/v1/projects/:projectId/clock-out", authMiddleware, resolveTenancy, resolveRole, resolveUserId, clockOutController);


/* ---------- Employees ---------- */

router.get("/api/v1/employees", authMiddleware, resolveTenancy, resolveRole, getEmployeesController)
router.get("/api/v1/employees/:employeeId/projects", authMiddleware, resolveTenancy, resolveRole, getProjectsController);


/* ---------- Timelogs ---------- */

router.get("/api/v1/employee/timelogs", authMiddleware, resolveTenancy, resolveRole, resolveUserId, getEmployeeTimelogsController);
router.get("/api/v1/management/timelogs", authMiddleware, resolveTenancy, resolveRole, getTimelogsController);


export { router };
