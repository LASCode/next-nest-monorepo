import {HttpException, HttpStatus} from "@nestjs/common";

export const checkDocument =
    <Document>(service: { findById: (id: string) => Promise<Document | null> }) =>
        async (id: string, errorMessage: string): Promise<Document> => {
            const foundDocument = await service.findById(id);
            if (!foundDocument) {
                throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
            }
            return foundDocument;
        };