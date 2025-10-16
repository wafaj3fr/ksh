"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectId = exports.dataset = exports.apiVersion = void 0;
exports.apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-04-28';
exports.dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
exports.projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
function assertValue(v, errorMessage) {
    if (v === undefined) {
        throw new Error(errorMessage);
    }
    return v;
}
//# sourceMappingURL=env.js.map