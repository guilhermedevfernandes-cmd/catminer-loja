export function generateOrderNumber(sequence: number) {
  return `CM-${String(sequence).padStart(6, "0")}`;
}

export function generateFallbackOrderNumber() {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 999).toString().padStart(3, "0");

  return `CM-${timestamp}${random}`;
}
