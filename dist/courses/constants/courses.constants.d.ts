import { Prisma } from '@prisma/client';
import { CourseFilter } from '../interfaces/courses.repository.interface';
export declare const INSTRUCTOR_SELECT: {
    id: true;
    firstName: true;
    lastName: true;
    email: true;
};
export declare const STUDENT_SELECT: {
    id: true;
    firstName: true;
    lastName: true;
};
export declare const LESSONS_INCLUDE: {
    lessons: {
        orderBy: {
            orderNumber: "asc";
        };
    };
};
export declare const MODULES_INCLUDE: {
    include: {
        lessons: {
            orderBy: {
                orderNumber: "asc";
            };
        };
    };
    orderBy: {
        orderNumber: "asc";
    };
};
export declare const COURSE_INCLUDE_BASIC: {
    instructor: {
        select: {
            id: true;
            firstName: true;
            lastName: true;
            email: true;
        };
    };
};
export declare const COURSE_INCLUDE_WITH_MODULES: {
    modules: {
        include: {
            lessons: {
                orderBy: {
                    orderNumber: "asc";
                };
            };
        };
        orderBy: {
            orderNumber: "asc";
        };
    };
    instructor: {
        select: {
            id: true;
            firstName: true;
            lastName: true;
            email: true;
        };
    };
};
export declare const COURSE_INCLUDE_FULL: {
    enrollments: {
        include: {
            student: {
                select: {
                    id: true;
                    firstName: true;
                    lastName: true;
                };
            };
        };
    };
    modules: {
        include: {
            lessons: {
                orderBy: {
                    orderNumber: "asc";
                };
            };
        };
        orderBy: {
            orderNumber: "asc";
        };
    };
    instructor: {
        select: {
            id: true;
            firstName: true;
            lastName: true;
            email: true;
        };
    };
};
export declare const ORDER_BY_CREATED_DESC: {
    createdAt: "desc";
};
export declare function buildCourseWhere(filter?: CourseFilter): Prisma.CourseWhereInput;
