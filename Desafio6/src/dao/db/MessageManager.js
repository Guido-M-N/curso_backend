import { messageModel } from "../models/messages.model.js";
import BasicManager from "./BasicManager.js";

class MessageManager extends BasicManager {
    constructor() {
        super(messageModel);
    }

    async findAll(){
        try {
            const messages = await this.model.find();
            return messages;
        } catch (error) {
            return `Error al obtener los mensajes: ${error}`;
        }
    }
}

export const messageManager = new MessageManager();