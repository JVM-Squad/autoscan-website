ALTER TABLE "order"
    ADD COLUMN discount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    ADD COLUMN total    DECIMAL(10, 2) NOT NULL DEFAULT 0.00;