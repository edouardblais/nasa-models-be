import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import { CMRResponse, BoundingBoxParams } from "./types";
import { getTemporalFilter } from "./utils";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const port = 3000;
const BEARER_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJvcmlnaW4iOiJFYXJ0aGRhdGEgTG9naW4iLCJzaWciOiJlZGxqd3RwdWJrZXlfb3BzIiwiYWxnIjoiUlMyNTYifQ.eyJ0eXBlIjoiVXNlciIsInVpZCI6ImVkb3VhcmRuYXNhIiwiZXhwIjoxNzM2NDcyNjY4LCJpYXQiOjE3MzEyODg2NjgsImlzcyI6Imh0dHBzOi8vdXJzLmVhcnRoZGF0YS5uYXNhLmdvdiJ9.MOaNfjAUEkbNKcULnS5pqTR86ZCqfp_iEBl6koTDQOE1q6u8WN1-8N_dH_QaZqUy7qIdzZqIA50Xci315FsxS6iiBKsakAPLxa6ZjYv__w9hZ_NaxaUD37VDD2M4ArJ3maUPqtFuESvCbIzW25gDvP-p8QYbkgyK9oNNT60j2JgIs2yW4vxGOQmYW7WoTizXyi72wof-0zVKw50xDPujuoM2FrCEgb3ovG33baO7huMX5-0DorqRAciW3d6qN_SRE7alBRTvf1kzCZcLMq8gEYqztDX0GvaAFgQ459iNqEBMUjRqosDg9p2ynXR4ZrO-eUyLkwsvh0f_Zf7pJyhUlg";

app.get(
  "/hls-sentinel-2",
  async (
    req: Request<{}, {}, {}, BoundingBoxParams>,
    res: Response<CMRResponse>
  ) => {
    const { west, south, east, north } = req.query;

    const cmrUrl =
      "https://cmr.earthdata.nasa.gov/stac/LPCLOUD/collections/HLSS30_2.0/items";
    const temporal = getTemporalFilter();
    const conceptId = "C2021957295-LPCLOUD";

    // Create the params object based on the successful call structure
    const params = {
      // concept_id: conceptId,
      bbox: `${west},${south},${east},${north}`,
      datetime: temporal,
      sortby: "-endDate",
    };

    try {
      // Fetch data from the CMR API
      const response = await axios.get<CMRResponse>(cmrUrl, {
        params,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
