let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'Create';
let temp;
// get total
function getTotal(){
    if(price.value != ''){
        let result =(+price.value + +taxes.value + +ads.value)
        - +discount.value;

        total.innerHTML = result;
        total.style.background = '#040';
    }else{
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}
// create prodect
let dataProducts;
if(localStorage.products != null){
    dataProducts = JSON.parse(localStorage.products);
    showData();
}else{
    dataProducts = [];
}
submit.onclick = function(){
    let newProduct = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
    if(mood === 'Create'){
    if(newProduct.count > 1){
        for(let i = 0 ; i < newProduct.count ; i++){
            dataProducts.push(newProduct);
        }
    }else{
        dataProducts.push(newProduct);
    }
}else{
    dataProducts[temp] = newProduct;
    mood = 'Create';
    submit.innerHTML = 'Create'
    count.style.display = 'block';
}
    localStorage.setItem('products' , JSON.stringify(dataProducts));
    clearData();
    showData();
}

// clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
// read
function showData(){
    getTotal();
    let table = ``;
    for(let i = 0 ; i < dataProducts.length ; i++){
        table += `
        <tr>
                    <td>${i}</td>
                    <td>${dataProducts[i].title}</td>
                    <td>${dataProducts[i].price}</td>
                    <td>${dataProducts[i].taxes}</td>
                    <td>${dataProducts[i].ads}</td>
                    <td>${dataProducts[i].discount}</td>
                    <td>${dataProducts[i].total}</td>
                    <td>${dataProducts[i].category}</td>
                    
                    <td>
                        <button id="update" onclick="updateData(${i})">update</button>
                    </td>
                    <td>
                        <button id="delete" onclick="deleteProduct(${i})">delete</button>
                    </td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataProducts.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">delete All(${dataProducts.length})</button>
        `;
    }else{
        btnDelete.innerHTML='';
    }
}
// delete
function deleteProduct(i){
    dataProducts.splice(i,1);
    localStorage.products = JSON.stringify(dataProducts);
    showData();
}
function deleteAll(){
    localStorage.clear();
    dataProducts.splice(0); 
    showData();
}
// update
function updateData(i){
    title.value = dataProducts[i].title;
    price.value = dataProducts[i].price;
    taxes.value = dataProducts[i].taxes;
    ads.value = dataProducts[i].ads;
    discount.value = dataProducts[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataProducts[i].category;
    submit.innerHTML = 'Update';
    mood = 'Update';
    temp = i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}


let searchMood = 'title';
function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id === 'searchTitle') {
        searchMood = 'title';
        search.placeholder = 'Search by Title'; 
    } else if (id === 'searchCategory') {
        searchMood = 'category';
        search.placeholder = 'Search by Category'; 
    }
    search.focus(); 
}
function filterData() {
    let searchValue = document.getElementById('search').value.toLowerCase();
    let table = document.getElementById('dataTable');
    let rows = table.getElementsByTagName('tr');
    
    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        let targetCell = (searchMood === 'title') ? cells[1] : cells[7];
        let text = targetCell.textContent || targetCell.innerText;
        
        if (text.toLowerCase().includes(searchValue)) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}
