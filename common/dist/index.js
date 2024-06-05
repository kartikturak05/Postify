"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInputs = exports.createBlogInputs = exports.signinInput = exports.signupInput = void 0;
const zod_1 = require("zod");
// validation of signup inputs
exports.signupInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().optional()
});
// Validation of signin inputs
exports.signinInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().optional()
});
// Validation on createblog inputs
exports.createBlogInputs = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string()
});
// Validation on createblog inputs
exports.updateBlogInputs = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    content: zod_1.z.string()
});
