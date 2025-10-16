"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const next_sanity_1 = require("next-sanity");
const env_1 = require("../env");
exports.client = (0, next_sanity_1.createClient)({
    projectId: env_1.projectId,
    dataset: env_1.dataset,
    apiVersion: env_1.apiVersion,
    useCdn: true,
    token: process.env.SANITY_WRITE_TOKEN,
});
//# sourceMappingURL=client.js.map