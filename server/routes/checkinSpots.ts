import express from "express";
import { getOwnerToken } from "../middleware/auth";
import {
  createCheckinSpot,
  deleteCheckinSpot,
  listCheckinSpots,
} from "../services/checkinSpotService";

export function createCheckinSpotRouter() {
  const router = express.Router();

  router.get("/", (_req, res) => {
    res.json(listCheckinSpots());
  });

  router.post("/", (req, res) => {
    const result = createCheckinSpot(req.body, getOwnerToken(req));
    if ("error" in result) {
      return res.status(result.status).json({ error: result.error });
    }
    return res.status(result.status).json(result.spot);
  });

  router.delete("/:id", (req, res) => {
    const result = deleteCheckinSpot(req.params.id, getOwnerToken(req));
    if ("error" in result) {
      return res.status(result.status).json({ error: result.error });
    }
    return res.json({ success: true });
  });

  return router;
}
