const { expect } = require("chai")    
const { ethers } = require("hardhat")

describe("AucEngine", function () { 
let owner
let seller
let buyer 
let auct

beforeEach(async function () {
[owner, seller, buyer] = await ethers.getSigners()
      
const AucEngine  = await ethers.getContractFactory("AucEngine", owner)
auct = await AucEngine.deploy() 
await auct.deployed()  
})


it("sets owner", async function() {                      
const currentOwner = await auct.owner()                  
console.log(currentOwner)                               
expect(currentOwner).to.eq(owner.address)
    })


    async function getTimestamp(bn) {                              // создаю функцию которая считывает метку времени в определенный мометн
        return (
            await ethers.provider.getBlock(bn)                     // 
    ).timestamp
    }

    async function getTimestamp(bn) {
        return (
            await ethers.provider.getBlock(bn )
        ).timestamp
    }


    describe("createAuction", function () { 
    it ("creates auction correctly", async function (){
        const duration = 60
        const tx = await auct.createAuction(                       // в этой транзакции делаем создание
            ethers.utils.parseEther("0.0001"),                     // с помощью утилиь parseEther, смарту можно передать значение wei
            3,
            "fake item", 
            duration
        )
         
        const cAuction = await auct.auctions(0)
        console.log(cAuction)
        expect(cAuction.item).to.eq("fake item")
        console.log(tx)
        const ts  = await getTimestamp(tx.blockNumber)
        expect(cAuction.endsAt).to.eq(ts + duration)
  })
 }) 
    
    function delay () {
        return new Promise(resolve => setTimeout (resolve,ms))
    }

    describe("buy", function () { 
    it ("it allows ti buy", async function() {
            await auct.connect(seller).createAuction(                       
            ethers.utils.parseEther("0.0001"),                    
            3,
            "fake item", 
            60
         )
        this.timeout(5000)      // 5s - тест может работать до 5 сек. 
        await delay (1000)

        const buyTx = await auct.connect(buyer)
        const finalPrice = cAuction.
        buy(0,{value:ethers.utils.parseEther("0.0001")})
        
        await expect (() => buyTx).finalPrice 
                to.changeEtherBalance(seller,)

     })           
    })
   }) 
