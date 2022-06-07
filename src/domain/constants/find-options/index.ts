import { AppFindOptions } from '@src/types/options/find-options';
import { producer } from './producer';
import { market } from './market';

/**
 *
 * #### Market
 * - where: isActive = true AND address.marketId IS NOT NULL AND score.marketId IS NOT NULL
 * - select: id, name, score.transactions, address.*, workday.*
 * - order: name ASC, score.transactions DESC
 * - relations: INNER JOIN address, INNER JOIN score, LEFT JOIN workday
 *
 * #### Producer
 * - where: isActive = true AND score.userId IS NOT NULL
 * - select: id, user.name, score.rating, score.transactions
 * - order: user.name ASC, score.rating DESC, score.transactions DESC
 * - relations: INNER JOIN user, INNER JOIN score
 */
export const findOptions: AppFindOptions = { producer, market };
