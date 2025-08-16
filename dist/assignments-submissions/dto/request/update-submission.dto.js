"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSubmissionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const submit_assignment_dto_1 = require("./submit-assignment.dto");
class UpdateSubmissionDto extends (0, mapped_types_1.PartialType)(submit_assignment_dto_1.SubmitAssignmentDto) {
}
exports.UpdateSubmissionDto = UpdateSubmissionDto;
//# sourceMappingURL=update-submission.dto.js.map