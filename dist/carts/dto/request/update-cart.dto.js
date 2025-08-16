"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCartDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const add_to_cart_dto_1 = require("./add-to-cart.dto");
class UpdateCartDto extends (0, mapped_types_1.PartialType)(add_to_cart_dto_1.AddToCartDto) {
}
exports.UpdateCartDto = UpdateCartDto;
//# sourceMappingURL=update-cart.dto.js.map