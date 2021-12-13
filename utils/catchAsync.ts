import { NextApiRequest, NextApiResponse } from 'next';

module.exports = (fn: Function) => {
    return (req: NextApiRequest, res: NextApiResponse) => {
        fn(req, res).catch();
    };
}