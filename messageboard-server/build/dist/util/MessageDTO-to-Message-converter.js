"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageDTOtoMessageConverter = void 0;
function MessageDTOtoMessageConverter(dto) {
    return {
        messageId: dto.message_id,
        userId: dto.user_id,
        title: dto.title,
        message: dto.message,
        date: dto.date.toString(),
        email: '',
    };
}
exports.MessageDTOtoMessageConverter = MessageDTOtoMessageConverter;
//# sourceMappingURL=MessageDTO-to-Message-converter.js.map