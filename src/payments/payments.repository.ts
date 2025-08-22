// src/payments/payments.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Payment, PaymentStatus, PayableType, Prisma } from '@prisma/client';
import { IPaymentsRepository, CreatePaymentData, UpdatePaymentData } from './interfaces/payments.repository.interface';

@Injectable()
export class PaymentsRepository implements IPaymentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePaymentData): Promise<Payment> {
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

  async findById(id: number, where?: Prisma.PaymentWhereInput): Promise<Payment | null> {
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

  async findByIdIncludingDeleted(id: number): Promise<Payment | null> {
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

  async findByUserId(userId: number, where?: Prisma.PaymentWhereInput): Promise<Payment[]> {
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

  async findByStatus(status: PaymentStatus, where?: Prisma.PaymentWhereInput): Promise<Payment[]> {
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

  async findByPayableType(payableType: PayableType, where?: Prisma.PaymentWhereInput): Promise<Payment[]> {
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

  async findAll(skip = 0, take = 10, where?: Prisma.PaymentWhereInput): Promise<Payment[]> {
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

  async findDeleted(skip = 0, take = 10): Promise<Payment[]> {
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

  async update(id: number, data: UpdatePaymentData): Promise<Payment> {
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

  async softDelete(id: number): Promise<Payment> {
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

  async hardDelete(id: number): Promise<Payment> {
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

  async restore(id: number): Promise<Payment> {
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

  async countByUser(userId: number, where?: Prisma.PaymentWhereInput): Promise<number> {
    return this.prisma.payment.count({
      where: { userId, ...where }
    });
  }

  async countByStatus(status: PaymentStatus, where?: Prisma.PaymentWhereInput): Promise<number> {
    return this.prisma.payment.count({
      where: { status, ...where }
    });
  }

  async sumAmountByUser(userId: number, where?: Prisma.PaymentWhereInput): Promise<number> {
    const result = await this.prisma.payment.aggregate({
      where: { userId, ...where },
      _sum: {
        amount: true
      }
    });
    return Number(result._sum.amount) || 0;
  }

  async sumAmountByStatus(status: PaymentStatus, where?: Prisma.PaymentWhereInput): Promise<number> {
    const result = await this.prisma.payment.aggregate({
      where: { status, ...where },
      _sum: {
        amount: true
      }
    });
    return Number(result._sum.amount) || 0;
  }
}