"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAssignmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_assignment_dto_1 = require("./create-assignment.dto");
class UpdateAssignmentDto extends (0, swagger_1.PartialType)(create_assignment_dto_1.CreateAssignmentDto) {
}
exports.UpdateAssignmentDto = UpdateAssignmentDto;
//# sourceMappingURL=update-assignment.dto.js.map