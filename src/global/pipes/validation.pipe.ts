import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

type MetaType = ArgumentMetadata['metatype'];

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    return value;
  }

  private toValidate(metatype: MetaType): boolean {
    const types: MetaType[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
