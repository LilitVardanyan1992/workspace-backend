import { Model, FindOptions, ModelStatic, WhereOptions } from 'sequelize';
import { MakeNullishOptional } from 'sequelize/types/utils';

export abstract class CommonService<T extends Model<T>> {
  constructor(protected model: ModelStatic<T>) {}

  async findAll(options: any = {}): Promise<T[]> {
    return await this.model.findAll(options);
  }

  async findAndCountAll(
    conditions?: FindOptions<T>,
  ): Promise<{ rows: T[]; count: number }> {
    try {
      return await this.model.findAndCountAll({
        ...conditions,
        distinct: true,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async findOne(conditions: FindOptions<T>): Promise<T | null> {
    try {
      return await this.model.findOne(conditions);
    } catch (e) {
      throw new Error(e);
    }
  }

  async create(
    data: MakeNullishOptional<T['_creationAttributes']>,
  ): Promise<T> {
    try {
      return await this.model.create(data);
    } catch (e) {
      console.log(e.message);
      throw new Error(e);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const result = await this.model.destroy({
        where: { id } as WhereOptions,
      });
      return result > 0;
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(id: number, item: Partial<T['_attributes']>): Promise<boolean> {
    try {
      const [numberOfAffectedRows] = await this.model.update(item, {
        where: { id } as WhereOptions,
      });
      return numberOfAffectedRows > 0;
    } catch (e) {
      throw new Error(e);
    }
  }
}
