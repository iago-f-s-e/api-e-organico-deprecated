import { AppFindOptions } from '@src/types/options/find-options';
import { producer } from './producer';

/**
 * @exports Producer
 * - where: isActive = true AND score.userId IS NOT NULL
 * - select: id, user.name, score.rating, score.transactions
 * - order: user.name ASC, score.rating DESC, score.transactions DESC
 * - relations: user INNER JOIN, score INNER JOIN
 */
export const findOptions: AppFindOptions = { producer };
