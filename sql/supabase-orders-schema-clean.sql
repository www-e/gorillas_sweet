CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_email TEXT,
  delivery_instructions TEXT,
  items JSONB NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated users to view all orders" ON orders;
DROP POLICY IF EXISTS "Allow authenticated users to insert orders" ON orders;
DROP POLICY IF EXISTS "Allow authenticated users to update orders" ON orders;
DROP POLICY IF EXISTS "Allow authenticated users to delete orders" ON orders;

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to view all orders" ON orders
  FOR SELECT TO authenticated
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert orders" ON orders
  FOR INSERT TO authenticated
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update orders" ON orders
  FOR UPDATE TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete orders" ON orders
  FOR DELETE TO authenticated
  USING (auth.role() = 'authenticated');

-- Drop existing indexes if they exist
DROP INDEX IF EXISTS idx_orders_order_number;
DROP INDEX IF EXISTS idx_orders_status;
DROP INDEX IF EXISTS idx_orders_created_at;
DROP INDEX IF EXISTS idx_orders_customer_phone;

CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_customer_phone ON orders(customer_phone);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert admin user only if it doesn't exist
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES (
  '000dc9f3-9c3c-468e-bb74-cc4a002bbf7f',
  'admin@gorilla.com',
  crypt('admin@gorillastorez', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;