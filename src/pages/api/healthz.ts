// Add a health route
import { type NextApiRequest, type NextApiResponse } from "next";

const Healthz =  (req: NextApiRequest, res: NextApiResponse) => {
  //todo add db check, redis check, etc
  res.status(200).json({ status: "ok" });
}

export default Healthz;