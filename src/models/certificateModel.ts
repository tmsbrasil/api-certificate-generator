import { DatabaseError } from "sequelize/types";

import Sequelize, {Model, Optional} from 'sequelize';
import database from '../db';

export default database.define('certificate', {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        }
});