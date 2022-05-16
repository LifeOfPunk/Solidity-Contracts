const {expect} = require ("chai")    // 1. импортируеются необходимые библиотеки
const {ethers} = require("hardhat")

describe("Payments", function () {   // 2.  здесь я описываю смарт контракт Payments 
  let acc1                           // 6. тут обьявляется дынные перемнные, чтобы эти переменные были доступны в других тестах тоже  
  let acc2
  let payments                       // 8. ввожу переменную payments

  beforeEach(async function() {      // 3. Чтобы провести тест, контракт нужно развернуть в блокчейне, для этого используем hardhat
    [acc1, acc2] = await ethers.getSigners()   // 5. здесь вызывается аккаунт от имени которого будет развертываться смарт
    const Payments = await ethers.getContractFactory("Payments", acc1)  // 4. изначально нужно получить скомпелированную информацию о смарт котнракте, укащываем имя смарт контракта "Payments" и от имени кого мы хотим его развернуть
    payments = await Payments.deploy() // 7. разворачиваем смарт. payments - в данной переменной я сохраняю возможность взаимодействия со смартом. Данная операция отправляет тразакцию
    await payments.deployed()          // 8. здесь ждем когда она будет выполнена 
    console.log(payments.address)      // 9. узнаем по какому адресу разворачиваются смарты
  })

  it("should be deployed", async function() {
    expect(payments.address).to.be.properAddress  // 10. чтобы убедиться что текущий смарт контактом явялется коррекным, испольщую waffle 
  })

  it ("it should have 0 ether by deploy", async function() {
    const balance = await payments.currentBalance()
    expect(balance).to.eq(0)
  })

  it ("should be possible to send funds", async function() {   // 11. теперь создаю функцию с возможностью отправки транакций
    const sum  = 100
    const msg = "hello from hardhat"
    const tx = await payments.connect(acc2).pay(msg, { value: sum }) // 12. создаю новую переменную, в которой указываю передаваемые значения
    
    await expect(() => tx)
    .to.changeEtherBalances([acc2, payments], [-sum, sum])    
  
    await tx.wait()                                         // 13. ждем пока транзакция исполнится  
    
    const newPayment = await payments.getPayment(acc2.address, 0)
    expect(newPayment.message).to.eq(msg)
    expect(newPayment.amount).to.eq(sum)
    expect(newPayment.from).to.eq(acc2.address)
    })




})
