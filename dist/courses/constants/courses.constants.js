"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_BY_CREATED_DESC = exports.COURSE_INCLUDE_FULL = exports.COURSE_INCLUDE_WITH_MODULES = exports.COURSE_INCLUDE_BASIC = exports.MODULES_INCLUDE = exports.LESSONS_INCLUDE = exports.STUDENT_SELECT = exports.INSTRUCTOR_SELECT = void 0;
exports.buildCourseWhere = buildCourseWhere;
exports.INSTRUCTOR_SELECT = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
};
exports.STUDENT_SELECT = {
    id: true,
    firstName: true,
    lastName: true,
};
exports.LESSONS_INCLUDE = {
    lessons: {
        orderBy: { orderNumber: 'asc' },
    },
};
exports.MODULES_INCLUDE = {
    include: exports.LESSONS_INCLUDE,
    orderBy: { orderNumber: 'asc' },
};
exports.COURSE_INCLUDE_BASIC = {
    instructor: { select: exports.INSTRUCTOR_SELECT },
};
exports.COURSE_INCLUDE_WITH_MODULES = {
    ...exports.COURSE_INCLUDE_BASIC,
    modules: exports.MODULES_INCLUDE,
};
exports.COURSE_INCLUDE_FULL = {
    ...exports.COURSE_INCLUDE_WITH_MODULES,
    enrollments: {
        include: {
            student: { select: exports.STUDENT_SELECT },
        },
    },
};
exports.ORDER_BY_CREATED_DESC = { createdAt: 'desc' };
function buildCourseWhere(filter) {
    if (!filter)
        return {};
    const where = {};
    if (filter.category)
        where.category = filter.category;
    if (filter.level)
        where.level = filter.level;
    if (typeof filter.instructorId === 'number')
        where.instructorId = filter.instructorId;
    if (filter.language)
        where.language = filter.language;
    if (typeof filter.certificate === 'boolean')
        where.certificate = filter.certificate;
    if (filter.minPrice != null || filter.maxPrice != null) {
        where.price = {};
        if (filter.minPrice != null)
            where.price.gte = filter.minPrice;
        if (filter.maxPrice != null)
            where.price.lte = filter.maxPrice;
    }
    return where;
}
//# sourceMappingURL=courses.constants.js.map