import Express, { Request, Response, NextFunction } from 'express';

export default function (app: Express.Application): void {
    app.use(async (req: Request, res: Response, next: NextFunction) => {
        console.log(`[Server] ${req.method} ${req.url}`);
        next();
    });

    app.get('/api/v1', (req: Request, res: Response) => {
        res.json({
            success: true,
            message: 'LWR custom API response'
        });
    });
}
