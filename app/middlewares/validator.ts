import { readFileSync } from 'fs';
import { OpenApiValidator, ValidationError } from 'express-openapi-validate';
import jsYaml from 'js-yaml';

const openApiDoc = jsYaml.safeLoad(readFileSync('api-spec.yml', 'utf-8'));

const validator = new OpenApiValidator(openApiDoc);

export { validator, ValidationError };
