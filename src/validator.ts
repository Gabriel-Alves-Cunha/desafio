import Validator from "fastest-validator";

import { querySchema } from "@server/routes/cart-history/querySchema";

const validator = new Validator();

export const queryValidator = validator.compile(querySchema);
