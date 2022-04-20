"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = __importDefault(require("./user"));
const presentList_1 = __importDefault(require("./presentList"));
let Participate = class Participate {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: "ID",
        type: "bigint",
        unsigned: true
    })
], Participate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "MESSAGE",
        type: "nvarchar",
        length: 500,
        nullable: false
    })
], Participate.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(_ => user_1.default),
    (0, typeorm_1.JoinColumn)({ name: "PARTICIPANT_ID" })
], Participate.prototype, "participant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(_ => presentList_1.default),
    (0, typeorm_1.JoinColumn)({ name: "LIST_ID" })
], Participate.prototype, "presentList", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: "CREATED_AT"
    })
], Participate.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: "UPDATED_AT"
    })
], Participate.prototype, "updatedAt", void 0);
Participate = __decorate([
    (0, typeorm_1.Entity)("PARTICIPATE")
], Participate);
exports.default = Participate;
