import { resolve } from 'path';
import YAML from 'yamljs';


export const swaggerDocument = YAML.load(resolve(__dirname, 'specs.yaml'));
