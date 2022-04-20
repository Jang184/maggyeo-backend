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
const presentDetail_1 = __importDefault(require("./presentDetail"));
let PresentList = class PresentList {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: "ID",
        type: "bigint",
        unsigned: true
    })
], PresentList.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "NAME",
        type: "nvarchar",
        length: 200,
        nullable: false
    })
], PresentList.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "DESCRIPTION",
        type: "varchar",
        length: 500,
        nullable: true,
    })
], PresentList.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(_ => user_1.default),
    (0, typeorm_1.JoinColumn)({ name: "USER_ID" })
], PresentList.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(_ => presentDetail_1.default, presentDetail => presentDetail.presentList, { cascade: ["insert", "update"] })
], PresentList.prototype, "presentDetails", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: "CREATED_AT"
    })
], PresentList.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: "UPDATED_AT"
    })
], PresentList.prototype, "updatedAt", void 0);
PresentList = __decorate([
    (0, typeorm_1.Entity)("PRESENT_LIST")
], PresentList);
exports.default = PresentList;
