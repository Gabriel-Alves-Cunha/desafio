import Validator from "fastest-validator";

import { querySchema } from "@src/validation/querySchema";

const validator = new Validator();

export const queryValidator = validator.compile(querySchema);
