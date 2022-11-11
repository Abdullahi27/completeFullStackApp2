function  loadTableData() {
    let coins = ['Bitcoin', 'Ethereum', 'Solana', 'BNB', 'Shiba Inu', 'XRP','Chainlink', "Polygon",'VeChain']

let cryptoData = []
let bigList = []

fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', 
     {headers: {
        'X-CMC_PRO_API_KEY': '98c11ab0-806f-4e4e-8b0a-19a13c837a42',

        },
        })
     .then(response => response.json())
     .then(data => {
        data.data.forEach(item=>{
            bigList.push({name:item.name, price:item.quote.USD.price, marketcap:item.quote.USD.market_cap, volume:item.quote.USD.volume_24h,
                supply:item.circulating_supply
              })

          if(coins.includes(item.name)){
            cryptoData.push({name:item.name, price:item.quote.USD.price, marketcap:item.quote.USD.market_cap.toFixed(2), volume:item.quote.USD.volume_24h.toFixed(2),
              supply:item.circulating_supply.toFixed(2)
            })
          }
        })

        
        console.log(cryptoData)

        const tableBody = document.getElementById('tableData')
        let dataHtml = ''; 
    
        for (let crypto of cryptoData) {
            dataHtml += `<tr>
            <td>${crypto.name}</td>
            <td>${crypto.price}</td>
            <td>${crypto.marketcap}</td>
            <td>${crypto.volume}</td>
            <td>${crypto.supply}</td>
            </tr>`;
        }
    
        tableBody.innerHTML  = dataHtml


 document.querySelector('.btc').innerHTML = '$' + cryptoData[0].price.toFixed(2)
 document.querySelector('.eth').innerHTML = '$' + cryptoData[1].price.toFixed(2)
 document.querySelector('.bnb').innerHTML = '$' + cryptoData[2].price.toFixed(2)
 document.querySelector('.xrp').innerHTML = '$' + cryptoData[3].price.toFixed(2)
 document.querySelector('.sol').innerHTML = '$' + cryptoData[4].price.toFixed(2)
 document.querySelector('.matic').innerHTML = '$' + cryptoData[5].price.toFixed(2)
 document.querySelector('.shiba').innerHTML = '$' + cryptoData[6].price.toFixed(6)
 document.querySelector('.link').innerHTML = '$' + cryptoData[7].price.toFixed(2)
 document.querySelector('.vet').innerHTML = '$' + cryptoData[8].price.toFixed(2)

 let select = document.getElementById("selectNumber");

 bigList.forEach(item=>{
   let el = document.createElement("option");
   el.textContent = item.name
   el.value =  item.name;
   select.appendChild(el);
 })

 document.querySelector('#save').addEventListener('click', ()=>{
    let name = document.getElementById("selectNumber").value;
    let amount = document.getElementById("amount").value;
        if (!Number.isInteger(+amount)) {
          alert('Please Enter A Number!')
            return 
        }
    // let price = (+amount) * bigList.find(item=>item.name === sel).price
   console.log(name)
   console.log(+amount)

   fetch('saveCoin', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': name,
      'amount': amount
    })
  }).then(function (response) {
    window.location.reload()
  })
  
  })

})

} loadTableData()

let trash = document.getElementsByClassName("delete"); 

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = element.dataset.name
    console.log(name)
    fetch('delete', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});



let updateBtn = document.getElementsByClassName("update"); 

Array.from(updateBtn).forEach(function(element) {
  console.log('update')
  element.addEventListener('click', function(){
    const newAmount = document.getElementById(element.dataset.id).value
    console.log(newAmount)
    const id = element.dataset.id
    fetch('update', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        newAmount:newAmount
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

//  window.onload = () => {
//     loadTableData(cryptoData)
//  }

 






















































// let trash = document.getElementsByClassName("fa-trash-o");


// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         fetch('messages', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
//       });
// });
