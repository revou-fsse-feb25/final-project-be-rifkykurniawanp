"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentSubmissionStatsDto = exports.AssignmentSubmissionListResponseDto = exports.AssignmentSubmissionResponseDto = void 0;
class AssignmentSubmissionResponseDto {
    id;
    assignmentId;
    userId;
    content;
    grade;
    submittedAt;
    user;
    assignment;
}
exports.AssignmentSubmissionResponseDto = AssignmentSubmissionResponseDto;
class AssignmentSubmissionListResponseDto {
    submissions;
    total;
    page;
    limit;
    stats;
}
exports.AssignmentSubmissionListResponseDto = AssignmentSubmissionListResponseDto;
class AssignmentSubmissionStatsDto {
    totalSubmissions;
    gradedSubmissions;
    pendingGrading;
    averageGrade;
    highestGrade;
    lowestGrade;
}
exports.AssignmentSubmissionStatsDto = AssignmentSubmissionStatsDto;
//# sourceMappingURL=submission.response.dto.js.map