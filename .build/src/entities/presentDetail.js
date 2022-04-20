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
let PresentDetail = class PresentDetail {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: "ID",
        type: "bigint",
        unsigned: true
    })
], PresentDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "URL",
        type: "varchar",
        length: 500,
        nullable: false
    })
], PresentDetail.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "DESCRIPTION",
        type: "nvarchar",
        length: 1000
    })
], PresentDetail.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "COUNT_LIMIT",
        type: "int",
        unsigned: true
    })
], PresentDetail.prototype, "countLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "COUNT_NOW",
        type: "int",
        unsigned: true
    })
], PresentDetail.prototype, "countNow", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(_ => presentList_1.default),
    (0, typeorm_1.JoinColumn)({ name: "PRESENT_LIST" })
], PresentDetail.prototype, "presentList", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: "CREATED_AT"
    })
], PresentDetail.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: "UPDATED_AT"
    })
], PresentDetail.prototype, "updatedAt", void 0);
PresentDetail = __decorate([
    (0, typeorm_1.Entity)("PRESENT_DETAIL")
], PresentDetail);
exports.default = PresentDetail;
