let baseURL = `http://localhost:8000`

const productList = document.getElementById("product-list")

let items = [];



async function getdata(){
    try{
        
        let response = await fetch(`${baseURL}/products`)
        let data = await response.json()
        console.log(data)
        items = data;
        displayData(items)
    }
    catch(err){
        console.log(err)
    }
}

getdata()


function displayData(data){
    productList.textContent = ""
    data.forEach(elem => {

        const div = document.createElement("div")
        div.className = "card"

        const img = document.createElement("img")
        img.src = elem.image
        img.alt = elem.name

        const name = document.createElement("h3")
        name.textContent = elem.name

        const desc_price = document.createElement("div")
        desc_price.classList.add("desc-price")

        const desc = document.createElement("p")
        desc.textContent = elem.description

        const price = document.createElement("p")
        price.textContent = "$"+ elem.price

        desc_price.append(desc, price)
        div.append(img, name, desc_price)
        div.addEventListener("click", function(){
            addtodetailpage(elem)
        })

        productList.appendChild(div);
    })
}





async function handleprice(){
     const select = document.getElementById("sort-by-price").value

    if(select === "htl"){
        console.log(items)
        let data1 = items.sort((a, b) => +b.price - +a.price)
        displayData(data1)
        
    }

    if(select === "lth"){
        let data2 = items.sort((a, b) => +a.price - +b.price)
        displayData(data2)
            
    }
   
}




function addtodetailpage(elem){
    localStorage.setItem("product-items", JSON.stringify(elem))

    //window.location.href = "productdetail.html"
}