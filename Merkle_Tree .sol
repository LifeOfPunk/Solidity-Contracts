// For own purposes
// SPDX-License-Identifier: GPL-3.0

pragma  solidity ^0.8.0;
 // Merkle Tree  - решение еще было придуманно в 70-х годах, представленно это древо может быть как 2 в n степени

contract Tree {                                                  // Привет! В данном уроке я создаю хегирование дынных по принципе Merkle Tree!
//      root
//   H1+2  H3+4
//  H1 H2 H3 H4
// TX1 TX2 TX3 TX4

    bytes32[] public hashes;                                     // 1. массив из последовательности байтов, они и будут предствлять древо
    string[4] transactions = [
        "TX1: Sherlock -> John",
        "TX2: John -> Sherlock",
        "TX3: John -> Mary",
        "TX4: Mary -> Sherlock"
        ];                                                       //2. массив из строк будет представлять некоторые транзацкции или данные


        constructor () {
            for (uint i = 0; i < transactions.length; i++) {    //  3. for организовывет циклы. для это нужно создать обход массива где итерация будет переходить на каждый следующий элемент
              hashes.push(makehash(transactions[i]));           // 4. makehash хеширует каждый элемент, а .push отправляет его в массим данных hashes
            }
           
            uint count = transactions.length;                    // 5. теперь необходимо прозехешировать следующие листья древа, поэтому перед этим их нужно заново посчитать
            uint offset = 0;                                    // 6. ввожу переменную смещения
           
            while (count > 0) {
                for (uint i = 0; i < count -1; i += 2){           // 7. for создает вложенный цикл, с помощью которого булет браться кажлый слдующий хеш
                hashes.push (keccak256 (
                    abi.encodePacked (
                        hashes[offset +i], hashes[offset + i + 1]
                    )
                 ));
                }
                 offset += count;
                 count = count / 2;
            }     
        }

        function verify (string memory transaction, uint index, bytes32 root, bytes32[] memory proof) public pure returns (bool) {  // 8. verify отвечает за то, верифицированна фукнция или нет
            bytes32 hash = makehash(transaction);  // 9. хешируется с помощью функции makehash транзакция
            for (uint i = 0; i < proof.length; i ++) {  // 10. шаг
                bytes32 element = proof[i];
                if  (index % 2  == 0) {
                    hash = keccak256(abi.encodePacked(hash, element));
                } else {
                    hash = keccak256(abi.encodePacked(element, hash));
                }
                index = index / 2;  
            }
            return hash == root;

        }
    


    function encode (string memory input) public pure returns (bytes memory) {       // 2. encode с помощью встроенной в солидити команды "abi.encodePacked", байтирует для keccak256 данные 
        return abi.encodePacked(input);
       }

    function makehash (string memory input) public pure returns (bytes32) {          // 1. Данная функция с помощью команды keccak256 хеширует данные, ифномарцию о которых ей дает функиця encode
        return keccak256 (
            encode(input)
        );  // примечание: она возразает хеш с заранее известной длинной, так как 1 байт это 8 бит, значит 8*32=256. Но кессаку нужно передавать правильно закодированное значение

            // примечание: abi.encodePacked() // эта команда встроена в солидити и она кодирует информацию для команды keccak256

    }


 
}
