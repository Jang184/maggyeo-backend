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
const presentList_1 = __importDefault(require("./presentList"));
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: "ID",
        type: "bigint",
        unsigned: true
    })
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "NAME",
        type: "nvarchar",
        length: 10,
        nullable: false
    })
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "EMAIL",
        type: "varchar",
        length: 20,
        nullable: false,
        unique: true
    })
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "PASSWORD",
        type: "varchar",
        length: 100,
        nullable: false
    })
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "PROFILE_URL",
        type: "varchar",
        length: 500,
        nullable: true
    })
], User.prototype, "profileUrl", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(_ => presentList_1.default, present => present.user, { cascade: ["insert", "update"] })
], User.prototype, "presents", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: "CREATED_AT"
    })
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: "UPDATED_AT"
    })
], User.prototype, "updatedAt", void 0);
User = __decorate([
    (0, typeorm_1.Entity)("USER")
], User);
exports.default = User;
