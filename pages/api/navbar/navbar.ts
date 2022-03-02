import type { NextApiRequest, NextApiResponse } from 'next'
import '../../../utils/dbConnection';

//Model for MongoDB document
import NavBar from '../../../models/navbarModel';
import { actions } from './actions';
const NavBarHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await actions[req.method ?? "default"](req, res, NavBar);
}

export default NavBarHandler;