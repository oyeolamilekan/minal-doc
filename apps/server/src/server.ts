import Logging from "utils/logging.util";
import app from "./app";

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3001;

app.listen(port, () => Logging.info(`Server is running on port ${port}`)).on('error', (e) => Logging.error(e));
