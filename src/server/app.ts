import Express, { Request, Response, NextFunction } from 'express';
import { v4 } from 'uuid';

const users = [
    {
        id: v4(),
        name: 'James Gordon'
    },
    {
        id: v4(),
        name: 'Joe West'
    },
    {
        id: v4(),
        name: 'William Riker'
    }
];

export default function (app: Express.Application): void {
    app.use(async (req: Request, res: Response, next: NextFunction) => {
        console.log(`[Server] ${req.method} ${req.url}`);
        next();
    });
    app.use(Express.json({}));
    app.use(Express.urlencoded({ extended: false }));

    app.get('/api/v1', (req: Request, res: Response) => {
        res.json({
            success: true,
            message: 'LWR custom API response'
        });
    });

    app.get('/api/v1/users', (req: Request, res: Response) => {
        res.json({ users });
    });

    app.post('/api/v1/users', (req: Request, res: Response) => {
        const newUser = {
            id: v4(),
            name: req.body.name
        };
        users.push(newUser);
        res.status(201).json(newUser);
    });

    app.get('/api/v1/users/:id', (req: Request, res: Response) => {
        const { id } = req.params;
        const user = users.find((user) => user.id === id);
        if (user) {
            res.json({
                success: true,
                message: 'LWR user resource by id',
                payload: {
                    user
                }
            });
        } else {
            res.json({
                success: false,
                message: 'LWR user not found',
                payload: null
            });
        }
    });
}
