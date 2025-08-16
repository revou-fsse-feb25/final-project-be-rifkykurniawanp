"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEnrollmentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const enroll_course_dto_1 = require("./enroll-course.dto");
class UpdateEnrollmentDto extends (0, mapped_types_1.PartialType)(enroll_course_dto_1.EnrollCourseDto) {
}
exports.UpdateEnrollmentDto = UpdateEnrollmentDto;
//# sourceMappingURL=update-enrollment.dto.js.map