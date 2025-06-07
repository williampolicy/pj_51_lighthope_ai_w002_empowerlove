const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10)
  
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: hashedPassword,
      name: '测试用户'
    }
  })
  
  console.log('测试用户创建成功:', user)
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
