export function testPhone (phone: string) {
  const exp = /^1\d{10}$/
  return exp.test(phone)
}
