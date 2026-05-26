import { authRouter } from "./auth-router";
import { productsRouter, categoriesRouter } from "./products-router";
import { ordersRouter } from "./orders-router";
import { analyticsRouter } from "./analytics-router";
import { couponsRouter } from "./coupons-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  products: productsRouter,
  categories: categoriesRouter,
  orders: ordersRouter,
  analytics: analyticsRouter,
  coupons: couponsRouter,
});

export type AppRouter = typeof appRouter;
