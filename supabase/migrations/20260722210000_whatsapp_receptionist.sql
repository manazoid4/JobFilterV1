CREATE TABLE IF NOT EXISTS whatsapp_chat_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number text NOT NULL,
  role text NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_whatsapp_chat_phone ON whatsapp_chat_history(phone_number, created_at ASC);

ALTER TABLE whatsapp_chat_history ENABLE ROW LEVEL SECURITY;
