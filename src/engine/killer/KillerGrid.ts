import { Cage } from './Cage';
import { Grid } from '../Grid';

export interface KillerGrid extends Grid {
    cages: Cage[];
}
