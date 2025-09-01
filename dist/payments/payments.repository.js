"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PaymentsRepository = class PaymentsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.payment.create({
            data,
            include: {
                user: true,
                cart: {
                    include: {
                        items: {
                            include: {
                                product: true,
                                course: true
                            }
                        }
                    }
                },
                productOrders: {
                    include: {
                        items: {
                            include: {
                                product: true
                            }
                        }
                    }
                },
                courseEnrollments: {
                    include: {
                        course: true
                    }
                }
            }
        });
    }
    async findById(id, where) {
        return this.prisma.payment.findFirst({
            where: { id, ...where },
            include: {
                user: true,
                cart: {
                    include: {
                        items: {
                            include: {
                                product: true,
                                course: true
                            }
                        }
                    }
                },
                productOrders: {
                    include: {
                        items: {
                            include: {
                                product: true
                            }
                        }
                    }
                },
                courseEnrollments: {
                    include: {
                        course: true
                    }
                }
            }
        });
    }
    async findByIdIncludingDeleted(id) {
        return this.prisma.payment.findUnique({
            where: { id },
            include: {
                user: true,
                cart: {
                    include: {
                        items: {
                            include: {
                                product: true,
                                course: true
                            }
                        }
                    }
                },
                productOrders: {
                    include: {
                        items: {
                            include: {
                                product: true
                            }
                        }
                    }
                },
                courseEnrollments: {
                    include: {
                        course: true
                    }
                }
            }
        });
    }
    async findByUserId(userId, where) {
        return this.prisma.payment.findMany({
            where: { userId, ...where },
            orderBy: { createdAt: 'desc' },
            include: {
                user: true,
                cart: {
                    include: {
                        items: {
                            include: {
                                product: true,
                                course: true
                            }
                        }
                    }
                },
                productOrders: {
                    include: {
                        items: {
                            include: {
                                product: true
                            }
                        }
                    }
                },
                courseEnrollments: {
                    include: {
                        course: true
                    }
                }
            }
        });
    }
    async findByStatus(status, where) {
        return this.prisma.payment.findMany({
            where: { status, ...where },
            orderBy: { createdAt: 'desc' },
            include: {
                user: true,
                cart: {
                    include: {
                        items: {
                            include: {
                                product: true,
                                course: true
                            }
                        }
                    }
                },
                productOrders: {
                    include: {
                        items: {
                            include: {
                                product: true
                            }
                        }
                    }
                },
                courseEnrollments: {
                    include: {
                        course: true
                    }
                }
            }
        });
    }
    async findByPayableType(payableType, where) {
        return this.prisma.payment.findMany({
            where: { payableType, ...where },
            orderBy: { createdAt: 'desc' },
            include: {
                user: true,
                cart: {
                    include: {
                        items: {
                            include: {
                                product: true,
                                course: true
                            }
                        }
                    }
                },
                productOrders: {
                    include: {
                        items: {
                            include: {
                                product: true
                            }
                        }
                    }
                },
                courseEnrollments: {
                    include: {
                        course: true
                    }
                }
            }
        });
    }
    async findAll(skip = 0, take = 10, where) {
        return this.prisma.payment.findMany({
            where,
            skip,
            take,
            orderBy: { createdAt: 'desc' },
            include: {
                user: true,
                cart: {
                    include: {
                        items: {
                            include: {
                                product: true,
                                course: true
                            }
                        }
                    }
                },
                productOrders: {
                    include: {
                        items: {
                            include: {
                                product: true
                            }
                        }
                    }
                },
                courseEnrollments: {
                    include: {
                        course: true
                    }
                }
            }
        });
    }
    async findDeleted(skip = 0, take = 10) {
        return this.prisma.payment.findMany({
            where: { deletedAt: { not: null } },
            skip,
            take,
            orderBy: { deletedAt: 'desc' },
            include: {
                user: true,
                cart: {
                    include: {
                        items: {
                            include: {
                                product: true,
                                course: true
                            }
                        }
                    }
                },
                productOrders: {
                    include: {
                        items: {
                            include: {
                                product: true
                            }
                        }
                    }
                },
                courseEnrollments: {
                    include: {
                        course: true
                    }
                }
            }
        });
    }
    async update(id, data) {
        return this.prisma.payment.update({
            where: { id },
            data,
            include: {
                user: true,
                cart: {
                    include: {
                        items: {
                            include: {
                                product: true,
                                course: true
                            }
                        }
                    }
                },
                productOrders: {
                    include: {
                        items: {
                            include: {
                                product: true
                            }
                        }
                    }
                },
                courseEnrollments: {
                    include: {
                        course: true
                    }
                }
            }
        });
    }
    async softDelete(id) {
        return this.prisma.payment.update({
            where: { id },
            data: { deletedAt: new Date() },
            include: {
                user: true,
                cart: {
                    include: {
                        items: {
                            include: {
                                product: true,
                                course: true
                            }
                        }
                    }
                },
                productOrders: {
                    include: {
                        items: {
                            include: {
                                product: true
                            }
                        }
                    }
                },
                courseEnrollments: {
                    include: {
                        course: true
                    }
                }
            }
        });
    }
    async hardDelete(id) {
        return this.prisma.payment.delete({
            where: { id },
            include: {
                user: true,
                cart: {
                    include: {
                        items: {
                            include: {
                                product: true,
                                course: true
                            }
                        }
                    }
                },
                productOrders: {
                    include: {
                        items: {
                            include: {
                                product: true
                            }
                        }
                    }
                },
                courseEnrollments: {
                    include: {
                        course: true
                    }
                }
            }
        });
    }
    async restore(id) {
        return this.prisma.payment.update({
            where: { id },
            data: { deletedAt: null },
            include: {
                user: true,
                cart: {
                    include: {
                        items: {
                            include: {
                                product: true,
                                course: true
                            }
                        }
                    }
                },
                productOrders: {
                    include: {
                        items: {
                            include: {
                                product: true
                            }
                        }
                    }
                },
                courseEnrollments: {
                    include: {
                        course: true
                    }
                }
            }
        });
    }
    async countByUser(userId, where) {
        return this.prisma.payment.count({
            where: { userId, ...where }
        });
    }
    async countByStatus(status, where) {
        return this.prisma.payment.count({
            where: { status, ...where }
        });
    }
    async sumAmountByUser(userId, where) {
        const result = await this.prisma.payment.aggregate({
            where: { userId, ...where },
            _sum: {
                amount: true
            }
        });
        return Number(result._sum.amount) || 0;
    }
    async sumAmountByStatus(status, where) {
        const result = await this.prisma.payment.aggregate({
            where: { status, ...where },
            _sum: {
                amount: true
            }
        });
        return Number(result._sum.amount) || 0;
    }
};
exports.PaymentsRepository = PaymentsRepository;
exports.PaymentsRepository = PaymentsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsRepository);
//# sourceMappingURL=payments.repository.js.map