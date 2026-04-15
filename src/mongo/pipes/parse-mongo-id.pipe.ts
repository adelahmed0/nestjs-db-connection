import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class ParseMongoIdPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    // TODO: Validate if the value is a valid MongoDB ObjectId
    const isValidMongoId = /^[0-9a-fA-F]{24}$/.test(value);
    if (!isValidMongoId) {
      throw new BadRequestException(
        `Invalid ID format: "${value}" is not a valid MongoDB ObjectId`,
      );
    }
    return value;
  }
}
