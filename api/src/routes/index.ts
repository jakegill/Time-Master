import { Router } from "express";

const router = Router();

//Auth
router.post("/api/auth/login");
router.post("/api/auth/register");

//User Management
router.get("/api/users");
router.put("/api/users/:userId");

//Project Management
router.get("/api/project");
router.post("/api/project");

router.get("/api/project/:projectId");
router.put("/api/project/:projectId");
router.delete("/api/project/:projectId");

//Project User Assignment and Management
router.post("/api/project/:projectId/assign");
router.post("/api/project/:projectId/remove");
router.post("/api/project/:projectId/promote/:userId");

//Project Timelog Management
router.get("/api/project/:projectId/timelog");
router.post("/api/project/:projectId/timelog");

router.get("/api/project/:projectId/timelog/:userId");

router.get("/api/project/:projectId/timelog/:userId/:timelogId");
router.put("/api/project/:projectId/timelog/:userId/:timelogId");
router.delete("/api/project/:projectId/timelog/:userId/:timelogId");

export { router };
